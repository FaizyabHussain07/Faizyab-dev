import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * A major section of a page: an optional heading with a trailing link, and
 * consistent vertical rhythm. Major sections are separated with a hairline.
 */
export function Section({
  title,
  id,
  action,
  children,
  className = '',
}: {
  title?: string
  id?: string
  action?: { label: string; href: string }
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`border-t border-rule pt-10 ${className}`}>
      {title ? (
        <div className="mb-6 flex items-baseline justify-between gap-4">
          {/* Section headings are a small uppercase sans label, deliberately
              distinct from item names (which render inside sections). */}
          <h2 className="eyebrow text-[0.75rem] leading-relaxed">{title}</h2>
          {action ? (
            <Link
              href={action.href}
              className="link-subtle shrink-0 text-[0.9375rem] hover:text-ink"
            >
              {action.label}
            </Link>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
