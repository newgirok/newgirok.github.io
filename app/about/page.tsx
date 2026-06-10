import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

export default function About() {
  return (
    <div className="about-content">
      <h1>About</h1>
      <p className="about-placeholder">준비 중입니다.</p>
    </div>
  )
}
