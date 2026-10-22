import Link from 'next/link'

import { ExternalLink } from '@/components/content/external-link'
import { experienceKindLabels } from '@/data/experience'
import type { ExperienceEntry } from '@/lib/types'

/**
 * A document-style timeline.
 *
 * Each entry states what kind of work it was: employment, internship,
 * independent work or business initiative. The different threads of the
 * history are never merged into one employment record.
 */
export function ExperienceTimeline({
  entries,
}: {
  entries: ExperienceEntry[]
}) {
  return (
    <ol className="border-t border-rule">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="border-b border-rule py-7 first:pt-8 last:border-b-0"
        >
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em] text-ink">
              {entry.organization}
              <span className="text-ink-secondary"> · {entry.role}</span>
            </h3>
            <p className="shrink-0 text-[0.8125rem] text-ink-muted">
              {entry.period}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem] text-ink-muted">
            <span className="rounded-full border border-rule px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.08em]">
              {experienceKindLabels[entry.kind]}
            </span>
            {entry.location ? <span>{entry.location}</span> : null}
            {entry.remote ? <span>Remote</span> : null}
          </div>

          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
            {entry.summary}
          </p>

          {entry.responsibilities?.length ? (
            <ul className="mt-4 max-w-2xl space-y-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
              {entry.responsibilities.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {entry.accomplishments?.length ? (
            <div className="mt-4 max-w-2xl">
              <p className="eyebrow">Selected work</p>
              <ul className="mt-2 space-y-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
                {entry.accomplishments.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {entry.links?.length ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.875rem]">
              {entry.links.map((link) =>
                link.href.startsWith('http') ? (
                  <ExternalLink
                    key={link.href}
                    href={link.href}
                    className="link-subtle hover:text-ink"
                  >
                    {link.label}
                  </ExternalLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="link-subtle hover:text-ink"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ) : null}

          {entry.statusNote ? (
            <p className="mt-4 max-w-2xl border-l-2 border-rule pl-3 text-[0.875rem] leading-relaxed text-ink-muted">
              {entry.statusNote}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
