'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    turnstile?: { reset: (container?: string | HTMLElement) => void }
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

// サーバー側（functions/api/contact.ts の LIMITS）と同じ上限
const MAX = { name: 100, email: 254, subject: 200, message: 5000 } as const

const GENERIC_ERROR = '送信に失敗しました。しばらくしてから再度お試しください。'

const body = 'text-body leading-body tracking-body'
const label = `block ${body} font-medium text-ash mb-1`
const input =
  'w-full rounded-md border border-slate-edge bg-charcoal-card text-snow px-3 py-2 text-body leading-body tracking-body focus:border-electric-iris focus:outline-none focus:ring-1 focus:ring-electric-iris'
const IRIS_20 = 'bg-[linear-gradient(rgba(86,131,218,0.2),rgba(86,131,218,0.2))]'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    const id = 'cf-turnstile-script'
    if (document.getElementById(id)) return
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Turnstile のトークンは 1 回しか使えないので、送信のたびにウィジェットを作り直す
  const resetTurnstile = () => {
    try {
      window.turnstile?.reset()
    } catch {
      // ウィジェットが未初期化のときなどは無視する
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const token = document.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value ?? ''
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, 'cf-turnstile-response': token }),
      })
      // JSON でない応答（Cloudflare のエラーページなど）は空として扱い、一般的なメッセージを出す
      const data: { success?: boolean; errors?: string[] } = await res.json().catch(() => ({}))

      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.errors?.length ? data.errors.join(' / ') : GENERIC_ERROR)
      }
    } catch {
      setStatus('error')
      setErrorMsg('ネットワークエラーが発生しました。しばらくしてから再度お試しください。')
    } finally {
      resetTurnstile()
    }
  }

  if (status === 'success') {
    return (
      <div className={`rounded-xl border border-slate-edge bg-charcoal-card ${IRIS_20} p-6 text-center`}>
        <p className={`${body} font-medium text-snow`}>お問い合わせを受け付けました。</p>
        <p className={`${body} text-ash mt-1`}>内容を確認の上、順次ご返信いたします。</p>
        <button
          onClick={() => setStatus('idle')}
          className={`mt-4 ${body} text-electric-iris underline-offset-4 hover:underline`}
        >
          別のお問い合わせをする
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div role="alert" className={`rounded-xl border border-ember-pulse bg-molasses p-4 ${body} text-ember-pulse`}>
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="name" className={label}>
          お名前 <span className="text-ember-pulse">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={MAX.name}
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          メールアドレス <span className="text-ember-pulse">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={MAX.email}
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="subject" className={label}>
          件名 <span className="text-ember-pulse">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={MAX.subject}
          value={form.subject}
          onChange={handleChange}
          className={input}
        />
      </div>

      <div>
        <label htmlFor="message" className={label}>
          メッセージ <span className="text-ember-pulse">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={MAX.message}
          value={form.message}
          onChange={handleChange}
          className={`${input} resize-y`}
        />
        <p className="text-caption leading-caption tracking-caption text-smoke mt-1">
          {form.message.length.toLocaleString('ja-JP')} / {MAX.message.toLocaleString('ja-JP')} 文字
        </p>
      </div>

      {/* Cloudflare Turnstile（ボット対策）。Site Key は公開情報で、本番ドメインに紐づく */}
      <div
        className="cf-turnstile"
        data-sitekey="0x4AAAAAADMSpC9qskgSTTGG"
        data-theme="dark"
        data-language="ja"
      />

      <p className="text-caption leading-caption tracking-caption text-smoke">
        送信いただいた内容の取り扱いは
        <a href="/privacy/" className="text-electric-iris underline-offset-4 hover:underline">
          プライバシーポリシー
        </a>
        をご覧ください。
      </p>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full rounded-full bg-snow px-4 py-2.5 ${body} font-medium text-void transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === 'submitting' ? '送信中...' : '送信する'}
      </button>
    </form>
  )
}
