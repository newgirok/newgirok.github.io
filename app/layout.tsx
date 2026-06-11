import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: '개인의 기록', template: '%s | 개인의 기록' },
  description: '개인의 기록',
  themeColor: '#f5f5f5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
