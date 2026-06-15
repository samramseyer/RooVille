import type { TimePhase } from '../hooks/useDayNight'
import type { WeatherKind } from '../data/weather'
import { WEATHER_VISUALS } from '../data/weather'
import { TOCA } from './toca/TocaHouseArt'
import { adjustColor } from './toca/tocaShading'

const S = TOCA.stroke
const SW = 2.2

/** Mountain base = top edge of usable play terrain */
const HORIZON = 272

interface TerrainPalette {
  skyTop: string
  skyBottom: string
  cloudLight: string
  cloudShadow: string
  grassLight: string
  grassMid: string
  grassDark: string
  scrub: string
  sandDry: string
  sandWet: string
  oceanShallow: string
  oceanMid: string
  oceanDeep: string
  foam: string
  pine: string
  pineDark: string
  mountainFar: string
  mountainMid: string
  mountainNear: string
  bird: string
}

const PALETTES: Record<TimePhase, TerrainPalette> = {
  day: {
    skyTop: '#4FC3F7',
    skyBottom: TOCA.skyBlue,
    cloudLight: '#FFFFFF',
    cloudShadow: '#B3E5FC',
    grassLight: '#AED581',
    grassMid: TOCA.eucalyptus,
    grassDark: TOCA.gumGreen,
    scrub: adjustColor(TOCA.gumGreen, 8),
    sandDry: '#FFEAA7',
    sandWet: TOCA.sand,
    oceanShallow: '#80DEEA',
    oceanMid: TOCA.ocean,
    oceanDeep: TOCA.oceanDark,
    foam: '#FFFFFF',
    pine: TOCA.gumGreen,
    pineDark: adjustColor(TOCA.gumGreen, -18),
    mountainFar: '#78909C',
    mountainMid: '#607D8B',
    mountainNear: '#546E7A',
    bird: '#455A64',
  },
  sunset: {
    skyTop: '#FF7043',
    skyBottom: '#FFAB91',
    cloudLight: '#FFE0B2',
    cloudShadow: '#FF8A65',
    grassLight: '#9CCC65',
    grassMid: TOCA.eucalyptus,
    grassDark: TOCA.gumGreen,
    scrub: TOCA.gumGreen,
    sandDry: '#FFCC80',
    sandWet: TOCA.sand,
    oceanShallow: '#4DB6AC',
    oceanMid: '#26A69A',
    oceanDeep: '#00695C',
    foam: '#FFECB3',
    pine: TOCA.gumGreen,
    pineDark: adjustColor(TOCA.gumGreen, -18),
    mountainFar: '#8D6E63',
    mountainMid: '#795548',
    mountainNear: '#6D4C41',
    bird: '#4E342E',
  },
  dawn: {
    skyTop: '#7986CB',
    skyBottom: TOCA.skyBlue,
    cloudLight: '#FFFFFF',
    cloudShadow: '#CFD8DC',
    grassLight: '#AED581',
    grassMid: TOCA.eucalyptus,
    grassDark: TOCA.gumGreen,
    scrub: TOCA.gumGreen,
    sandDry: '#FFE082',
    sandWet: TOCA.sand,
    oceanShallow: '#80DEEA',
    oceanMid: TOCA.ocean,
    oceanDeep: TOCA.oceanDark,
    foam: '#FFFFFF',
    pine: TOCA.gumGreen,
    pineDark: adjustColor(TOCA.gumGreen, -18),
    mountainFar: '#78909C',
    mountainMid: '#607D8B',
    mountainNear: '#546E7A',
    bird: '#455A64',
  },
  night: {
    skyTop: '#0D2137',
    skyBottom: '#1A3A5C',
    cloudLight: '#2A4560',
    cloudShadow: '#152535',
    grassLight: '#3D5A30',
    grassMid: '#2D4524',
    grassDark: '#1E3018',
    scrub: '#253820',
    sandDry: '#8A7A50',
    sandWet: '#6E6040',
    oceanShallow: '#1E4A68',
    oceanMid: '#0E3D54',
    oceanDeep: '#061E2E',
    foam: 'rgba(200,220,240,0.3)',
    pine: '#2E5038',
    pineDark: '#1E3828',
    mountainFar: '#263238',
    mountainMid: '#1C3138',
    mountainNear: '#152025',
    bird: '#1A2838',
  },
}

