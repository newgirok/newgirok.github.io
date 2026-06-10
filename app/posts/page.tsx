import type { Metadata } from 'next'
import { getPostsByType } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: '글' }

export default function PostList() {
  const posts = getPostsByType('posts')
  return (
    <>
      <div className="page-header">
        <h1>글</h1>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}
