import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { uses } from '@/data/uses'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Uses · Faizyab Hussain',
  description:
    'The editor, languages, hosting, AI tools and hardware Faizyab Hussain actually works with every day.',
  path: '/uses',
})

export default function UsesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/uses',
          name: 'Uses',
          description: 'The tools and setup used for daily development work.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Uses', path: '/uses' },
        ])}
      />

      <div className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Uses"
            title="Tools and setup"
            description={uses.intro}
            meta={
              <p className="text-[0.8125rem] text-ink-muted">
                Last updated{' '}
                <time dateTime={uses.lastUpdated}>
                  {new Date(`${uses.lastUpdated}T00:00:00Z`).toLocaleDateString(
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

        {uses.groups.map((group) => (
          <Section key={group.category} title={group.category}>
            {group.items.length > 0 ? (
              <dl className="max-w-2xl">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid gap-1 border-b border-rule py-3.5 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:gap-6"
                  >
                    <dt className="text-[0.9375rem] font-medium text-ink">
                      {item.name}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink-secondary">
                      {item.note}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {'note' in group && group.note ? (
              <p className="max-w-2xl border-l-2 border-rule pl-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                {group.note}
              </p>
            ) : null}
          </Section>
        ))}
      </div>
    </>
  )
}
