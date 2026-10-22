export type NavItem = {
  label: string
  href: string
}

export const navigation: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
]

/** Secondary links shown in the footer. */
export const footerNav: NavItem[] = [
  { label: 'Now', href: '/now' },
  { label: 'Uses', href: '/uses' },
]
