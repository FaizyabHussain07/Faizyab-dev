import type { EducationEntry } from '@/lib/types'

/**
 * Education and training.
 *
 * Only what has been confirmed is published. Academic marks are intentionally
 * left out of the public site. See README, "Content still to add", for why.
 */

export const education: EducationEntry[] = [
  {
    id: 'duet-bs-ai',
    institution: 'Dawood University of Engineering & Technology (DUET)',
    program: 'BS Artificial Intelligence',
    kind: 'degree',
    period: '2026 – Present',
    startDate: '2026',
    endDate: null,
    status: 'studying',
    detail:
      'An ongoing bachelor\'s degree in Artificial Intelligence. This is the current academic direction of my work.',
    notes: [
      'The degree is in progress, so no completion date is published.',
    ],
  },
  {
    id: 'smit-web-app-development',
    institution: 'SMIT',
    program: 'Web & App Development',
    kind: 'training',
    period: 'September 2024 – January 2026',
    startDate: '2024-09',
    endDate: '2026-01',
    status: 'completed',
    detail:
      'A structured training programme in web and app development, covering the fundamentals of the interface, the server and the database, and the full workflow of taking a project from idea to deployment.',
    notes: [
      'This was professional training, not a university degree.',
    ],
  },
  {
    id: 'sirajuddullah-gdc-ics',
    institution: 'Sirajuddullah Government Degree College',
    program: 'Intermediate Computer Science (ICS)',
    kind: 'secondary',
    period: 'September 2024 – June 2026',
    startDate: '2024-09',
    endDate: '2026-06',
    status: 'incomplete',
    detail: 'Intermediate level study in computer science.',
    notes: [
      'The completion status of this qualification is still being confirmed, so it is listed as in progress rather than as a finished qualification.',
    ],
  },
  {
    id: 'happy-palace-matriculation',
    institution: 'Happy Palace Group of Schools',
    program: 'Matriculation',
    kind: 'secondary',
    period: 'August 2022 – May 2024',
    startDate: '2022-08',
    endDate: '2024-05',
    status: 'completed',
    detail: 'Secondary school matriculation.',
  },
]

export const educationStatusLabels: Record<EducationEntry['status'], string> = {
  studying: 'Studying',
  completed: 'Completed',
  incomplete: 'Status being confirmed',
  unverified: 'Not verified',
}
