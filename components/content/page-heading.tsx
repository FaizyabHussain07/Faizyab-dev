import type { ReactNode } from 'react'

/**
 * The heading block that opens every page.
 */
export function PageHeading({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  meta?: ReactNode
}) {
  return (
    <div className="border-b border-rule pb-8">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
        {title}
      </h1>
      {description ? (
        <div className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
          {description}
        </div>
      ) : null}
      {meta ? <div className="mt-5">{meta}</div> : null}
    </div>
  )
}
