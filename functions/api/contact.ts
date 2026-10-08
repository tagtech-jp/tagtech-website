// tagtech.jp お問い合わせ API（Cloudflare Pages Functions）
//
// 流れ: 入力の型と長さの検証 → Turnstile（ボット対策）の検証 → メール（Resend・主）と Discord（副）へ送信。
// 方針:
//   - 利用者には内部エラーの詳細（外部 API の応答本文など）を返さない。詳細はログにだけ残す
//   - 利用者の入力は、メール本文では HTML エスケープし、1 行の項目からは改行を除く（ヘッダー注入の防止）
//   - Discord はメンションを無効化し、2,000 文字の上限に収める（超えると 400 で届かない）
//   - /api/* の応答には public/_headers が適用されないので、ここでセキュリティヘッダーを付ける

interface Env {
  DISCORD_WEBHOOK_URL?: string
  RESEND_API_KEY?: string
  CONTACT_FROM_EMAIL?: string
  CONTACT_TO_EMAIL?: string
  TURNSTILE_SECRET_KEY?: string
}

type ContactInput = {
  name: string
  email: string
  subject: string
  message: string
  turnstileToken: string
}

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 } as const
const MAX_BODY_BYTES = 64 * 1024
const DISCORD_MAX_CONTENT = 2000
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const RESEND_URL = 'https://api.resend.com/emails'

const GENERIC_SEND_ERROR =
  '送信に失敗しました。しばらくしてから再度お試しください。メール（info@tagtech.jp）でもご連絡いただけます。'

const RESPONSE_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS })
}

function fail(status: number, ...errors: string[]): Response {
  return json(status, { success: false, errors })
}

function isValidEmail(email: string): boolean {
  // @ が 1 つ・空白なし・ドメインにドットあり。厳密な RFC 検査はしない（Resend 側でも検査される）
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** 制御文字を除く。1 行の項目（名前・メール・件名）は改行・タブも空白に置き換える */
function clean(value: string, singleLine: boolean): string {
  let out = ''
  for (const ch of value) {
    const code = ch.charCodeAt(0)
    const isControl = code < 0x20 || code === 0x7f
    if (!isControl) {
      out += ch
    } else if (ch === '\n' || ch === '\r' || ch === '\t') {
      out += singleLine ? ' ' : ch
    }
  }
  return out.replace(/ {2,}/g, ' ').trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function truncate(s: string, max: number): string {
  if (max <= 0) return ''
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

type ParseResult = { ok: true; data: ContactInput } | { ok: false; errors: string[] }

function parseInput(raw: unknown): ParseResult {
  const badShape: ParseResult = { ok: false, errors: ['リクエスト形式が正しくありません'] }
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return badShape
  const obj = raw as Record<string, unknown>

  // 文字列以外（数値・配列・オブジェクト）が来たら 400 にする（以前は .trim() で例外になり 500 だった）
  const str = (key: string): string | null => {
    const v = obj[key]
    if (v === undefined || v === null) return ''
    return typeof v === 'string' ? v : null
  }
  const rawName = str('name')
  const rawEmail = str('email')
  const rawSubject = str('subject')
  const rawMessage = str('message')
  const rawToken = str('cf-turnstile-response')
  if (rawName === null || rawEmail === null || rawSubject === null || rawMessage === null || rawToken === null) {
    return badShape
  }

  const name = clean(rawName, true)
  const email = clean(rawEmail, true)
  const subject = clean(rawSubject, true)
  const message = clean(rawMessage, false)

  const errors: string[] = []
  if (!name) errors.push('名前は必須です')
  else if (name.length > LIMITS.name) errors.push(`名前は ${LIMITS.name} 文字以内で入力してください`)
  if (!email) errors.push('メールアドレスは必須です')
  else if (email.length > LIMITS.email) errors.push(`メールアドレスは ${LIMITS.email} 文字以内で入力してください`)
  else if (!isValidEmail(email)) errors.push('メールアドレスの形式が正しくありません')
  if (!subject) errors.push('件名は必須です')
  else if (subject.length > LIMITS.subject) errors.push(`件名は ${LIMITS.subject} 文字以内で入力してください`)
  if (!message) errors.push('メッセージは必須です')
  else if (message.length > LIMITS.message) errors.push('メッセージは 5,000 文字以内で入力してください')
  if (errors.length > 0) return { ok: false, errors }

  return { ok: true, data: { name, email, subject, message, turnstileToken: rawToken.trim() } }
}

type TurnstileResult = { success?: boolean; 'error-codes'?: string[] }

async function verifyTurnstile(token: string, secretKey: string, remoteIp: string | null): Promise<boolean> {
  if (!token || token.length > 2048) return false
  const body = new URLSearchParams({ secret: secretKey, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)
  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    console.error('[contact] turnstile siteverify http', res.status)
    return false
  }
  const result = (await res.json()) as TurnstileResult
  if (result.success !== true) {
    console.warn('[contact] turnstile rejected', (result['error-codes'] ?? []).join(','))
    return false
  }
  return true
}

async function sendDiscord(webhookUrl: string, d: ContactInput): Promise<void> {
  const headerLines = [
    '**[TagTech お問い合わせ]**',
    `**件名:** ${d.subject}`,
    `**名前:** ${d.name}`,
    `**メール:** ${d.email}`,
    '**メッセージ:**',
  ]
  const header = headerLines.join('\n') + '\n'
  const content = header + truncate(d.message, DISCORD_MAX_CONTENT - header.length)
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // User-Agent が無いと Discord 側の Cloudflare が 403（error 1010）を返す
      'User-Agent': 'TagTechWeb/1.0 (+https://tagtech.jp)',
    },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  })
  if (!res.ok) throw new Error(`Discord webhook failed: ${res.status}`)
}

