import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: { default: 'newgirok', template: '%s | newgirok' },
  description: '5년차 풀스택 개발자의 TIL, 기술 글, 링크 큐레이션',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="page">
          <Header />
          <main className="page-content">
            <div className="container">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
