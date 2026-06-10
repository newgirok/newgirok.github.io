import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: 'Posts' }

export default function PostList() {
  const posts = getPostsByType('posts')
  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <p>기술 주제를 깊이 파고드는 글들</p>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
