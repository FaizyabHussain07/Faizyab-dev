import Link from 'next/link'

import { navigation } from '@/data/navigation'

export default function NotFound() {
  return (
    <div className="measure container-safe">
      <div className="py-20 sm:py-28">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
          This page does not exist
        </h1>
        <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-secondary">
          The link you followed does not lead anywhere on this site. It may have
          moved, or it may never have existed here.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
          <Link href="/" className="link">
            Home
          </Link>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="link">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
