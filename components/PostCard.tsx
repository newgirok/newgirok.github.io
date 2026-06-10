import Link from 'next/link'
import type { Post } from '@/lib/posts'

const TYPE_LABEL: Record<string, string> = {
  til: 'til',
  posts: 'post',
  links: 'links',
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function PostCard({ post }: { post: Post }) {
  const href = `/${post.type}/${post.slug}`

  return (
    <div className="post-card">
      <span className="post-card-date">{formatDate(post.date)}</span>
      <span className="post-type">{TYPE_LABEL[post.type]}</span>
      <span className="post-card-title">
        <Link href={href}>{post.title}</Link>
      </span>
    </div>
  )
}
