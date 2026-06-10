import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'Links' }

export default function LinkList() {
  const posts = getPostsByType('links')
  return (
    <>
      <div className="page-header">
        <h1>Links</h1>
        <p>읽을 만한 기술 링크 큐레이션</p>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
