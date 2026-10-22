'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'

import { navigation } from '@/data/navigation'
import { profile } from '@/data/profile'

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu when the route changes. Adjusting state during
  // render is the documented React pattern for reacting to a prop change.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpen(false)
  }

  // Close on Escape, and return focus to the toggle.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <div className="measure flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-[1.0625rem] font-medium tracking-tight text-ink"
        >
          {profile.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 sm:flex"
        >
          {navigation.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'text-[0.9375rem] text-ink underline decoration-link decoration-1 underline-offset-[0.2em]'
                    : 'link-subtle text-[0.9375rem] hover:text-ink'
                }
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-[0.9375rem] text-ink-secondary hover:text-ink sm:hidden"
        >
          <span className="sr-only">
            {open ? 'Close menu' : 'Open menu'}
          </span>
          <span aria-hidden="true" className="relative block h-[0.625rem] w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-150 ${
                open ? 'top-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-150 ${
                open ? 'top-1/2 -rotate-45' : 'top-2'
              }`}
            />
          </span>
          <span aria-hidden="true" className="text-[0.9375rem]">
            Menu
          </span>
        </button>
      </div>

      <div
        ref={panelRef}
        id={menuId}
        hidden={!open}
        className="border-t border-rule bg-paper sm:hidden"
      >
        <nav aria-label="Primary (mobile)" className="measure py-3">
          <ul className="flex flex-col">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href} className="border-b border-rule last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block py-2.5 text-[0.9375rem] ${
                      active ? 'text-ink' : 'text-ink-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
