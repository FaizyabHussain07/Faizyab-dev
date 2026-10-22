import Link from 'next/link'

import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Services · What I can build for you · Faizyab Hussain',
  description:
    'AI product development, full-stack web development, SaaS development, AI integration, business systems, modern websites, redesigns and landing pages, built by Faizyab Hussain.',
  path: '/services',
})

type Service = {
  title: string
  description: string
  audience: string
  expect: string
  href?: string
}

const services: Service[] = [
  {
    title: 'AI Product Development',
    description:
      'I build AI-powered applications, SaaS products and intelligent workflows from concept to deployment. Whether you need a standalone AI product or AI features integrated into an existing system, I handle the full development lifecycle: data pipeline design, frontend interfaces and API architecture.',
    audience:
      'Founders building AI products, SaaS companies adding AI features, businesses looking to automate with AI.',
    expect:
      'A production-ready AI application built with modern frameworks, designed for real users and real data.',
    href: '/contact',
  },
  {
    title: 'Full-Stack Web Development',
    description:
      'Complete web applications built with modern frameworks, from frontend interfaces to backend APIs, databases, authentication and deployment. Every application is production-ready, tested and built with scalability in mind.',
    audience:
      'Businesses needing custom web applications, startups building their first product, teams needing internal tools.',
    expect:
      'A complete application with frontend, backend, database, authentication and deployment, ready for users.',
    href: '/contact',
  },
  {
    title: 'SaaS Development',
    description:
      'End-to-end SaaS product development, from initial concept and MVP to a production-ready application with authentication, billing, dashboards and analytics. Built with modern, scalable architectures that grow with your product.',
    audience:
      'SaaS founders, startups with a product idea, businesses transitioning to subscription models.',
    expect:
      'A complete SaaS product with the core features needed to launch and start acquiring users.',
  },
  {
    title: 'AI Integration',
    description:
      'Enhance existing products with practical AI capabilities, from LLM-powered content generation to intelligent data processing and automated workflows. I focus on AI features that deliver genuine value, not just novelty.',
    audience:
      'Existing products that could benefit from AI, businesses with data processing needs, teams wanting to automate workflows.',
    expect:
      'Practical AI features that improve your product and save your users time.',
    href: '/contact',
  },
  {
    title: 'Business Systems',
    description:
      "When off-the-shelf software doesn't fit, I build custom business systems: CRM-style tools, booking platforms, internal dashboards and workflow applications tailored to your exact requirements.",
    audience:
      'Businesses with unique workflows, clinics needing patient management, teams needing internal tools.',
    expect:
      'A custom-built system designed around your actual workflow, not forced into a generic template.',
  },
  {
    title: 'Modern Website Development',
    description:
      'Professional, responsive websites built for conversion. Whether you need a corporate site, a local business presence or a brand showcase, every site is fast, mobile-first and designed to turn visitors into customers.',
    audience:
      'Businesses, startups, local brands, companies needing a professional web presence.',
    expect:
      'A fast, responsive, conversion-focused website that represents your brand professionally.',
    href: '/contact',
  },
  {
    title: 'Website Redesign',
    description:
      "Modernize outdated websites with better UX, responsive design, performance and modern frameworks. I keep what works, rebuild what doesn't and ensure the result is faster, more professional and easier to maintain.",
    audience:
      'Businesses with outdated websites, companies that have outgrown their current design, brands needing a refresh.',
    expect:
      'A modern, responsive redesign that improves user experience and performance while maintaining your brand.',
    href: '/contact',
  },
  {
    title: 'Landing Pages',
    description:
      'High-quality landing pages for products, startups, campaigns and businesses. Focused on conversion, with clear messaging, strong CTAs and responsive design that works on every device.',
    audience: 'Product launches, marketing campaigns, startup MVPs, service promotion.',
    expect: 'A focused, high-converting landing page built and deployed quickly.',
  },
]

const faqs = [
  {
    question: 'What services do you offer as a full-stack developer?',
    answer:
      'AI product development, full-stack web applications, SaaS product development, AI integration into existing products, custom business systems, modern website development, website redesigns and landing pages.',
  },
  {
    question: 'How do you start a project?',
    answer:
      'A short call or email thread to scope the problem, followed by a clear plan: what gets built, what it costs and when it ships. Work starts once the scope is agreed.',
  },
  {
    question: 'Do you work with startups and businesses?',
    answer:
      'Yes. Startups building a first product, SaaS companies adding AI features, and businesses that need custom software or a better website are all regular kinds of engagements.',
  },
  {
    question: 'Where are you based and do you work remotely?',
    answer:
      'I am based in Karachi, Pakistan and work remotely with clients anywhere. Communication happens over email, call or the tool your team already uses.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/services',
          name: 'Services',
          description:
            'What Faizyab Hussain can build: AI products, full-stack apps, SaaS, business systems and websites.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <div className="measure container-safe">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Services"
            title="What I can build for you"
            description="AI products, full-stack apps, SaaS, business systems, websites. Every engagement ends with something deployed and usable, not a prototype."
          />
        </div>

        <div className="mt-10 space-y-0">
          {services.map((service) => (
            <section key={service.title} className="border-b border-rule py-8 first:pt-0 last:border-b-0">
              <h2 className="font-sans text-[1.125rem] font-semibold tracking-[-0.005em] text-ink">
                {service.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
                {service.description}
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Who it is for</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
                    {service.audience}
                  </p>
                </div>
                <div>
                  <p className="eyebrow">What to expect</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
                    {service.expect}
                  </p>
                </div>
              </div>

              {service.href ? (
                <p className="mt-4">
                  <Link href={service.href} className="link text-[0.9375rem]">
                    Start a conversation
                  </Link>
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <Section title="Frequently asked questions" className="mt-12">
          <dl className="max-w-2xl">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-rule py-4 last:border-b-0">
                <dt className="text-[0.9375rem] font-medium text-ink">{faq.question}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-secondary">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Start a project" className="mt-12">
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
            Tell me what you are trying to build and I will tell you honestly whether I am
            the right person for it.{' '}
            <Link href="/contact" className="link">
              Get in touch
            </Link>
            .
          </p>
        </Section>
      </div>
    </>
  )
}