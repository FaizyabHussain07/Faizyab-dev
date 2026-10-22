import type { ProjectStatus } from '@/lib/types'
import { projectStatusLabels } from '@/data/projects'

const statusStyles: Record<ProjectStatus, string> = {
  concept: 'border-rule text-ink-muted',
  'in-development': 'border-rule text-ink-secondary',
  prototype: 'border-rule text-ink-secondary',
  completed: 'border-rule text-ink-secondary',
  maintained: 'border-rule text-ink-secondary',
  archived: 'border-rule text-ink-muted',
}

/**
 * A quiet, text-only status marker. No colour is used to carry meaning, so
 * the label still reads correctly in monochrome.
 */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em] ${statusStyles[status]}`}
    >
      {projectStatusLabels[status]}
    </span>
  )
}
