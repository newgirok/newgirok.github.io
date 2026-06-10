import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectList() {
  const posts = getPostsByType('projects')
  return (
    <>
      <div className="page-header">
        <h1>Projects</h1>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
