import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { getPostsByType, getPostBySlug } from '@/lib/posts'

export const dynamicParams = false

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getPostsByType('projects')
  return posts.length > 0 ? posts.map((post) => ({ slug: post.slug })) : [{ slug: '_empty' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug('projects', slug)
  return { title: post?.title ?? 'Projects' }
}

export default async function ProjectPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug('projects', slug)
  if (!post) notFound()

  return (
    <>
      <Link href="/projects" className="back-link">← Projects 목록</Link>
      <article>
        <header className="article-header">
          <h1>{post.title}</h1>
          <div className="article-meta">
            <span className="badge badge-projects">프로젝트</span>
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
