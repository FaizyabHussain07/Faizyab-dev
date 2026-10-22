import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ExternalLink } from '@/components/content/external-link'
import { JsonLd } from '@/components/content/json-ld'
import { StatusBadge } from '@/components/content/status-badge'
import { Section } from '@/components/content/section'
import { projectCategoryLabels, publishedProjects } from '@/data/projects'
import { getArticleBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'
import { projectImage } from '@/lib/project-images'
import {
  breadcrumbSchema,
  softwareApplicationSchema,
  webPageSchema,
} from '@/lib/structured-data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = publishedProjects.find((item) => item.slug === slug)

  if (!project) {
    return { title: 'Project not found' }
  }

  return buildMetadata({
    title: `${project.name} · Faizyab Hussain`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: 'article',
  })
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = publishedProjects.find((item) => item.slug === slug)

  if (!project) notFound()

  const heroImage = projectImage(project.slug)

  const relatedArticles = (project.relatedArticles ?? [])
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))

  const relatedProjects = publishedProjects
    .filter((item) => item.slug !== project.slug)
    .filter(
      (item) =>
        item.category === project.category ||
        item.technologies.some((technology) =>
          project.technologies.includes(technology)
        )
    )
    .slice(0, 3)

  const appSchema = softwareApplicationSchema(project)

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: `/projects/${project.slug}`,
          name: project.name,
          description: project.summary,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />
      {appSchema ? <JsonLd data={appSchema} /> : null}

      <article className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          {heroImage ? (
            <div className="mb-8 overflow-hidden rounded-md border border-rule bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={`${project.name} product screenshot`}
                className="h-auto w-full object-cover"
                fetchPriority="high"
              />
            </div>
          ) : null}

          <p className="eyebrow">
            {projectCategoryLabels[project.category]}
            {project.alternateNames?.length
              ? ` · also known as ${project.alternateNames.join(', ')}`
              : ''}
          </p>

          <h1 className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
            {project.name}
          </h1>

          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-rule py-4">
            <StatusBadge status={project.status} />
            {project.started ? (
              <span className="text-[0.8125rem] text-ink-muted">
                Started {project.started}
              </span>
            ) : null}
            {project.updated ? (
              <span className="text-[0.8125rem] text-ink-muted">
                Last updated {project.updated}
              </span>
            ) : null}
            <span className="text-[0.8125rem] text-ink-muted">
              {project.role}
            </span>
          </div>

          {project.statusNote ? (
            <p className="mt-6 max-w-2xl border-l-2 border-rule pl-4 text-[0.9375rem] leading-relaxed text-ink-secondary">
              {project.statusNote}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem]">
            {project.liveUrl ? (
              <ExternalLink href={project.liveUrl}>Live site</ExternalLink>
            ) : null}
            {project.repoUrl ? (
              <ExternalLink href={project.repoUrl}>Source code</ExternalLink>
            ) : null}
            {project.extraLinks?.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
            {!project.liveUrl && !project.repoUrl ? (
              <span className="text-ink-muted">
                {project.unavailableNote ?? 'No public link yet.'}
              </span>
            ) : null}
          </div>
        </div>

        {project.technologies.length > 0 ? (
          <Section title="Technologies">
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-rule px-2.5 py-1 text-[0.8125rem] text-ink-secondary"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {project.problem ? (
          <Section title="Context and problem">
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
              {project.problem}
            </p>
          </Section>
        ) : null}

        {project.goals?.length ? (
          <Section title="Goals">
            <BulletList items={project.goals} />
          </Section>
        ) : null}

        <Section title="My contribution">
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
            {project.contribution}
          </p>
        </Section>

        {project.implementation?.length ? (
          <Section title="Implementation details">
            <BulletList items={project.implementation} />
          </Section>
        ) : null}

        {project.challenges?.length ? (
          <Section title="Challenges and trade-offs">
            <BulletList items={project.challenges} />
          </Section>
        ) : null}

        {project.results?.length ? (
          <Section title="Results">
            <BulletList items={project.results} />
          </Section>
        ) : null}

        {project.lessons?.length ? (
          <Section title="Lessons learned">
            <BulletList items={project.lessons} />
          </Section>
        ) : null}

        {relatedArticles.length > 0 ? (
          <Section title="Related writing">
            <ul className="space-y-3">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/writing/${article.slug}`} className="link">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {relatedProjects.length > 0 ? (
          <Section title="Related projects">
            <ul className="space-y-3">
              {relatedProjects.map((item) => (
                <li
                  key={item.slug}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <Link href={`/projects/${item.slug}`} className="link">
                    {item.name}
                  </Link>
                  <span className="text-[0.8125rem] text-ink-muted">
                    {item.summary}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section>
          <Link href="/projects" className="link-subtle text-[0.9375rem]">
            ← Back to all projects
          </Link>
        </Section>
      </article>
    </>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-2xl space-y-2 text-[1.0625rem] leading-relaxed text-ink-secondary">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
