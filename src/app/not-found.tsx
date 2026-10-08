import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
}

const body = 'text-body leading-body tracking-body'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className={`${body} font-medium text-electric-iris mb-3`}>404</p>
      <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-4">
        ページが見つかりません
      </h1>
      <p className={`${body} text-ash mb-8`}>
        お探しのページは移動または削除された可能性があります。URL をご確認ください。
      </p>
      <Link
        href="/"
        className={`${body} inline-block rounded-full bg-snow px-6 py-3 font-medium text-void hover:opacity-90 transition-opacity`}
      >
        トップへ戻る
      </Link>
    </main>
  )
}