const SHAPES = {
  /** Grass meadow — stops inland; sand fills the gap to the water */
  meadow:
    'M 0 272 L 425 272 L 468 292 C 505 310, 530 348, 522 395 C 512 450, 475 495, 420 535 C 365 575, 315 595, 285 592 L 0 600 Z',
  meadowHighlight:
    'M 50 360 Q 210 345 290 358 Q 370 368 285 592 L 50 600 Q 130 480 90 390 Q 65 320 50 360 Z',
  /** Full sand band between grass and water */
  sand:
    'M 382 600 C 412 608, 468 592, 528 548 C 588 508, 628 452, 638 392 C 646 342, 612 302, 568 282 L 538 272 L 425 272 L 468 292 C 505 310, 530 348, 522 395 C 512 450, 475 495, 420 535 C 365 575, 315 595, 285 592 L 382 600 Z',
  bayWater:
    'M 538 272 L 1000 272 L 1000 600 L 382 600 C 412 608, 468 592, 528 548 C 588 508, 628 452, 638 392 C 646 342, 612 302, 568 282 L 538 272 Z',
  shallowBand:
    'M 538 272 L 1000 272 L 1000 600 L 400 600 C 438 572, 498 518, 558 462 C 612 408, 648 348, 648 348 C 658 298, 608 278, 538 272 Z',
  foregroundHill: 'M 0 600 L 0 540 Q 65 502 140 525 Q 188 542 168 600 Z',
  /** Distant mountain layer — peaks rise into sky */
  mountainsFar:
    'M 0 272 L 0 215 Q 55 145 115 178 Q 175 108 248 148 Q 318 82 392 118 Q 462 68 535 98 Q 608 58 682 88 Q 752 62 825 92 Q 895 72 965 108 L 1000 118 L 1000 272 Z',
  /** Near mountain layer — shorter, darker foreground ridge */
  mountainsNear:
    'M 0 272 L 0 238 Q 85 198 175 215 Q 265 178 355 198 Q 445 168 535 188 Q 625 178 715 198 Q 805 182 895 208 L 1000 225 L 1000 272 Z',
}

const BEACH_PEBBLES: [number, number, number][] = [
  [320, 575, 2.5],
  [365, 555, 2],
  [420, 525, 2.5],
  [480, 485, 2],
  [540, 440, 2.5],
  [590, 390, 2],
  [620, 340, 2],
  [580, 305, 2.5],
  [530, 285, 2],
  [450, 530, 2],
  [500, 460, 2.5],
  [400, 560, 2],
]

const PINES: [number, number, number][] = [
  [50, 310, 0.8],
  [80, 350, 0.72],
  [45, 400, 0.68],
  [95, 450, 0.65],
  [380, 315, 0.85],
  [260, 510, 0.62],
]

const FLOWERS: [number, number, string][] = [
  [150, 400, '#F48FB1'],
  [200, 440, '#FFF176'],
  [240, 380, '#CE93D8'],
  [260, 450, '#F48FB1'],
  [300, 420, '#FFF176'],
  [180, 520, '#CE93D8'],
]

const GRASS_TUFTS: [number, number][] = [
  [220, 340],
  [320, 380],
  [400, 350],
  [260, 440],
  [200, 500],
]

const CLOUDS: [number, number, number, string][] = [
  [90, 45, 1.05, 'slow'],
  [300, 28, 0.95, 'mid'],
  [520, 55, 1.12, 'slow'],
  [700, 35, 1.0, 'fast'],
  [870, 62, 0.9, 'mid'],
  [420, 85, 0.85, 'fast'],
]

const BIRDS: [number, number, number, string, number][] = [
  [200, 70, 1, 'a', 4],
  [540, 55, 0.9, 'b', 3],
  [780, 88, 0.85, 'c', 4],
]

interface CoastalMapTerrainProps {
  phase: TimePhase
  weather: WeatherKind
}

