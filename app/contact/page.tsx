import { ExternalLink } from '@/components/content/external-link'
import { LinkLike } from '@/components/content/link-like'
import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { ContactForm } from '@/components/content/contact-form'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Contact Faizyab Hussain',
  description:
    'Get in touch with Faizyab Hussain, an AI-focused full-stack developer and independent product builder based in Karachi, Pakistan.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/contact',
          name: 'Contact',
          description: 'Ways to get in touch with Faizyab Hussain.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <div className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Contact"
            title="Get in touch"
            description="I am always glad to hear from people building things, working on interesting problems, or simply wanting to compare notes. Email is the fastest way to reach me. If you would rather send a message through a form, there is one below."
          />
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="eyebrow border-b border-rule pb-3">Direct</h2>
          <dl className="mt-4">
            <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[0.9375rem] font-medium text-ink">Email</dt>
              <dd className="text-[0.9375rem]">
                <LinkLike href={`mailto:${profile.email}`}>
                  {profile.email}
                </LinkLike>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[0.9375rem] font-medium text-ink">LinkedIn</dt>
              <dd className="text-[0.9375rem]">
                <ExternalLink href={profile.links.linkedin}>
                  {profile.links.linkedin.replace('https://www.linkedin.com/in/', '')}
                </ExternalLink>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[0.9375rem] font-medium text-ink">GitHub</dt>
              <dd className="text-[0.9375rem]">
                <ExternalLink href={profile.links.github}>
                  {profile.links.github.replace('https://github.com/', '')}
                </ExternalLink>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[0.9375rem] font-medium text-ink">X</dt>
              <dd className="text-[0.9375rem]">
                <ExternalLink href={profile.links.x}>
                  {profile.links.x.replace('https://x.com/', '')}
                </ExternalLink>
              </dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[0.9375rem] font-medium text-ink">Based in</dt>
              <dd className="text-[0.9375rem] text-ink-secondary">
                {profile.location.city}, {profile.location.region},{' '}
                {profile.location.country}
              </dd>
            </div>
          </dl>
        </div>

        <Section title="Send a message" className="mt-12">
          <p className="mb-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
            If email feels like too much commitment for a first note, use the
            form below. It sends straight to my inbox through FormSubmit, so
            there is no separate sign-up.
          </p>
          <div className="rounded-sm border border-rule bg-surface/40 p-6 sm:p-8">
            <ContactForm />
          </div>
        </Section>

        <Section title="What I am glad to talk about" className="mt-12">
          <ul className="max-w-2xl space-y-2 text-[1.0625rem] leading-relaxed text-ink-secondary">
            {[
              'Software projects, especially where AI is genuinely part of the product.',
              'Full-stack and AI engineering work, in a team or as a collaborator.',
              'Remote roles, internships and freelance engagements.',
              'Reviewing a project, a piece of code, or an idea that needs a second opinion.',
              'Anything about how I work, how I learn, or what I have built.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-[3px] shrink-0 self-start rounded-full bg-ink-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
            A note on this site: it is a personal archive, not a business. The
            form sends to my inbox and only me. Nothing you write here is
            collected by a third party.
          </p>
        </Section>
      </div>
    </>
  )
}
