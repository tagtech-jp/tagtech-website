import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TagOshi',
  description: '推し配信者を横断的に追える、リスナー向けのアプリ。',
}

const ASH_12 = 'bg-[linear-gradient(rgba(169,169,170,0.12),rgba(169,169,170,0.12))]'
const body = 'text-body leading-body tracking-body'
const card = 'bg-charcoal-card border border-slate-edge rounded-xl p-6'

export default function TagOshiPage() {
  return (
    <main className="max-w-[var(--page-max-width)] mx-auto px-4 py-16">
      {/* ヘッダー */}
      <div className="mb-8 text-center">
        <p className={`${body} font-medium text-electric-iris mb-3`}>
          リスナー向けアプリ
        </p>
        <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-4">TagOshi</h1>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash max-w-lg mx-auto">
          推し配信者を横断的に追える、リスナー向けのアプリ。
        </p>
      </div>

      {/* 準備中バナー */}
      <div className={`mb-12 rounded-xl border border-slate-edge bg-charcoal-card ${ASH_12} px-4 py-4 text-center`}>
        <p className={`${body} font-medium text-snow`}>準備中</p>
        <p className={`${body} text-ash mt-1`}>
          現在、リリースに向けて準備を進めています。
        </p>
      </div>

      {/* 機能予告 */}
      <section className="mb-24">
        <h2 className="text-heading-sm leading-heading-sm font-semibold text-snow mb-6">TagOshi でできること（予定）</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className={card}>
            <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">推し配信者を一括フォロー</h3>
            <p className={`${body} text-ash`}>
              ふわっち・ニコ生・YouTube・Twitch など、複数プラットフォームの推し配信者を一箇所で管理。
            </p>
          </div>
          <div className={card}>
            <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">横断視聴履歴</h3>
            <p className={`${body} text-ash`}>
              プラットフォームをまたいだ視聴履歴を統一表示。いつ・どこで・誰の配信を見たか追跡。
            </p>
          </div>
          <div className={card}>
            <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">配信開始通知</h3>
            <p className={`${body} text-ash`}>
              推し配信者の配信開始を即座に通知。見逃しを防ぎます。
            </p>
          </div>
          <div className={card}>
            <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">日本市場特化</h3>
            <p className={`${body} text-ash`}>
              日本のリスナー文化に最適化。ふわっち・ツイキャス・ニコ生など国内 PF を網羅。
            </p>
          </div>
        </div>
      </section>

      {/* トップへ戻る */}
      <div className="text-center">
        <Link href="/" className={`${body} text-electric-iris underline-offset-4 hover:underline`}>
          ← トップへ戻る
        </Link>
      </div>
    </main>
  )
}
