/**
 * Canonical site configuration.
 *
 * The canonical origin is intentionally a single constant so that metadata,
 * the sitemap, the RSS feed and internal links can never drift apart.
 */
export const SITE_URL = 'https://www.faizyab.me'

export const SITE = {
  url: SITE_URL,
  name: 'Faizyab Hussain',
  title: 'Faizyab Hussain · AI-Focused Developer & Product Builder',
  description:
    'Faizyab Hussain is an AI-focused full-stack developer and independent product builder from Karachi, Pakistan. He builds web applications, developer tools and AI-powered products while studying Artificial Intelligence.',
  locale: 'en',
  language: 'en-US',
  ogImage: '/og-image.png',
  thumbnailUrl: '/og-image.png',
  author: 'Faizyab Hussain',
  /** Used for <title> templates and Open Graph. */
  defaultTitleTemplate: '%s · Faizyab Hussain',
  /** The resume PDF, served from `public/`. */
  resumePdf: '/Resume_Faizyab_Hussain.pdf',
} as const

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string = '/'): string {
  if (path.startsWith('http')) return path
  return new URL(path, SITE_URL).toString()
}
