import type { ReactNode } from 'react'
import { GroundShadow, ShadedCylinder, adjustColor } from './tocaShading'

/** Toca-style chunky art with Australian coastal palette */
export const TOCA = {
  stroke: '#4E342E',
  strokeWidth: 2.8,
  shadow: 'rgba(78, 52, 46, 0.18)',
  cream: '#FFF8F0',
  weatherboard: '#F5F0E8',
  sand: '#E8C872',
  ochre: '#C4956A',
  ocean: '#48B5B0',
  oceanDark: '#2A9D8F',
  eucalyptus: '#6B9E6B',
  gumGreen: '#4A7C59',
  wattle: '#FFD54F',
  wattleDark: '#FFC107',
  corrugated: '#7B8FA1',
  corrugatedDark: '#5C6F82',
  tinRed: '#B74A42',
  tinRedDark: '#9E3D36',
  terracotta: '#C4684A',
  skyBlue: '#87CEEB',
  white: '#FFFFFF',
  door: '#8D6E63',
  window: '#B3E5FC',
  windowShine: '#FFFFFF',
  fishGold: '#F4A836',
}

export { TocaShadeDefs } from './tocaShading'

export function TocaShadow({ cx = 50, cy = 92, rx = 38 }: { cx?: number; cy?: number; rx?: number }) {
  return <GroundShadow cx={cx} cy={cy} rx={rx} />
}

export function TocaRoundWindow({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx + 1} cy={cy + 1} r={r + 0.5} fill="rgba(0,0,0,0.12)" />
      <circle cx={cx} cy={cy} r={r} fill={TOCA.window} stroke={TOCA.stroke} strokeWidth={TOCA.strokeWidth * 0.7} />
      <circle cx={cx} cy={cy} r={r - 1.5} fill="none" stroke={adjustColor(TOCA.window, -18)} strokeWidth={1} opacity={0.5} />
      <circle cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.22} fill={TOCA.windowShine} opacity={0.9} />
    </>
  )
}

export function TocaDoor({
  x,
  y,
  width = 22,
  height = 30,
  color = TOCA.door,
}: {
  x: number
  y: number
  width?: number
  height?: number
  color?: string
}) {
  const r = width / 2
  const side = adjustColor(color, -28)
  return (
    <>
      <rect
        x={x + width - 1}
        y={y + r * 0.5}
        width={5}
        height={height - r * 0.2}
        rx={2}
        fill={side}
        stroke={TOCA.stroke}
        strokeWidth={1.2}
      />
      <rect
        x={x}
        y={y + r * 0.4}
        width={width}
        height={height - r * 0.4}
        rx={4}
        fill={color}
        stroke={TOCA.stroke}
        strokeWidth={TOCA.strokeWidth * 0.75}
      />
      <path
        d={`M ${x} ${y + r * 0.8} Q ${x + width / 2} ${y - r * 0.2} ${x + width} ${y + r * 0.8}`}
        fill={color}
        stroke={TOCA.stroke}
        strokeWidth={TOCA.strokeWidth * 0.75}
      />
      <rect x={x + 2} y={y + r * 0.55} width={width * 0.2} height={height * 0.5} rx={2} fill="#FFFFFF" opacity={0.12} />
      <circle cx={x + width * 0.78} cy={y + height * 0.55} r={2} fill={TOCA.wattle} />
    </>
  )
}

export function TocaBody({
  x,
  y,
  width,
  height,
  fill,
  rx = 10,
}: {
  x: number
  y: number
  width: number
  height: number
  fill: string
  rx?: number
}) {
  const depth = 7
  const side = adjustColor(fill, -32)
  const bottom = adjustColor(fill, -42)
  return (
    <g>
      <path
        d={`M ${x + width} ${y + rx * 0.5} L ${x + width + depth} ${y + rx * 0.5 + depth * 0.42} L ${x + width + depth} ${y + height + depth * 0.38} L ${x + width} ${y + height} Z`}
        fill={side}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d={`M ${x + rx} ${y + height} L ${x + width - rx * 0.5} ${y + height} L ${x + width + depth} ${y + height + depth * 0.32} L ${x + depth} ${y + height + depth * 0.32} Z`}
        fill={bottom}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        stroke={TOCA.stroke}
        strokeWidth={TOCA.strokeWidth}
        strokeLinejoin="round"
      />
      <rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={Math.max(height * 0.16, 4)}
        rx={Math.max(rx * 0.45, 2)}
        fill="url(#toca-surface-light)"
      />
      <rect x={x + width - 4} y={y + 5} width={3} height={height - 10} rx={1.5} fill="url(#toca-surface-side)" />
    </g>
  )
}

