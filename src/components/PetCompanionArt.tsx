import type { Avatar } from '../types'
import { adjustColor } from './toca/tocaShading'

const JOEY_W = 367
const JOEY_H = 408
const JOEY_SCALE = 28 / JOEY_H

const STROKE = '#3A2E28'
const STROKE_W = 0.55

function PetShadow() {
  return <ellipse cx={0} cy={3} rx={11} ry={2.2} fill="#1A1612" opacity={0.12} />
}

/** Golden puppy — side profile facing the avatar. */
function DogCompanion() {
  const fur = '#C9A06A'
  const furDark = adjustColor(fur, -18)
  const furLight = adjustColor(fur, 12)
  return (
    <g>
      <PetShadow />
      {/* Tail */}
      <path
        d="M 9 -9 Q 14 -14 13 -18 Q 11 -16 9 -12 Z"
        fill={furDark}
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Hind leg */}
      <path d="M 6 0 L 5 -7 L 8 -7 L 9 0 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Body */}
      <ellipse cx={2} cy={-5} rx={9} ry={6.5} fill={fur} stroke={STROKE} strokeWidth={STROKE_W} />
      <path d="M -2 -8 Q 2 -10 6 -8" fill="none" stroke={furLight} strokeWidth={1.2} opacity={0.5} />
      {/* Front leg */}
      <path d="M -4 0 L -5 -7 L -2 -7 L -1 0 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Head */}
      <ellipse cx={-8} cy={-8} rx={6} ry={5.5} fill={furLight} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Floppy ear */}
      <path
        d="M -11 -11 Q -14 -8 -12 -4 Q -10 -7 -10 -10 Z"
        fill={furDark}
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Snout */}
      <ellipse cx={-12.5} cy={-6.5} rx={3.2} ry={2.4} fill={adjustColor(furLight, 8)} stroke={STROKE} strokeWidth={STROKE_W} />
      <ellipse cx={-14.2} cy={-6.2} rx={1.1} ry={0.9} fill="#2A2018" />
      {/* Eye */}
      <circle cx={-9.5} cy={-9.2} r={1.1} fill="#1A1008" />
      <circle cx={-9.8} cy={-9.5} r={0.35} fill="#FFFFFF" opacity={0.9} />
      {/* Collar */}
      <path d="M -7 -3.5 Q -8 -2.5 -9.5 -3.2" fill="none" stroke="#D04040" strokeWidth={1.1} strokeLinecap="round" />
    </g>
  )
}

/** Orange tabby kitten — side profile facing the avatar. */
function CatCompanion() {
  const fur = '#E09840'
  const furDark = adjustColor(fur, -22)
  const furLight = adjustColor(fur, 14)
  return (
    <g>
      <PetShadow />
      {/* Tail */}
      <path
        d="M 8 -8 Q 13 -12 12 -17 Q 10 -13 8 -10 Z"
        fill={furDark}
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      {/* Hind leg */}
      <path d="M 5 0 L 4.5 -6.5 L 7 -6.5 L 7.5 0 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Body */}
      <ellipse cx={1} cy={-4.5} rx={7.5} ry={5.5} fill={fur} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Tabby stripes */}
      <path d="M -1 -7 Q 1 -8 3 -7" fill="none" stroke={furDark} strokeWidth={0.8} opacity={0.55} />
      <path d="M 2 -5 Q 4 -6 6 -5" fill="none" stroke={furDark} strokeWidth={0.8} opacity={0.55} />
      {/* Front leg */}
      <path d="M -3.5 0 L -4 -6.5 L -1.5 -6.5 L -1 0 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Head */}
      <circle cx={-7} cy={-7.5} r={5.2} fill={furLight} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Ears */}
      <path d="M -10 -12 L -8.5 -8.5 L -6.5 -11.5 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M -7.5 -12.5 L -6 -8.5 L -4 -11.5 Z" fill={furDark} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M -9.2 -11.2 L -8.5 -9.5 L -7.5 -10.8 Z" fill="#FFB8A8" />
      {/* Face */}
      <ellipse cx={-9.5} cy={-6.5} rx={1.8} ry={1.3} fill="#FFB0A0" stroke={STROKE} strokeWidth={0.4} />
      <circle cx={-8.2} cy={-8.5} r={0.9} fill="#1A1008" />
      <circle cx={-8.35} cy={-8.65} r={0.28} fill="#FFFFFF" opacity={0.85} />
      {/* Whiskers */}
      <line x1={-11} y1={-7} x2={-14} y2={-7.5} stroke={STROKE} strokeWidth={0.35} opacity={0.5} />
      <line x1={-11} y1={-6.2} x2={-14} y2={-6} stroke={STROKE} strokeWidth={0.35} opacity={0.5} />
    </g>
  )
}

