import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '組織体制',
  description: 'TagTech のAIエージェント組織図 — AIエージェント69名と人間1名（意思決定者）で構成する個人事業の体制を公開します。',
}

const cxos = [
  { abbr: 'CEO',  emoji: '👑', title: '最高経営責任者',           dept: '全社戦略・意思決定' },
  { abbr: 'COO',  emoji: '🏃', title: '最高執行責任者',           dept: '事業運営・実行管理' },
  { abbr: 'CTO',  emoji: '⚙️', title: '最高技術責任者',           dept: 'エンジニアリング・インフラ' },
  { abbr: 'CFO',  emoji: '💰', title: '最高財務責任者',           dept: '財務・収益管理' },
  { abbr: 'CMO',  emoji: '📢', title: '最高マーケティング責任者', dept: 'マーケティング・SNS' },
  { abbr: 'CSO',  emoji: '♟️', title: '最高戦略責任者',           dept: '事業戦略・ロードマップ' },
  { abbr: 'CPO',  emoji: '🛠️', title: '最高プロダクト責任者',     dept: 'プロダクト設計' },
  { abbr: 'CCO',  emoji: '🎨', title: '最高クリエイティブ責任者', dept: 'コンテンツ制作・品質' },
  { abbr: 'CHRO', emoji: '🫂', title: '最高人事責任者',           dept: '組織設計・AIエージェント管理' },
  { abbr: 'CLO',  emoji: '⚖️', title: '最高法務責任者',           dept: '法務・コンプライアンス' },
  { abbr: 'CIO',  emoji: '📡', title: '最高情報責任者',           dept: '情報収集・メディア' },
  { abbr: 'CISO', emoji: '🛡️', title: '最高情報セキュリティ責任者', dept: 'セキュリティ・リスク管理' },
  { abbr: 'CDO',  emoji: '📊', title: '最高データ責任者',         dept: 'データ分析・可視化' },
  { abbr: 'CBO',  emoji: '💼', title: '最高事業開発責任者',       dept: '事業開発・提携' },
  { abbr: 'CAO',  emoji: '🗂️', title: '最高管理責任者',           dept: '管理業務・調整' },
]

const tiers = [
  { layer: '意思決定者',          count: 1,  type: '人間' },
  { layer: 'CxO（経営幹部）',     count: 15, type: 'AIエージェント' },
  { layer: '部長（各部署責任者）', count: 11, type: 'AIエージェント' },
  { layer: '係長（チームリード）', count: 17, type: 'AIエージェント' },
  { layer: '一般エージェント',    count: 25, type: 'AIエージェント' },
]

const body = 'text-body leading-body tracking-body'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow'
const th = 'text-left py-3 font-medium text-ash'
const rowBorder = 'border-b border-slate-edge'

export default function OrgPage() {
  return (
    <main className="max-w-[var(--page-max-width)] mx-auto px-4 py-16">

      {/* ヘッダー */}
      <div className="mb-10">
        <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-3">AIエージェント組織図</h1>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-ash">
          TagTech は、AIエージェント69名と人間1名（意思決定者）で構成される個人事業です。
        </p>
      </div>

      {/* 組織階層サマリー */}
      <section className="mb-24">
        <h2 className={`${h2} mb-5`}>組織階層</h2>
        <div className="overflow-x-auto">
          <table className={`w-full ${body} border-collapse`}>
            <thead>
              <tr className={rowBorder}>
                <th className={`${th} pr-4`}>階層</th>
                <th className={`${th} pr-4`}>人数</th>
                <th className={th}>種別</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map(({ layer, count, type }) => (
                <tr key={layer} className={rowBorder}>
                  <td className="py-3 pr-4 font-medium text-snow">{layer}</td>
                  <td className="py-3 pr-4 text-electric-iris font-medium">{count}名</td>
                  <td className="py-3 text-ash">{type}</td>
                </tr>
              ))}
              <tr className="border-t border-slate-edge bg-charcoal-card">
                <td className="py-3 pr-4 font-semibold text-snow">合計</td>
                <td className="py-3 pr-4 text-electric-iris font-semibold">70名</td>
                <td className="py-3 text-ash text-caption leading-caption tracking-caption">うち AIエージェント 69名</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CxO 一覧 */}
      <section className="mb-24">
        <h2 className={`${h2} mb-2`}>経営幹部（CxO）15名</h2>
        <p className={`${body} text-smoke mb-5`}>
          各 CxO は担当領域の意思決定・実行・品質管理を一貫して担います。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cxos.map(({ abbr, emoji, title, dept }) => (
            <div
              key={abbr}
              className="rounded-xl border border-slate-edge bg-charcoal-card px-4 py-3 hover:border-electric-iris transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{emoji}</span>
                <span className={`${body} font-semibold text-snow`}>{abbr}</span>
              </div>
              <p className={`${body} text-ash`}>{title}</p>
              <p className="text-caption leading-caption tracking-caption text-smoke mt-1">{dept}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 部長・係長・一般エージェント */}
      <section className="mb-10">
        <h2 className={`${h2} mb-4`}>部長・係長・一般エージェント 53名</h2>
        <p className={`${body} text-ash mb-5`}>
          CxO 配下に 11 部署が設置され、各部署に部長・係長・一般エージェントが配属されています。
          部署単位で専門性を分担し、CxO の方針を現場レベルで実行します。
        </p>
        <div className="overflow-x-auto">
          <table className={`w-full ${body} border-collapse`}>
            <thead>
              <tr className={rowBorder}>
                <th className={`${th} pr-6`}>区分</th>
                <th className={`${th} pr-6`}>人数</th>
                <th className={th}>配置</th>
              </tr>
            </thead>
            <tbody>
              <tr className={rowBorder}>
                <td className="py-3 pr-6 text-ash">部長</td>
                <td className="py-3 pr-6 text-ash">11名</td>
                <td className="py-3 text-smoke">11部署に各1名</td>
              </tr>
              <tr className={rowBorder}>
                <td className="py-3 pr-6 text-ash">係長（チームリード）</td>
                <td className="py-3 pr-6 text-ash">17名</td>
                <td className="py-3 text-smoke">部署内専門領域に配置</td>
              </tr>
              <tr>
                <td className="py-3 pr-6 text-ash">一般エージェント</td>
                <td className="py-3 pr-6 text-ash">25名</td>
                <td className="py-3 text-smoke">実行・専門業務担当</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EXT_AUDIT 注記 */}
        <p className={`mt-5 ${body} text-smoke border-l-2 border-slate-edge pl-3`}>
          社外監査役は外部の独立した第三者として、忖度なしのレビューを担います。
        </p>
      </section>

    </main>
  )
}
