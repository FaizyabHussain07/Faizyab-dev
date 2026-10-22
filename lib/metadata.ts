import type { Metadata } from 'next'

import { SITE, SITE_URL } from '@/lib/site'

/**
 * Page metadata helpers.
 *
 * Every page builds its metadata through these helpers so that the canonical
 * URL, the Open Graph card and the Twitter card can never disagree.
 */

type MetadataInput = {
  title: string
  description: string
  /** Site-relative path, e.g. "/projects/formivo". */
  path: string
  /** "website" for listings, "article" for posts. */
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  images?: string[]
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  images,
  noIndex,
}: MetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString()
  const ogImages = images?.length
    ? images.map((image) => ({
        url: new URL(image, SITE_URL).toString(),
        width: 1200,
        height: 630,
        alt: title,
      }))
    : [
        {
          url: new URL('/og-image.png', SITE_URL).toString(),
          width: 1200,
          height: 630,
          alt: `${SITE.name} · ${SITE.title}`,
        },
      ]

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      title,
      description,
      locale: SITE.locale,
      images: ogImages,
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors: [SITE.author],
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  }
}
