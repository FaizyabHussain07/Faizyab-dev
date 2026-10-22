/**
 * Public profile facts.
 *
 * Every value here is verified public information. Nothing private (age,
 * academic marks, application details) belongs in this file.
 */

export type ProfileLink = {
  label: string
  href: string
  /** Shown next to the link on the site. */
  handle?: string
}

export const profile = {
  name: 'Faizyab Hussain',
  firstName: 'Faizyab',
  /** Short professional description shown under the name. */
  role: 'AI-Focused Full-Stack Developer',
  /** Longer positioning statement used on the homepage and in structured data. */
  tagline: 'AI-Focused Full-Stack Developer, AI Product Builder, Independent Builder',
  location: {
    city: 'Karachi',
    region: 'Sindh',
    country: 'Pakistan',
    countryCode: 'PK',
  },
  email: 'faizyabdev@gmail.com',
  /**
   * Default biography. Used as the homepage fallback and the `Person`
   * structured-data description.
   */
  bio: 'Faizyab Hussain is an AI-focused full-stack developer and independent product builder from Karachi, Pakistan. He builds web applications, developer tools and AI-powered products while studying Artificial Intelligence. Through independent projects and technical writing, he records what he learns, builds and ships along the way.',
  /**
   * First-person opening used on the About page. Kept distinct from `bio`
   * so the two are not word-for-word duplicates.
   */
  aboutIntro:
    "I'm Faizyab, a developer and independent builder from Karachi, Pakistan. I work across full-stack development and AI-powered applications, and I'm currently studying Artificial Intelligence. I enjoy turning ideas into working software, exploring how products should be built, and learning through hands-on experimentation. This website is where I keep that record.",
  /** Social / professional profiles. `sameAs` in structured data uses these. */
  links: {
    github: 'https://github.com/FaizyabHussain07',
    linkedin: 'https://www.linkedin.com/in/faizyabhussain/',
    x: 'https://x.com/FaizyabHus74391',
    email: 'mailto:faizyabdev@gmail.com',
    /** Separate, pre-existing site. It stays live and is never modified by this repo. */
    portfolio: 'https://faizyab-hussain.vercel.app',
  },
  /**
   * Photograph shown beside the homepage introduction.
   *
   * `null` renders the monogram placeholder in `public/images/`.
   * Drop `public/images/profile.jpg` (or `.png` / `.webp`) in place and set
   * this to that path to publish the real photograph.
   */
  photo: null as string | null,
  /** Resume / CV, served from `public/`. */
  resume: '/Resume_Faizyab_Hussain.pdf' as string | null,
  photoAlt:
    'Portrait photograph of Faizyab Hussain, AI-focused full-stack developer based in Karachi, Pakistan.',
} as const

export const primaryLinks: ProfileLink[] = [
  { label: 'GitHub', href: profile.links.github, handle: 'FaizyabHussain07' },
  { label: 'LinkedIn', href: profile.links.linkedin, handle: 'faizyabhussain' },
  { label: 'Email', href: profile.links.email, handle: profile.email },
  { label: 'X', href: profile.links.x, handle: 'FaizyabHus74391' },
]
