/**
 * Shared domain types.
 *
 * These types are the contract between the data files and the components.
 * Adding a new project or article should never require editing a component.
 */

export type ProjectStatus =
  | 'concept'
  | 'in-development'
  | 'prototype'
  | 'completed'
  | 'maintained'
  | 'archived'

export type ProjectCategory =
  | 'product'
  | 'developer-tool'
  | 'open-source'
  | 'web-app'
  | 'academic'
  | 'experiment'

export type Project = {
  name: string
  /** Stable URL segment: /projects/<slug> */
  slug: string
  /** One-sentence description used in listings. */
  summary: string
  /** Short paragraph shown at the top of the detail page. */
  description: string
  category: ProjectCategory
  status: ProjectStatus
  /** ISO date (YYYY-MM) when the work started. Omit when unknown. */
  started?: string
  /** ISO date (YYYY-MM) of the last verified change. */
  updated?: string
  /** Technologies actually used in this project. */
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
  /** Short note explaining a missing link, shown instead of a dead anchor. */
  unavailableNote?: string
  /** Additional verified links (npm package, docs, mirrors). */
  extraLinks?: { label: string; href: string }[]
  role: string
  /** What I personally built and why. */
  contribution: string
  /** The problem the project addresses. */
  problem?: string
  goals?: string[]
  /** Notable implementation decisions. */
  implementation?: string[]
  challenges?: string[]
  /** Verified outcomes only. Never invented metrics. */
  results?: string[]
  lessons?: string[]
  /** Slugs of related writing. */
  relatedArticles?: string[]
  /** Alternate names this project has also been known by. */
  alternateNames?: string[]
  /** Shown on the homepage. */
  featured?: boolean
  /** Honest clarification of what is and is not live. */
  statusNote?: string
  /** Set false to keep a record out of the public archive. */
  published: boolean
}

export type ExperienceKind =
  | 'employment'
  | 'internship'
  | 'freelance'
  | 'independent'
  | 'business'
  | 'education'
  | 'training'

export type ExperienceEntry = {
  id: string
  organization: string
  role: string
  kind: ExperienceKind
  /** Human readable range, e.g. "September 2024 – Present". */
  period: string
  /** ISO start date used for sorting. Null when the date is not confirmed. */
  startDate: string | null
  /** ISO end date, or null when ongoing / not confirmed. */
  endDate: string | null
  location?: string
  /** True when the entry is a remote engagement. */
  remote?: boolean
  /** True when the duration was described as a fixed term. */
  fixedTerm?: boolean
  summary: string
  responsibilities?: string[]
  accomplishments?: string[]
  /** Links relevant to this entry. */
  links?: { label: string; href: string }[]
  /** Separate from `accomplishments`: work explicitly not completed. */
  statusNote?: string
}

export type EducationEntry = {
  id: string
  institution: string
  program: string
  kind: 'degree' | 'training' | 'secondary'
  /** Human readable period. */
  period: string
  startDate: string | null
  endDate: string | null
  /** 'studying' while ongoing, 'completed' when finished, 'incomplete' otherwise. */
  status: 'studying' | 'completed' | 'incomplete' | 'unverified'
  detail?: string
  /** Publicly published result. Left out unless explicitly useful. */
  result?: string
  notes?: string[]
}

export type SkillGroup = {
  category: string
  /** One-line framing of how these skills are actually used. */
  description?: string
  skills: string[]
  /** Projects that demonstrate the group. Project slugs. */
  demonstratedBy?: string[]
}

export type ArticleFrontmatter = {
  title: string
  description: string
  date: string
  updatedAt?: string
  category: string
  tags: string[]
  published: boolean
  slug: string
  /** Optional override; otherwise computed from the body. */
  readingTime?: number
}
