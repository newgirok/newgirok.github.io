import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { getPostsByType, getPostBySlug } from '@/lib/posts'

export const dynamicParams = false

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getPostsByType('links')
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: '_empty' }]
}

const BASE_URL = 'https://newgirok.github.io'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('links', slug)
  if (!post) return { title: 'Links' }
  return {
    title: post.title,
    openGraph: {
      title: post.title,
      url: `${BASE_URL}/links/${slug}`,
      type: 'article',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function LinkPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('links', slug)
  if (!post) notFound()

  return (
    <>
      <Link href="/links" className="back-link">← 링크 목록</Link>
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span>{formatDate(post.date)}</span>
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
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
          />
        </div>
      </article>
    </>
  )
}