/** Corrugated iron roof — very Australian */
export function CorrugatedRoof({
  points,
  fill = TOCA.corrugated,
}: {
  points: string
  fill?: string
}) {
  const nums = points.split(/[\s,]+/).map(Number)
  const xs = nums.filter((_, i) => i % 2 === 0)
  const ys = nums.filter((_, i) => i % 2 === 1)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const maxY = Math.max(...ys)

  return (
    <>
      <polygon
        points={`${minX + 4},${maxY + 5} ${maxX + 2},${maxY + 5} ${maxX},${maxY + 1} ${minX},${maxY + 1}`}
        fill={adjustColor(fill, -38)}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <polygon
        points={points}
        fill={fill}
        stroke={TOCA.stroke}
        strokeWidth={TOCA.strokeWidth}
        strokeLinejoin="round"
      />
      <polygon points={points} fill="url(#toca-roof-shine)" stroke="none" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={18 + i * 12}
          y1={32 + i * 2}
          x2={82 - i * 2}
          y2={48 - i * 1.5}
          stroke={adjustColor(fill, -22)}
          strokeWidth={1.2}
          opacity={0.55}
        />
      ))}
    </>
  )
}

/** Queenslander veranda posts */
export function Veranda({
  y,
  width = 72,
  x = 14,
}: {
  y: number
  width?: number
  x?: number
}) {
  return (
    <>
      <rect x={x} y={y} width={width} height={6} rx={3} fill={TOCA.sand} stroke={TOCA.stroke} strokeWidth={2} />
      {[x + 8, x + width / 2, x + width - 8].map((px) => (
        <rect key={px} x={px - 2} y={y - 14} width={4} height={14} rx={2} fill={TOCA.weatherboard} stroke={TOCA.stroke} strokeWidth={1.5} />
      ))}
    </>
  )
}

export function WattleSprig({ x, y }: { x: number; y: number }) {
  return (
    <>
      <line x1={x} y1={y + 8} x2={x} y2={y + 16} stroke={TOCA.gumGreen} strokeWidth={2} strokeLinecap="round" />
      <circle cx={x - 4} cy={y + 4} r={5} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={x + 4} cy={y + 2} r={4.5} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={x} cy={y + 8} r={4} fill={TOCA.wattleDark} stroke={TOCA.stroke} strokeWidth={1} />
    </>
  )
}

export function GumLeaf({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx={8}
      ry={4}
      fill={TOCA.eucalyptus}
      stroke={TOCA.gumGreen}
      strokeWidth={1.2}
      transform={flip ? `rotate(35 ${x} ${y})` : `rotate(-25 ${x} ${y})`}
    />
  )
}

export function TinyKangaroo({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={6} rx={7} ry={9} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={0} cy={-4} r={5} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
      <ellipse cx={-6} cy={2} rx={3} ry={5} fill={TOCA.ochre} />
    </g>
  )
}

export function TocaWrap({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/** Classic fibro beach shack with tin roof */
export function BeachShackToca() {
  return (
    <TocaWrap>
      <TocaShadow cy={90} rx={36} />
      <CorrugatedRoof points="10,54 50,26 90,54" fill={TOCA.corrugated} />
      <TocaBody x={18} y={52} width={64} height={34} fill={TOCA.weatherboard} rx={12} />
      <TocaDoor x={39} y={58} width={22} height={28} color={TOCA.terracotta} />
      <TocaRoundWindow cx={28} cy={66} r={7} />
      <TocaRoundWindow cx={72} cy={66} r={7} />
      {/* Aussie surfboard */}
      <ellipse cx={83} cy={78} rx={4} ry={14} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={1.5} />
      <ellipse cx={83} cy={78} rx={2} ry={10} fill={TOCA.white} opacity={0.5} />
      <WattleSprig x={20} y={72} />
      {/* Sand under stilts hint */}
      <rect x={16} y={84} width={68} height={4} rx={2} fill={TOCA.sand} opacity={0.6} />
    </TocaWrap>
  )
}

/** Queenslander coastal home with veranda */
export function CoastalHomeToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={40} />
      <CorrugatedRoof points="8,48 50,22 92,48" fill={TOCA.tinRed} />
      <TocaBody x={14} y={48} width={72} height={38} fill={TOCA.cream} rx={12} />
      <Veranda y={86} />
      <TocaDoor x={39} y={56} width={22} height={30} color={TOCA.eucalyptus} />
      <TocaRoundWindow cx={26} cy={62} r={8} />
      <TocaRoundWindow cx={74} cy={62} r={8} />
      <GumLeaf x={18} y={50} />
      <GumLeaf x={82} y={52} flip />
      {/* Green trim strip — classic AU weatherboard */}
      <rect x={14} y={48} width={72} height={5} rx={3} fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={1} />
    </TocaWrap>
  )
}

