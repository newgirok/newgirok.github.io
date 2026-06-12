import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: '링크' }

const ROW_COUNT = 10

export default function LinkList() {
  const posts = getPostsByType('links')
  const emptyCount = Math.max(0, ROW_COUNT - posts.length)
  return (
    <>
      <div className="page-header">
        <h1>링크</h1>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <div key={`empty-${i}`} className="post-card post-card--empty" />
        ))}
      </div>
    </>
  )
}
