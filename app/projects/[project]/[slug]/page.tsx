import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { getProjectMetas, getProjectPosts, getProjectPost } from '@/lib/posts'

export const dynamicParams = false

interface Props {
  params: Promise<{ project: string; slug: string }>
}

export async function generateStaticParams() {
  const metas = getProjectMetas()
  if (metas.length === 0) return [{ project: '_empty', slug: '_empty' }]
  const params = metas.flatMap((m) =>
    getProjectPosts(m.slug).map((p) => ({ project: m.slug, slug: p.slug }))
  )
  return params.length > 0 ? params : [{ project: '_empty', slug: '_empty' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, slug } = await params
  const post = getProjectPost(project, slug)
  return { title: post?.title ?? '프로젝트' }
}

export default async function ProjectPostPage({ params }: Props) {
  const { project, slug } = await params
  const post = getProjectPost(project, slug)
  if (!post) notFound()

  return (
    <>
      <Link href={`/projects/${project}`} className="back-link">← {post.project}</Link>
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
            options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
          />
        </div>
      </article>
    </>
  )
}
