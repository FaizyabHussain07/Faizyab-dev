import Image from 'next/image'

import { profile } from '@/data/profile'

const PHOTO_SIZE = 96

/**
 * The portrait beside the homepage introduction.
 *
 * The real photograph is not published yet, so a clearly-labelled monogram
 * placeholder stands in. To publish the real photo: drop it at
 * `public/images/profile.jpg` and set `profile.photo` in `data/profile.ts`.
 */
function Portrait() {
  if (profile.photo) {
    return (
      <Image
        src={profile.photo}
        alt={profile.photoAlt}
        width={PHOTO_SIZE}
        height={PHOTO_SIZE}
        sizes="96px"
        className="h-24 w-24 shrink-0 rounded-full border border-rule object-cover"
      />
    )
  }

  return (
    <Image
      src="/images/faizyab-image.jpg"
      alt="Placeholder portrait for Faizyab Hussain, a monogram awaiting the real photograph."
      width={PHOTO_SIZE}
      height={PHOTO_SIZE}
      sizes="96px"
      className="h-24 w-24 shrink-0 rounded-full border border-rule bg-surface object-cover"
    />
  )
}

export function Introduction() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      <Portrait />

      <div className="min-w-0 flex-1">
        <h1 className="text-[2rem] leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.25rem]">
          {profile.name}
        </h1>
        <p className="mt-2 text-[1.0625rem] text-ink-secondary">
          {profile.role}
        </p>
        <p className="mt-1 text-[0.9375rem] text-ink-muted">
          {profile.location.city}, {profile.location.country}
        </p>

        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink">
          I build web products, developer tools, and AI-powered applications.
          I&apos;m interested in turning ideas into working software, learning
          through building, and writing down what I find along the way.
        </p>
      </div>
    </div>
  )
}
