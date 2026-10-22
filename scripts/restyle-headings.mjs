import fs from 'node:fs'
import path from 'node:path'

/**
 * One-off codemod.
 *
 * Section headings (h2) become larger so a section clearly starts.
 * Item titles (h3) become smaller, semibold sans-serif so they read as
 * subordinate to the section heading instead of competing with it.
 */

const files = [
  'components/content/project-row.tsx',
  'components/content/article-list.tsx',
  'components/content/experience-timeline.tsx',
  'components/content/section.tsx',
  'app/page.tsx',
  'app/now/page.tsx',
  'app/about/page.tsx',
  'app/uses/page.tsx',
  'app/projects/[slug]/page.tsx',
]

const ITEM_TITLE =
  'font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em]'

const headingReplacements = [
  [
    'className="font-serif text-[1.25rem] leading-snug text-ink"',
    `className="${ITEM_TITLE} text-ink"`,
  ],
  [
    'className="font-serif text-[1.125rem] leading-snug text-ink"',
    `className="${ITEM_TITLE} text-ink"`,
  ],
  [
    'className="font-serif text-[1.25rem] leading-snug"',
    `className="${ITEM_TITLE}"`,
  ],
  [
    'className="font-serif text-[1.125rem] leading-snug"',
    `className="${ITEM_TITLE}"`,
  ],
  [
    'className="text-[1.375rem] leading-snug text-ink"',
    'className="text-[1.5rem] font-medium leading-snug tracking-[-0.012em] text-ink"',
  ],
]

let changed = 0
for (const rel of files) {
  const abs = path.resolve(rel)
  if (!fs.existsSync(abs)) {
    console.log('skip (missing):', rel)
    continue
  }
  const before = fs.readFileSync(abs, 'utf8')
  let after = before
  for (const [from, to] of headingReplacements) {
    after = after.split(from).join(to)
  }
  if (after !== before) {
    fs.writeFileSync(abs, after)
    changed++
    console.log('restyle:', rel)
  } else {
    console.log('unchanged:', rel)
  }
}
console.log('files changed:', changed)
