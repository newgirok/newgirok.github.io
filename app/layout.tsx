import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE_URL = 'https://newgirok.github.io'

export const metadata: Metadata = {
  title: { default: '개인의 기록', template: '%s | 개인의 기록' },
  description: '개발, 투자, 비즈니스에 대한 개인의 기록',
  themeColor: '#f5f5f5',
  openGraph: {
    siteName: '개인의 기록',
    locale: 'ko_KR',
    type: 'website',
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${BASE_URL}/og-image.png`],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/SBAggro-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SBAggro-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/SBAggro-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="page">
          <div className="container">
            <Header />
            <main className="page-content">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
