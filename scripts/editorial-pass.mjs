import fs from 'node:fs'
import path from 'node:path'

/**
 * Editorial pass.
 *
 * Each change is listed explicitly. Em dashes are removed by restructuring
 * the sentence (commas, periods, colons, parentheses) rather than by swapping
 * the character for another dash. The two exceptions are genuinely structural:
 *
 *  - a list bullet is not prose, so the em dash becomes a plain CSS dot;
 *  - a date range uses an en dash, which is the correct typographic character
 *    for a range and is not an em dash.
 */

const DOT =
  '<span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />'

const bulletRe =
  /<span aria-hidden="true" className="[^"]*text-ink-muted">\s*—\s*<\/span>/g

const edits = [
  // ---------------------------------------------------------------- prose --
  {
    file: 'app/page.tsx',
    from: 'building it — shipping small products, reading a lot of code,',
    to: 'building it: shipping small products, reading a lot of code,',
  },
  {
    file: 'app/page.tsx',
    from: 'problem, the implementation, and what I learned — not a showcase,',
    to: 'problem, the implementation, and what I learned. Not a showcase,',
  },
  {
    file: 'app/page.tsx',
    from: '<span className="text-ink-secondary"> — {entry.role}</span>',
    to: '<span className="text-ink-secondary"> · {entry.role}</span>',
  },
  {
    file: 'app/work/page.tsx',
    from: 'description="A chronological record of the work I have done, with the different kinds of work kept separate — employment, internships, independent product work, and business initiatives."',
    to: 'description="A chronological record of the work I have done, with the different kinds of work kept separate: employment, internships, independent product work and business initiatives."',
  },
  {
    file: 'components/content/experience-timeline.tsx',
    from: '<span className="text-ink-secondary"> — {entry.role}</span>',
    to: '<span className="text-ink-secondary"> · {entry.role}</span>',
  },
  {
    file: 'components/content/experience-timeline.tsx',
    from: ' * Each entry states what kind of work it was — employment, internship,\n * independent work, business initiative — so the different threads of the\n * history are never merged into one employment record.',
    to: ' * Each entry states what kind of work it was: employment, internship,\n * independent work or business initiative. The different threads of the\n * history are never merged into one employment record.',
  },
  {
    file: 'components/layout/site-footer.tsx',
    from: 'A personal website and digital archive — a record of the software I\n              have built, the things I have written, and what I am learning along\n              the way.',
    to: 'A personal website and digital archive: a record of the software I\n              have built, the things I have written, and what I am learning along\n              the way.',
  },
  {
    file: 'components/content/article-list.tsx',
    from: 'than a large number that are not — so please check back later. In the\n        meantime, the',
    to: 'than a large number that are not, so please check back later. In the\n        meantime, the',
  },
  {
    file: 'components/content/contact-form.tsx',
    from: '<p>Thanks — your message has been sent. I will get back to you when I can.</p>',
    to: '<p>Thanks. Your message has been sent. I will get back to you when I can.</p>',
  },
  {
    file: 'components/content/contact-form.tsx',
    from: 'and only me — there is no separate sign-up step.',
    to: 'and only me. There is no separate sign-up step.',
  },
  {
    file: 'components/profile/introduction.tsx',
    from: 'alt="Placeholder portrait for Faizyab Hussain — a monogram awaiting the real photograph."',
    to: 'alt="Placeholder portrait for Faizyab Hussain, a monogram awaiting the real photograph."',
  },
  {
    file: 'data/now.ts',
    from: "'AI engineering and agentic patterns — how to design an application that uses a language model well.'",
    to: "'AI engineering and agentic patterns: how to design an application that uses a language model well.'",
  },
  {
    file: 'data/now.ts',
    from: "'Design and typography — the parts of a product that are hard to add later.'",
    to: "'Design and typography: the parts of a product that are hard to add later.'",
  },

  // --------------------------------------------------------- titles / meta --
  {
    file: 'lib/site.ts',
    from: "title: 'Faizyab Hussain — AI-Focused Developer & Product Builder',",
    to: "title: 'Faizyab Hussain · AI-Focused Developer & Product Builder',",
  },
  {
    file: 'lib/site.ts',
    from: "defaultTitleTemplate: '%s — Faizyab Hussain',",
    to: "defaultTitleTemplate: '%s · Faizyab Hussain',",
  },
  {
    file: 'app/page.tsx',
    from: "title: 'Faizyab Hussain — AI-Focused Developer & Product Builder',",
    to: "title: 'Faizyab Hussain · AI-Focused Developer & Product Builder',",
  },
  {
    file: 'app/page.tsx',
    from: "name: 'Faizyab Hussain — AI-Focused Developer & Product Builder',",
    to: "name: 'Faizyab Hussain · AI-Focused Developer & Product Builder',",
  },
  {
    file: 'app/about/page.tsx',
    from: "title: 'About Faizyab Hussain — Background, Journey & Interests',",
    to: "title: 'About Faizyab Hussain · Background, Journey & Interests',",
  },
  {
    file: 'app/work/page.tsx',
    from: "title: 'Experience & Independent Work — Faizyab Hussain',",
    to: "title: 'Experience & Independent Work · Faizyab Hussain',",
  },
  {
    file: 'app/projects/page.tsx',
    from: "title: 'Projects & Products — Faizyab Hussain',",
    to: "title: 'Projects & Products · Faizyab Hussain',",
  },
  {
    file: 'app/writing/page.tsx',
    from: "title: 'Writing & Technical Notes — Faizyab Hussain',",
    to: "title: 'Writing & Technical Notes · Faizyab Hussain',",
  },
  {
    file: 'app/uses/page.tsx',
    from: "title: 'Uses — Faizyab Hussain',",
    to: "title: 'Uses · Faizyab Hussain',",
  },
  {
    file: 'app/now/page.tsx',
    from: "title: 'Now — Faizyab Hussain',",
    to: "title: 'Now · Faizyab Hussain',",
  },
  {
    file: 'app/projects/[slug]/page.tsx',
    from: 'title: `${project.name} — Faizyab Hussain`,',
    to: 'title: `${project.name} · Faizyab Hussain`,',
  },
  {
    file: 'lib/metadata.ts',
    from: 'alt: `${SITE.name} — ${SITE.title}`,',
    to: 'alt: `${SITE.name} · ${SITE.title}`,',
  },
  {
    file: 'app/rss.xml/route.ts',
    from: '<title>${escapeXml(SITE.name)} — Writing</title>',
    to: '<title>${escapeXml(SITE.name)} · Writing</title>',
  },

  // -------------------------------------------------------- date ranges --
  { file: 'data/education.ts', from: "period: '2026 — Present'", to: "period: '2026 – Present'" },
  {
    file: 'data/education.ts',
    from: "period: 'September 2024 — January 2026'",
    to: "period: 'September 2024 – January 2026'",
  },
  {
    file: 'data/education.ts',
    from: "period: 'September 2024 — June 2026'",
    to: "period: 'September 2024 – June 2026'",
  },
  {
    file: 'data/education.ts',
    from: "period: 'August 2022 — May 2024'",
    to: "period: 'August 2022 – May 2024'",
  },
  {
    file: 'data/experience.ts',
    from: "period: 'September 2024 — Present'",
    to: "period: 'September 2024 – Present'",
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
    console.log('NOT FOUND in', file, '::', from.slice(0, 60))
    continue
  }
  fs.writeFileSync(abs, before.split(from).join(to))
  changed++
}

// List bullets: em dash -> plain dot, across every source file.
const roots = ['app', 'components']
function walk(dir) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.name.endsWith('.tsx')) out.push(full)
  }
  return out
}

for (const file of walk('app').concat(walk('components'))) {
  const before = fs.readFileSync(file, 'utf8')
  const after = before.replace(bulletRe, DOT)
  if (after !== before) {
    fs.writeFileSync(file, after)
    changed++
    console.log('bullets:', path.relative('.', file))
  }
}

console.log('changes applied:', changed)
