import readingTime from 'reading-time'

/**
 * Reading time, in whole minutes, calculated from the article body.
 *
 * Frontmatter can override this with an explicit `readingTime` value.
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content)
  return Math.max(1, Math.round(stats.minutes))
}

/** Human readable duration, e.g. "4 min read". */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}
