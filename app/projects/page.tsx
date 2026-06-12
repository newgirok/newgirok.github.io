import type { Metadata } from 'next'
import Link from 'next/link'
import { getProjectMetas } from '@/lib/posts'

export const metadata: Metadata = { title: '프로젝트' }

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })
}

const ROW_COUNT = 10

export default function ProjectsPage() {
  const projects = getProjectMetas()
  const emptyCount = Math.max(0, ROW_COUNT - projects.length)
  return (
    <>
      <div className="page-header">
        <h1>프로젝트</h1>
      </div>
      <div className="project-list">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card">
            <span className="project-card-title">{p.title}</span>
            <span className="project-card-meta">
              {p.postCount}개의 기록 · {formatDate(p.latestDate)}
            </span>
          </Link>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <div key={`empty-${i}`} className="project-card project-card--empty" />
        ))}
      </div>
    </>
  )
}
