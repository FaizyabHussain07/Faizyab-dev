import type { MetadataRoute } from 'next'

import { publishedProjects } from '@/data/projects'
import { getPublishedArticles } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

/**
 * The XML sitemap.
 *
 * Only public URLs are listed. Unpublished drafts never reach this file, and
 * every URL is absolute against the canonical domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE_URL}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/writing`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/now`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/uses`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const projectPages: MetadataRoute.Sitemap = publishedProjects.map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.updated
        ? new Date(`${project.updated}-01T00:00:00Z`)
        : undefined,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })
  )

  const articlePages: MetadataRoute.Sitemap = getPublishedArticles().map(
    (article) => ({
      url: `${SITE_URL}/writing/${article.slug}`,
      lastModified: new Date(
        `${article.updatedAt ?? article.date}T00:00:00Z`
      ),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })
  )

  return [...staticPages, ...projectPages, ...articlePages]
}
