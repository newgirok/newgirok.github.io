import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostType = 'posts' | 'links'

export interface Post {
  slug: string
  type: PostType
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export interface ProjectPost {
  slug: string
  projectSlug: string
  project: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export interface ProjectMeta {
  slug: string
  title: string
  postCount: number
  latestDate: string
}

const contentDir = path.join(process.cwd(), 'content')

function formatSlug(slug: string): string {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function getPostsByType(type: PostType): Post[] {
  const dir = path.join(contentDir, type)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        type,
        title: data.title ?? slug,
        date: data.date ?? '',
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? '',
        content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(type: PostType, slug: string): Post | null {
  const filePath = path.join(contentDir, type, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    type,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
    content,
  }
}

export function getAllPosts(): Post[] {
  return [
    ...getPostsByType('posts'),
    ...getPostsByType('links'),
  ].sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectMetas(): ProjectMeta[] {
  const projectsDir = path.join(contentDir, 'projects')
  if (!fs.existsSync(projectsDir)) return []

  return fs
    .readdirSync(projectsDir)
    .filter((f) => fs.statSync(path.join(projectsDir, f)).isDirectory())
    .map((slug) => {
      const posts = getProjectPosts(slug)
      const title = posts[0]?.project || formatSlug(slug)
      const latestDate = posts[0]?.date || ''
      return { slug, title, postCount: posts.length, latestDate }
    })
    .sort((a, b) => (a.latestDate > b.latestDate ? -1 : 1))
}

export function getProjectPosts(projectSlug: string): ProjectPost[] {
  const dir = path.join(contentDir, 'projects', projectSlug)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        projectSlug,
        project: data.project ?? formatSlug(projectSlug),
        title: data.title ?? slug,
        date: data.date ?? '',
        tags: data.tags ?? [],
        excerpt: data.excerpt ?? '',
        content,
      }
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectPost(projectSlug: string, slug: string): ProjectPost | null {
  const filePath = path.join(contentDir, 'projects', projectSlug, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    projectSlug,
    project: data.project ?? formatSlug(projectSlug),
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
    content,
  }
}
