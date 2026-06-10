import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostType = 'posts' | 'links' | 'projects'

export interface Post {
  slug: string
  type: PostType
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

const contentDir = path.join(process.cwd(), 'content')

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
    ...getPostsByType('projects'),
  ].sort((a, b) => (a.date > b.date ? -1 : 1))
}
