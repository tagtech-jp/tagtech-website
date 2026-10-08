import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'TagTech のプライバシーポリシー — お問い合わせフォームと TagTech Growth Collector で取得する情報・利用目的・委託先・保管と削除について',
  alternates: { canonical: '/privacy/' },
}

const body = 'text-body leading-body tracking-body text-ash'
const h2 = 'text-heading-sm leading-heading-sm font-semibold text-snow'
const h3 = 'text-body-lg leading-body-lg tracking-body-lg font-semibold text-snow'
const link = 'text-electric-iris underline-offset-4 hover:underline'

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-3">
        プライバシーポリシー
      </h1>
      <p className="text-body leading-body tracking-body text-smoke mb-10">最終更新日：2026年10月8日</p>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>事業者</h2>
        <p className={body}>TagTech（個人事業）</p>
        <p className={body}>
          お問い合わせ：{' '}
          <Link href="/contact" className={link}>
            https://tagtech.jp/contact
          </Link>
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-4`}>取得する情報</h2>

        <h3 className={`${h3} mb-2`}>お問い合わせフォーム</h3>
        <p className={`${body} mb-3`}>当サイトのお問い合わせフォームでは、ご回答のために次の情報を取得します。</p>
        <ul className={`${body} list-disc pl-6 space-y-1 mb-3`}>
          <li>お名前</li>
          <li>メールアドレス</li>
          <li>件名・メッセージ本文</li>
        </ul>
        <p className={`${body} mb-6`}>
          また、不正な自動送信を防ぐために Cloudflare, Inc. の「Turnstile」を利用しています。Turnstile
          の動作にともない、IP アドレスやブラウザの情報が Cloudflare によって処理されます（
          <ExternalLink href="https://www.cloudflare.com/privacypolicy/">Cloudflare のプライバシーポリシー</ExternalLink>
          ）。
        </p>

        <h3 className={`${h3} mb-2`}>TagTech Growth Collector</h3>
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
        <ul className={`${body} list-disc pl-6 space-y-1`}>
          <li>お問い合わせフォームで取得した情報は、お問い合わせへの回答と、そのために必要な連絡にのみ使用します。</li>
          <li>
            Growth Collector で取得した情報は、当方がチャンネルの成長状況を把握し、コンテンツ制作の意思決定を行う目的にのみ使用します。
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>第三者提供・委託</h2>
        <p className={`${body} mb-3`}>
          取得した情報を第三者に提供・販売することはありません。広告配信その他の目的に利用することもありません。
        </p>
        <p className={body}>
          お問い合わせ内容の受信には、メール配信サービス「Resend」（Resend, Inc.）と、当方の通知用の非公開チャンネル（Discord Inc.
          が提供する「Discord」）を利用しており、これらの事業者に取扱いを委託しています。委託先では、各社のプライバシーポリシーにもとづいて情報が処理されます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>保管と削除</h2>
        <p className={`${body} mb-3`}>
          お問い合わせの内容は、回答と対応の記録のために保管し、対応の完了後、記録として必要な期間が過ぎたのちに削除します。
          ご本人からの開示・訂正・削除のご請求は、お問い合わせフォームから承ります。
        </p>
        <p className={body}>
          Growth Collector が取得した情報は、当方が管理する Cloudflare D1 データベースに保管します。アクセス権の取り消しは、Google
          アカウントのアプリ接続設定（
          <ExternalLink href="https://myaccount.google.com/permissions">https://myaccount.google.com/permissions</ExternalLink>
          ）からいつでも行えます。取り消し後、当方は速やかに保管データを削除します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>アクセス情報と Cookie</h2>
        <p className={`${body} mb-3`}>
          当サイトは、アクセス状況の把握のために Cloudflare Web Analytics を利用しています。Cookie
          を使わず、個人を特定する情報は収集しません（
          <ExternalLink href="https://www.cloudflare.com/privacypolicy/">Cloudflare のプライバシーポリシー</ExternalLink>
          ）。Google アナリティクス等の第三者の解析ツールや広告用の Cookie は使用していません。
        </p>
        <p className={body}>
          サイトの配信とセキュリティ保護（ボット対策）のため、Cloudflare のネットワーク上で IP
          アドレス等の通信情報が処理され、Cloudflare がセキュリティ目的の Cookie を設定することがあります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className={`${h2} mb-3`}>Google API サービスのユーザーデータに関するポリシー</h2>
        <p className={body}>
          当ツールによる Google API から取得した情報の利用および他アプリへの移転は、制限付き使用要件を含む「
          <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API サービスのユーザーデータに関するポリシー
          </ExternalLink>
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
