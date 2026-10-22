import fs from 'node:fs'
import path from 'node:path'

/**
 * Editorial pass, part two.
 *
 * The remaining em dashes in the project archive and the About page. Again
 * each sentence is restructured rather than the character being swapped.
 */

const edits = [
  // ------------------------------------------------------------ data/projects
  {
    file: 'data/projects.ts',
    from: 'a familiar cloud-drive experience — upload, organise, search, preview and share files from any device — while the files themselves stay in a private Telegram channel you control.',
    to: 'a familiar cloud-drive experience (upload, organise, search, preview and share files from any device) while the files themselves stay in a private Telegram channel you control.',
  },
  {
    file: 'data/projects.ts',
    from: 'and I wrote the application end to end — authentication, file handling, search, sharing and the installable web app shell.',
    to: 'and I wrote the application end to end: authentication, file handling, search, sharing and the installable web app shell.',
  },
  {
    file: 'data/projects.ts',
    from: "'Accept a submission from any existing form — HTML, React, WordPress, Webflow — with a single HTTP endpoint and a secret.'",
    to: "'Accept a submission from any existing form (HTML, React, WordPress, Webflow) with a single HTTP endpoint and a secret.'",
  },
  {
    file: 'data/projects.ts',
    from: 'and end up with a single passport — a profile, a portfolio, an evidence-backed skills list and a professional timeline — that a company could trust in place of a resume.',
    to: 'and end up with a single passport (a profile, a portfolio, an evidence-backed skills list and a professional timeline) that a company could trust in place of a resume.',
  },
  {
    file: 'data/projects.ts',
    from: "'Make every claim on a profile traceable to evidence — commits, repositories, assessment results.'",
    to: "'Make every claim on a profile traceable to evidence: commits, repositories, assessment results.'",
  },
  {
    file: 'data/projects.ts',
    from: 'The interactive passport preview shows the shape the product is intended to take — verified identity, GitHub signal, portfolio, projects, skills, assessments and a professional timeline.',
    to: 'The interactive passport preview shows the shape the product is intended to take: verified identity, GitHub signal, portfolio, projects, skills, assessments and a professional timeline.',
  },
  {
    file: 'data/projects.ts',
    from: 'You choose how long it should live — from ten minutes to seven days — optionally protect it with a password',
    to: 'You choose how long it should live (from ten minutes to seven days), optionally protect it with a password',
  },
  {
    file: 'data/projects.ts',
    from: "'The source is public, and the deployment path — Upstash plus three serverless functions — is documented in the repository.'",
    to: "'The source is public, and the deployment path (Upstash plus three serverless functions) is documented in the repository.'",
  },
  {
    file: 'data/projects.ts',
    from: "'Slik — published to npm as create-slik — is a project generator",
    to: "'Slik, published to npm as create-slik, is a project generator",
  },
  {
    file: 'data/projects.ts',
    from: "{ label: 'npm — create-slik',",
    to: "{ label: 'create-slik on npm',",
  },
  {
    file: 'data/projects.ts',
    from: "'Make the setup decisions — framework, visual style, database — explicit choices rather than deleted code.'",
    to: "'Make the setup decisions (framework, visual style, database) explicit choices rather than deleted code.'",
  },
  {
    file: 'data/projects.ts',
    from: "'Three design themes are defined as tokens — Bento, Frost and Mono — so the visual style is a parameter, not a fork.'",
    to: "'Three design themes are defined as tokens (Bento, Frost and Mono), so the visual style is a parameter, not a fork.'",
  },
  {
    file: 'data/projects.ts',
    from: 'and standalone UI blocks — navbars, hero sections, feature grids, pricing tables, forms and footers — that you can drop into a project',
    to: 'and standalone UI blocks (navbars, hero sections, feature grids, pricing tables, forms and footers) that you can drop into a project',
  },
  {
    file: 'data/projects.ts',
    from: "'Keep the technology ordinary — HTML, Tailwind and vanilla JavaScript — so the output drops into anything.'",
    to: "'Keep the technology ordinary (HTML, Tailwind and vanilla JavaScript) so the output drops into anything.'",
  },
  {
    file: 'data/projects.ts',
    from: "'I built the whole application — the data model, the Firebase security rules,",
    to: "'I built the whole application: the data model, the Firebase security rules,",
  },
  {
    file: 'data/projects.ts',
    from: 'and a ready-to-paste prompt that an AI coding agent can act on — turning an audit report into a list of instructions rather than a wall of advice.',
    to: 'and a ready-to-paste prompt that an AI coding agent can act on, turning an audit report into a list of instructions rather than a wall of advice.',
  },
  {
    file: 'data/projects.ts',
    from: "'Cover the whole surface at once — technical, accessibility, search, and how the site reads to AI systems.'",
    to: "'Cover the whole surface at once: technical, accessibility, search, and how the site reads to AI systems.'",
  },
  {
    file: 'data/projects.ts',
    from: 'No account, no install — the work autosaves in the browser as you go.',
    to: 'No account, no install: the work autosaves in the browser as you go.',
  },
  {
    file: 'data/projects.ts',
    from: "'Make the drawing precise — real dimensions, not a picture of a house.'",
    to: "'Make the drawing precise: real dimensions, not a picture of a house.'",
  },
  {
    file: 'data/projects.ts',
    from: 'drafts a README from what it finds — the structure of the project, the stack, the scripts it needs.',
    to: 'drafts a README from what it finds: the structure of the project, the stack, the scripts it needs.',
  },
  {
    file: 'data/projects.ts',
    from: "'I designed the three role experiences and built the application — course management,",
    to: "'I designed the three role experiences and built the application: course management,",
  },
  {
    file: 'data/projects.ts',
    from: "'I built the directory — the listing and filtering interface,",
    to: "'I built the directory: the listing and filtering interface,",
  },
  {
    file: 'data/projects.ts',
    from: 'built to work through the full shape of a marketplace — supply, demand, ordering, fulfilment and role-based administration.',
    to: 'built to work through the full shape of a marketplace: supply, demand, ordering, fulfilment and role-based administration.',
  },
  {
    file: 'data/projects.ts',
    from: "'I built the whole marketplace — customer ordering and tracking,",
    to: "'I built the whole marketplace: customer ordering and tracking,",
  },
  {
    file: 'data/projects.ts',
    from: "'Three roles — customer, vendor and admin — with access enforced by a dedicated role guard.'",
    to: "'Three roles (customer, vendor and admin), with access enforced by a dedicated role guard.'",
  },
  {
    file: 'data/projects.ts',
    from: 'They are not client work and the businesses are invented — the point was to get fluent in layout',
    to: 'They are not client work and the businesses are invented. The point was to get fluent in layout',
  },
  {
    file: 'data/projects.ts',
    from: 'digital marketing and car care — industries with very different content and calls to action.',
    to: 'digital marketing and car care, industries with very different content and calls to action.',
  },

  // ------------------------------------------------------------- app/about
  {
    file: 'app/about/page.tsx',
    from: 'built properly — not just how to make them work.',
    to: 'built properly, not just how to make them work.',
  },
  {
    file: 'app/about/page.tsx',
    from: 'and a range of databases — mostly Supabase and PostgreSQL,',
    to: 'and a range of databases: mostly Supabase and PostgreSQL,',
  },
  {
    file: 'app/about/page.tsx',
    from: 'What I am drawn to in AI is application work — integrating existing',
    to: 'What I am drawn to in AI is application work: integrating existing',
  },
  {
    file: 'app/about/page.tsx',
    from: 'September 2024 and it has continued since — web applications,',
    to: 'September 2024 and it has continued since: web applications,',
  },
  {
    file: 'app/about/page.tsx',
    from: 'product engineering — the craft of making software that people can',
    to: 'product engineering: the craft of making software that people can',
  },
  {
    file: 'app/about/page.tsx',
    from: 'opportunity — education, access, and the idea that building',
    to: 'opportunity: education, access, and the idea that building',
  },
  {
    file: 'app/about/page.tsx',
    from: "in a similar direction, I would be glad to talk —{' '}\n            <Link href=\"/contact\" className=\"link\">\n              get in touch\n            </Link>\n            .",
    to: "in a similar direction,{' '}\n            <Link href=\"/contact\" className=\"link\">\n              get in touch\n            </Link>\n            and we can talk.",
  },
  {
    file: 'app/about/page.tsx',
    from: 'rather than the full story — the site has that.',
    to: 'rather than the full story. The site has that.',
  },
  {
    file: 'app/about/page.tsx',
    from: "GitHub — {profile.links.github.replace('https://github.com/', '')}",
    to: "GitHub · {profile.links.github.replace('https://github.com/', '')}",
  },
  {
    file: 'app/about/page.tsx',
    from: "LinkedIn — {profile.links.linkedin.replace('https://www.linkedin.com/in/', '')}",
    to: "LinkedIn · {profile.links.linkedin.replace('https://www.linkedin.com/in/', '')}",
  },
  {
    file: 'app/about/page.tsx',
    from: "X — {profile.links.x.replace('https://x.com/', '')}",
    to: "X · {profile.links.x.replace('https://x.com/', '')}",
  },

  // ----------------------------------------------------------- app/contact
  {
    file: 'app/contact/page.tsx',
    from: 'form sends to my inbox and only me — nothing you write here is',
    to: 'form sends to my inbox and only me. Nothing you write here is',
  },

  // ---------------------------------------------------------------- layout
  {
    file: 'app/layout.tsx',
    from: 'alt: `${SITE.name} — ${SITE.title}`,',
    to: 'alt: `${SITE.name} · ${SITE.title}`,',
  },

  // -------------------------------------------------------------- lib/content
  {
    file: 'lib/content.ts',
    from: '`Invalid frontmatter in content/writing/${fileName} — ${issues}`',
    to: '`Invalid frontmatter in content/writing/${fileName}: ${issues}`',
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
