import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">개인의 기록</Link>
        <nav>
          <ul className="header-nav">
            <li><Link href="/projects">프로젝트</Link></li>
            <li><Link href="/posts">글</Link></li>
            <li><Link href="/links">링크</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
