import Link from 'next/link'
import type { Post } from '@/lib/posts'

const LABELS: Record<string, string> = { posts: '글', links: '링크' }

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

export default function PostCard({ post, showType = false }: { post: Post; showType?: boolean }) {
  const href = `/${post.type}/${post.slug}`
  return (
    <div className={`post-card ${showType ? 'post-card--typed' : 'post-card--plain'}`}>
      {showType && (
        <span className={`post-type post-type-${post.type}`}>{LABELS[post.type] ?? post.type}</span>
      )}
      <span className="post-card-title">
        <Link href={href}>{post.title}</Link>
      </span>
      <span className="post-card-date">{formatDate(post.date)}</span>
    </div>
  )
}
