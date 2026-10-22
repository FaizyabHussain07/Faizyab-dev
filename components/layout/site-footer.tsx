import Link from 'next/link'

import { footerNav } from '@/data/navigation'
import { profile } from '@/data/profile'

const socialLinks = [
  { label: 'GitHub', href: profile.links.github, handle: 'FaizyabHussain07' },
  { label: 'LinkedIn', href: profile.links.linkedin, handle: 'faizyabhussain' },
  { label: 'X', href: profile.links.x, handle: 'FaizyabHus74391' },
  { label: 'Email', href: profile.links.email, handle: profile.email },
]

export function SiteFooter() {
  // Rendered on the server, so the year is correct without a client bundle.
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-rule">
      <div className="measure py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-lg text-ink">{profile.name}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-secondary">
              A personal website and digital archive: a record of the software I
              have built, the things I have written, and what I am learning along
              the way.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Elsewhere">
              <h2 className="eyebrow">Elsewhere</h2>
              <ul className="mt-3 space-y-1.5">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="link-subtle text-[0.9375rem]"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Pages">
              <h2 className="eyebrow">Pages</h2>
              <ul className="mt-3 space-y-1.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-subtle text-[0.9375rem]">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/writing" className="link-subtle text-[0.9375rem]">
                    Writing
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="link-subtle text-[0.9375rem]">
                    All projects
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-rule pt-6 text-[0.8125rem] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Built and maintained from Karachi, Pakistan.</p>
        </div>
      </div>
    </footer>
  )
}
