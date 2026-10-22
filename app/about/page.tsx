import Link from 'next/link'

import { ExternalLink } from '@/components/content/external-link'
import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { Section } from '@/components/content/section'
import { education } from '@/data/education'
import { profile } from '@/data/profile'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'About Faizyab Hussain · Background, Journey & Interests',
  description:
    'The background, learning journey and current direction of Faizyab Hussain, an AI-focused full-stack developer and independent product builder from Karachi, Pakistan.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/about',
          name: 'About Faizyab Hussain',
          description:
            'The background, learning journey and current direction of Faizyab Hussain.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <div className="measure">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="About"
            title="How I got here, and where I am now"
            description={profile.aboutIntro}
          />
        </div>

        <div className="prose mt-10 max-w-2xl">
          <h2>Background</h2>
          <p>
            I am based in Karachi, Pakistan, and I build software for a living.
            My work sits between full-stack development and AI-powered
            applications: web products, developer tools, and the occasional
            experiment that exists mostly to find out whether an idea is worth
            pursuing.
          </p>
          <p>
            I did not come to this through a computer science degree. I came to
            it through a training programme, a lot of small projects, and a
            habit of writing things down. What started as wanting to build
            websites            has turned into wanting to understand how products are
            built properly, not just how to make them work.

            That is what the rest of this page is for.
          </p>

          <h2>My path into web development</h2>
          <p>
            I spent September 2024 through January 2026 training in Web &amp; App
            Development at SMIT. That covered the interface, the server, the
            database, and the parts of the job that tutorials usually skip:
            deployment, debugging, and the discipline of finishing something.
          </p>
          <p>
            The training gave me the vocabulary. The projects gave me the
            practice. Most of what I know now, I know because I built
            something that did not work, found out why, and fixed it.
          </p>

          <h2>Learning and technical development</h2>
          <p>
            I learned to work in plain HTML, CSS and JavaScript first, without a
            framework, and I think that was the right order. It meant the
            framework was a choice rather than a default. Since then I have
            moved through React, Next.js and Tailwind CSS, Node.js and
            Express, and a range of databases: mostly Supabase and PostgreSQL,
            and Firebase when the data model is small and the rules are simple.
          </p>
          <p>
            I am more interested in the parts of software that stay hard:
            authentication, data modelling, permissions, and the unglamorous
            work of making a product usable rather than merely functional.
          </p>

          <h2>Moving into AI and product development</h2>
          <p>
            In 2026 I started a BS in Artificial Intelligence at Dawood
            University of Engineering &amp; Technology. The degree is in progress;
            I am studying it alongside the work, not instead of it.
          </p>
          <p>
            What I am drawn to in AI is application work: integrating existing
            models into products and workflows that are genuinely useful, rather
            than training models from scratch. I am interested in how
            model-backed features should be designed, how they fail, and how to
            evaluate them. PromptAudit is my attempt to work on
            that in practice.
          </p>

          <h2>Independent building</h2>
          <p>
            Most of what is in the{' '}
            <Link href="/projects" className="link">
              project archive
            </Link>{' '}
            I built on my own. I started with independent full-stack work in
            September 2024 and it has continued since: web applications,
            developer tools, and product ideas across form handling, secure text
            sharing, file storage, developer tooling, and AI-assisted workflows.
          </p>
          <p>
            Building alone teaches you the parts of the job that a tutorial
            never mentions: what a user actually does with a form, what breaks
            when an API is slow, why a settings screen needs to exist, and how
            much of a plan survives contact with a real deployment.
          </p>

          <h2>What I am currently learning</h2>
          <p>
            AI engineering and agentic patterns. LLM application development,
            and how to evaluate a model-backed feature rather than guessing
            whether it is good. Backend and SaaS architecture, especially the
            parts that only appear once other people are using the thing. And
            product engineering: the craft of making software that people can
            actually use.
          </p>
          <p>
            The{' '}
            <Link href="/now" className="link">
              now page
            </Link>{' '}
            has a more current version of this list.
          </p>

          <h2>Interests</h2>
          <p>
            Software engineering and artificial intelligence, obviously.
            Beyond that: full-stack web development, developer tools, SaaS
            products, indie building, product design and usability, open-source
            software, and entrepreneurship. I care about build-in-public
            practices and about technical writing as a way to actually learn
            something rather than skim it.
          </p>
          <p>
            I am also interested in the relationship between technology and
            opportunity: education, access, and the idea that building
            something useful is a reasonable way to contribute. I describe that
            interest as social entrepreneurship, though I am careful about the
            word: I do not run a registered social enterprise and I would rather
            not imply impact I have not measured.
          </p>

          <h2>Where to go next</h2>
          <p>
            The{' '}
            <Link href="/work" className="link">
              work page
            </Link>{' '}
            has the full professional history, including the parts that are
            still in progress. The{' '}
            <Link href="/projects" className="link">
              project archive
            </Link>{' '}
            is the most complete picture of what I have built. And{' '}
            <Link href="/writing" className="link">
              writing
            </Link>{' '}              is where I write down the things I learn along the way.
          </p>
          <p>
            If any of that is interesting, or if you are working on something
            in a similar direction,{' '}
            <Link href="/contact" className="link">
              get in touch
            </Link>
            and we can talk.
          </p>
        </div>

        {profile.resume ? (
          <Section title="Resume" action={{ label: "Download resume (PDF)", href: profile.resume }}>
            <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-secondary">
              A short resume in PDF form, covering the software I have built,
              the work I have done, and the tools I use. It is a snapshot
              rather than the full story. The site has that.
            </p>
          </Section>
        ) : null}

        <Section id="education" title="Education and training">
          <ul className="border-t border-rule">
            {education.map((entry) => (
              <li key={entry.id} className="border-b border-rule py-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-[-0.005em] text-ink">
                    {entry.program}
                  </h3>
                  <p className="shrink-0 text-[0.8125rem] text-ink-muted">
                    {entry.period}
                  </p>
                </div>
                <p className="mt-1.5 text-[0.9375rem] text-ink-secondary">
                  {entry.institution}
                </p>
                {entry.detail ? (
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-secondary">
                    {entry.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Elsewhere">
          <ul className="space-y-2 text-[0.9375rem]">
            <li>
              <ExternalLink href={profile.links.github}>
                GitHub · {profile.links.github.replace('https://github.com/', '')}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin}>
                LinkedIn · {profile.links.linkedin.replace('https://www.linkedin.com/in/', '')}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.x}>
                X · {profile.links.x.replace('https://x.com/', '')}
              </ExternalLink>
            </li>
            <li>
              <a href={profile.links.email} className="link">
                {profile.email}
              </a>
            </li>
          </ul>
        </Section>
      </div>
    </>
  )
}
