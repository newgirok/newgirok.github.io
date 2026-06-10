import Link from 'next/link'
import type { Post } from '@/lib/posts'

const TYPE_LABEL: Record<string, string> = {
  til: 'TIL',
  posts: 'post',
  links: 'links',
}

export default function PostCard({ post }: { post: Post }) {
  const href = `/${post.type}/${post.slug}`

  return (
    <div className="post-card">
      <div className="post-card-row">
        <span className="post-type">[{TYPE_LABEL[post.type]}]</span>
        <span className="post-card-title">
          <Link href={href}>{post.title}</Link>
        </span>
        <span className="post-card-date">{post.date}</span>
      </div>
      {post.tags.length > 0 && (
        <div className="post-card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}