async function sendResend(apiKey: string, from: string, to: string, d: ContactInput): Promise<void> {
  const html = [
    `<p><strong>名前:</strong> ${escapeHtml(d.name)}</p>`,
    `<p><strong>メール:</strong> ${escapeHtml(d.email)}</p>`,
    `<p><strong>件名:</strong> ${escapeHtml(d.subject)}</p>`,
    '<p><strong>メッセージ:</strong></p>',
    `<pre style="white-space:pre-wrap;font-family:sans-serif">${escapeHtml(d.message)}</pre>`,
  ].join('\n')
  const text = [`名前: ${d.name}`, `メール: ${d.email}`, `件名: ${d.subject}`, '', '本文:', d.message].join('\n')

  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `TagTech Web <${from}>`,
      to: [to],
      reply_to: d.email,
      subject: `[TagTech Web] ${d.subject}`,
      html,
      text,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend API failed: ${res.status} ${body.slice(0, 500)}`)
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const required: Array<keyof Env> = ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL', 'TURNSTILE_SECRET_KEY']
  const missing = required.filter((k) => !env[k])
  if (missing.length > 0) {
    console.error('[contact] missing env:', missing.join(','))
    return fail(503, 'お問い合わせフォームは現在ご利用いただけません。メール（info@tagtech.jp）でご連絡ください。')
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0')
  if (declaredLength > MAX_BODY_BYTES) return fail(413, '送信内容が大きすぎます')
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) return fail(415, 'リクエスト形式が正しくありません')

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return fail(400, 'リクエスト形式が正しくありません')
  }

  const parsed = parseInput(raw)
  if (!parsed.ok) return fail(400, ...parsed.errors)
  const data = parsed.data

  let turnstileOk = false
  try {
    turnstileOk = await verifyTurnstile(
      data.turnstileToken,
      env.TURNSTILE_SECRET_KEY as string,
      request.headers.get('CF-Connecting-IP')
    )
  } catch (e) {
    console.error('[contact] turnstile error:', String(e))
    return fail(502, '送信を確認できませんでした。しばらくしてから再度お試しください。')
  }
  if (!turnstileOk) {
    return fail(400, 'CAPTCHA の検証に失敗しました。ページを再読み込みして再度お試しください。')
  }

  // メールが主・Discord は副（Webhook 未設定なら送らない）
  const tasks: Array<Promise<void>> = [
    sendResend(env.RESEND_API_KEY as string, env.CONTACT_FROM_EMAIL as string, env.CONTACT_TO_EMAIL as string, data),
  ]
  if (env.DISCORD_WEBHOOK_URL) tasks.push(sendDiscord(env.DISCORD_WEBHOOK_URL, data))
  const results = await Promise.allSettled(tasks)
  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(`[contact] dispatch failed (${i === 0 ? 'resend' : 'discord'}):`, String(r.reason))
    }
  })
  if (results[0].status === 'rejected') return fail(502, GENERIC_SEND_ERROR)

  return json(200, { success: true })
}
