/**
 * The `/now` page data.
 *
 * Editable by design: update the lists and the `lastUpdated` date when this
 * changes. Everything here is drawn from work that is actually in progress.
 */

export const now = {
  lastUpdated: '2026-10-21',
  intro:
    'This is a short, honest snapshot of what I am working on right now. It changes fairly often, and I update it when it does.',
  workingOn: [
    {
      title: 'DevPass',
      detail:
        'A verified developer passport meant to replace the resume. The public site with the interactive passport preview is live; sign-in, assessments and the dashboard are not built yet, so it is still at the landing-page stage.',
      href: 'https://devpass-app.vercel.app/',
    },
    {
      title: 'Formivo',
      detail:
        'A developer-first form endpoint. I point a form that already exists on a website at a managed endpoint and the submissions arrive as leads, with a read-only dashboard a client can be given for their own form.',
      href: '/projects/formivo',
    },
    {
      title: 'PasteLink Pro',
      detail:
        'A no-account text sharing service with expiry, optional password protection and burn-after-read. It is live and I keep improving it.',
      href: '/projects/paste-link-pro',
    },
    {
      title: 'Building this website',
      detail:
        'Faizyab.me is a personal archive, a long-term record of what I have built, written and learned, rather than a page that has to be rewritten every few months.',
      href: '/projects',
    },
  ],
  learning: [
    'Artificial Intelligence, as part of my BS at Dawood University of Engineering & Technology.',
    'AI engineering and agentic patterns: how to design an application that uses a language model well.',
    'LLM application development, and how to evaluate a model-backed feature instead of guessing.',
    'Backend and SaaS architecture, and the parts of a product that only show up once other people use it.',
    'Product engineering: the unglamorous work of making software usable, not merely functional.',
  ],
  exploring: [
    'Developer tooling, and how much of my own workflow could be packaged for other developers.',
    'Self-hosted, open-source versions of products I have built for myself.',
    'Design and typography: the parts of a product that are hard to add later.',
  ],
  lookingFor: [
    'Remote opportunities, internships and collaborative software projects.',
    'Work on products where AI is genuinely part of the product rather than a feature bolted on.',
    'Mentorship, and people who are further along the same path.',
  ],
  reading: [
    {
      title: 'Documentation of the tools I use, and the reasoning behind them',
      detail: 'The fastest way I have found to get better at something is to write down why a decision was made.',
    },
  ],
} as const
