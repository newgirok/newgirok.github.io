import { getAllPosts, getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default function Home() {
  const recent = getAllPosts().slice(0, 5)
  const posts = getPostsByType('posts').slice(0, 3)
  const projects = getPostsByType('projects').slice(0, 3)
  const links = getPostsByType('links').slice(0, 3)

  return (
    <>
      <section className="home-section">
        <div className="home-section-header">
          <h2>최근 글</h2>
        </div>
        <div className="post-list">
          {recent.map((post) => (
            <PostCard key={`${post.type}-${post.slug}`} post={post} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>프로젝트</h2>
          <Link href="/projects">전체 보기 →</Link>
        </div>
        <div className="post-list">
          {projects.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>글</h2>
          <Link href="/posts">전체 보기 →</Link>
        </div>
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2>링크</h2>
          <Link href="/links">전체 보기 →</Link>
        </div>
        <div className="post-list">
          {links.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
