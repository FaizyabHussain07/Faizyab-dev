import Link from 'next/link'

import { ExternalLink } from '@/components/content/external-link'
import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { now } from '@/data/now'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Now · Faizyab Hussain',
  description:
    'What Faizyab Hussain is working on, learning and looking for right now.',
  path: '/now',
})

export default function NowPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/now',
          name: 'Now',
          description: 'What I am working on, learning and looking for right now.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Now', path: '/now' },
        ])}
      />

      <div className="measure">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Now"
            title="What I'm working on right now"
            description={now.intro}
            meta={
              <p className="text-[0.8125rem] text-ink-muted">
                Last updated{' '}
                <time dateTime={now.lastUpdated}>
                  {new Date(`${now.lastUpdated}T00:00:00Z`).toLocaleDateString(
                    'en-GB',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'UTC',
                    }
                  )}
                </time>
              </p>
            }
          />
        </div>

        <Section title="Working on" className="mt-10">
          <ul className="max-w-2xl space-y-5">
            {now.workingOn.map((item) => (
              <li key={item.title} className="border-b border-rule pb-5 last:border-b-0 last:pb-0">
                <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em]">
                  {item.href.startsWith('http') ? (
                    <ExternalLink href={item.href}>{item.title}</ExternalLink>
                  ) : (
                    <Link href={item.href} className="link">
                      {item.title}
                    </Link>
                  )}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Learning">
          <ul className="max-w-2xl space-y-2 text-[1.0625rem] leading-relaxed text-ink-secondary">
            {now.learning.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Exploring">
          <ul className="max-w-2xl space-y-2 text-[1.0625rem] leading-relaxed text-ink-secondary">
            {now.exploring.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Looking for">
          <ul className="max-w-2xl space-y-2 text-[1.0625rem] leading-relaxed text-ink-secondary">
            {now.lookingFor.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
            The{' '}
            <Link href="/uses" className="link">
              uses page
            </Link>{' '}
            covers the tools behind all of this.
          </p>
        </Section>
      </div>
    </>
  )
}
