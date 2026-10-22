import Link from 'next/link'

import { ExternalLink } from '@/components/content/external-link'
import { StatusBadge } from '@/components/content/status-badge'
import { projectCategoryLabels } from '@/data/projects'
import type { Project } from '@/lib/types'
import { projectImage } from '@/lib/project-images'

function formatPeriod(project: Project): string | null {
  if (project.started && project.updated) {
    return `${project.started.slice(0, 4)}–${project.updated.slice(0, 4)}`
  }
  if (project.started) return `${project.started.slice(0, 4)}`
  if (project.updated) return `${project.updated.slice(0, 4)}`
  return null
}

/**
 * A single project, written as a row rather than a card. The whole thing is
 * text: a name, one sentence of description, a status, and links.
 */
export function ProjectRow({
  project,
  showCategory = false,
}: {
  project: Project
  showCategory?: boolean
}) {
  const period = formatPeriod(project)
  const logo = projectImage(project.slug)

  return (
    <article className="border-b border-rule py-6 last:border-b-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="flex min-w-0 gap-3">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={`${project.name} logo`}
              width={40}
              height={40}
              loading="lazy"
              className="mt-0.5 h-10 w-10 shrink-0 rounded-md border border-rule bg-surface object-cover"
            />
          ) : null}
          <div className="min-w-0">
            <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em]">
            <Link
              href={`/projects/${project.slug}`}
              className="text-ink underline decoration-rule decoration-1 underline-offset-[0.2em] transition-colors hover:text-link hover:decoration-link"
            >
              {project.name}
            </Link>
          </h3>
            <p className="mt-1.5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-secondary">
              {project.summary}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 sm:flex-col sm:items-end sm:gap-y-1">
          <StatusBadge status={project.status} />
          <span className="text-[0.8125rem] text-ink-muted">
            {showCategory ? projectCategoryLabels[project.category] : null}
            {showCategory && period ? ' · ' : null}
            {period}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.875rem]">
        <Link
          href={`/projects/${project.slug}`}
          className="link-subtle hover:text-ink"
        >
          Case study
        </Link>
        {project.liveUrl ? (
          <ExternalLink href={project.liveUrl} className="link-subtle hover:text-ink">
            Live site
          </ExternalLink>
        ) : null}
        {project.repoUrl ? (
          <ExternalLink href={project.repoUrl} className="link-subtle hover:text-ink">
            Source
          </ExternalLink>
        ) : null}
        {project.unavailableNote ? (
          <span className="text-ink-muted">{project.unavailableNote}</span>
        ) : null}
      </div>
    </article>
  )
}
