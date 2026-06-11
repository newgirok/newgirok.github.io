import Link from 'next/link'
import type { Post } from '@/lib/posts'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

export default function PostCard({ post }: { post: Post }) {
  const href = post.url ?? `/${post.type}/${post.slug}`
  const isExternal = !!post.url
  return (
    <div className="post-card">
      <span className="post-card-title">
        <Link href={href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {post.title}
        </Link>
      </span>
      <span className="post-card-date">{formatDate(post.date)}</span>
    </div>
  )
}
