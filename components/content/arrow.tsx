/**
 * The external-link marker.
 *
 * Drawn as a tiny inline SVG rather than the `↗` text glyph so it renders at
 * a consistent weight and optical size next to text in every browser and on
 * every platform. It inherits `currentColor` so it matches whatever link
 * style it sits inside.
 */
export function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 12"
      className="ml-[0.15em] inline-block h-[0.72em] w-[0.72em] shrink-0 translate-y-[-0.05em] align-baseline"
    >
      <path
        d="M3 9L9 3M9 3H4.2M9 3v4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** The back-link marker used above "Back to all projects" style links. */
export function BackArrow() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 12"
      className="mr-[0.35em] inline-block h-[0.8em] w-[0.8em] shrink-0 align-baseline"
    >
      <path
        d="M7.5 2.5L3.5 6l4 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
