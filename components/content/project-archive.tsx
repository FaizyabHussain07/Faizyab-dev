'use client'

import { useMemo, useState } from 'react'

import { ProjectRow } from '@/components/content/project-row'
import {
  projectCategoryLabels,
  projectCategoryOrder,
} from '@/data/projects'
import type { Project, ProjectCategory } from '@/lib/types'

/**
 * The project archive with category filters.
 *
 * The complete list is rendered on the server and is fully readable without
 * JavaScript; the filter buttons simply hide the categories that are not
 * selected.
 */
export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const categories = useMemo(() => {
    const present = new Set(projects.map((project) => project.category))
    return projectCategoryOrder.filter((category) => present.has(category))
  }, [projects])

  const visible = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter((project) => project.category === active),
    [projects, active]
  )

  const counts = useMemo(() => {
    const map = new Map<ProjectCategory | 'all', number>()
    map.set('all', projects.length)
    for (const category of categories) {
      map.set(
        category,
        projects.filter((project) => project.category === category).length
      )
    }
    return map
  }, [projects, categories])

  return (
    <div>
      {categories.length > 1 ? (
        <div
          className="mb-8 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          <FilterButton
            label="All"
            count={counts.get('all') ?? 0}
            active={active === 'all'}
            onClick={() => setActive('all')}
          />
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={projectCategoryLabels[category]}
              count={counts.get(category) ?? 0}
              active={active === category}
              onClick={() => setActive(category)}
            />
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {active === 'all'
          ? `Showing all ${projects.length} projects`
          : `Showing ${visible.length} ${
              projectCategoryLabels[active as ProjectCategory]
            } projects`}
      </p>

      <div>
        {visible.map((project) => (
          <ProjectRow key={project.slug} project={project} showCategory />
        ))}
      </div>
    </div>
  )
}

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
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
      <span className={active ? 'text-paper/70' : 'text-ink-muted'}>
        {` ${count}`}
      </span>
    </button>
  )
}
