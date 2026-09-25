import Link from 'next/link'
import { PLANS } from '@/lib/plans'

const values = [
  {
    title: 'コメント返しの迷いを減らす',
    desc: 'AI 接客カンペが、リスナーごとの文脈に合わせた返答候補を提示。配信中の判断負荷を下げます。',
  },
  {
    title: 'リピートされる仕組みを作る',
    desc: 'リスナー履歴・メモ・横断ポイントで、初見対応から常連フォローまでを同じ画面で管理します。',
  },
  {
    title: 'イベント中の数字を見える化',
    desc: '目標ポイント、順位、残り時間をもとに、いま取るべき配信判断をイベント勝率シミュレーターで確認できます。',
  },
  {
    title: '配信後の発信までつなげる',
    desc: '盛り上がった場面の検知、切り抜き候補、SNS 展開までを一連の運用として支援します。',
  },
]

// Tier tint = Electric Iris at 12% (normal) / 20% (emphasis) over the charcoal card
const IRIS_12 = 'bg-[linear-gradient(rgba(86,131,218,0.12),rgba(86,131,218,0.12))]'
const IRIS_20 = 'bg-[linear-gradient(rgba(86,131,218,0.2),rgba(86,131,218,0.2))]'

const targets = [
  {
    label: 'これから配信を始める人',
    sub: '配信を始めたばかりで、まずは小さく試したい段階',
    planName: 'Free',
    color: IRIS_12,
  },
  {
    label: '小規模配信者',
    sub: 'これからリスナーを増やしたい',
    planName: 'Standard',
    color: '',
  },
  {
    label: '中規模配信者',
    sub: '収益化済み・さらに伸ばしたい',
    planName: 'Premium',
    color: IRIS_20,
  },
  {
    label: '配信事務所・Vtuber プロダクション',
    sub: '複数ライバーを一元管理したい',
    planName: 'Enterprise',
    color: '',
  },
]

const card = 'bg-charcoal-card border border-slate-edge rounded-xl p-6'
const h2 = 'text-heading leading-heading tracking-heading font-semibold text-center text-snow mb-10'
const body = 'text-body leading-body tracking-body'
const link = `${body} text-electric-iris underline-offset-4 hover:underline`
const chip = 'inline-block rounded-full px-[10px] py-1 text-caption leading-caption tracking-caption font-medium'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24">
        {/* Aurora beam: iris (60%) → ember → white, narrow vertical streak (Gradient System) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-[20%] -translate-x-1/2 opacity-70 blur-3xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(86,131,218,0.6) 0%, #ff8964 55%, #ffffff 100%)',
          }}
        />
        {/* Radial sunburst at the base: #ffaa81 → #ffda9f → transparent, 400px, 40% */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[200px] left-1/2 size-[400px] -translate-x-1/2 rounded-full opacity-40 blur-2xl"
          style={{
            background: 'radial-gradient(circle, #ffaa81 0%, #ffda9f 45%, transparent 70%)',
          }}
        />
        <div className="relative max-w-[var(--page-max-width)] mx-auto text-center">
          <p className={`${body} font-medium text-electric-iris mb-3`}>
            配信・動画を続ける人のための AIサポートツール
          </p>
          <h1 className="text-display-sm leading-display-sm tracking-display-sm md:text-display md:leading-display md:tracking-display font-semibold text-snow mb-6">
            配信者の判断を AI で支える
          </h1>
          <p className="text-subheading leading-subheading tracking-subheading text-ash mb-8">
            TagTech は、配信中のコメント対応、リスナー管理、イベント分析、配信後の動画展開をまとめて支援するプロダクトを開発しています。
          </p>
          <Link
            href="/tagdeck"
            className={`${body} inline-block rounded-full bg-snow px-6 py-3 font-medium text-void hover:opacity-90 transition-opacity`}
          >
            TagDeck の詳細を見る →
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-obsidian-canvas py-24">
        <div className="max-w-[var(--page-max-width)] mx-auto px-4">
          <h2 className={h2}>4 つの提供価値</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(({ title, desc }) => (
              <div key={title} className={card}>
                <h3 className="text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow mb-2">{title}</h3>
                <p className={`${body} text-ash`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Targets */}
      <section className="max-w-[var(--page-max-width)] mx-auto px-4 py-24">
        <h2 className={h2}>対象ユーザー</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map(({ label, sub, planName, color }) => {
            const plan = PLANS.find((p) => p.name === planName)!
            return (
              <div key={label} className={`${card} ${color}`}>
                <p className={`${body} font-semibold text-snow mb-1`}>{label}</p>
                <p className={`${body} text-ash mb-3`}>{sub}</p>
                <p className="text-caption leading-caption tracking-caption font-semibold text-snow">{plan.name} — {plan.price}</p>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/tagdeck" className={link}>
            機能・プラン詳細を確認する →
          </Link>
        </div>
      </section>

      {/* Products */}
      <section className="bg-obsidian-canvas py-24">
        <div className="max-w-[var(--page-max-width)] mx-auto px-4">
          <h2 className={h2}>プロダクト</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={card}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-subheading leading-subheading tracking-subheading font-semibold text-snow">TagDeck</span>
                <span className={`${chip} text-snow bg-electric-iris/20`}>オープンベータ</span>
              </div>
              <p className={`${body} font-medium text-snow mb-2`}>配信者向け AI 収益管理ダッシュボード</p>
              <p className={`${body} text-ash mb-4`}>
                配信中の AI 接客・リアルタイム収益管理・イベント勝率シミュレーターを一画面に集約。
                配信者が数字を見ながら戦略的に配信できる。
              </p>
              <Link href="/tagdeck" className={link}>
                詳細を見る →
              </Link>
            </div>

            <div className={card}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-subheading leading-subheading tracking-subheading font-semibold text-snow">TagOshi</span>
                <span className={`${chip} text-ash bg-ash/12`}>構想中</span>
              </div>
              <p className={`${body} font-medium text-snow mb-2`}>推し活を支える横断視聴ダッシュボード</p>
              <p className={`${body} text-ash mb-4`}>
                複数プラットフォームの推し配信者をひとつの画面でフォロー。
                配信通知・横断視聴履歴で推し活をもっと深く、見逃しをゼロに。
              </p>
              <Link href="/tagoshi" className={link}>
                詳細を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
