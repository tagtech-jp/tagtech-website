import type { Metadata } from 'next'
import { PLANS } from '@/lib/plans'
import { PricingCard } from '@/components/PricingCard'

export const metadata: Metadata = {
  title: 'TagDeck',
  description: '配信者向けセカンドスクリーン型 AI SaaS — リアルタイム CRM・イベント勝率シミュレーター・AI 接客カンペ',
}

const features = [
  {
    title: 'リアルタイム CRM',
    desc: '複数プラットフォームのリスナーを一元管理。過去のコメント・ポイント・参加履歴を瞬時に参照。',
  },
  {
    title: 'イベント勝率シミュレーター',
    desc: 'ふわっち・ニコ生のイベント目標達成確率をリアルタイムで計算。戦略的な配信判断を支援。',
  },
  {
    title: 'AI 接客カンペ',
    desc: 'Gemini 連携でリスナー個別の対応を提案。「このリスナーには何を話せばいいか」を AI が答える。',
  },
  {
    title: '自動切り抜き & SNS 投稿',
    desc: '配信中の盛り上がりを自動検知 → AI 編集 → TikTok / YouTube Shorts に自動投稿。',
  },
  {
    title: '横断ポイントシステム',
    desc: 'ふわっち・ニコ生・Kick をまたいだリスナーロイヤリティを一元管理。プラットフォーム超えの定着を実現。',
  },
]

const platforms = [
  { name: 'ふわっち', method: '公開 API 5 秒ポーリング', phase: 'フェーズ 4a（2026-05）' },
  { name: 'Kick', method: '公式 Pusher WebSocket', phase: 'フェーズ 4b' },
  { name: 'ニコ生', method: '公式 NDGR ストリーミング', phase: 'フェーズ 4c' },
  { name: 'YouTube Live', method: '公式 API', phase: 'フェーズ 5 以降' },
  { name: 'Twitch', method: '公式 EventSub', phase: 'フェーズ 5 以降' },
]

const rivals = [
  {
    name: 'ソフト A',
    area: 'コメントビューア＋簡易リスナー記憶',
    diff: 'AI 戦術ツール・ふわっち特化イベント勝率シミュレーター・横断ポイント',
  },
  {
    name: 'ソフト B',
    area: '配信演出・寄付管理',
    diff: '日本ローカル PF 完全対応（ふわっち・Kick・ニコ生）',
  },
  {
    name: 'ソフト C',
    area: '配信演出・チャットボット',
    diff: 'CRM ＋ AI カンペ ＋ 自動切り抜きの統合',
  },
]

const IRIS_20 = 'bg-[linear-gradient(rgba(86,131,218,0.2),rgba(86,131,218,0.2))]'
const body = 'text-body leading-body tracking-body'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow mb-6'
const card = 'bg-charcoal-card border border-slate-edge rounded-xl p-6'
const th = 'text-left py-3 font-medium text-ash'
const rowBorder = 'border-b border-slate-edge'

export default function TagDeckPage() {
  return (
    <main className="max-w-[var(--page-max-width)] mx-auto px-4 py-16">
      {/* Hero */}
      <div className="mb-24 text-center">
        <p className={`${body} font-medium text-electric-iris mb-3`}>
          配信者向けセカンドスクリーン型 AI SaaS
        </p>
        <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-4">TagDeck</h1>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash max-w-lg mx-auto">
          複数プラットフォームのリスナー情報を一元管理し、AI が配信中の判断を全てサポート。
        </p>
      </div>

      {/* Features */}
      <section className="mb-24">
        <h2 className={h2}>コア機能</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ title, desc }) => (
            <div key={title} className={card}>
              <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">{title}</h3>
              <p className={`${body} text-ash`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="mb-24">
        <h2 className={h2}>対応プラットフォーム</h2>
        <div className="overflow-x-auto">
          <table className={`w-full ${body} border-collapse`}>
            <thead>
              <tr className={rowBorder}>
                <th className={`${th} pr-6`}>プラットフォーム</th>
                <th className={`${th} pr-6`}>取得方式</th>
                <th className={th}>実装フェーズ</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(({ name, method, phase }) => (
                <tr key={name} className={rowBorder}>
                  <td className="py-3 pr-6 font-medium text-snow">{name}</td>
                  <td className="py-3 pr-6 text-ash">{method}</td>
                  <td className="py-3 text-ash">{phase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plans */}
      <section className="mb-24">
        <h2 className={h2}>プラン</h2>
        <div className={`mb-6 rounded-xl border border-slate-edge bg-charcoal-card ${IRIS_20} px-4 py-3 text-center`}>
          <p className={`${body} font-medium text-snow`}>オープンベータ・無料公開中</p>
          <p className={`${body} text-ash mt-1`}>オープンベータ期間中、すべての機能を無料でご利用いただけます</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>

      {/* Rivals */}
      <section>
        <h2 className={h2}>競合との差別化</h2>
        <div className="overflow-x-auto">
          <table className={`w-full ${body} border-collapse`}>
            <thead>
              <tr className={rowBorder}>
                <th className={`${th} pr-6`}>競合</th>
                <th className={`${th} pr-6`}>領域</th>
                <th className={th}>TagDeck の差別化</th>
              </tr>
            </thead>
            <tbody>
              {rivals.map(({ name, area, diff }) => (
                <tr key={name} className={rowBorder}>
                  <td className="py-3 pr-6 font-medium text-snow">{name}</td>
                  <td className="py-3 pr-6 text-ash">{area}</td>
                  <td className="py-3 text-ash">{diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
