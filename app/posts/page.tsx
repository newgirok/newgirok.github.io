import type { Metadata } from 'next'
import { getPostsByType, POST_CATEGORIES, CATEGORY_ORDER } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = { title: '글' }

export default function PostList() {
  const posts = getPostsByType('posts')

  const grouped = CATEGORY_ORDER.map((slug) => ({
    slug,
    label: POST_CATEGORIES[slug],
    posts: posts.filter((p) => p.category === slug),
  })).filter((g) => g.posts.length > 0)

  const uncategorized = posts.filter((p) => !p.category)

  return (
    <>
      <div className="page-header">
        <h1>글</h1>
      </div>

      {grouped.map(({ slug, label, posts: catPosts }) => (
        <div key={slug} className="home-section">
          <div className="home-section-header">
            <h2>{label}</h2>
          </div>
          <div className="post-list">
            {catPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ))}

      {uncategorized.length > 0 && (
        <div className="home-section">
          <div className="home-section-header">
            <h2>기타</h2>
          </div>
          <div className="post-list">
            {uncategorized.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
