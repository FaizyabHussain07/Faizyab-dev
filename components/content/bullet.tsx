/**
 * The list marker.
 *
 * Drawn as a small dot rather than an em dash so list bullets can never be
 * mistaken for punctuation in the prose that follows them.
 */
export function Bullet() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 8 8"
      className="mt-[0.62em] h-[0.3em] w-[0.3em] shrink-0 self-start text-ink-muted"
    >
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  )
}
