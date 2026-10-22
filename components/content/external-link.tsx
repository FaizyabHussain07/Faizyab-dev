import type { ReactNode } from 'react'

import { ExternalArrow } from '@/components/content/arrow'

/**
 * A link that opens in a new tab, with the behaviour announced to screen
 * readers rather than relying on the visual arrow alone.
 */
export function ExternalLink({
  href,
  children,
  className = 'link',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
      <ExternalArrow />
    </a>
  )
}
