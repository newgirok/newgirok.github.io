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
  const posts = getPostsByType('posts')
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: '_empty' }]
}

const BASE_URL = 'https://newgirok.github.io'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('posts', slug)
  if (!post) return { title: 'Post' }
  const description = post.excerpt || post.content.replace(/[#*`>\-]/g, '').trim().slice(0, 120)
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${BASE_URL}/posts/${slug}`,
      type: 'article',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  }
}

export default async function PostDetail({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('posts', slug)
  if (!post) notFound()

  return (
    <>
      <Link href="/posts" className="back-link">← 글 목록</Link>
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
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
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
          />
        </div>
      </article>
    </>
  )
}
