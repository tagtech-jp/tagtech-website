import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'TagTech へのお問い合わせ',
}

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-display-sm leading-display-sm tracking-display-sm font-semibold text-snow mb-3">お問い合わせ</h1>
      <p className="text-body leading-body tracking-body text-ash mb-2">
        TagDeck に関するご質問・パートナーシップのご相談など、お気軽にお問い合わせください。
      </p>
      <p className="text-body leading-body tracking-body text-smoke mb-8">
        メールでのご連絡:{' '}
        <a href="mailto:info@tagtech.jp" className="text-electric-iris underline-offset-4 hover:underline">
          info@tagtech.jp
        </a>
      </p>

      <ContactForm />
    </main>
  )
}
