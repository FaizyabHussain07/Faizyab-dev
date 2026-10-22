import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import readingTime from 'reading-time'
import { z } from 'zod'

import type { ArticleFrontmatter } from '@/lib/types'
import { calculateReadingTime } from '@/lib/reading-time'

/**
 * File-based writing system.
 *
 * Articles live in `content/writing/*.mdx`. Frontmatter is validated, drafts
 * are excluded from every public listing, and reading time is calculated from
 * the body unless the frontmatter overrides it.
 */

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

const frontmatterSchema = z.object({
  title: z.string().min(1, 'title is required'),
  description: z.string().min(1, 'description is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  updatedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'updatedAt must be YYYY-MM-DD')
    .optional(),
  category: z.string().min(1, 'category is required'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  slug: z.string().min(1, 'slug is required'),
  readingTime: z.number().int().positive().optional(),
})

export type Article = ArticleFrontmatter & {
  /** The MDX body, without frontmatter. */
  body: string
  /** Minutes, either calculated or taken from frontmatter. */
  minutes: number
  /** Year-month used for grouping. */
  year: string
}

export type ArticleHeading = {
  depth: 2 | 3
  text: string
  id: string
}

/* -------------------------------------------------------------------------- */
/* Heading ids                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Turns heading text into a URL fragment.
 *
 * The same function is used to build the table of contents and to assign ids
 * to the rendered headings, so the anchors always match.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Assigns unique ids to headings in document order.
 *
 * The table of contents and the rendered headings share one registry, so a
 * repeated heading still produces distinct, matching anchors.
 */
export function createHeadingRegistry() {
  const seen = new Map<string, number>()
  return {
    id(text: string): string {
      const base = slugifyHeading(text) || 'section'
      const count = seen.get(base) ?? 0
      seen.set(base, count + 1)
      return count === 0 ? base : `${base}-${count + 1}`
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Reading                                                                     */
/* -------------------------------------------------------------------------- */

function assertFileName(fileName: string): string {
  return fileName.replace(/\.mdx?$/, '')
}

function readArticleFile(fileName: string): Article | null {
  const fullPath = path.join(WRITING_DIR, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  const parsed = frontmatterSchema.safeParse({
    ...data,
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published ?? false,
    slug: data.slug ?? assertFileName(fileName),
  })

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`)
      .join('; ')
    throw new Error(
      `Invalid frontmatter in content/writing/${fileName}: ${issues}`
    )
  }

  const frontmatter = parsed.data
  const minutes =
    frontmatter.readingTime ?? calculateReadingTime(content)

  return {
    ...frontmatter,
    body: content,
    minutes,
    year: frontmatter.date.slice(0, 4),
  }
}

function listArticleFiles(): string[] {
  if (!fs.existsSync(WRITING_DIR)) return []
  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .sort()
}

/**
 * All articles, newest first.
 *
 * Drafts are only ever included when `includeDrafts` is true, which happens
 * inside the build-time validation script and never in a public route.
 */
export function getAllArticles(options: { includeDrafts?: boolean } = {}): Article[] {
  const { includeDrafts = false } = options
  const articles = listArticleFiles()
    .map(readArticleFile)
    .filter((article): article is Article => article !== null)
    .filter((article) => includeDrafts || article.published)

  return articles.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title)
    return a.date < b.date ? 1 : -1
  })
}

/** Published articles only. This is what the public site renders. */
export function getPublishedArticles(): Article[] {
  return getAllArticles()
}

export function getArticleBySlug(
  slug: string,
  options: { includeDrafts?: boolean } = {}
): Article | undefined {
  return getAllArticles(options).find((article) => article.slug === slug)
}

/** Slugs of published articles, for `generateStaticParams`. */
export function getPublishedArticleSlugs(): string[] {
  return getPublishedArticles().map((article) => article.slug)
}

/** Categories present in published articles, with their article counts. */
export function getArticleCategories(): {
  category: string
  count: number
}[] {
  const counts = new Map<string, number>()
  for (const article of getPublishedArticles()) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => a.category.localeCompare(b.category))
}

/**
 * Extracts the second- and third-level headings of an article body so the
 * table of contents can be built without a full MDX parse.
 */
export function extractHeadings(body: string): ArticleHeading[] {
  const registry = createHeadingRegistry()
  const headings: ArticleHeading[] = []
  const inFence = { value: false }

  for (const line of body.split(/\r?\n/)) {
    if (line.trimStart().startsWith('```')) {
      inFence.value = !inFence.value
      continue
    }
    if (inFence.value) continue

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue

    const markers = match[1]
    const rawText = match[2]
    if (!markers || !rawText) continue

    const depth = markers.length as 2 | 3
    const text = rawText.replace(/`/g, '').replace(/\*\*/g, '').trim()
    headings.push({ depth, text, id: registry.id(text) })
  }

  return headings
}

/** Articles published in the same year, used for the "related" list. */
export function getRelatedArticles(
  article: Article,
  limit = 2
): Article[] {
  const others = getPublishedArticles().filter((a) => a.slug !== article.slug)
  const sameCategory = others.filter((a) => a.category === article.category)
  const rest = others.filter((a) => a.category !== article.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

/** Rough word count, used on the article page. */
export function getWordCount(body: string): number {
  return readingTime(body).words
}
