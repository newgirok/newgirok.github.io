import Link from 'next/link'
import type { ProjectMeta } from '@/lib/posts'

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <span className="project-card-title">{project.title}</span>
      <span className="project-card-meta">
        {project.postCount}개의 기록 · {formatDate(project.latestDate)}
      </span>
    </Link>
  )
}
