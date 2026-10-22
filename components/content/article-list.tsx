'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { formatReadingTime } from '@/lib/reading-time'
import { formatDate } from '@/lib/format'
import type { Article } from '@/lib/content'

/**
 * The writing index.
 *
 * Articles are listed newest first. A category filter only appears once there
 * is more than one category to filter between.
 */
export function ArticleList({ articles }: { articles: Article[] }) {
  const categories = useMemo(
    () => [...new Set(articles.map((article) => article.category))].sort(),
    [articles]
  )
  const [active, setActive] = useState<string>('all')

  const visible = useMemo(
    () =>
      active === 'all'
        ? articles
        : articles.filter((article) => article.category === active),
    [articles, active]
  )

  if (articles.length === 0) {
    return <WritingEmptyState />
  }

  return (
    <div>
      {categories.length > 1 ? (
        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter articles by category"
        >
          <CategoryButton
            label="All"
            active={active === 'all'}
            onClick={() => setActive('all')}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              active={active === category}
              onClick={() => setActive(category)}
            />
          ))}
        </div>
      ) : null}

      <ol className="border-t border-rule">
        {visible.map((article) => (
          <li key={article.slug} className="border-b border-rule py-6">
            <article>
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em]">
                  <Link
                    href={`/writing/${article.slug}`}
                    className="text-ink underline decoration-rule decoration-1 underline-offset-[0.2em] transition-colors hover:text-link hover:decoration-link"
                  >
                    {article.title}
                  </Link>
                </h3>
                <time
                  dateTime={article.date}
                  className="shrink-0 text-[0.8125rem] text-ink-muted"
                >
                  {formatDate(article.date)}
                </time>
              </div>

              <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-secondary">
                {article.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-muted">
                <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em]">
                  {article.category}
                </span>
                <span>{formatReadingTime(article.minutes)}</span>
                {article.tags.length > 0 ? (
                  <span className="text-ink-muted">
                    {article.tags.join(' · ')}
                  </span>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  )
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-[0.8125rem] transition-colors ${
        active
          ? 'border-link bg-link text-paper'
          : 'border-rule text-ink-secondary hover:border-ink-muted hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

/**
 * Shown when there is nothing published yet. It says so plainly rather than
 * pretending there is a backlog.
 */
export function WritingEmptyState() {
  return (
    <div className="border-t border-rule py-10">
      <p className="text-[1.0625rem] text-ink">
        Nothing published here yet.
      </p>
      <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-secondary">
        This section is where my technical notes, build logs and longer writing
        live. New posts go up as I finish something worth documenting. In the
        meantime, the{' '}
        <Link href="/projects" className="link">
          project archive
        </Link>{' '}
        is the most complete picture of what I have been building.
      </p>
    </div>
  )
}
