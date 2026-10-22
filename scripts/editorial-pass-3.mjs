import fs from 'node:fs'
import path from 'node:path'

/**
 * Editorial pass, part three.
 *
 * The last few: JSX comments, file-header comments, one doc-comment example
 * and the prose inside the published article. None of these render as visible
 * text except the article, but a clean audit is a clean audit.
 */

const edits = [
  // app/page.tsx section comments
  { file: 'app/page.tsx', from: '{/* Section A — introduction */}', to: '{/* Section A: introduction */}' },
  { file: 'app/page.tsx', from: '{/* Section B — about */}', to: '{/* Section B: about */}' },
  { file: 'app/page.tsx', from: '{/* Section C — selected projects */}', to: '{/* Section C: selected projects */}' },
  { file: 'app/page.tsx', from: '{/* Section D — recent writing */}', to: '{/* Section D: recent writing */}' },
  { file: 'app/page.tsx', from: '{/* Section E — experience preview */}', to: '{/* Section E: experience preview */}' },
  { file: 'app/page.tsx', from: '{/* Section F — education preview */}', to: '{/* Section F: education preview */}' },
  { file: 'app/page.tsx', from: '{/* Section G — closing */}', to: '{/* Section G: closing */}' },

  // file header comments
  {
    file: 'app/rss.xml/route.ts',
    from: ' * Drafts are excluded — only `published: true` articles appear here.',
    to: ' * Drafts are excluded: only `published: true` articles appear here.',
  },
  {
    file: 'data/education.ts',
    from: ' * left out of the public site — see README, "Content still to add", for why.',
    to: ' * left out of the public site. See README, "Content still to add", for why.',
  },
  {
    file: 'data/now.ts',
    from: ' * Editable by design — update the lists and the `lastUpdated` date when this\n * changes.',
    to: ' * Editable by design: update the lists and the `lastUpdated` date when this\n * changes.',
  },
  {
    file: 'data/projects.ts',
    from: ' *    (when `featured`) and the sitemap — no component changes required.',
    to: ' *    (when `featured`) and the sitemap, with no component changes required.',
  },
  {
    file: 'data/uses.ts',
    from: ' * Only tools that are genuinely part of the daily setup belong here — not\n * every technology that appears in a project.',
    to: ' * Only tools that are genuinely part of the daily setup belong here, not\n * every technology that appears in a project.',
  },
  {
    file: 'lib/types.ts',
    from: '/** Human readable range, e.g. "September 2024 — Present". */',
    to: '/** Human readable range, e.g. "September 2024 – Present". */',
  },

  // the published article
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: 'nobody reading the database can use it to recover the content — there is no key to recover.',
    to: 'nobody reading the database can use it to recover the content, because there is no key to recover.',
  },
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: 'the browser never talks to Redis directly — every read and write goes through a serverless function.',
    to: 'the browser never talks to Redis directly. Every read and write goes through a serverless function.',
  },
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: '- `save.js` — writes the content with a TTL.',
    to: '- `save.js` writes the content with a TTL.',
  },
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: '- `get.js` — reads it back, and deletes it if the password does not match.',
    to: '- `get.js` reads it back, and deletes it if the password does not match.',
  },
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: '- `delete.js` — removes it on demand.',
    to: '- `delete.js` removes it on demand.',
  },
  {
    file: 'content/writing/hashing-passwords-in-the-browser.mdx',
    from: 'The trade-off is that a TTL is a promise about storage, not a guarantee about deletion — once the key is gone, it is gone.',
    to: 'The trade-off is that a TTL is a promise about storage, not a guarantee about deletion. Once the key is gone, it is gone.',
  },
]

let changed = 0
for (const { file, from, to } of edits) {
  const abs = path.resolve(file)
  if (!fs.existsSync(abs)) {
    console.log('missing:', file)
    continue
  }
  const before = fs.readFileSync(abs, 'utf8')
  if (!before.includes(from)) {
    console.log('NOT FOUND', file, '::', from.slice(0, 55))
    continue
  }
  fs.writeFileSync(abs, before.split(from).join(to))
  changed++
}
console.log('edits applied:', changed, 'of', edits.length)
