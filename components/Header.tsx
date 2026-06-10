import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <Link href="/" className="header-logo">newgirok</Link>
        <ul className="header-nav-primary">
          <li><Link href="/posts">POSTS</Link></li>
          <li><Link href="/links">LINKS</Link></li>
          <li><Link href="/about">ABOUT</Link></li>
        </ul>
      </div>
      <nav className="header-nav-secondary-wrap">
        <ul className="header-nav-secondary">
          <li><Link href="/til">TIL</Link></li>
          <li><span className="header-nav-sep">★</span></li>
          <li><Link href="/posts">POSTS</Link></li>
          <li><span className="header-nav-sep">★</span></li>
          <li><Link href="/links">LINKS</Link></li>
        </ul>
      </nav>
      <hr className="header-divider" />
    </header>
  )
}
