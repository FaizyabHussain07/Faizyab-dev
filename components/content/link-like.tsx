import type { ReactNode } from 'react'

import { ExternalArrow } from '@/components/content/arrow'

interface LinkLikeProps {
  href: string
  children: ReactNode
  className?: string
}

/**
 * A link-like element that opens in a new tab. It uses a visible ↗ marker
 * plus a screen-reader-only note, so the behaviour is announced without an
 * alt-text burden on the icon.
 */
export function LinkLike({
  href,
  children,
  className = 'link',
}: LinkLikeProps) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      className={className}
    >
      {children}
      {external ? (
        <>
          <span className="sr-only"> (opens in a new tab)</span>
          <ExternalArrow />
        </>
      ) : null}
    </a>
  )
}
