import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { POST_CATEGORIES } from '@/lib/categories'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

export default function PostCard({ post }: { post: Post }) {
  const href = post.url ?? `/${post.type}/${post.slug}`
  const isExternal = !!post.url
  const hasCategory = post.type === 'posts' && post.category

  return (
    <div className={hasCategory ? 'post-card post-card--labeled' : 'post-card'}>
      {hasCategory && (
        <span className="post-type post-type-posts">{POST_CATEGORIES[post.category!] ?? post.category}</span>
      )}
      <span className="post-card-title">
        <Link href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {post.title}
        </Link>
      </span>
      <span className="post-card-date">{formatDate(post.date)}</span>
    </div>
  )
}
