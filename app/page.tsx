import Link from 'next/link'

import { ExternalLink } from '@/components/content/external-link'
import { JsonLd } from '@/components/content/json-ld'
import { ProjectRow } from '@/components/content/project-row'
import { Section } from '@/components/content/section'
import { WritingEmptyState } from '@/components/content/article-list'
import { Introduction } from '@/components/profile/introduction'
import { experience } from '@/data/experience'
import { featuredProjects } from '@/data/projects'
import { profile } from '@/data/profile'
import { getPublishedArticles } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { webPageSchema } from '@/lib/structured-data'
import { SITE } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Faizyab Hussain · AI-Focused Developer & Product Builder',
  description:
    'Faizyab Hussain is a developer and independent product builder from Karachi, Pakistan, studying Artificial Intelligence and building web applications, developer tools, and AI-powered products.',
  path: '/',
  openGraph: {
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Faizyab Hussain — AI-Focused Developer & Product Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
})

export default function HomePage() {
  const articles = getPublishedArticles().slice(0, 3)
  const recentExperience = experience.slice(0, 4)

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/',
          name: 'Faizyab Hussain · AI-Focused Developer & Product Builder',
          description:
            'Personal website, project archive and writing by Faizyab Hussain, an AI-focused full-stack developer based in Karachi, Pakistan.',
        })}
      />

      <div className="measure container-safe">
        {/* Section A: introduction */}
        <div className="py-12 sm:py-16">
          <Introduction />

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] sm:pl-32">
            {profile.resume ? (
              <a
                href={profile.resume}
                className="link"
                download
                aria-label="Download resume"
              >
                Resume
              </a>
            ) : null}
            <a
              href={SITE.resumePdf}
              className="link font-medium"
              aria-label="Download resume (PDF)"
            >
              Resume (PDF)
            </a>
            <ExternalLink href={profile.links.github} className="link">
              GitHub
            </ExternalLink>
            <ExternalLink href={profile.links.linkedin} className="link">
              LinkedIn
            </ExternalLink>
            <ExternalLink href={profile.links.email} className="link">
              Email
            </ExternalLink>
          </div>
        </div>

        {/* Section B: about */}
        <Section id="about" title="About" action={{ label: 'More about me', href: '/about' }}>
          <div className="max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed text-ink-secondary">
            <p>
              I&apos;m a developer working across full-stack development and
              AI-powered applications, and I&apos;m currently studying Artificial
              Intelligence at Dawood University of Engineering &amp; Technology.
            </p>
            <p>
              Most of what I know about building software, I learned by
              building it: shipping small products, reading a lot of code,
              and writing down what I found. This site is where I keep that
              record.
            </p>
          </div>
        </Section>

        {/* Section C: selected projects */}
        <Section
          id="projects"
          title="Selected projects"
          action={{ label: 'View all projects', href: '/projects' }}
        >
          <p className="mb-6 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
            A few of the things I have built. Each one has its own page with the
            problem, the implementation, and what I learned. Not a showcase,
            just the record.
          </p>
          <div>
            {featuredProjects.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </div>
        </Section>

        {/* Section D: recent writing */}
        <Section id="writing" title="Recent writing" action={{ label: 'All writing', href: '/writing' }}>
          {articles.length === 0 ? (
            <WritingEmptyState />
          ) : (
            <ol className="border-t border-rule">
              {articles.map((article) => (
                <li key={article.slug} className="border-b border-rule py-5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em]">
                      <Link
                        href={`/writing/${article.slug}`}
                        className="text-ink underline decoration-rule decoration-1 underline-offset-[0.2em] transition-colors hover:text-link hover:decoration-link"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <time
                      dateTime={article.date}
                      className="shrink-0 text-[0.8125rem] text-ink-muted"
                    >
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-secondary">
                    {article.description}
                  </p>
                  <p className="mt-2 text-[0.8125rem] text-ink-muted">
                    {article.category} · {article.minutes} min read
                  </p>
                </li>
              ))}
            </ol>
          )}
        </Section>

        {/* Section E: experience preview */}
        <Section id="work" title="Experience" action={{ label: 'Full history', href: '/work' }}>
          <div className="max-w-2xl space-y-5">
            {recentExperience.map((entry) => (
              <div key={entry.id} className="border-b border-rule pb-5 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em] text-ink">
                    {entry.organization}
                    <span className="text-ink-secondary"> · {entry.role}</span>
                  </h3>
                  <p className="shrink-0 text-[0.8125rem] text-ink-muted">
                    {entry.period}
                  </p>
                </div>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-secondary">
                  {entry.summary}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Closing */}
        <Section id="contact">
          <div className="max-w-2xl">
            <p className="text-[1.0625rem] leading-relaxed text-ink-secondary">
              Thanks for stopping by. If you&apos;re building something interesting,
              have a question, or simply want to connect, feel free to reach out.
            </p>
            <p className="mt-4">
              <Link href="/contact" className="link text-[1.0625rem]">
                Get in touch
              </Link>
            </p>
          </div>
        </Section>
      </div>
    </>
  )
}
