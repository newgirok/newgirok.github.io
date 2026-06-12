import { getAllRecent, getRecentLabel, getPostsByType, getProjectMetas } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

function padTo<T>(arr: T[], n: number): (T | null)[] {
  return [...arr, ...Array(Math.max(0, n - arr.length)).fill(null)]
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

export default function Home() {
  const recent = getAllRecent().slice(0, 10)
  const projects = getProjectMetas().slice(0, 10)
  const posts = getPostsByType('posts').slice(0, 10)
  const links = getPostsByType('links').slice(0, 10)

  return (
    <>
      <section className="home-section">
        <div className="home-section-header">
          <h2>최근 글</h2>
        </div>
        <div className="post-list">
          {padTo(recent, 10).map((item, i) =>
            item ? (
              <div key={`${item.category}-${item.slug}`} className="post-card post-card--labeled">
                <span className={`post-type post-type-${item.category}`}>{getRecentLabel(item.category)}</span>
                <span className="post-card-title">
                  <Link href={item.href} {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {item.title}
                  </Link>
                </span>
                <span className="post-card-date">{formatDate(item.date)}</span>
              </div>
            ) : (
              <div key={`recent-empty-${i}`} className="post-card post-card--labeled" />
            )
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>프로젝트</h2>
          <Link href="/projects">전체 보기 →</Link>
        </div>
        <div className="project-list">
          {padTo(projects, 10).map((p, i) =>
            p ? (
              <ProjectCard key={p.slug} project={p} />
            ) : (
              <div key={`project-empty-${i}`} className="project-card" />
            )
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>글</h2>
          <Link href="/posts">전체 보기 →</Link>
        </div>
        <div className="post-list">
          {padTo(posts, 10).map((post, i) =>
            post ? (
              <PostCard key={post.slug} post={post} />
            ) : (
              <div key={`post-empty-${i}`} className="post-card" />
            )
          )}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>링크</h2>
          <Link href="/links">전체 보기 →</Link>
        </div>
        <div className="post-list">
          {padTo(links, 10).map((post, i) =>
            post ? (
              <PostCard key={post.slug} post={post} />
            ) : (
              <div key={`link-empty-${i}`} className="post-card" />
            )
          )}
        </div>
      </section>
    </>
  )
}
