import type { SkillGroup } from '@/lib/types'

/**
 * Technical skills, grouped by how they are actually used.
 *
 * There are deliberately no proficiency percentages. Each group points at the
 * projects that demonstrate it, so a claim can always be checked.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    description:
      'The languages I reach for most often, and the ones I am actively growing.',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'],
    demonstratedBy: ['paste-link-pro', 'clinicflow', 'mealmint'],
  },
  {
    category: 'Frontend',
    description:
      'Interface work, from static pages to full server-rendered applications.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Vite'],
    demonstratedBy: ['telecloud', 'formivo', 'web-template-hub'],
  },
  {
    category: 'Backend & APIs',
    description:
      'Server-side logic, request handling and the contracts between front and back end.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Serverless functions'],
    demonstratedBy: ['paste-link-pro', 'formivo', 'mealmint'],
  },
  {
    category: 'Data & backend services',
    description:
      'Databases and managed backends I have used in real projects.',
    skills: [
      'PostgreSQL',
      'Supabase',
      'Firebase',
      'Firestore',
      'MongoDB',
      'MySQL',
      'Convex',
      'Appwrite',
    ],
    demonstratedBy: ['telecloud', 'formivo', 'slik', 'clinicflow'],
  },
  {
    category: 'AI & product development',
    description:
      'Integrating existing models into products, and taking a product from idea to deployment.',
    skills: [
      'AI API integration',
      'LLM-powered application workflows',
      'AI-assisted product features',
      'Full-stack product development',
      'Product prototyping',
      'Application deployment',
    ],
    demonstratedBy: ['prompraudit', 'quizspark', 'formivo'],
  },
  {
    category: 'Tools & infrastructure',
    description: 'The day-to-day toolkit.',
    skills: ['Git', 'GitHub', 'Vercel', 'Netlify', 'npm', 'Cloudflare'],
    demonstratedBy: ['paste-link-pro', 'telecloud', 'web-template-hub'],
  },
]
