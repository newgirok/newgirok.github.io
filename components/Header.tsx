import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">newgirok</Link>
        <nav>
          <ul className="header-nav">
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/posts">Posts</Link></li>
            <li><Link href="/links">Links</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
