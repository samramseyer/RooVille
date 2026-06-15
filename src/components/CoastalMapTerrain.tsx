import type { TimePhase } from '../hooks/useDayNight'

interface TerrainPalette {
  skyTop: string
  skyBottom: string
  grassLight: string
  grassMid: string
  grassDark: string
  sandDry: string
  sandWet: string
  oceanShallow: string
  oceanMid: string
  oceanDeep: string
  foam: string
  dune: string
}

const PALETTES: Record<TimePhase, TerrainPalette> = {
  day: {
    skyTop: '#5EB3FF',
    skyBottom: '#87CEEB',
    grassLight: '#8FD068',
    grassMid: '#6FAF42',
    grassDark: '#4A8530',
    sandDry: '#F0D78C',
    sandWet: '#D4B56A',
    oceanShallow: '#5BC4BE',
    oceanMid: '#20B2AA',
    oceanDeep: '#178F89',
    foam: 'rgba(255,255,255,0.55)',
    dune: '#E8C872',
  },
  sunset: {
    skyTop: '#FF8C42',
    skyBottom: '#C44569',
    grassLight: '#7A9E50',
    grassMid: '#5A8538',
    grassDark: '#3D6528',
    sandDry: '#E8B86D',
    sandWet: '#C99555',
    oceanShallow: '#4A9E98',
    oceanMid: '#1A8F88',
    oceanDeep: '#126660',
    foam: 'rgba(255,220,180,0.45)',
    dune: '#D4A860',
  },
  dawn: {
    skyTop: '#FFB347',
    skyBottom: '#FFCCBC',
    grassLight: '#82B860',
    grassMid: '#629840',
    grassDark: '#457530',
    sandDry: '#EDD090',
    sandWet: '#CFAE68',
    oceanShallow: '#56BFB8',
    oceanMid: '#1FA99F',
    oceanDeep: '#158880',
    foam: 'rgba(255,255,255,0.5)',
    dune: '#E0C070',
  },
  night: {
    skyTop: '#0B1D3A',
    skyBottom: '#1A3A5C',
    grassLight: '#3D5A30',
    grassMid: '#2D4524',
    grassDark: '#1E3018',
    sandDry: '#8A7A50',
    sandWet: '#6E6040',
    oceanShallow: '#1A5276',
    oceanMid: '#0E3D54',
    oceanDeep: '#0A2A3A',
    foam: 'rgba(200,220,240,0.2)',
    dune: '#7A6A45',
  },
}

interface CoastalMapTerrainProps {
  phase: TimePhase
}

