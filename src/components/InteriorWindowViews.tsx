import type { WindowViewId } from '../data/interiorWindowView'

const S = '#4E342E'

interface SceneProps {
  x: number
  y: number
  width: number
  height: number
}

function WindowSkyDefs({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#6EC6FF" />
      <stop offset="100%" stopColor="#87CEEB" />
    </linearGradient>
  )
}

function OceanScene({ x, y, width, height }: SceneProps) {
  const skyId = `win-sky-o-${x}-${y}`
  const horizon = y + height * 0.48
  return (
    <>
      <defs>
        <WindowSkyDefs id={skyId} />
      </defs>
      <rect x={x} y={y} width={width} height={height * 0.5} fill={`url(#${skyId})`} />
      <rect x={x} y={horizon} width={width} height={height * 0.52} fill="#48D1CC" />
      <rect x={x} y={horizon + height * 0.12} width={width} height={height * 0.4} fill="#20B2AA" />
      <path
        d={`M ${x} ${horizon + 6} Q ${x + width * 0.25} ${horizon} ${x + width * 0.5} ${horizon + 5} T ${x + width} ${horizon + 4}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        opacity={0.55}
      />
      <path
        d={`M ${x + width * 0.55} ${horizon + height * 0.22} L ${x + width * 0.58} ${horizon + height * 0.08} L ${x + width * 0.72} ${horizon + height * 0.2} Z`}
        fill="#FFFFFF"
        stroke={S}
        strokeWidth={0.8}
        opacity={0.9}
      />
      <circle cx={x + width * 0.82} cy={y + height * 0.18} r={height * 0.07} fill="#FFD54F" opacity={0.85} />
    </>
  )
}

function MiniSailboat({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <path d="M -18 6 Q 0 14 18 6 L 14 2 L -14 2 Z" fill="#3498DB" stroke={S} strokeWidth={1.2} />
      <line x1={0} y1={2} x2={0} y2={-22} stroke="#5D4037" strokeWidth={2} />
      <path d="M 0 -20 L 16 -8 L 0 -2 Z" fill="#FFFFFF" stroke={S} strokeWidth={1} />
      <path d="M 0 -18 L -12 -6 L 0 -2 Z" fill="#E8F4F8" stroke={S} strokeWidth={0.8} />
    </g>
  )
}

function MiniFishingBoat({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <path d="M -16 5 Q 0 12 16 5 L 12 0 L -12 0 Z" fill="#2980B9" stroke={S} strokeWidth={1.2} />
      <rect x={-5} y={-8} width={10} height={8} fill="#E67E22" stroke={S} strokeWidth={0.8} />
      <line x1={0} y1={-8} x2={0} y2={-16} stroke="#5D4037" strokeWidth={1.5} />
    </g>
  )
}

function MiniYacht({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <path d="M -22 8 Q 0 16 22 8 L 18 3 L -18 3 Z" fill="#FFFFFF" stroke={S} strokeWidth={1.2} />
      <rect x={-8} y={-4} width={16} height={7} rx={2} fill="#E8E0D4" stroke={S} strokeWidth={0.8} />
      <line x1={0} y1={-4} x2={0} y2={-18} stroke="#5D4037" strokeWidth={1.8} />
    </g>
  )
}

/** Wide ocean panorama with boats — for lighthouse lantern deck window wall. */
export function OceanPanoramaWithBoats({ x, y, width, height }: SceneProps) {
  const skyId = `lh-pano-sky-${x}-${y}`
  const horizon = y + height * 0.42
  return (
    <>
      <defs>
        <linearGradient id={skyId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5EB3FF" />
          <stop offset="45%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#B8E8F4" />
        </linearGradient>
        <linearGradient id={`${skyId}-sea`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#48D1CC" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={width} height={horizon - y} fill={`url(#${skyId})`} />
      <ellipse cx={x + width * 0.78} cy={y + height * 0.14} rx={height * 0.09} ry={height * 0.09} fill="#FFD54F" opacity={0.95} />
      <ellipse cx={x + width * 0.18} cy={y + height * 0.2} rx={width * 0.08} ry={height * 0.04} fill="#FFFFFF" opacity={0.75} />
      <ellipse cx={x + width * 0.42} cy={y + height * 0.12} rx={width * 0.06} ry={height * 0.03} fill="#FFFFFF" opacity={0.6} />
      <rect x={x} y={horizon} width={width} height={height - (horizon - y)} fill={`url(#${skyId}-sea)`} />
      <path
        d={`M ${x} ${horizon + 8} Q ${x + width * 0.2} ${horizon + 2} ${x + width * 0.4} ${horizon + 7} T ${x + width * 0.8} ${horizon + 5} T ${x + width} ${horizon + 9}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        opacity={0.45}
      />
      <path
        d={`M ${x} ${horizon + height * 0.28} Q ${x + width * 0.35} ${horizon + height * 0.22} ${x + width * 0.7} ${horizon + height * 0.27} T ${x + width} ${horizon + height * 0.25}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        opacity={0.3}
      />
      <MiniSailboat cx={x + width * 0.22} cy={horizon + height * 0.32} scale={1.35} />
      <MiniYacht cx={x + width * 0.52} cy={horizon + height * 0.38} scale={1.2} />
      <MiniFishingBoat cx={x + width * 0.76} cy={horizon + height * 0.3} scale={1.15} />
      <MiniSailboat cx={x + width * 0.88} cy={horizon + height * 0.42} scale={0.85} />
      <ellipse cx={x + width * 0.62} cy={horizon + height * 0.48} rx={14} ry={4} fill="#FFFFFF" opacity={0.2} />
      <ellipse cx={x + width * 0.3} cy={horizon + height * 0.44} rx={10} ry={3} fill="#FFFFFF" opacity={0.18} />
    </>
  )
}

function BeachScene({ x, y, width, height }: SceneProps) {
  const skyId = `win-sky-b-${x}-${y}`
  const sandTop = y + height * 0.58
  const oceanTop = y + height * 0.38
  return (
    <>
      <defs>
        <WindowSkyDefs id={skyId} />
      </defs>
      <rect x={x} y={y} width={width} height={height * 0.4} fill={`url(#${skyId})`} />
      <rect x={x} y={oceanTop} width={width} height={height * 0.22} fill="#5BC4BE" />
      <rect x={x} y={sandTop} width={width} height={height * 0.42} fill="#F0D78C" />
      <path
        d={`M ${x + width * 0.12} ${sandTop + height * 0.28} L ${x + width * 0.12} ${sandTop + height * 0.08} L ${x + width * 0.2} ${sandTop + height * 0.28} Z`}
        fill="#E53935"
        stroke={S}
        strokeWidth={0.6}
      />
      <ellipse cx={x + width * 0.14} cy={sandTop + height * 0.06} rx={width * 0.08} ry={height * 0.04} fill="#E53935" opacity={0.85} />
      <circle cx={x + width * 0.78} cy={y + height * 0.15} r={height * 0.06} fill="#FFD54F" />
    </>
  )
}

function DockScene({ x, y, width, height }: SceneProps) {
  const skyId = `win-sky-d-${x}-${y}`
  const waterTop = y + height * 0.42
  return (
    <>
      <defs>
        <WindowSkyDefs id={skyId} />
      </defs>
      <rect x={x} y={y} width={width} height={height * 0.44} fill={`url(#${skyId})`} />
      <rect x={x} y={waterTop} width={width} height={height * 0.56} fill="#38B2AC" />
      <rect x={x + width * 0.08} y={waterTop + height * 0.18} width={width * 0.84} height={height * 0.14} rx={2} fill="#C4956A" stroke={S} strokeWidth={1} />
      {[0.22, 0.42, 0.62, 0.82].map((p) => (
        <rect
          key={p}
          x={x + width * p - 2}
          y={waterTop + height * 0.32}
          width={4}
          height={height * 0.22}
          fill="#8B6914"
          stroke={S}
          strokeWidth={0.6}
        />
      ))}
      <path
        d={`M ${x + width * 0.62} ${waterTop + height * 0.28} L ${x + width * 0.66} ${waterTop + height * 0.12} L ${x + width * 0.88} ${waterTop + height * 0.26} L ${x + width * 0.84} ${waterTop + height * 0.34} Z`}
        fill="#FFFFFF"
        stroke={S}
        strokeWidth={0.8}
      />
      <circle cx={x + width * 0.18} cy={waterTop + height * 0.48} r={height * 0.05} fill="#FFD54F" stroke={S} strokeWidth={0.6} />
    </>
  )
}

function TownScene({ x, y, width, height }: SceneProps) {
  const skyId = `win-sky-t-${x}-${y}`
  const ground = y + height * 0.62
  return (
    <>
      <defs>
        <WindowSkyDefs id={skyId} />
      </defs>
      <rect x={x} y={y} width={width} height={height * 0.5} fill={`url(#${skyId})`} />
      <rect x={x} y={ground} width={width} height={height * 0.38} fill="#7CB342" />
      <rect x={x + width * 0.06} y={ground - height * 0.22} width={width * 0.22} height={height * 0.22} fill="#FFD4CC" stroke={S} strokeWidth={0.8} />
      <polygon
        points={`${x + width * 0.05},${ground - height * 0.22} ${x + width * 0.17},${ground - height * 0.32} ${x + width * 0.29},${ground - height * 0.22}`}
        fill="#E57373"
      />
      <rect x={x + width * 0.38} y={ground - height * 0.18} width={width * 0.2} height={height * 0.18} fill="#B8E8E4" stroke={S} strokeWidth={0.8} />
      <polygon
        points={`${x + width * 0.37},${ground - height * 0.18} ${x + width * 0.48},${ground - height * 0.28} ${x + width * 0.59},${ground - height * 0.18}`}
        fill="#48B5B0"
      />
      <rect x={x + width * 0.68} y={ground - height * 0.24} width={width * 0.24} height={height * 0.24} fill="#FFF3C4" stroke={S} strokeWidth={0.8} />
      <polygon
        points={`${x + width * 0.67},${ground - height * 0.24} ${x + width * 0.8},${ground - height * 0.36} ${x + width * 0.93},${ground - height * 0.24}`}
        fill="#C4956A"
      />
      <path
        d={`M ${x + width * 0.1} ${ground + height * 0.05} Q ${x + width * 0.5} ${ground + height * 0.12} ${x + width * 0.9} ${ground + height * 0.04}`}
        fill="none"
        stroke="#C9B896"
        strokeWidth={2}
        opacity={0.7}
      />
    </>
  )
}

function LandscapeScene({ x, y, width, height }: SceneProps) {
  const skyId = `win-sky-l-${x}-${y}`
  return (
    <>
      <defs>
        <WindowSkyDefs id={skyId} />
      </defs>
      <rect x={x} y={y} width={width} height={height * 0.45} fill={`url(#${skyId})`} />
      <path
        d={`M ${x} ${y + height * 0.72} Q ${x + width * 0.3} ${y + height * 0.48} ${x + width * 0.55} ${y + height * 0.58} Q ${x + width * 0.78} ${y + height * 0.42} ${x + width} ${y + height * 0.55} L ${x + width} ${y + height} L ${x} ${y + height} Z`}
        fill="#6A9478"
      />
      <path
        d={`M ${x} ${y + height * 0.82} Q ${x + width * 0.4} ${y + height * 0.62} ${x + width} ${y + height * 0.75} L ${x + width} ${y + height} L ${x} ${y + height} Z`}
        fill="#4E8059"
      />
      <rect x={x + width * 0.12} y={y + height * 0.52} width={3} height={height * 0.18} fill="#7A5230" />
      <ellipse cx={x + width * 0.13} cy={y + height * 0.5} rx={width * 0.1} ry={height * 0.08} fill="#5A8F65" />
      <rect x={x + width * 0.72} y={y + height * 0.48} width={3} height={height * 0.16} fill="#7A5230" />
      <ellipse cx={x + width * 0.73} cy={y + height * 0.46} rx={width * 0.09} ry={height * 0.07} fill="#5A8F65" />
      <path
        d={`M ${x + width * 0.45} ${y + height * 0.22} Q ${x + width * 0.48} ${y + height * 0.18} ${x + width * 0.52} ${y + height * 0.22}`}
        fill="none"
        stroke={S}
        strokeWidth={0.8}
        opacity={0.5}
      />
    </>
  )
}

export function WindowViewScene({
  view,
  x,
  y,
  width,
  height,
}: SceneProps & { view: WindowViewId }) {
  switch (view) {
    case 'ocean':
      return <OceanScene x={x} y={y} width={width} height={height} />
    case 'beach':
      return <BeachScene x={x} y={y} width={width} height={height} />
    case 'dock':
      return <DockScene x={x} y={y} width={width} height={height} />
    case 'town':
      return <TownScene x={x} y={y} width={width} height={height} />
    case 'landscape':
      return <LandscapeScene x={x} y={y} width={width} height={height} />
  }
}

export function WindowViewPreviewSwatch({ view }: { view: WindowViewId | 'auto' }) {
  return (
    <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
      <rect width={40} height={32} rx={6} fill="#FFF8F0" stroke="#4E342E" strokeWidth={1.5} />
      {view === 'auto' ? (
        <text x={20} y={20} textAnchor="middle" fontSize={14}>
          📍
        </text>
      ) : (
        <g transform="translate(4, 4) scale(0.8)">
          <WindowViewScene view={view} x={0} y={0} width={40} height={28} />
        </g>
      )}
    </svg>
  )
}
