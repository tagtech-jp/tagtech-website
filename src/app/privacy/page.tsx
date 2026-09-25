import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'TagTech のプライバシーポリシー — 取得する情報・利用目的・保管と削除について',
}

const body = 'text-body leading-body tracking-body text-ash'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow'
const link = 'text-electric-iris underline-offset-4 hover:underline'

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-3">
        プライバシーポリシー
      </h1>
      <p className="text-body leading-body tracking-body text-smoke mb-10">最終更新日：2026年9月14日</p>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>事業者</h2>
        <p className={body}>TagTech</p>
        <p className={body}>
          お問い合わせ：{' '}
          <Link href="/contact" className={link}>
            https://tagtech.jp/contact
          </Link>
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>取得する情報</h2>
        <p className={`${body} mb-3`}>
          当方が提供するツール「TagTech Growth Collector」は、Google アカウントの認可にもとづき、
          当方が運営する YouTube チャンネルの統計情報として以下を取得します。
        </p>
        <ul className={`${body} list-disc pl-6 space-y-1 mb-3`}>
          <li>チャンネル登録者数</li>
          <li>総再生時間（直近365日）</li>
          <li>ショート動画の再生回数（直近90日）</li>
        </ul>
        <p className={body}>視聴者個人を特定する情報、および収益に関する情報は取得しません。</p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>利用目的</h2>
        <p className={body}>
          取得した情報は、当方がチャンネルの成長状況を把握し、コンテンツ制作の意思決定を行う目的にのみ使用します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>第三者提供</h2>
        <p className={body}>
          取得した情報を第三者に提供・販売することはありません。広告配信その他の目的に利用することもありません。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>保管と削除</h2>
        <p className={body}>
          取得した情報は当方が管理する Cloudflare D1 データベースに保管します。アクセス権の取り消しは、Google
          アカウントのアプリ接続設定（
          <a
            href="https://myaccount.google.com/permissions"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://myaccount.google.com/permissions
          </a>
          ）からいつでも行えます。取り消し後、当方は速やかに保管データを削除します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>Google API サービスのユーザーデータに関するポリシー</h2>
        <p className={body}>
          当ツールによる Google API
          から取得した情報の利用および他アプリへの移転は、制限付き使用要件を含む「
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API サービスのユーザーデータに関するポリシー
          </a>
          」に準拠します。
        </p>
      </section>

      <section>
        <h2 className={`${h2} mb-3`}>お問い合わせ</h2>
        <p className={body}>
          <Link href="/contact" className={link}>
            https://tagtech.jp/contact
          </Link>
        </p>
      </section>
    </main>
  )
}
