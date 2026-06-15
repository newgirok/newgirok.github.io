'use client'

import { useState } from 'react'
import PostCard from './PostCard'
import type { Post } from '@/lib/posts'

interface CategoryGroup {
  slug: string
  label: string
  posts: Post[]
}

interface Props {
  groups: CategoryGroup[]
  uncategorized: Post[]
  rowCount: number
}

export default function PostListClient({ groups, uncategorized, rowCount }: Props) {
  const [active, setActive] = useState('all')

  const filledGroups = groups.filter((g) => g.posts.length > 0)
  const visibleGroups = active === 'all' ? filledGroups : groups.filter((g) => g.slug === active)
  const showUncategorized = active === 'all' && uncategorized.length > 0

  return (
    <>
      <div className="category-filter">
        <button
          className={`category-filter-btn${active === 'all' ? ' category-filter-btn--active' : ''}`}
          onClick={() => setActive('all')}
        >
          전체
        </button>
        {groups.map((g) => {
          const empty = g.posts.length === 0
          return (
            <button
              key={g.slug}
              className={[
                'category-filter-btn',
                active === g.slug ? 'category-filter-btn--active' : '',
                empty ? 'category-filter-btn--disabled' : '',
              ].join(' ').trim()}
              onClick={() => !empty && setActive(g.slug)}
              disabled={empty}
            >
              {g.label}
            </button>
          )
        })}
      </div>

      {visibleGroups.map(({ slug, label, posts }) => {
        const emptyCount = active === 'all' ? Math.max(0, rowCount - posts.length) : 0
        return (
          <div key={slug} className="home-section">
            <div className="home-section-header">
              <h2>{label}</h2>
            </div>
            <div className="post-list">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
              {Array.from({ length: emptyCount }).map((_, i) => (
                <div key={`empty-${i}`} className="post-card post-card--empty" />
              ))}
            </div>
          </div>
        )
      })}

      {showUncategorized && (
        <div className="home-section">
          <div className="home-section-header">
            <h2>기타</h2>
          </div>
          <div className="post-list">
            {uncategorized.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
