import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { ExperienceTimeline } from '@/components/content/experience-timeline'
import { experience } from '@/data/experience'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Experience & Independent Work · Faizyab Hussain',
  description:
    'The professional history of Faizyab Hussain: independent full-stack development, a three-month technology internship at Kohaq, and the DevWeaveX business initiative.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/work',
          name: 'Experience & Independent Work',
          description:
            'Professional experience, independent work, internships and business initiatives.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />

      <div className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Work"
            title="Experience and independent work"
            description="A chronological record of the work I have done, with the different kinds of work kept separate: employment, internships, independent product work and business initiatives."
          />
        </div>

        <Section className="mt-10 border-t-0 pt-0" title="Professional history">
          <ExperienceTimeline entries={experience} />
        </Section>

        <Section title="Services I have worked toward offering">
          <p className="mb-4 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
            Alongside my own products, I have worked toward offering development
            services to businesses. This is an area I am still forming, so I am
            not listing packages or prices here. If you are looking for
            something specific,{' '}
            <a href="/contact" className="link">
              get in touch
            </a>{' '}
            and we can work it out.
          </p>
          <ul className="max-w-2xl space-y-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
            {[
              'Business websites and responsive web development',
              'Website redesigns and landing pages',
              'Custom web applications and full-stack development',
              'AI-powered web experiences and AI API integration',
              'Basic technical SEO implementation',
            ].map((service) => (
              <li key={service} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  )
}
