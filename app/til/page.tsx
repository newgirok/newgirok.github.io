import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'TIL' }

export default function TilList() {
  const posts = getPostsByType('til')
  return (
    <>
      <div className="page-header">
        <h1>TIL</h1>
        <p>Today I Learned — 짧게 배운 것들</p>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
