import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '事業構造',
  description: 'TagTech の事業構造 — TagDeck をメイン軸に 6 支援事業が連携',
}

const businesses = [
  {
    no: '①',
    name: 'AI・テック解説',
    contrib: 'TagDeck の機能解説動画を継続供給',
    kpi: '動画再生数・TagDeck サイト流入',
    pct: '8%',
  },
  {
    no: '②',
    name: 'ニュース解説・教育',
    contrib: '配信業界ニュースで配信者層にリーチ',
    kpi: 'フォロワー数・X 言及数',
    pct: '4%',
  },
  {
    no: '③',
    name: 'Vtuber・配信育成事務所',
    contrib: '育成中の Vtuber を TagDeck に誘導',
    kpi: 'TagDeck 有料会員転換数',
    pct: '10%',
  },
  {
    no: '④',
    name: 'ギーク・ガジェット系メディア',
    contrib: '配信機材レビューで配信者の検索流入を獲得',
    kpi: '検索順位・サイト流入',
    pct: '3%',
  },
  {
    no: '⑤',
    name: '新規メディア開拓',
    contrib: 'TagDeck の SNS アカウント運用',
    kpi: 'フォロワー数・LP CTR',
    pct: '10%',
  },
  {
    no: '⑥',
    name: '金融・投資解説（えるぴ）',
    contrib: '配信運用 KPI の実証実験',
    kpi: '配信時間・ピーク視聴者',
    pct: '5%',
  },
]

const roadmap = [
  { period: '2026 年 5〜7 月', milestone: 'TagDeck フェーズ 4 完成（ふわっち・Kick・ニコ生）、β 10 名で動作検証' },
  { period: '2026 年 8〜10 月', milestone: 'フェーズ 5〜7 完成（イベント勝率・AI カンペ・Push 通知）、FANBOX 支援開始、100 名突破' },
  { period: '2026 年 11 月〜2027 年 1 月', milestone: 'Cloudflare Workers 移行・Stripe 月額課金・株式会社 TagTech 法人化' },
  { period: '2027 年 2〜6 月', milestone: 'YouTube Live・Twitch 対応、月商 100 万円超え' },
  { period: '2027 年下半期', milestone: 'Enterprise プラン提供開始・配信事務所と提携・月商 500 万円目標' },
  { period: '2028 年〜', milestone: '金商法登録準備（投資助言業）と連携した投資情報配信プラットフォーム検討' },
]

const IRIS_20 = 'bg-[linear-gradient(rgba(86,131,218,0.2),rgba(86,131,218,0.2))]'
const body = 'text-body leading-body tracking-body'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow mb-5'
const th = 'text-left py-3 font-medium text-ash'
const rowBorder = 'border-b border-slate-edge'

export default function BusinessPage() {
  return (
    <main className="max-w-[var(--page-max-width)] mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-3">事業構造</h1>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash">
          TagDeck をメイン軸（リソースの 60%）に、6 つの支援事業が認知獲得・ユーザー獲得・コンテンツ供給を担う。
        </p>
      </div>

      {/* Structure visual */}
      <section className="mb-24">
        <div className="flex flex-col items-center gap-6">
          {/* TagDeck box */}
          <div className={`rounded-xl border border-electric-iris bg-charcoal-card ${IRIS_20} px-8 py-6 text-center w-full max-w-sm`}>
            <p className={`${body} font-medium text-snow mb-1`}>メイン軸 60%</p>
            <p className="text-heading-sm leading-heading-sm font-semibold text-snow">TagDeck</p>
            <p className={`${body} text-ash mt-1`}>配信者向けセカンドスクリーン型 AI SaaS</p>
            <Link href="/tagdeck" className={`${body} text-snow underline underline-offset-4 hover:opacity-90 mt-2 inline-block`}>
              詳細を見る →
            </Link>
          </div>

          <div className="flex items-center gap-2 text-smoke">
            <div className="h-6 w-px bg-slate-edge" />
            <span className="text-caption leading-caption tracking-caption">支援チャネル</span>
            <div className="h-6 w-px bg-slate-edge" />
          </div>

          {/* Support grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {businesses.map(({ no, name, pct }) => (
              <div key={no} className="rounded-xl border border-slate-edge bg-charcoal-card px-4 py-3 text-center">
                <p className="text-caption leading-caption tracking-caption text-smoke mb-0.5">{no} {pct}</p>
                <p className={`${body} font-medium text-snow`}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business table */}
      <section className="mb-24">
        <h2 className={h2}>6 支援事業の役割</h2>
        <p className={`${body} text-smoke mb-5`}>
          各事業の成功は「事業単体の利益」ではなく「TagDeck の MAU・有料会員数への貢献」で測る。
        </p>
        <div className="overflow-x-auto">
          <table className={`w-full ${body} border-collapse`}>
            <thead>
              <tr className={rowBorder}>
                <th className={`${th} pr-4`}>事業</th>
                <th className={`${th} pr-4 w-8`}>配分</th>
                <th className={`${th} pr-4`}>TagDeck への貢献</th>
                <th className={th}>主要 KPI</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map(({ no, name, contrib, kpi, pct }) => (
                <tr key={no} className={rowBorder}>
                  <td className="py-3 pr-4 font-medium text-snow">{no} {name}</td>
                  <td className="py-3 pr-4 text-electric-iris font-medium">{pct}</td>
                  <td className="py-3 pr-4 text-ash">{contrib}</td>
                  <td className="py-3 text-ash">{kpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <h2 className={h2}>事業ロードマップ</h2>
        <div className="space-y-3">
          {roadmap.map(({ period, milestone }) => (
            <div key={period} className={`flex gap-4 ${body}`}>
              <span className="shrink-0 font-medium text-ash w-44">{period}</span>
              <span className="text-ash">{milestone}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
