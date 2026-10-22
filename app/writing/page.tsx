import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { ArticleList } from '@/components/content/article-list'
import { getPublishedArticles } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Writing & Technical Notes · Faizyab Hussain',
  description:
    'Technical notes, build logs and longer writing from Faizyab Hussain, documenting what he learns while building web applications, developer tools and AI-powered products.',
  path: '/writing',
})

export default function WritingPage() {
  const articles = getPublishedArticles()

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/writing',
          name: 'Writing & Technical Notes',
          description:
            'Technical notes, build logs and longer writing about software, AI and building products.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/writing' },
        ])}
      />

      <div className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Writing"
            title="Writing and technical notes"
            description="Notes from building: what I tried, what broke, and what I would do differently. Practical write-ups on full-stack development, AI integration, security and shipping products, so the archive keeps growing."
          />
        </div>

        <div className="mt-10">
          <ArticleList articles={articles} />
        </div>
      </div>
    </>
  )
}
