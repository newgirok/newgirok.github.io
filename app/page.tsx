import { getAllPosts, getPostsByType, getProjectMetas } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'

function padToFive<T>(arr: T[]): (T | null)[] {
  return [...arr, ...Array(Math.max(0, 5 - arr.length)).fill(null)]
}

export default function Home() {
  const recent = getAllPosts().slice(0, 5)
  const projects = getProjectMetas().slice(0, 5)
  const posts = getPostsByType('posts').slice(0, 5)
  const links = getPostsByType('links').slice(0, 5)

  return (
    <>
      <section className="home-section">
        <div className="home-section-header">
          <h2>최근 글</h2>
        </div>
        <div className="post-list">
          {padToFive(recent).map((post, i) =>
            post ? (
              <PostCard key={`${post.type}-${post.slug}`} post={post} />
            ) : (
              <div key={`recent-empty-${i}`} className="post-card" />
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
          {padToFive(projects).map((p, i) =>
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
          {padToFive(posts).map((post, i) =>
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
          {padToFive(links).map((post, i) =>
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
