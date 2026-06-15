import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaDoor, TocaRoundWindow } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = TOCA.strokeWidth

function WindowGrid({
  x,
  y,
  cols,
  rows,
  cellW,
  cellH,
  gap = 3,
}: {
  x: number
  y: number
  cols: number
  rows: number
  cellW: number
  cellH: number
  gap?: number
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={x + col * (cellW + gap)}
            y={y + row * (cellH + gap)}
            width={cellW}
            height={cellH}
            rx={1.5}
            fill={TOCA.window}
            stroke={S}
            strokeWidth={0.8}
            opacity={0.92}
          />
        )),
      )}
    </>
  )
}

function GoldStar({ cx, cy, r = 4 }: { cx: number; cy: number; r?: number }) {
  return (
    <polygon
      points={`${cx},${cy - r} ${cx + r * 0.95},${cy - r * 0.3} ${cx + r * 0.6},${cy + r * 0.85} ${cx - r * 0.6},${cy + r * 0.85} ${cx - r * 0.95},${cy - r * 0.3}`}
      fill={TOCA.wattle}
      stroke={TOCA.wattleDark}
      strokeWidth={0.8}
      strokeLinejoin="round"
    />
  )
}

/** Tall glass tower — five-star coastal hotel */
export function FiveStarHotelToca() {
  return (
    <>
      <TocaShadow cx={47} cy={158} rx={38} />
      <rect x={38} y={18} width={52} height={132} rx={6} fill={TOCA.weatherboard} stroke={S} strokeWidth={SW} />
      <rect x={84} y={22} width={4} height={124} rx={2} fill="#000000" opacity={0.06} />
      <rect x={38} y={18} width={52} height={8} rx={4} fill={TOCA.wattle} stroke={S} strokeWidth={1.2} />
      <WindowGrid x={43} y={30} cols={4} rows={9} cellW={8} cellH={7} gap={2.5} />
      <rect x={38} y={118} width={52} height={10} fill={TOCA.wattle} stroke={S} strokeWidth={1.2} opacity={0.9} />
      {[44, 56, 68, 80].map((sx) => (
        <GoldStar key={sx} cx={sx} cy={10} r={3.2} />
      ))}
      <rect x={50} y={6} width={28} height={6} rx={3} fill={TOCA.tinRed} stroke={S} strokeWidth={1} />
      <polygon points="64,2 58,6 70,6" fill={TOCA.wattle} stroke={S} strokeWidth={0.8} />
      <TocaDoor x={52} y={132} width={24} height={22} color={TOCA.eucalyptus} />
      <ellipse cx={64} cy={136} rx={10} ry={8} fill="none" stroke={TOCA.eucalyptus} strokeWidth={2} opacity={0.55} />
      <rect x={46} y={152} width={36} height={5} rx={2} fill={TOCA.sand} stroke={S} strokeWidth={1} />
    </>
  )
}

/** Sleek blue-glass skyline tower */
export function SkylineTowerToca() {
  return (
    <>
      <TocaShadow cx={45} cy={152} rx={34} />
      <polygon
        points="45,8 52,18 38,18"
        fill={TOCA.corrugatedDark}
        stroke={S}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <line x1={45} y1={8} x2={45} y2={2} stroke={S} strokeWidth={1.5} />
      <circle cx={45} cy={2} r={2} fill={TOCA.tinRed} stroke={S} strokeWidth={0.8} />
      <rect x={30} y={18} width={30} height={118} rx={4} fill={adjustColor(TOCA.ocean, 22)} stroke={S} strokeWidth={SW} />
      <rect x={56} y={22} width={3} height={110} rx={1.5} fill="#FFFFFF" opacity={0.12} />
      <WindowGrid x={34} y={26} cols={3} rows={10} cellW={7} cellH={6} gap={2} />
      <rect x={28} y={88} width={34} height={48} rx={3} fill={adjustColor(TOCA.ocean, 10)} stroke={S} strokeWidth={1.5} />
      <WindowGrid x={32} y={94} cols={3} rows={4} cellW={7} cellH={6} gap={2} />
      <TocaDoor x={38} y={128} width={18} height={18} color={TOCA.corrugatedDark} />
      <rect x={34} y={148} width={22} height={4} rx={1} fill={TOCA.sand} opacity={0.8} />
    </>
  )
}

