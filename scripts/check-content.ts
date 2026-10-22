/**
 * Content validation.
 *
 * Run with `npm run check:content`. It checks the things that are easy to get
 * wrong when adding a project or an article by hand:
 *
 *  - frontmatter is valid (the same schema the site uses)
 *  - slugs are unique
 *  - every internal link in the source resolves to a real route
 *  - a configured profile photograph actually exists on disk
 *  - no published article is missing a description or date
 *
 * It exits non-zero when something is wrong, so it can run in CI.
 */
import fs from 'node:fs'
import path from 'node:path'

import { getAllArticles } from '../lib/content'
import { projectImages } from '../lib/project-images'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { navigation, footerNav } from '../data/navigation'

const root = process.cwd()
const errors: string[] = []
const warnings: string[] = []

/* -------------------------------------------------------------------------- */
/* Slugs                                                                      */
/* -------------------------------------------------------------------------- */

const articleSlugs = new Map<string, string>()
for (const article of getAllArticles({ includeDrafts: true })) {
  const existing = articleSlugs.get(article.slug)
  if (existing) {
    errors.push(`Duplicate article slug "${article.slug}" (${existing})`)
  }
  articleSlugs.set(article.slug, article.slug)
}

const projectSlugs = new Map<string, string>()
for (const project of projects) {
  const existing = projectSlugs.get(project.slug)
  if (existing) {
    errors.push(`Duplicate project slug "${project.slug}" (${existing})`)
  }
  projectSlugs.set(project.slug, project.name)

  if (!/^[a-z0-9-]+$/.test(project.slug)) {
    errors.push(
      `Project slug "${project.slug}" is not URL-safe (use lowercase letters, numbers and hyphens).`
    )
  }
  if (!project.summary) {
    errors.push(`Project "${project.name}" has no summary.`)
  }
  if (!project.contribution) {
    errors.push(`Project "${project.name}" has no contribution description.`)
  }
  if (!project.role) {
    errors.push(`Project "${project.name}" has no role.`)
  }
  if (project.status === 'concept' && project.liveUrl && !project.statusNote) {
    warnings.push(
      `Project "${project.name}" is a concept but has a live URL and no statusNote explaining it.`
    )
  }
}

/* -------------------------------------------------------------------------- */
/* Internal links                                                             */
/* -------------------------------------------------------------------------- */

const knownRoutes = new Set<string>([
  '/',
  '/about',
  '/work',
  '/projects',
  '/services',
  '/writing',
  '/now',
  '/uses',
  '/contact',
  '/rss.xml',
  '/sitemap.xml',
  '/robots.txt',
])
for (const item of navigation) knownRoutes.add(item.href)
for (const item of footerNav) knownRoutes.add(item.href)
for (const project of projects) {
  if (project.published) knownRoutes.add(`/projects/${project.slug}`)
}
for (const article of getAllArticles()) {
  knownRoutes.add(`/writing/${article.slug}`)
}

function collectSourceFiles(dir: string): string[] {
  const found: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      found.push(...collectSourceFiles(full))
    } else if (/\.(tsx?|mdx?)$/.test(entry.name)) {
      found.push(full)
    }
  }
  return found
}

const sourceFiles = [
  ...collectSourceFiles(path.join(root, 'app')),
  ...collectSourceFiles(path.join(root, 'components')),
  ...collectSourceFiles(path.join(root, 'data')),
  ...collectSourceFiles(path.join(root, 'content')),
]

/**
 * Only `href` attributes are treated as links, so paths inside regular
 * expressions and plain strings are not mistaken for routes.
 */
const hrefPattern = /href\s*=\s*(?:\{)?["'`]\/([^"'`?#]*)/g
const srcPattern = /(?:src|url)\s*[:=]\s*\{?\s*["'`]\/([^"'`?#]*)/g

for (const file of sourceFiles) {
  const contents = fs.readFileSync(file, 'utf8')
  const relative = path.relative(root, file)

  for (const match of contents.matchAll(hrefPattern)) {
    const target = match[1]
    if (!target) continue
    // Assets are checked separately against the public directory.
    if (target.includes('.')) continue
    const normalized = `/${target.replace(/\/$/, '')}`
    if (!knownRoutes.has(normalized)) {
      errors.push(
        `${relative}: internal link "${normalized}" does not match a known route`
      )
    }
  }

  for (const match of contents.matchAll(srcPattern)) {
    const target = match[1]
    if (!target || !target.includes('.')) continue
    if (!target.startsWith('images/')) continue
    const assetPath = path.join(root, 'public', target)
    if (!fs.existsSync(assetPath)) {
      errors.push(`${relative}: referenced asset "/${target}" does not exist in public/`)
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Assets                                                                     */
/* -------------------------------------------------------------------------- */

for (const [slug, imagePath] of Object.entries(projectImages)) {
  if (!projects.some((project) => project.slug === slug)) {
    warnings.push(`projectImages has an entry for "${slug}" but no such project.`)
  }
  if (!fs.existsSync(path.join(root, 'public', imagePath.replace(/^\//, '')))) {
    errors.push(`projectImages: "${slug}" points at "${imagePath}" but no such file exists in public/.`)
  }
}

if (profile.photo) {
  const photoPath = path.join(root, 'public', profile.photo.replace(/^\//, ''))
  if (!fs.existsSync(photoPath)) {
    errors.push(
      `profile.photo points at "${profile.photo}" but no such file exists in public/.`
    )
  }
}

for (const asset of ['/og-image.png', '/favicon.ico', '/icon-192.png', '/icon-512.png']) {
  if (!fs.existsSync(path.join(root, 'public', asset.replace(/^\//, '')))) {
    errors.push(`Missing public asset ${asset}`)
  }
}

/* -------------------------------------------------------------------------- */
/* Report                                                                     */
/* -------------------------------------------------------------------------- */

const published = getAllArticles()
const drafts = getAllArticles({ includeDrafts: true }).filter(
  (article) => !article.published
)

console.log(`Projects:       ${projects.length} (${projects.filter((p) => p.published).length} published)`)
console.log(`Articles:       ${published.length} published, ${drafts.length} draft`)
console.log(`Routes checked: ${knownRoutes.size}`)

for (const warning of warnings) {
  console.warn(`warning: ${warning}`)
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`)
  }
  console.error(`\n${errors.length} content problem(s) found.`)
  process.exit(1)
}

console.log('\nAll content checks passed.')
