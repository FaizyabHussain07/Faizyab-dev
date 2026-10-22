/**
 * The `/uses` page data.
 *
 * Only tools that are genuinely part of the daily setup belong here, not
 * every technology that appears somewhere in the project archive.
 */

export const uses = {
  lastUpdated: '2026-10-21',
  intro:
    'A short list of the tools I actually work with every day. It is not exhaustive, and it is not a ranking.',
  groups: [
    {
      category: 'Editor & environment',
      items: [
        { name: 'VS Code', note: 'Daily editor.' },
        { name: 'Git', note: 'Version control, on the command line and through the editor.' },
        { name: 'GitHub', note: 'Where the source of every project in this archive lives.' },
        { name: 'Node.js & npm', note: 'The runtime and package manager for everything I build.' },
      ],
    },
    {
      category: 'Languages & frameworks',
      items: [
        { name: 'TypeScript', note: 'The default for anything that will be maintained past its first week.' },
        { name: 'JavaScript', note: 'Still the first language I reach for in the browser.' },
        { name: 'Next.js', note: 'The main framework for application work.' },
        { name: 'React', note: 'For client interfaces and for most of the smaller builds.' },
        { name: 'Tailwind CSS', note: 'Styling, without a separate design system to maintain.' },
        { name: 'Python', note: 'For AI tooling, scripting and anything that needs the ecosystem around it.' },
      ],
    },
    {
      category: 'Hosting & deployment',
      items: [
        { name: 'Vercel', note: 'Where most of the applications in this archive are deployed.' },
        { name: 'Netlify', note: 'Used for the static sites.' },
        { name: 'GitHub Pages', note: 'For the static demos and template gallery.' },
        { name: 'Namecheap', note: 'Where faizyab.me is registered.' },
      ],
    },
    {
      category: 'AI tools',
      items: [
        { name: 'Claude Code', note: 'My main tool for working in a codebase and for getting through unfamiliar code quickly.' },
        { name: 'ChatGPT', note: 'For working through a design decision before I commit it to code.' },
      ],
    },
    {
      category: 'Hardware',
      items: [],
      note: 'I have not published my hardware setup yet. It is on the list, but I would rather list it accurately than approximately.',
    },
  ],
} as const
