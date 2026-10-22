import type { ExperienceEntry } from '@/lib/types'

/**
 * Professional experience.
 *
 * Employment, internships, independent work and business initiatives are kept
 * as separate records with their own labels. Nothing here is inferred: where a
 * date was never confirmed, `startDate` is null and the `period` says so.
 */

export const experience: ExperienceEntry[] = [
  {
    id: 'devweavex-role',
    organization: 'DevWeaveX',
    role: 'Full-Stack Developer | AI Product Builder',
    kind: 'business',
    period: 'Dec 2025 – Present',
    startDate: '2025-12',
    endDate: null,
    remote: true,
    summary:
      'Building and shipping AI-powered SaaS products, developer tools, and full-stack web applications from idea to production. Owning product development end-to-end across frontend, backend, databases, authentication, deployment, and user-driven iteration.',
    responsibilities: [
      'Working with React, Next.js, TypeScript, Node.js, PostgreSQL, and modern AI integrations.',
      'Shipping continuously, validating ideas, and improving products based on user feedback.',
    ],
  },
  {
    id: 'kohaq-internship',
    organization: 'Kohaq',
    role: 'Web Dev Intern',
    kind: 'internship',
    period: 'Aug 2025 – Oct 2025',
    startDate: '2025-08',
    endDate: '2025-10',
    remote: true,
    fixedTerm: true,
    summary:
      'Contributed to frontend and backend development tasks using HTML, CSS, JavaScript, React, and Git within a collaborative environment.',
    responsibilities: [
      'Implemented new features and resolved bugs.',
      'Gained hands-on experience in agile workflows, modern software engineering practices, and production-ready teamwork.',
    ],
  },
  {
    id: 'self-employed',
    organization: 'Self-Employed',
    role: 'Full-Stack Developer',
    kind: 'freelance',
    period: 'Sep 2024 – Jul 2025',
    startDate: '2024-09',
    endDate: '2025-07',
    location: 'Karachi, Pakistan',
    remote: true,
    summary:
      'Designed and shipped responsive websites, dashboards, and full-stack web applications for clients and personal projects, owning projects from requirements and UI development through backend, deployment, SEO, and performance optimization.',
    responsibilities: [
      'Built production-ready solutions using React, Next.js, Node.js, and modern databases.',
      'Focused on usability, accessibility, performance, and delivering according to project requirements.',
    ],
  },
  {
    id: 'faizyab-alquran',
    organization: 'Faizyab Al-Quran',
    role: 'Platform Developer',
    kind: 'independent',
    period: 'Jul 2024 – Oct 2025',
    startDate: '2024-07',
    endDate: '2025-10',
    remote: true,
    summary:
      'Designed and developed an online learning platform for Quranic and academic education, with responsive user interfaces and student management features.',
    responsibilities: [
      'Built a seamless learning experience for students.',
      'Managed platform updates, content organization, and continuous improvements to enhance student learning.',
    ],
  },
]

export const experienceKindLabels: Record<ExperienceEntry['kind'], string> = {
  employment: 'Employment',
  internship: 'Internship',
  freelance: 'Freelance',
  independent: 'Independent work',
  business: 'Business initiative',
  education: 'Education',
  training: 'Training',
}
