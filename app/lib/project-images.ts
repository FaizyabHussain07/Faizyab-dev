/**
 * Project image map.
 *
 * A single source of truth for the public image that belongs to each project
 * slug. The archive row and project pages read from here so the checker can
 * validate that the referenced file actually exists.
 */

export const projectImages: Record<string, string> = {
  telecloud: '/images/telecloud.jpg',
  formivo: '/images/formivo.png',
  devpass: '/images/devpass.png',
  pasteLinkPro: '/images/paste-link-pro.png',
  slik: '/images/slik.png',
  webTemplateHub: '/images/web-template-hub.png',
  clinicflow: '/images/clinicflow.png',
  mealmint: '/images/mealmint.png',
  promptAudit: '/images/promptaudit.jpg',
  quizspark: '/images/quizspark.png',
  buildlayout: '/images/buildlayout.png',
  prodspark: '/images/prodspark.png',
  openformio: '/images/openformio.png',
}

export function projectImageFor(slug: string): string | undefined {
  return projectImages[slug]
}
