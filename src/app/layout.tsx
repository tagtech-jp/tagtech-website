import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  variable: '--font-inter-var',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tagtech.jp'),
  title: {
    default: 'TagTech',
    template: '%s | TagTech',
  },
  description:
    'TagTech は、配信者向け AI サポートツール TagDeck を中心に、配信・動画運用を支えるプロダクトを開発する個人プロジェクトです。',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TagTech',
    description:
      '配信者向け AI サポートツール TagDeck を中心に、配信・動画運用を支えるプロダクトを開発しています。',
    url: 'https://tagtech.jp',
    siteName: 'TagTech',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TagTech',
    description:
      '配信者向け AI サポートツール TagDeck を中心に、配信・動画運用を支えるプロダクトを開発しています。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