/** Queenslander stilt house over the water */
export function StiltHouseToca() {
  return (
    <TocaWrap>
      <TocaShadow cy={93} rx={34} />
      {[22, 72].map((x) => (
        <ShadedCylinder key={x} x={x + 4} topY={42} width={8} height={48} fill={TOCA.ochre} stroke={TOCA.stroke} />
      ))}
      <rect x={12} y={68} width={76} height={8} rx={4} fill={TOCA.sand} stroke={TOCA.stroke} strokeWidth={2} />
      <CorrugatedRoof points="8,40 50,16 92,40" fill={TOCA.corrugated} />
      <TocaBody x={16} y={38} width={68} height={32} fill={TOCA.cream} rx={14} />
      <Veranda y={66} x={14} width={68} />
      <TocaDoor x={39} y={46} width={20} height={24} color={TOCA.terracotta} />
      <TocaRoundWindow cx={28} cy={52} r={7} />
      <TocaRoundWindow cx={72} cy={52} r={7} />
      <ellipse cx={50} cy={91} rx={30} ry={3} fill={TOCA.ocean} opacity={0.45} />
      <GumLeaf x={14} y={36} />
    </TocaWrap>
  )
}

/** Bondi-style surf shop */
export function SurfShopToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={38} />
      <TocaBody x={12} y={44} width={76} height={42} fill={TOCA.ocean} rx={12} />
      <path
        d="M 12 44 Q 50 36 88 44 L 88 52 Q 50 44 12 52 Z"
        fill={TOCA.wattle}
        stroke={TOCA.stroke}
        strokeWidth={2}
      />
      <TocaDoor x={38} y={56} width={24} height={28} color={TOCA.white} />
      <TocaRoundWindow cx={24} cy={62} r={7} />
      <TocaRoundWindow cx={76} cy={62} r={7} />
      {/* Surfboards out front */}
      <ellipse cx={18} cy={82} rx={3} ry={12} fill={TOCA.tinRed} stroke={TOCA.stroke} strokeWidth={1.2} />
      <ellipse cx={26} cy={83} rx={3} ry={11} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.2} />
    </TocaWrap>
  )
}

/** Classic Aussie fish & chippery */
export function FishChipsToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={36} />
      <TocaBody x={14} y={44} width={72} height={42} fill={TOCA.cream} rx={12} />
      <rect x={14} y={44} width={72} height={12} rx={12} fill={TOCA.oceanDark} stroke={TOCA.stroke} strokeWidth={2} />
      <TocaDoor x={39} y={58} width={22} height={28} color={TOCA.terracotta} />
      <TocaRoundWindow cx={26} cy={62} r={7} />
      <TocaRoundWindow cx={74} cy={62} r={7} />
      {/* Wrapped fish & chips */}
      <path
        d="M 44 48 Q 50 44 56 48 L 54 52 Q 50 50 46 52 Z"
        fill={TOCA.fishGold}
        stroke={TOCA.stroke}
        strokeWidth={1.2}
      />
      <rect x={47} y={47} width={6} height={4} rx={1} fill={TOCA.white} opacity={0.7} />
    </TocaWrap>
  )
}

/** Beachside ice cream kiosk */
export function IceCreamToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={35} cy={76} rx={24} />
      <TocaBody x={10} y={40} width={50} height={32} fill={TOCA.wattle} rx={10} />
      <CorrugatedRoof points="6,40 35,22 64,40" fill={TOCA.corrugated} />
      <circle cx={22} cy={32} r={10} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={48} cy={28} r={11} fill={TOCA.tinRed} stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={35} cy={20} r={9} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={2} />
      <TocaDoor x={24} y={48} width={22} height={24} color={TOCA.terracotta} />
      {/* Beach umbrella */}
      <line x1="58" y1="35" x2="58" y2="55" stroke={TOCA.stroke} strokeWidth={2} />
      <path d="M 48 35 Q 58 26 68 35" fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={1.5} />
    </TocaWrap>
  )
}

/** Flat white beach café */
export function CafeToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={38} />
      <TocaBody x={14} y={40} width={72} height={46} fill={TOCA.weatherboard} rx={12} />
      <CorrugatedRoof points="8,42 50,20 92,42" fill={TOCA.tinRed} />
      <TocaDoor x={39} y={52} width={22} height={34} color={TOCA.eucalyptus} />
      <TocaRoundWindow cx={26} cy={58} r={8} />
      <TocaRoundWindow cx={74} cy={58} r={8} />
      <Veranda y={84} width={68} x={16} />
      {/* Coffee cup — flat white! */}
      <rect x={44} y={28} width={12} height={10} rx={3} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={1.5} />
      <path d="M 56 30 Q 62 30 62 34 Q 62 38 56 38" fill="none" stroke={TOCA.stroke} strokeWidth={1.5} />
      <ellipse cx={50} cy={32} rx={4} ry={2} fill={TOCA.ochre} opacity={0.6} />
    </TocaWrap>
  )
}

/** Aussie boat shed — corrugated iron */
export function SmallBoathouseToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={37} cy={70} rx={28} />
      <TocaBody x={10} y={32} width={55} height={34} fill={TOCA.corrugated} rx={10} />
      <CorrugatedRoof points="6,34 37,12 68,34" fill={TOCA.tinRed} />
      <rect x={26} y={44} width={24} height={22} rx={6} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={2} />
      <TocaRoundWindow cx={20} cy={46} r={6} />
      <ellipse cx={62} cy={62} rx={8} ry={3} fill={TOCA.ocean} opacity={0.4} />
    </TocaWrap>
  )
}
