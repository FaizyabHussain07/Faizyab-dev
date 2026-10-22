import type { Project, ProjectCategory, ProjectStatus } from '@/lib/types'

/**
 * The project archive.
 *
 * Rules for this file:
 *  - `status` describes the real state of the work today, not its ambition.
 *  - `results` only ever contains things that were verified.
 *  - A live URL is never proof that a product is finished.
 *  - Adding a project here is enough to appear in the archive, the homepage
 *    (when `featured`) and the sitemap, with no component changes required.
 */

export const projects: Project[] = [
  {
    name: 'TeleCloud',
    slug: 'telecloud',
    summary:
      'A personal cloud drive that keeps the file bytes inside your own private Telegram channel.',
    description:
      'TeleCloud gives you a familiar cloud-drive experience (upload, organise, search, preview and share files from any device) while the files themselves stay in a private Telegram channel you control. PostgreSQL holds the metadata, Telegram holds the bytes, and the whole app installs to your phone or laptop as a progressive web app.',
    category: 'product',
    status: 'in-development',
    started: '2026-08',
    updated: '2026-08',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Telegram API', 'OAuth'],
    liveUrl: 'https://app-telecloud.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/telecloud',
    role: 'Solo build',
    contribution:
      'I designed the product, the data model and the interface, and I wrote the application end to end: authentication, file handling, search, sharing and the installable web app shell.',
    problem:
      'Cloud storage is a trade-off between cost, reliability and privacy. Everyone already has a Telegram account with private storage attached to it, but Telegram is a chat app, not a file system with folders, previews and search. TeleCloud turns that existing storage into a drive.',
    goals: [
      'Give people a real cloud drive without asking them to hand their files to a third party.',
      'Keep the storage layer boring and cheap by reusing an account they already have.',
      'Make the app feel native on a phone, where file access actually matters.',
    ],
    implementation: [
      'File bytes are uploaded to a private Telegram channel through the Bot API; PostgreSQL stores the file record, folder tree, ownership and sharing links.',
      'Authentication supports email and password alongside Google and GitHub OAuth, with email verification and password reset.',
      'Folders are modelled as a parent reference so sub-folders, breadcrumbs and drag-and-drop moves are all one query shape.',
      'Search matches on file name, folder name, extension and file type, with sorting by name, date, size and type.',
      'The app ships as a progressive web app, with a standalone window and an offline shell for navigation.',
    ],
    challenges: [
      'Large uploads have to be chunked through a chat API that was never designed to be a file store, so progress and retry behaviour needed careful handling.',
      'A folder hierarchy and file list have to stay consistent when the same file is moved or renamed from two different clients at once.',
    ],
    results: [
      'A public deployment is live and usable, including the installable progressive web app shell for desktop and mobile.',
    ],
    lessons: [
      'Choosing an unusual storage backend is only worth it if the surrounding product is genuinely good. The drive is the product; Telegram is an implementation detail that should never be visible.',
      'Auth is the part of a product people judge first. Getting sign-in, session handling and reset flows right early paid for itself.',
    ],
    featured: true,
    published: true,
  },
  {
    name: 'Formivo',
    slug: 'formivo',
    summary:
      'A developer-first form endpoint that turns submissions on existing websites into a lead dashboard.',
    description:
      'Formivo lets a developer point a form that already exists on a website at a managed endpoint, and every valid submission arrives as a lead in a dashboard. No form rebuild, no bespoke backend. Clients can then be invited to a read-only dashboard scoped to their own form, so they can see their leads without ever seeing the API configuration.',
    category: 'product',
    status: 'in-development',
    started: '2026-10',
    updated: '2026-10',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'REST API'],
    liveUrl: 'https://formivo-three.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/formivo',
    role: 'Solo build',
    contribution:
      'I am building Formivo on my own: the ingestion API, the lead model, the dashboard, and the per-client access model that keeps one client from seeing another client\'s submissions.',
    problem:
      'Almost every small business website has a contact form, and almost every one of those forms submits into an inbox that nobody opens. Rebuilding the form to fix that is expensive, so agencies and freelancers tend to skip it. Formivo works with the form that is already there.',
    goals: [
      'Accept a submission from any existing form (HTML, React, WordPress, Webflow) with a single HTTP endpoint and a secret.',
      'Turn submissions into organised, searchable leads instead of raw rows.',
      'Give a client a clean read-only view of their own leads, with no API secrets and no developer settings.',
    ],
    implementation: [
      'Each form gets one endpoint and one secret. A client posts JSON to it and the submission becomes a lead.',
      'The backend is Supabase with Postgres row level security, so an invited client can only ever read rows belonging to their own form.',
      'Per-form client access is granted by invitation and scoped server-side, rather than by hiding rows in the interface.',
      'The API is versioned and documented on the product site, with the secret intended to be kept server-side.',
    ],
    challenges: [
      'Scoping access correctly means pushing the rules into the database rather than trusting the interface to hide things.',
      'Validating arbitrary third-party submissions without rejecting legitimate ones from forms you do not control.',
    ],
    results: [
      'A public deployment is live, with the submission API and its documentation published on the product site.',
    ],
    lessons: [
      'The strongest version of a tool like this is the one that does not ask the customer to change anything. Compatibility beats features.',
      'Multi-tenant access control is a database problem, not a UI problem. Deciding that early avoided a rewrite.',
    ],
    featured: true,
    published: true,
  },
  {
    name: 'DevPass',
    slug: 'devpass',
    summary:
      'A professional identity platform that would replace the resume with a verified developer passport.',
    description:
      'DevPass is an early-stage idea about developer credibility. A developer would sign in once, link their GitHub and verify their identity, complete role-based technical and communication assessments, and end up with a single passport (a profile, a portfolio, an evidence-backed skills list and a professional timeline) that a company could trust in place of a resume. The public site is live; the product behind it is not built yet.',
    category: 'product',
    status: 'concept',
    technologies: ['React', 'Node.js', 'REST API', 'AI APIs'],
    liveUrl: 'https://devpass-app.vercel.app/',
    role: 'Founder and sole builder',
    statusNote:
      'The live site is a marketing page with a waitlist. Sign-in, dashboard and demo routes are not available yet, so the product cannot be used today.',
    contribution:
      'I defined the product, wrote the positioning and built the public site and its interactive passport preview.',
    problem:
      'Hiring runs on resumes and coding tests that are expensive to run, easy to pass without skill, and give a developer almost no feedback. The developer repeats the same test for every application, and neither side gets real signal.',
    goals: [
      'Verify a developer once instead of once per application.',
      'Make every claim on a profile traceable to evidence: commits, repositories, assessment results.',
      'Give developers a single link that replaces the resume, the portfolio and the repeated coding test.',
    ],
    implementation: [
      'The public site is built around one idea: a passport, and the trust signals that make it worth something.',
      'The interactive passport preview shows the shape the product is intended to take: verified identity, GitHub signal, portfolio, projects, skills, assessments and a professional timeline.',
    ],
    challenges: [
      'Verification has to be strong enough to be worth something to employers without making the signup flow so heavy that developers give up.',
      'The assessment has to measure something a resume cannot, which is a genuinely difficult product problem.',
    ],
    lessons: [
      'A landing page is a good way to test whether a problem is real, but it is not the product. This one is still at that stage.',
    ],
    published: true,
  },
  {
    name: 'PasteLink Pro',
    slug: 'paste-link-pro',
    summary:
      'A no-account text sharing tool with expiry, optional password protection and burn-after-read.',
    description:
      'PasteLink Pro turns any piece of text into a link that deletes itself. You choose how long it should live (from ten minutes to seven days), optionally protect it with a password, and optionally arm burn-after-read so the content is destroyed the first time it is opened. There is no account, because needing an account is the reason most people end up pasting a secret into a chat window instead.',
    category: 'product',
    status: 'maintained',
    started: '2026-03',
    updated: '2026-10',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Upstash Redis',
      'Vercel Serverless Functions',
      'SHA-256',
    ],
    liveUrl: 'https://paste-link-pro.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/paste-link',
    role: 'Solo build',
    contribution:
      'I designed and built the whole thing: the editor, the viewer, the password gate, the QR flow, the API and the serverless functions behind it.',
    problem:
      'Sharing a snippet, a key or a one-off note usually means either a chat message that stays around forever, or a document service that wants an account. Neither fits a quick, disposable share.',
    goals: [
      'Share in one step, with no signup and no friction.',
      'Make expiry automatic and reliable rather than something the user has to remember.',
      'Keep the secrets on the server side of the boundary, not in the browser.',
    ],
    implementation: [
      'The password is hashed with SHA-256 in the browser before it is sent, so the plaintext password never reaches the server.',
      'Content is stored in Upstash Redis with a time-to-live, so expiry is enforced by the datastore instead of a cleanup job.',
      'A Vercel serverless function proxies every read, write and delete, which keeps the Redis token out of the browser entirely.',
      'Viewer content is rendered with textContent rather than innerHTML, so pasted markup cannot execute.',
      'A live per-second countdown on the viewer shows exactly how long is left.',
    ],
    challenges: [
      'Keeping the reader able to open a link without ever being able to reach the underlying store directly.',
      'Making the expiry feel trustworthy, since a countdown that can be wrong is worse than no countdown at all.',
    ],
    results: [
      'The service is publicly live and works end to end without an account.',
      'The source is public, and the deployment path (Upstash plus three serverless functions) is documented in the repository.',
    ],
    lessons: [
      'Doing the hashing on the client is a small decision with a large effect on the trust story, and it costs almost nothing.',
      'Small, single-purpose tools are quick to build and easy to keep honest. The feature list stayed short on purpose.',
    ],
    featured: true,
    published: true,
  },
  {
    name: 'Slik',
    slug: 'slik',
    summary:
      'A CLI that scaffolds a full-stack SaaS starter with authentication, a dashboard and an admin panel.',
    description:
      'Slik, published to npm as create-slik, is a project generator for SaaS applications. You answer a couple of questions and it clones a template, installs the dependencies and hands you an application with authentication, a dashboard, an admin panel and a database schema already wired together. The published package currently ships the React (Vite) stack with the Bento and Frost design themes; the remaining framework and theme combinations are still marked as planned.',
    category: 'developer-tool',
    status: 'in-development',
    started: '2026-04',
    updated: '2026-04',
    technologies: [
      'Node.js',
      'React',
      'Vite',
      'Next.js',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'TypeScript',
    ],
    liveUrl: 'https://slik-dev.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/slik-engine',
    extraLinks: [
      { label: 'create-slik on npm', href: 'https://www.npmjs.com/package/create-slik' },
      { label: 'Documentation', href: 'https://slik-dev.vercel.app/docs' },
      { label: 'Website source', href: 'https://github.com/FaizyabHussain07/slik-dev-web' },
    ],
    role: 'Creator and maintainer',
    statusNote:
      'The CLI is published and installable. The published README currently marks the Next.js 15 and Vanilla HTML stacks, and the Mono theme, as still to come.',
    contribution:
      'I built the generator, the template system, the documentation site and the design themes.',
    problem:
      'Every new SaaS project starts by rebuilding the same setup: a landing page, sign-in and sign-up, a dashboard, an admin panel, a database schema and a design system. That work is unrelated to the product, and it is redone from scratch on every new idea.',
    goals: [
      'Get from an empty directory to a running, authenticated application in under a minute.',
      'Make the setup decisions (framework, visual style, database) explicit choices rather than deleted code.',
      'Ship something a solo developer can actually deploy without rewriting the boilerplate.',
    ],
    implementation: [
      'The CLI asks for a project name, a stack and a design theme, then clones the matching template and installs its dependencies.',
      'Templates ship with Supabase authentication, including email sign-in and Google OAuth, plus a dashboard and a role-based admin panel.',
      'Database access goes through Postgres with row level security policies rather than application-only checks.',
      'Three design themes are defined as tokens (Bento, Frost and Mono), so the visual style is a parameter, not a fork.',
      'The package is published to npm as create-slik and can be run with npx.',
    ],
    challenges: [
      'Keeping templates that share a database schema and an auth flow genuinely consistent across different frameworks.',
      'Making a CLI that fails gracefully, because a scaffolder that breaks halfway is worse than no scaffolder.',
    ],
    results: [
      'The generator is published on npm as create-slik, and the documentation site is live.',
    ],
    lessons: [
      'Boilerplate is only worth abstracting once you have written it a second time. By the third project the shape was obvious.',
      'A scaffolder is a product with users. The install experience matters as much as the template contents.',
    ],
    featured: true,
    published: true,
  },
  {
    name: 'Web Template Hub',
    slug: 'web-template-hub',
    summary:
      'An open-source library of free HTML landing-page templates and Tailwind CSS components.',
    description:
      'Web Template Hub collects complete single-page HTML templates and standalone UI blocks (navbars, hero sections, feature grids, pricing tables, forms and footers) that you can drop into a project and use straight away. Everything is plain HTML with Tailwind CSS classes, so there is no build step, no package to install and no framework to adopt.',
    category: 'open-source',
    status: 'in-development',
    started: '2026-01',
    updated: '2026-05',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'JSON'],
    liveUrl: 'https://web-template-hub.netlify.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/website-template-hub',
    extraLinks: [
      { label: 'Live demo gallery', href: 'https://faizyabhussain07.github.io/website-template-hub/' },
    ],
    role: 'Creator and maintainer',
    contribution:
      'I designed the templates and component library, built the discovery and filtering interface, and wrote the script that syncs metadata and packages the library.',
    problem:
      'The first day of a marketing site is usually spent on a hero section, a pricing table and a contact form. Those exist already, and rewriting them every time is pure overhead.',
    goals: [
      'Provide starting points that are genuinely free to use, including commercially, without attribution.',
      'Keep the technology ordinary (HTML, Tailwind and vanilla JavaScript) so the output drops into anything.',
      'Make the library browsable by industry and component type, with a live responsive preview.',
    ],
    implementation: [
      'Templates and components are stored as structured JSON and rendered into a browsable library with filters for industry and component type.',
      'The preview engine switches between mobile, tablet and desktop viewports so the responsive behaviour is visible before you use the code.',
      'A sync script regenerates the metadata and packages the library for download.',
      'The project is MIT licensed, and the source is public.',
    ],
    challenges: [
      'Keeping a growing library of templates visually consistent without letting each one drift.',
      'Building a preview that is fast enough to feel immediate while rendering full pages.',
    ],
    results: [
      'The library is public and MIT licensed, and the site and repository are both live.',
    ],
    lessons: [
      'Licensing is a design decision. Choosing MIT from the start meant it could be used in client work without a conversation.',
      'A template is only useful if you can tell what it looks like before you commit to it, which is why the previewer mattered more than the count.',
    ],
    published: true,
  },
  {
    name: 'ClinicFlow',
    slug: 'clinicflow',
    summary:
      'A clinic management system with role-based dashboards, scheduling and digital prescriptions.',
    description:
      'ClinicFlow is a clinic management application for small practices. It covers patient records, appointment scheduling, digital prescriptions and a medical history timeline, with three separate dashboards for administrators, doctors and receptionists so each role only sees the actions it needs.',
    category: 'web-app',
    status: 'in-development',
    started: '2026-02',
    updated: '2026-03',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Firebase Authentication',
      'Firebase Realtime Database',
      'jsPDF',
      'Cloudinary',
    ],
    liveUrl: 'https://clinic-flow-managemnet.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/ClinicFlow',
    role: 'Solo build',
    contribution:
      'I built the whole application: the data model, the Firebase security rules, the three role experiences, the prescription generator and the deployment.',
    problem:
      'A small clinic runs on a reception desk, a paper diary and a lot of goodwill. Patient history is scattered, prescriptions are handwritten, and the person at the front desk can see more than they need to and less than they want.',
    goals: [
      'Keep patient records, appointments and prescriptions in one place.',
      'Give each role exactly the access their job requires.',
      'Produce a prescription a patient can actually keep and a clinic can actually file.',
    ],
    implementation: [
      'Firebase Authentication handles sign-in, and Realtime Database security rules enforce which role can read and write which collection.',
      'Patients get a full record with search, gender filters, a profile and a chronological medical timeline.',
      'Appointments are booked and managed with date and status filters, and a doctor can update the status inline.',
      'Prescriptions support multiple medicines and are rendered into a branded PDF with jsPDF, then uploaded to Cloudinary for download.',
      'Administrators, doctors and receptionists each get a dashboard with their own statistics and actions.',
    ],
    challenges: [
      'Writing Firestore security rules that hold up under three different roles without breaking the daily workflow.',
      'Producing a PDF that is legible and printable rather than a screenshot of a form.',
    ],
    results: [
      'A public deployment is live, and the repository is MIT licensed and public.',
    ],
    lessons: [
      'Role separation is only useful if the rules live in the database. Anything checked in the interface is a suggestion.',
      'Healthcare is a good test of information density, because the people using it are busy and the cost of confusion is high.',
    ],
    published: true,
  },
  {
    name: 'PromptAudit',
    slug: 'prompraudit',
    summary:
      'An AI tool that audits a website for SEO, GEO and AEO and generates the fix prompts for it.',
    description:
      'PromptAudit analyses a public URL and scores it across search, generative-engine and answer-engine visibility, technical health and accessibility. Every issue it finds comes back with a severity, an explanation of why it matters, and a ready-to-paste prompt that an AI coding agent can act on, turning an audit report into a list of instructions rather than a wall of advice.',
    category: 'product',
    status: 'prototype',
    started: undefined,
    updated: undefined,
    technologies: ['React', 'Node.js', 'AI APIs'],
    liveUrl: 'https://prompt-audit.lovable.app/',
    role: 'Solo build',
    statusNote:
      'The tool is in beta and the site states that free use is limited during the beta period. It is publicly reachable and usable.',
    contribution:
      'I built the crawler and analysis pipeline, the scoring model, and the prompt generation that turns findings into agent-ready instructions.',
    problem:
      'Auditing a site for how it will appear in search and in AI answers produces a long list of findings and no obvious next step. Most of the work is then manual anyway.',
    goals: [
      'Cover the whole surface at once: technical, accessibility, search, and how the site reads to AI systems.',
      'Make every score explainable rather than a single opaque number.',
      'Hand the user something they can act on immediately, not a report to interpret.',
    ],
    implementation: [
      'A single URL is crawled and analysed in one pass, covering SEO, generative and answer-engine coverage, technical health, accessibility and AI visibility.',
      'Scoring is weighted per category so a weakness in one area does not cancel out a strength in another.',
      'Each issue carries a severity, a reason, a business impact and a concrete fix.',
      'The generated prompts are written to be pasted directly into an AI coding agent such as Claude Code, Cursor, Codex CLI or Gemini CLI.',
    ],
    challenges: [
      'Making scores that mean something, rather than a number that is hard to act on.',
      'Turning a finding into a prompt that an agent can actually execute correctly without further explanation.',
    ],
    results: [
      'The application is publicly live and performs a full audit end to end.',
    ],
    lessons: [
      'The format of the output mattered more than the depth of the analysis. A finding that cannot be acted on is a finding that gets ignored.',
      'Treating AI-answer engines as a first-class target, alongside classic search, changed what the tool checks for.',
    ],
    featured: true,
    published: true,
  },
  {
    name: 'BuildLayout',
    slug: 'buildlayout',
    summary:
      'A browser-based floor plan editor for drawing houses to scale and exporting print-ready plans.',
    description:
      'BuildLayout is a 2D floor plan editor that runs entirely in the browser. You draw walls on a grid, drop in rooms and furniture, watch the areas and wall lengths update live, and export the result as a high-resolution image, a print-ready scaled sheet or a JSON project file. No account, no install: the work autosaves in the browser as you go.',
    category: 'web-app',
    status: 'in-development',
    started: undefined,
    updated: undefined,
    technologies: ['React', 'TypeScript'],
    liveUrl: 'https://buildplan-studio-web.lovable.app/',
    role: 'Solo build',
    contribution:
      'I built the editor: the geometry engine, the snapping and selection model, the template library, the cost estimate and the export pipeline.',
    problem:
      'A floor plan is the one deliverable in a building project that everyone needs and almost nobody can draw. Existing tools are either professional and expensive, or a drawing app that produces a picture rather than a plan.',
    goals: [
      'Make the drawing precise: real dimensions, not a picture of a house.',
      'Get from an idea to a shareable, printable plan in one sitting, with no software to install.',
      'Stay useful for a small builder who needs an estimate, not just a drawing.',
    ],
    implementation: [
      'Walls are drawn orthogonally with snap-to-grid, corner resize handles and rotation snapping in 15° steps, with a full undo history.',
      'Every wall, room and object carries a real dimension, and the units can be switched between feet and metres.',
      'Layers for walls, rooms, furniture and labels can be toggled independently.',
      'Live area, wall-run and fixture counts feed a rough build estimate across three finish levels.',
      'Exports include a high-resolution PNG, a print-ready A3 sheet that includes the scale, and a JSON project file.',
      'Starter layouts for 1BHK, 2BHK, 3BHK and studio plans are included, and the editor autosaves locally.',
    ],
    challenges: [
      'Keeping the geometry consistent while walls are dragged, resized and joined, and making the numbers stay correct.',
      'Doing all of it client-side, with no install step, without the editor becoming slow on a detailed plan.',
    ],
    results: [
      'The editor is publicly live and usable without an account, and it includes a working export pipeline.',
    ],
    lessons: [
      'Undo history is not a feature you add later. It is the thing that makes a direct-manipulation editor feel safe to explore.',
      'Starting from a template instead of a blank page was the single biggest change to how quickly people get to something useful.',
    ],
    published: true,
  },
  {
    name: 'QuizSpark',
    slug: 'quizspark',
    summary: 'An AI-powered quiz builder for creating, sharing and analysing quizzes.',
    description:
      'QuizSpark is a tool for building quizzes with the help of AI: a creator describes what they want to test, the tool helps put the questions together, and the results can be reviewed afterwards. It is built for educators, businesses and creators rather than only for classrooms.',
    category: 'web-app',
    status: 'in-development',
    started: undefined,
    updated: undefined,
    technologies: ['AI APIs'],
    liveUrl: 'https://quiz-spark-ai.base44.app/',
    role: 'Solo build',
    contribution:
      'I built the application, from the question generation flow through to sharing and result analysis.',
    problem:
      'Writing a good quiz takes far longer than it should, and the people who know the material best are usually the people with the least time to spend on question formatting.',
    goals: [
      'Cut the time between "I have content" and "I have a working quiz".',
      'Make the result useful to the creator afterwards, not only to the person taking the quiz.',
    ],
    implementation: [
      'Quizzes are created and customised in the browser and can be shared as a link.',
      'Results are analysed for the quiz creator once responses come in.',
    ],
    challenges: [
      'AI-generated questions need to be editable before they are published, otherwise quality is a matter of luck.',
    ],
    results: [
      'The application is publicly live.',
    ],
    published: true,
  },
  {
    name: 'ProdSpark',
    slug: 'prodspark',
    summary:
      'A community directory for discovering and reviewing AI tools, products and side projects.',
    description:
      'ProdSpark is a place to list and find the tools and side projects people are shipping. Creators submit a product, and anyone can browse, filter and review what is there.',
    category: 'web-app',
    status: 'prototype',
    started: '2026-02',
    updated: '2026-02',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Supabase',
      'Clerk',
      'Cloudinary',
    ],
    liveUrl: 'https://prodspark.vercel.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/prodspark',
    role: 'Solo build',
    contribution:
      'I built the directory: the listing and filtering interface, submissions, community reviews and the authentication flow.',
    problem:
      'Most of the interesting tools I come across are built by individuals, and they are scattered across launch platforms, newsletters and social posts. There is no calm place to find them.',
    goals: [
      'Make small products discoverable outside the launch-day cycle.',
      'Let creators describe what they made and let people find it by what it does.',
    ],
    implementation: [
      'Listings are filtered by category, and each one can be submitted by its creator.',
      'Community reviews sit alongside the listings.',
      'Clerk handles authentication and Supabase the data; Cloudinary stores uploaded media.',
    ],
    challenges: [
      'A directory is only as good as the quality of what is in it, which is a moderation problem before it is a technical one.',
    ],
    results: [
      'The application is publicly live, and the repository is public with an MIT licence stated in its README.',
    ],
    lessons: [
      'Marketplaces spend most of their effort on supply, not demand. Getting people to submit was harder than building the listing pages.',
    ],
    published: true,
  },
  {
    name: 'MealMint',
    slug: 'mealmint',
    summary:
      'A food delivery marketplace connecting customers with local restaurants.',
    description:
      'MealMint is a food delivery marketplace: customers browse local restaurants and place orders, while vendors and administrators get their own dashboards. It is a completed practice build, built to work through the full shape of a marketplace: supply, demand, ordering, fulfilment and role-based administration.',
    category: 'experiment',
    status: 'completed',
    started: '2026-02',
    updated: '2026-02',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap 5',
      'Firebase Authentication',
      'Cloud Firestore',
      'SweetAlert2',
    ],
    liveUrl: 'https://meal-mint.netlify.app/',
    repoUrl: 'https://github.com/FaizyabHussain07/Meal-Mint',
    role: 'Solo practice build',
    contribution:
      'I built the whole marketplace: customer ordering and tracking, vendor dashboard, admin dashboard and the role-based access control that separates them.',
    problem:
      'A marketplace is the clearest way to practise the parts of full-stack work that a single-role app never touches: ordering state, money-adjacent flows, and permissions that differ per participant.',
    goals: [
      'Practise building one system that serves customers, vendors and administrators at once.',
      'Model ordering as a state machine rather than a set of ad-hoc booleans.',
    ],
    implementation: [
      'Three roles (customer, vendor and admin), with access enforced by a dedicated role guard.',
      'Customers browse restaurants, build a cart and track their order.',
      'Vendors and administrators get their own dashboards for the parts of the flow they own.',
      'Firebase Authentication and Firestore Security Rules keep each role inside its own data.',
    ],
    challenges: [
      'Ordering state has to stay coherent across three dashboards that each see a different slice of the same order.',
    ],
    results: [
      'The build is deployed and publicly reachable, and the repository is MIT licensed.',
    ],
    lessons: [
      'Multi-role applications are where permission design gets tested. Single-role apps let you postpone the difficult part.',
      'Choosing a stack I already knew let me spend the time on the domain model instead of the tooling.',
    ],
    published: true,
  },
  {
    name: 'OpenFormio',
    slug: 'openformio',
    summary:
      'A proposed open-source, self-hosted version of the Formivo workflow.',
    description:
      'OpenFormio is a planned open-source version of the Formivo idea: a form endpoint you deploy yourself, with no built-in subscription flow, connecting to your own Supabase and Resend accounts and serving a fixed endpoint pattern that existing custom-coded forms can post to. It has been designed and scoped, but nothing has been built or published yet.',
    category: 'open-source',
    status: 'concept',
    technologies: [],
    role: 'Planned solo project',
    statusNote:
      'This is a design and scope only. There is no repository, no deployment and no working implementation yet.',
    contribution:
      'I scoped the product and wrote out the proposed implementation, including the endpoint pattern, the self-hosting model and the client-facing interface.',
    problem:
      'A hosted form service ties a developer to someone else\'s pricing, data handling and roadmap. The open question is how much of that value survives when the service is self-hosted.',
    goals: [
      'Let a developer deploy the whole thing themselves and own the data.',
      'Keep the endpoint pattern fixed and predictable so existing forms can be pointed at it.',
      'Leave the paid subscription layer out of the core.',
    ],
    implementation: [
      'The proposed model is self-hosted deployment with the user supplying their own Supabase and Resend accounts.',
      'Forms are identified by a stable identifier and a fixed endpoint pattern, so an existing form only needs its target URL changed.',
      'Submissions are stored in the user\'s own database and viewed through a simple bundled interface.',
    ],
    challenges: [
      'Making the self-hosted setup simple enough that the target user, a developer, is willing to do it.',
    ],
    lessons: [
      'The hosted version is a reasonable way to find out whether anyone wants the product at all. The open-source version only makes sense once that is answered.',
    ],
    published: true,
  },
]

/* -------------------------------------------------------------------------- */
/* Derived helpers                                                            */
/* -------------------------------------------------------------------------- */

export const projectStatusLabels: Record<ProjectStatus, string> = {
  concept: 'Concept',
  'in-development': 'In development',
  prototype: 'Prototype',
  completed: 'Completed',
  maintained: 'Maintained',
  archived: 'Archived',
}

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  product: 'Products & SaaS',
  'developer-tool': 'Developer tools',
  'open-source': 'Open source',
  'web-app': 'Web applications',
  academic: 'Academic projects',
  experiment: 'Experiments & prototypes',
}

/** Categories that actually have published records, in display order. */
export const projectCategoryOrder: ProjectCategory[] = [
  'product',
  'developer-tool',
  'open-source',
  'web-app',
  'academic',
  'experiment',
]

export const publishedProjects: Project[] = projects.filter((p) => p.published)

export const featuredProjects: Project[] = publishedProjects.filter(
  (p) => p.featured
)

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug)
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return publishedProjects
    .filter((p) => p.slug !== project.slug)
    .sort((a, b) => {
      const aScore = a.category === project.category ? 1 : 0
      const bScore = b.category === project.category ? 1 : 0
      if (aScore !== bScore) return bScore - aScore
      return a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}
