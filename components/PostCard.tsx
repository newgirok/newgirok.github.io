import Link from 'next/link'
import type { Post } from '@/lib/posts'

const BADGE_LABELS: Record<string, string> = {
  til: 'TIL',
  posts: 'Post',
  links: 'Links',
}

export default function PostCard({ post }: { post: Post }) {
  const href = `/${post.type}/${post.slug}`

  return (
    <article className="post-card">
      <div className="post-card-meta">
        <span className={`badge badge-${post.type}`}>{BADGE_LABELS[post.type]}</span>
        <span className="post-card-date">{post.date}</span>
      </div>
      <h2 className="post-card-title">
        <Link href={href}>{post.title}</Link>
      </h2>
      {post.excerpt && <p className="post-card-excerpt">{post.excerpt}</p>}
      {post.tags.length > 0 && (
        <div className="post-card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </article>
  )
}
