import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { getPostsByType, getPostBySlug } from '@/lib/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostsByType('posts').map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('posts', slug)
  return { title: post?.title ?? 'Post' }
}

export default async function PostDetail({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('posts', slug)
  if (!post) notFound()

  return (
    <>
      <Link href="/posts" className="back-link">← Posts 목록</Link>
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span className="badge badge-posts">Post</span>
            <span>{post.date}</span>
            {post.tags.length > 0 && (
              <div className="article-meta-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="prose">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
          />
        </div>
      </article>
    </>
  )
}