/** Sprawling luxury resort — wings, pool, palms */
export function LuxuryResortToca() {
  return (
    <>
      <TocaShadow cx={75} cy={108} rx={58} />
      {/* Pool */}
      <ellipse cx={75} cy={98} rx={42} ry={10} fill={TOCA.ocean} stroke={S} strokeWidth={1.5} opacity={0.75} />
      <ellipse cx={75} cy={97} rx={34} ry={7} fill={adjustColor(TOCA.ocean, 18)} opacity={0.55} />
      {/* Left wing */}
      <rect x={8} y={52} width={44} height={28} rx={8} fill={TOCA.cream} stroke={S} strokeWidth={SW} />
      <rect x={8} y={48} width={44} height={8} rx={4} fill={TOCA.tinRed} stroke={S} strokeWidth={1.2} />
      <TocaRoundWindow cx={20} cy={66} r={5} />
      <TocaRoundWindow cx={40} cy={66} r={5} />
      {/* Right wing */}
      <rect x={98} y={52} width={44} height={28} rx={8} fill={TOCA.cream} stroke={S} strokeWidth={SW} />
      <rect x={98} y={48} width={44} height={8} rx={4} fill={TOCA.tinRed} stroke={S} strokeWidth={1.2} />
      <TocaRoundWindow cx={110} cy={66} r={5} />
      <TocaRoundWindow cx={130} cy={66} r={5} />
      {/* Central tower */}
      <rect x={58} y={22} width={34} height={62} rx={5} fill={TOCA.weatherboard} stroke={S} strokeWidth={SW} />
      <rect x={58} y={22} width={34} height={7} rx={3} fill={TOCA.wattle} stroke={S} strokeWidth={1} />
      <WindowGrid x={63} y={32} cols={3} rows={5} cellW={7} cellH={6} gap={2} />
      <path d="M 58 22 Q 75 10 92 22" fill={TOCA.corrugated} stroke={S} strokeWidth={1.5} />
      <TocaDoor x={66} y={68} width={18} height={16} color={TOCA.eucalyptus} />
      {/* Palms */}
      <line x1={18} y1={82} x2={18} y2={58} stroke={TOCA.ochre} strokeWidth={2} />
      <ellipse cx={18} cy={52} rx={10} ry={5} fill={TOCA.eucalyptus} stroke={S} strokeWidth={1} />
      <ellipse cx={14} cy={50} rx={8} ry={4} fill={TOCA.gumGreen} stroke={S} strokeWidth={0.8} />
      <line x1={132} y1={82} x2={132} y2={58} stroke={TOCA.ochre} strokeWidth={2} />
      <ellipse cx={132} cy={52} rx={10} ry={5} fill={TOCA.eucalyptus} stroke={S} strokeWidth={1} />
      {/* Loungers */}
      {[62, 82].map((lx) => (
        <g key={lx}>
          <rect x={lx} y={88} width={12} height={4} rx={1} fill={TOCA.wattle} stroke={S} strokeWidth={0.8} />
          <line x1={lx + 2} y1={92} x2={lx + 2} y2={96} stroke={S} strokeWidth={1} />
          <line x1={lx + 10} y1={92} x2={lx + 10} y2={96} stroke={S} strokeWidth={1} />
        </g>
      ))}
      {[44, 56, 68, 80, 92].map((sx) => (
        <GoldStar key={sx} cx={sx} cy={38} r={2.5} />
      ))}
    </>
  )
}

export function getTocaSkyscraperArt(id: string): ReactNode | null {
  switch (id) {
    case 'five-star-hotel':
      return <FiveStarHotelToca />
    case 'skyline-tower':
      return <SkylineTowerToca />
    case 'luxury-resort':
      return <LuxuryResortToca />
    default:
      return null
  }
}