export function CoastalMapTerrain({ phase }: CoastalMapTerrainProps) {
  const p = PALETTES[phase]

  return (
    <svg
      className={`map-terrain map-terrain--${phase}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`terrain-sky-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.skyTop} />
          <stop offset="100%" stopColor={p.skyBottom} />
        </linearGradient>
        <linearGradient id={`terrain-grass-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.grassLight} />
          <stop offset="55%" stopColor={p.grassMid} />
          <stop offset="100%" stopColor={p.grassDark} />
        </linearGradient>
        <linearGradient id={`terrain-sand-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sandDry} />
          <stop offset="100%" stopColor={p.sandWet} />
        </linearGradient>
        <linearGradient id={`terrain-ocean-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.oceanShallow} />
          <stop offset="35%" stopColor={p.oceanMid} />
          <stop offset="100%" stopColor={p.oceanDeep} />
        </linearGradient>
        <radialGradient id={`terrain-hill-${phase}`} cx="30%" cy="40%" r="55%">
          <stop offset="0%" stopColor={p.grassLight} stopOpacity={0.45} />
          <stop offset="100%" stopColor={p.grassDark} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`terrain-hill2-${phase}`} cx="75%" cy="35%" r="45%">
          <stop offset="0%" stopColor={p.grassLight} stopOpacity={0.35} />
          <stop offset="100%" stopColor={p.grassDark} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect x={0} y={0} width={1000} height={360} fill={`url(#terrain-sky-${phase})`} />

      {/* Distant haze on horizon */}
      <rect x={0} y={300} width={1000} height={60} fill={p.skyBottom} opacity={0.25} />

      {/* Soft clouds — day/dawn only */}
      {phase !== 'night' && (
        <g opacity={phase === 'sunset' ? 0.35 : 0.55}>
          <ellipse cx={180} cy={72} rx={90} ry={28} fill="#FFFFFF" />
          <ellipse cx={230} cy={68} rx={60} ry={22} fill="#FFFFFF" />
          <ellipse cx={620} cy={95} rx={110} ry={32} fill="#FFFFFF" />
          <ellipse cx={700} cy={88} rx={70} ry={24} fill="#FFFFFF" />
          <ellipse cx={860} cy={60} rx={80} ry={26} fill="#FFFFFF" opacity={0.8} />
        </g>
      )}

      {/* Grass land with curved coast */}
      <path
        d="M 0 0 L 1000 0 L 1000 310 Q 820 328 640 318 T 320 325 Q 140 338 0 322 Z"
        fill={`url(#terrain-grass-${phase})`}
      />
      <rect x={0} y={0} width={1000} height={330} fill={`url(#terrain-hill-${phase})`} />
      <rect x={0} y={0} width={1000} height={330} fill={`url(#terrain-hill2-${phase})`} />

      {/* Grass texture patches */}
      {[
        [120, 180, 55, 22],
        [280, 220, 70, 28],
        [450, 150, 48, 20],
        [580, 240, 62, 24],
        [720, 190, 50, 18],
        [850, 260, 58, 22],
        [200, 280, 40, 16],
        [680, 130, 44, 18],
      ].map(([cx, cy, rx, ry], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          fill={p.grassLight}
          opacity={0.22}
        />
      ))}

      {/* Darker meadow strips for depth */}
      <path
        d="M 0 260 Q 250 240 500 255 T 1000 248 L 1000 310 Q 820 328 640 318 T 320 325 Q 140 338 0 322 Z"
        fill={p.grassDark}
        opacity={0.12}
      />

      {/* Beach — wet to dry gradient band */}
      <path
        d="M 0 322 Q 140 338 320 325 T 640 318 Q 820 328 1000 310 L 1000 395 Q 780 408 500 398 T 0 390 Z"
        fill={`url(#terrain-sand-${phase})`}
      />

      {/* Wet sand shimmer near water */}
      <path
        d="M 0 378 Q 250 388 500 382 T 1000 375 L 1000 395 Q 780 408 500 398 T 0 390 Z"
        fill={p.sandWet}
        opacity={0.45}
      />

      {/* Beach pebbles & shell scatter */}
      {[
        [90, 355, 3],
        [210, 368, 2.5],
        [340, 350, 2],
        [480, 372, 3],
        [610, 358, 2.5],
        [750, 365, 2],
        [890, 352, 3],
        [150, 385, 2],
        [420, 388, 2.5],
        [820, 382, 2],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={p.dune} opacity={0.55} />
      ))}

      {/* Low dunes on land edge */}
      <path
        d="M 0 318 Q 180 305 360 312 T 720 308 Q 880 315 1000 310 L 1000 322 Q 820 328 640 318 T 320 325 Q 140 338 0 322 Z"
        fill={p.dune}
        opacity={0.35}
      />

      {/* Ocean */}
      <path
        d="M 0 390 Q 250 400 500 392 T 1000 385 L 1000 600 L 0 600 Z"
        fill={`url(#terrain-ocean-${phase})`}
      />

      {/* Subtle depth bands in water */}
      <path
        d="M 0 430 Q 400 440 1000 425 L 1000 600 L 0 600 Z"
        fill={p.oceanDeep}
        opacity={0.35}
      />
      <path
        d="M 0 500 Q 500 510 1000 495 L 1000 600 L 0 600 Z"
        fill={p.oceanDeep}
        opacity={0.25}
      />

      {/* Shore foam line */}
      <path
        d="M 0 388 Q 180 395 360 390 T 720 392 Q 880 388 1000 385"
        fill="none"
        stroke={p.foam}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d="M 0 392 Q 220 400 440 394 T 880 396 Q 960 392 1000 390"
        fill="none"
        stroke={p.foam}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* Animated-style wave crests (CSS animates these groups) */}
      <g className="terrain-wave terrain-wave-1">
        <path
          d="M -50 410 Q 120 400 290 412 T 630 405 T 1050 410"
          fill="none"
          stroke={p.foam}
          strokeWidth={3}
          opacity={0.35}
        />
      </g>
      <g className="terrain-wave terrain-wave-2">
        <path
          d="M -80 440 Q 150 430 380 442 T 720 435 T 1080 440"
          fill="none"
          stroke={p.foam}
          strokeWidth={2.5}
          opacity={0.25}
        />
      </g>
      <g className="terrain-wave terrain-wave-3">
        <path
          d="M -40 470 Q 200 462 450 472 T 850 465 T 1060 470"
          fill="none"
          stroke={p.foam}
          strokeWidth={2}
          opacity={0.18}
        />
      </g>

      {/* Distant headland silhouette */}
      <path
        d="M 0 305 Q 80 290 160 298 Q 220 308 280 295 Q 340 285 400 300 L 400 322 Q 280 325 160 318 Q 80 312 0 322 Z"
        fill={p.grassDark}
        opacity={0.2}
      />
    </svg>
  )
}
