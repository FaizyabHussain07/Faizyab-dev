/**
 * Images for projects, keyed by slug. Files live in `public/images/`.
 *
 * A slug that is not listed here simply renders without an image, so adding a
 * project without a screenshot is fine. Adding a slug here with a path that
 * does not exist is caught by `npm run check:content`.
 */
export const projectImages: Record<string, string> = {
  buildlayout: '/images/buildlayout.jpg',
  clinicflow: '/images/clinicflow.jpg',
  devpass: '/images/devpass.jpg',
  mealmint: '/images/mealmint.png',
  'paste-link-pro': '/images/paste-link-pro.png',
  prodspark: '/images/prodspark.png',
  prompraudit: '/images/promptaudit.jpg',
  quizspark: '/images/quizspark.jpg',
  slik: '/images/slik.png',
  telecloud: '/images/telecloud.jpg',
  'web-template-hub': '/images/web-template-hub.jpg',
}

/** The image for a project, or `null` when the project has none. */
export function projectImage(slug: string): string | null {
  return projectImages[slug] ?? null
}