function TerrainDefs({ id, p }: { id: string; p: TerrainPalette }) {
  return (
    <defs>
      <clipPath id={`${id}-sky-clip`}>
        <rect x={0} y={0} width={1000} height={HORIZON} />
      </clipPath>
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.skyTop} />
        <stop offset="100%" stopColor={p.skyBottom} />
      </linearGradient>
      <linearGradient id={`${id}-ocean`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.oceanShallow} />
        <stop offset="40%" stopColor={p.oceanMid} />
        <stop offset="100%" stopColor={p.oceanDeep} />
      </linearGradient>
      {/* Shore shallows — sand tint near coast fading to open water */}
      <linearGradient id={`${id}-shallow`} x1="0" y1="0" x2="1" y2="0.15" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor={p.sandWet} stopOpacity={0.35} />
        <stop offset="18%" stopColor={p.oceanShallow} stopOpacity={0.55} />
        <stop offset="45%" stopColor={p.oceanShallow} stopOpacity={0.35} />
        <stop offset="100%" stopColor={p.oceanMid} stopOpacity={0.12} />
      </linearGradient>
      <linearGradient id={`${id}-meadow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.grassLight} />
        <stop offset="50%" stopColor={p.grassMid} />
        <stop offset="100%" stopColor={p.grassDark} />
      </linearGradient>
      {/* Sand strip: dry inland → wet shore → shallow water */}
      <linearGradient id={`${id}-sand-coast`} x1="0" y1="0.35" x2="1" y2="0.65" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor={p.sandDry} />
        <stop offset="55%" stopColor={p.sandDry} />
        <stop offset="82%" stopColor={p.sandWet} />
        <stop offset="100%" stopColor={p.oceanShallow} stopOpacity={0.55} />
      </linearGradient>
      <linearGradient id={`${id}-water-feather`} x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor={p.sandWet} stopOpacity={0} />
        <stop offset="35%" stopColor={p.sandWet} stopOpacity={0.15} />
        <stop offset="70%" stopColor={p.oceanShallow} stopOpacity={0.45} />
        <stop offset="100%" stopColor={p.oceanShallow} stopOpacity={0.7} />
      </linearGradient>
      <pattern id={`${id}-sand-tex`} width={48} height={10} patternUnits="userSpaceOnUse">
        <path
          d="M 0 5 Q 12 3 24 5 T 48 5"
          fill="none"
          stroke={p.sandWet}
          strokeWidth={0.7}
          opacity={0.22}
        />
      </pattern>
      <linearGradient id={`${id}-mtn-far`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={adjustColor(p.mountainFar, 18)} />
        <stop offset="100%" stopColor={p.mountainFar} />
      </linearGradient>
      <linearGradient id={`${id}-mtn-near`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.mountainMid} />
        <stop offset="100%" stopColor={p.mountainNear} />
      </linearGradient>
    </defs>
  )
}

function Pine({
  x,
  y,
  scale,
  pine,
  pineDark,
}: {
  x: number
  y: number
  scale: number
  pine: string
  pineDark: string
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={22} rx={14} ry={4} fill="rgba(78,52,46,0.15)" />
      <rect x={-3} y={11} width={6} height={11} rx={1} fill="#795548" stroke={S} strokeWidth={1} />
      <polygon points="0,-11 15,11 -15,11" fill={pineDark} stroke={S} strokeWidth={1.2} strokeLinejoin="round" />
      <polygon points="0,1 12,14 -12,14" fill={pine} stroke={S} strokeWidth={1.2} strokeLinejoin="round" />
      <polygon points="0,9 8,16 -8,16" fill={adjustColor(pine, 14)} stroke={S} strokeWidth={1.1} strokeLinejoin="round" />
    </g>
  )
}

function Cloud({
  x,
  y,
  scale,
  drift,
  light,
  shadow,
}: {
  x: number
  y: number
  scale: number
  drift: string
  light: string
  shadow: string
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g className={`terrain-cloud terrain-cloud--${drift}`}>
        <ellipse cx={0} cy={14} rx={48} ry={17} fill={shadow} opacity={0.3} />
        <ellipse cx={0} cy={10} rx={46} ry={16} fill={light} />
        <ellipse cx={-28} cy={13} rx={26} ry={12} fill={light} />
        <ellipse cx={26} cy={12} rx={28} ry={13} fill={light} />
        <ellipse cx={-8} cy={6} rx={22} ry={11} fill={light} opacity={0.95} />
      </g>
    </g>
  )
}

function GrassTuft({ x, y, dark }: { x: number; y: number; dark: string }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={0.55}>
      {[-4, 0, 4].map((dx, i) => (
        <line
          key={i}
          x1={dx}
          y1={6}
          x2={dx + (i - 1) * 1.5}
          y2={0}
          stroke={dark}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      ))}
    </g>
  )
}

function BirdFlock({
  x,
  y,
  scale,
  anim,
  count,
  color,
}: {
  x: number
  y: number
  scale: number
  anim: string
  count: number
  color: string
}) {
  const h = 5
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} style={{ color }}>
      <g className={`terrain-birds terrain-birds--${anim}`}>
        {Array.from({ length: count }).map((_, i) => (
          <path
            key={i}
            d={`M ${i * 18} 0 Q ${i * 18 + h * 0.35} ${-h * 0.55} ${i * 18 + h} 0 Q ${i * 18 + h * 1.35} ${h * 0.45} ${i * 18 + h * 1.7} 0`}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}
      </g>
    </g>
  )
}

function SkyLayer({
  id,
  p,
  cloudOpacity,
  showBirds,
}: {
  id: string
  p: TerrainPalette
  cloudOpacity: number
  showBirds: boolean
}) {
  return (
    <g clipPath={`url(#${id}-sky-clip)`}>
      <g opacity={cloudOpacity}>
        {CLOUDS.map(([x, y, scale, drift], i) => (
          <Cloud key={i} x={x} y={y} scale={scale} drift={drift} light={p.cloudLight} shadow={p.cloudShadow} />
        ))}
      </g>
      {showBirds &&
        BIRDS.map(([x, y, scale, anim, count], i) => (
          <BirdFlock key={i} x={x} y={y} scale={scale} anim={anim} count={count} color={p.bird} />
        ))}
    </g>
  )
}

const PHASE_FILTER: Record<TimePhase, { s: number; b: number }> = {
  day: { s: 1.05, b: 1.02 },
  sunset: { s: 1.1, b: 0.98 },
  dawn: { s: 1.06, b: 1.03 },
  night: { s: 0.8, b: 0.9 },
}

export function CoastalMapTerrain({ phase, weather }: CoastalMapTerrainProps) {
  const p = PALETTES[phase]
  const id = `terrain-${phase}`
  const isNight = phase === 'night'
  const wx = WEATHER_VISUALS[weather]
  const showBirds = !isNight && wx.showBirds
  const cloudOpacity = (isNight ? 0.4 : 1) * wx.cloudOpacity
  const pf = PHASE_FILTER[phase]

  return (
    <svg
      className={`map-terrain map-terrain--${phase} map-terrain--wx-${weather}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        filter: `saturate(${wx.terrainSaturate * pf.s}) brightness(${wx.terrainBrightness * pf.b})`,
      }}
    >
      <TerrainDefs id={id} p={p} />

      {/* Full sky — entire upper zone, nothing else intrudes above the mountains */}
      <rect x={0} y={0} width={1000} height={HORIZON} fill={`url(#${id}-sky)`} />

      {/* Usable terrain below mountains */}
      <path d={SHAPES.bayWater} fill={`url(#${id}-ocean)`} />
      <path d={SHAPES.shallowBand} fill={`url(#${id}-shallow)`} opacity={0.85} />
      <path
        d="M 720 310 L 1000 310 L 1000 600 L 650 600 Q 735 470 772 360 Q 805 310 720 310 Z"
        fill={p.oceanDeep}
        opacity={0.22}
      />

      <path d={SHAPES.meadow} fill={`url(#${id}-meadow)`} />
      <path d={SHAPES.meadowHighlight} fill={p.grassLight} opacity={0.14} />

      {/* Sand between grass and water — no grass on the shore */}
      <path d={SHAPES.sand} fill={`url(#${id}-sand-coast)`} />
      <path d={SHAPES.sand} fill={`url(#${id}-sand-tex)`} opacity={0.4} />
      <path d={SHAPES.sand} fill={`url(#${id}-water-feather)`} opacity={0.85} />
      {BEACH_PEBBLES.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={adjustColor(p.sandWet, -15)} opacity={0.35} />
      ))}

      {GRASS_TUFTS.map(([x, y], i) => (
        <GrassTuft key={i} x={x} y={y} dark={p.grassDark} />
      ))}
      {FLOWERS.map(([x, y, color], i) => (
        <g key={i}>
          <circle cx={x} cy={y + 2} r={3} fill={color} opacity={0.85} />
          <circle cx={x - 1} cy={y} r={1.2} fill="#FFFFFF" opacity={0.6} />
        </g>
      ))}

      {PINES.map(([x, y, scale], i) => (
        <Pine key={i} x={x} y={y} scale={scale} pine={p.pine} pineDark={p.pineDark} />
      ))}

      <path d={SHAPES.foregroundHill} fill={p.scrub} stroke={S} strokeWidth={SW} strokeLinejoin="round" opacity={0.92} />

      {/* Mountain border — sits on horizon, peaks rise into sky */}
      <path d={SHAPES.mountainsFar} fill={`url(#${id}-mtn-far)`} stroke={S} strokeWidth={1.8} strokeLinejoin="round" />
      <path d={SHAPES.mountainsNear} fill={`url(#${id}-mtn-near)`} stroke={S} strokeWidth={1.8} strokeLinejoin="round" opacity={0.92} />

      {/* Offshore wave lines */}
      <g className="terrain-wave terrain-wave-1">
        <path d="M 640 340 Q 780 332 920 340 T 1060 335" fill="none" stroke={p.foam} strokeWidth={2} opacity={0.3} />
      </g>
      <g className="terrain-wave terrain-wave-2">
        <path d="M 660 430 Q 820 422 960 432 T 1080 425" fill="none" stroke={p.foam} strokeWidth={1.8} opacity={0.22} />
      </g>
      <g className="terrain-wave terrain-wave-3">
        <path d="M 620 520 Q 780 514 920 522 T 1060 516" fill="none" stroke={p.foam} strokeWidth={1.6} opacity={0.16} />
      </g>

      {/* Clouds & birds — sky only, above the mountain line */}
      <SkyLayer id={id} p={p} cloudOpacity={cloudOpacity} showBirds={showBirds} />
    </svg>
  )
}
