import type { Avatar } from '../types'

const JOEY_W = 367
const JOEY_H = 408
const JOEY_SCALE = 28 / JOEY_H

const KITTEN_W = 138
const KITTEN_H = 143
const KITTEN_SCALE = 26 / KITTEN_H

const PUPPY_W = 126
const PUPPY_H = 137
const PUPPY_SCALE = 26 / PUPPY_H

const PARROT_W = 195
const PARROT_H = 237
const PARROT_SCALE = 28 / PARROT_H

/** Kawaii puppy — reference clipart facing the avatar. */
function DogCompanion() {
  const w = PUPPY_W * PUPPY_SCALE
  const h = PUPPY_H * PUPPY_SCALE
  return (
    <image
      href="/puppy-companion.png"
      x={-6}
      y={-h}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMax meet"
    />
  )
}

/** Kawaii kitten — reference clipart facing the avatar. */
function CatCompanion() {
  const w = KITTEN_W * KITTEN_SCALE
  const h = KITTEN_H * KITTEN_SCALE
  return (
    <image
      href="/kitten-companion.png"
      x={-6}
      y={-h}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMax meet"
    />
  )
}

/** Joey — reference clipart kangaroo facing the avatar. */
function KangarooCompanion() {
  const w = JOEY_W * JOEY_SCALE
  const h = JOEY_H * JOEY_SCALE
  return (
    <image
      href="/joey-kangaroo.png"
      x={-2}
      y={-h}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMax meet"
    />
  )
}

/** Scarlet macaw — reference clipart facing the avatar. */
function ParrotCompanion() {
  const w = PARROT_W * PARROT_SCALE
  const h = PARROT_H * PARROT_SCALE
  return (
    <image
      href="/parrot-companion.png"
      x={-8}
      y={-h}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMax meet"
    />
  )
}

export function PetCompanionSprite({ pet, footY }: { pet: Avatar['pet']; footY: number }) {
  if (pet === 'none') return null

  const x = 70

  return (
    <g transform={`translate(${x}, ${footY})`} aria-hidden>
      {pet === 'dog' && <DogCompanion />}
      {pet === 'cat' && <CatCompanion />}
      {pet === 'kangaroo' && <KangarooCompanion />}
      {pet === 'parrot' && <ParrotCompanion />}
    </g>
  )
}
