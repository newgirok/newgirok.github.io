import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectMetas, getProjectPosts } from '@/lib/posts'

export const dynamicParams = false

interface Props {
  params: Promise<{ project: string }>
}

export async function generateStaticParams() {
  const metas = getProjectMetas()
  return metas.length > 0 ? metas.map((m) => ({ project: m.slug })) : [{ project: '_empty' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params
  const metas = getProjectMetas()
  const meta = metas.find((m) => m.slug === project)
  return { title: meta?.title ?? '프로젝트' }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

export default async function ProjectDetailPage({ params }: Props) {
  const { project } = await params
  const metas = getProjectMetas()
  const meta = metas.find((m) => m.slug === project)
  const posts = getProjectPosts(project)

  return (
    <>
      <Link href="/projects" className="back-link">← 프로젝트 목록</Link>
      <div className="page-header">
        <h1>{meta?.title ?? project}</h1>
      </div>
      <div className="post-list">
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/projects/${project}/${post.slug}`} className="post-card post-card--numbered">
            <span className="post-type post-type-projects">{String(i + 1).padStart(2, '0')}</span>
            <span className="post-card-title-text">{post.title}</span>
            <span className="post-card-date">{formatDate(post.date)}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
