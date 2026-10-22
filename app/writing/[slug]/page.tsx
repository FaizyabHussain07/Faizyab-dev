import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'

import { JsonLd } from '@/components/content/json-ld'
import { createMdxComponents } from '@/components/content/prose'
import {
  extractHeadings,
  getArticleBySlug,
  getPublishedArticleSlugs,
  getRelatedArticles,
} from '@/lib/content'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getPublishedArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: 'Article not found' }
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/writing/${article.slug}`,
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt,
    tags: article.tags,
  })
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  const headings = extractHeadings(article.body)
  const showToc = headings.length >= 3
  const related = getRelatedArticles(article, 2)

  const { content } = await compileMDX({
    source: article.body,
    components: createMdxComponents(),
    options: {
      parseFrontmatter: false,
    },
  })

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: `/writing/${article.slug}`,
          name: article.title,
          description: article.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/writing' },
          { name: article.title, path: `/writing/${article.slug}` },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/writing/${article.slug}`,
          date: article.date,
          updatedAt: article.updatedAt,
          keywords: article.tags,
        })}
      />

      <article className="measure">
        <div className="pt-12 sm:pt-16">
          <p className="eyebrow">{article.category}</p>

          <h1 className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
            {article.title}
          </h1>

          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
            {article.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-y border-rule py-3.5 text-[0.8125rem] text-ink-muted">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {article.updatedAt ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated{' '}
                  <time dateTime={article.updatedAt}>
                    {formatDate(article.updatedAt)}
                  </time>
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{article.minutes} min read</span>
          </div>
        </div>

        {showToc ? (
          <nav aria-labelledby="toc-heading" className="mt-10">
            <h2
              id="toc-heading"
              className="eyebrow border-b border-rule pb-3"
            >
              On this page
            </h2>
            <ol className="mt-3 space-y-1.5 text-[0.9375rem]">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={heading.depth === 3 ? 'pl-4' : undefined}
                >
                  <a href={`#${heading.id}`} className="link-subtle hover:text-ink">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="prose mt-10 max-w-2xl">{content}</div>

        {article.tags.length > 0 ? (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-rule pt-6">
            <span className="eyebrow mr-1">Tagged</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-rule px-2.5 py-1 text-[0.8125rem] text-ink-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-10 border-t border-rule pt-8">
            <h2 className="eyebrow">Related reading</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/writing/${item.slug}`} className="link">
                    {item.title}
                  </Link>
                  <span className="ml-2 text-[0.8125rem] text-ink-muted">
                    {formatDate(item.date)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-10 border-t border-rule pt-6">
          <Link href="/writing" className="link-subtle text-[0.9375rem]">
            ← Back to writing
          </Link>
        </div>
      </article>
    </>
  )
}
