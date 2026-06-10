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
  return getPostsByType('til').map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('til', slug)
  return { title: post?.title ?? 'TIL' }
}

export default async function TilPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('til', slug)
  if (!post) notFound()

  return (
    <>
      <Link href="/til" className="back-link">← TIL 목록</Link>
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span className="badge badge-til">TIL</span>
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
