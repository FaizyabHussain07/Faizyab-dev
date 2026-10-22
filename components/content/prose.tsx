import { isValidElement, type ReactNode } from 'react'
import Link from 'next/link'

import { createHeadingRegistry } from '@/lib/content'

/**
 * Flattens React children into plain text, so a heading id can be derived
 * from it in the same way the table of contents derives it.
 */
export function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return ''
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(toText).join('')
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return toText(props.children)
  }
  return ''
}

/**
 * The components MDX renders with.
 *
 * The heading registry is shared with the table of contents, so every anchor
 * in the contents list resolves to the matching heading in the article.
 */
export function createMdxComponents() {
  const registry = createHeadingRegistry()

  return {
    h2: ({ children, ...props }: { children?: ReactNode }) => (
      <h2 id={registry.id(toText(children))} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: { children?: ReactNode }) => (
      <h3 id={registry.id(toText(children))} {...props}>
        {children}
      </h3>
    ),
    a: ({ href, children, ...props }: { href?: string; children?: ReactNode }) => {
      const target = href ?? '#'
      if (target.startsWith('http')) {
        return (
          <a
            href={target}
            target="_blank"
            rel="noreferrer noopener"
            {...props}
          >
            {children}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )
      }
      if (target.startsWith('#')) {
        return (
          <a href={target} {...props}>
            {children}
          </a>
        )
      }
      return (
        <Link href={target} {...props}>
          {children}
        </Link>
      )
    },
    pre: ({ children, ...props }: { children?: ReactNode }) => {
      const child = Array.isArray(children) ? children[0] : children
      const className =
        isValidElement(child) &&
        typeof child.props === 'object' &&
        child.props !== null &&
        'className' in child.props
          ? (child.props as { className?: string }).className
          : undefined
      const language = /language-([\w-]+)/.exec(className ?? '')?.[1]

      return (
        <div className="code-block">
          {language ? (
            <div className="code-block-label">{language}</div>
          ) : null}
          <pre {...props}>{children}</pre>
        </div>
      )
    },
    img: ({
      src,
      alt,
      ...props
    }: {
      src?: string
      alt?: string
      width?: number | string
      height?: number | string
    }) => (
      // MDX images are author-supplied and may not have known intrinsic
      // dimensions, so next/image cannot be used here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        {...props}
      />
    ),
  }
}
