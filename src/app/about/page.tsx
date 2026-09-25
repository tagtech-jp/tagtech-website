import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'TagTech について — ミッション・ビジョン・事業概要',
}

const body = 'text-body leading-body tracking-body'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow'
const link = `text-electric-iris underline-offset-4 hover:underline`

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-8">About</h1>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>ミッション</h2>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash border-l-4 border-electric-iris pl-4">
          AI で配信エコシステム全体を最適化し、配信者が孤独な戦いをしない世界を作る。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>ビジョン</h2>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash border-l-4 border-slate-edge pl-4">
          「配信を始めたら、まず TagDeck」が当たり前になる状態を 3 年以内に実現する。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-4`}>事業情報</h2>
        <dl className={`space-y-3 ${body}`}>
          <div className="flex gap-6">
            <dt className="w-28 shrink-0 text-smoke">屋号</dt>
            <dd className="text-snow font-medium">TagTech</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-28 shrink-0 text-smoke">事業形態</dt>
            <dd className="text-snow">個人事業主</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-28 shrink-0 text-smoke">開業</dt>
            <dd className="text-snow">2026 年 4 月</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-28 shrink-0 text-smoke">法人化予定</dt>
            <dd className="text-snow">2026 年 11 月〜2027 年 1 月（株式会社 TagTech）</dd>
          </div>
          <div className="flex gap-6">
            <dt className="w-28 shrink-0 text-smoke">事業内容</dt>
            <dd className="text-snow">配信者向け AI SaaS「TagDeck」の開発・運営</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className={`${h2} mb-3`}>お問い合わせ</h2>
        <p className={`${body} text-ash`}>
          ご質問・ご相談は{' '}
          <a href="/contact" className={link}>
            お問い合わせフォーム
          </a>
          {' '}またはメール（
          <a href="mailto:info@tagtech.jp" className={link}>
            info@tagtech.jp
          </a>
          ）にてお気軽にどうぞ。
        </p>
      </section>
    </main>
  )
}
