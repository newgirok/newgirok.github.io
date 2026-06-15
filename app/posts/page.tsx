import type { Metadata } from 'next'
import { getPostsByType, POST_CATEGORIES, CATEGORY_ORDER } from '@/lib/posts'
import PostListClient from '@/components/PostListClient'

export const metadata: Metadata = { title: '글' }

const ROW_COUNT = 10

export default function PostList() {
  const posts = getPostsByType('posts')

  const groups = CATEGORY_ORDER.map((slug) => ({
    slug,
    label: POST_CATEGORIES[slug],
    posts: posts.filter((p) => p.category === slug),
  }))

  const uncategorized = posts.filter((p) => !p.category)

  return (
    <>
      <div className="page-header">
        <h1>글</h1>
      </div>
      <PostListClient groups={groups} uncategorized={uncategorized} rowCount={ROW_COUNT} />
    </>
  )
}
