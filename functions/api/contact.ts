interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  'cf-turnstile-response'?: string
}

interface Env {
  DISCORD_WEBHOOK_URL: string
  RESEND_API_KEY: string
  CONTACT_FROM_EMAIL: string
  CONTACT_TO_EMAIL: string
  TURNSTILE_SECRET_KEY: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function verifyTurnstile(token: string, secretKey: string): Promise<boolean> {
  if (!token) return false
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: secretKey, response: token }),
  })
  const json = await res.json() as { success: boolean }
  return json.success === true
}

async function sendDiscord(webhookUrl: string, data: ContactPayload): Promise<void> {
  const content = [
    `**[TagTech お問い合わせ]**`,
    `**件名:** ${data.subject}`,
    `**名前:** ${data.name}`,
    `**メール:** ${data.email}`,
    `**メッセージ:**\n${data.message}`,
  ].join('\n')

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error(`Discord webhook failed: ${res.status}`)
}

async function sendResend(
  apiKey: string,
  from: string,
  to: string,
  data: ContactPayload
): Promise<void> {
  const html = `
    <p><strong>名前:</strong> ${data.name}</p>
    <p><strong>メール:</strong> ${data.email}</p>
    <p><strong>件名:</strong> ${data.subject}</p>
    <p><strong>メッセージ:</strong></p>
    <pre style="white-space:pre-wrap;font-family:sans-serif">${data.message}</pre>
  `
  const text = [
    `名前: ${data.name}`,
    `メール: ${data.email}`,
    `件名: ${data.subject}`,
    ``,
    `本文:`,
    data.message,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `TagTech Web <${from}>`,
      to: [to],
      subject: `[TagTech Web] ${data.subject}`,
      html,
      text,
    }),
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Resend API failed: ${res.status} ${body}`)
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
  }

  let data: ContactPayload
  try {
    data = await request.json()
  } catch {
    return new Response(JSON.stringify({ success: false, errors: ['Invalid JSON'] }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  // Validation
  const errors: string[] = []
  if (!data.name?.trim()) errors.push('名前は必須です')
  else if (data.name.length > 100) errors.push('名前は 100 文字以内で入力してください')
  if (!data.email?.trim()) errors.push('メールアドレスは必須です')
  else if (!isValidEmail(data.email)) errors.push('メールアドレスの形式が正しくありません')
  else if (data.email.length > 254) errors.push('メールアドレスは 254 文字以内で入力してください')
  if (!data.subject?.trim()) errors.push('件名は必須です')
  if (!data.message?.trim()) errors.push('メッセージは必須です')
  else if (data.message.length > 5000) errors.push('メッセージは 5,000 文字以内で入力してください')

  if (errors.length > 0) {
    return new Response(JSON.stringify({ success: false, errors }), {
      status: 400,
      headers: corsHeaders,
    })
  }

  // TODO: 将来レート制限を実装 (例: Cloudflare KV ベース・同一IP 5分1回)
  // 別タスク化予定 (本タスク範囲外 / Karpathy 原則2 Simplicity First により本実装は保留)
  // Notion 登録は社長作業
  const turnstileOk = await verifyTurnstile(data['cf-turnstile-response'] ?? '', env.TURNSTILE_SECRET_KEY)
  if (!turnstileOk) {
    return new Response(JSON.stringify({ success: false, errors: ['CAPTCHA の検証に失敗しました'] }), {
      status: 400, headers: corsHeaders,
    })
  }

  // Parallel dispatch — email is primary
  const results = await Promise.allSettled([
    sendDiscord(env.DISCORD_WEBHOOK_URL, data),
    sendResend(env.RESEND_API_KEY, env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL, data),
  ])

  const sendErrors: string[] = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => String(r.reason))
  if (sendErrors.length > 0) console.error('[contact] dispatch errors:', sendErrors)

  const [, resendResult] = results
  if (resendResult.status === 'rejected') {
    return new Response(
      JSON.stringify({ success: false, errors: sendErrors }),
      { status: 502, headers: corsHeaders }
    )
  }

  return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders })
}
