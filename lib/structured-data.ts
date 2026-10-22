import type { Project } from '@/lib/types'
import { profile } from '@/data/profile'
import { SITE, SITE_URL } from '@/lib/site'

/**
 * Schema.org structured data.
 *
 * Only verified public information is emitted. There are no ratings, reviews,
 * prices, awards or aggregate scores anywhere in this file, because none of
 * those would be true.
 */

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    url: SITE_URL,
    description: profile.bio,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    image: `${SITE_URL}/images/profile-placeholder.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: profile.location.countryCode,
    },
    knowsAbout: [
      'Full-stack web development',
      'Artificial Intelligence',
      'Developer tools',
      'SaaS products',
      'API integration',
    ],
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.x,
      profile.links.portfolio,
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': `${SITE_URL}/#person` },
  }
}

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    inLanguage: SITE.language,
  }
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

/**
 * FAQ structured data (AEO): used on pages that publish a real Q&A block.
 */
export function faqSchema(
  questions: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function articleSchema({
  title,
  description,
  path,
  date,
  updatedAt,
  keywords,
}: {
  title: string
  description: string
  path: string
  date: string
  updatedAt?: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}${path}#article`,
    mainEntityOfPage: { '@id': `${SITE_URL}${path}#webpage` },
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished: date,
    dateModified: updatedAt ?? date,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    keywords: keywords.join(', '),
    inLanguage: SITE.language,
    isAccessibleForFree: true,
  }
}

/**
 * `SoftwareApplication` is only used where the project really is an
 * application with a user-facing interface. It deliberately carries no
 * aggregate rating or offer data.
 */
export function softwareApplicationSchema(project: Project) {
  if (!project.liveUrl) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.summary,
    url: project.liveUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    author: { '@id': `${SITE_URL}/#person` },
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
  }
}