/** Joey — reference clipart kangaroo facing the avatar. */
function KangarooCompanion() {
  const w = JOEY_W * JOEY_SCALE
  const h = JOEY_H * JOEY_SCALE
  return (
    <g>
      <PetShadow />
      <image
        href="/joey-kangaroo.png"
        x={-2}
        y={-h}
        width={w}
        height={h}
        preserveAspectRatio="xMidYMax meet"
      />
    </g>
  )
}

/** Rainbow lorikeet — perched low, facing the avatar. */
function ParrotCompanion() {
  const green = '#3A9E5A'
  const greenDark = adjustColor(green, -18)
  const blue = '#2A7EC8'
  const red = '#E04848'
  const yellow = '#F0C030'
  return (
    <g transform="translate(0, -4)">
      <PetShadow />
      {/* Tail feathers */}
      <path d="M 8 -4 L 14 -2 L 13 0 L 8 1 Z" fill={greenDark} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M 8 -2 L 13 1 L 12 3 L 7 2 Z" fill={blue} stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" opacity={0.9} />
      {/* Body */}
      <ellipse cx={0} cy={-4} rx={5.5} ry={6} fill={green} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Wing */}
      <path
        d="M 1 -6 Q 4 -4 3 -1 Q 0 -2 -1 -5 Z"
        fill={greenDark}
        stroke={STROKE}
        strokeWidth={STROKE_W}
        strokeLinejoin="round"
      />
      <path d="M 0.5 -5.5 Q 2.5 -4 2 -2" fill="none" stroke={adjustColor(greenDark, 12)} strokeWidth={0.6} opacity={0.6} />
      {/* Chest */}
      <ellipse cx={-1.5} cy={-3.5} rx={2.2} ry={3.5} fill={yellow} opacity={0.85} />
      <path d="M -2.5 -5 Q -2 -2 -2.5 0" fill="none" stroke={red} strokeWidth={1.2} opacity={0.55} />
      {/* Head */}
      <circle cx={-5.5} cy={-7} r={4.2} fill={greenLight(green)} stroke={STROKE} strokeWidth={STROKE_W} />
      {/* Cheek patch */}
      <ellipse cx={-6.5} cy={-5.5} rx={1.8} ry={1.4} fill={red} opacity={0.9} />
      {/* Beak */}
      <path d="M -9 -7 L -11.5 -6.2 L -9 -5.2 Z" fill="#F0A820" stroke={STROKE} strokeWidth={STROKE_W} strokeLinejoin="round" />
      <path d="M -9 -7 L -11 -6.2 L -9 -5.8 Z" fill={adjustColor('#F0A820', -15)} />
      {/* Eye */}
      <circle cx={-6.2} cy={-7.8} r={0.85} fill="#1A1008" />
      <circle cx={-6.45} cy={-8} r={0.25} fill="#FFFFFF" opacity={0.9} />
      {/* Crest */}
      <path d="M -5 -10.5 L -4.5 -12.5 L -4 -10.5 Z" fill={greenDark} stroke={STROKE} strokeWidth={0.4} />
      {/* Feet */}
      <path d="M -2 1 L -3 3 M -2 1 L -1 3 M 1 1 L 0 3 M 1 1 L 2 3" stroke="#F0A820" strokeWidth={0.7} strokeLinecap="round" />
    </g>
  )
}

function greenLight(green: string) {
  return adjustColor(green, 16)
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
