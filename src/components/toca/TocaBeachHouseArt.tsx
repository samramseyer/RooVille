import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = 1.6

export const BEACH = {
  trim: '#FFFFFF',
  trimShadow: '#E8E8E8',
  deck: '#C4956A',
  deckDark: '#A07848',
  post: '#5D4037',
  rail: '#FFFFFF',
  roofGray: '#4A4F57',
  roofBrown: '#8D6E63',
  sand: '#E8C872',
  grass: '#7CB342',
  window: '#B3E5FC',
}

function StiltBase({
  deckX,
  deckW,
  deckY,
  postXs,
}: {
  deckX: number
  deckW: number
  deckY: number
  postXs: number[]
}) {
  return (
    <g>
      {postXs.map((px) => (
        <rect key={px} x={px} y={deckY + 4} width={4} height={20} rx={1.5} fill={BEACH.post} stroke={S} strokeWidth={0.7} />
      ))}
      <rect x={deckX} y={deckY} width={deckW} height={4} rx={1} fill={BEACH.deck} stroke={S} strokeWidth={1} />
      <rect x={deckX} y={deckY + 3} width={deckW} height={1.5} fill={BEACH.deckDark} opacity={0.45} />
    </g>
  )
}

function PorchRail({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={3} fill={BEACH.rail} stroke={S} strokeWidth={0.7} />
      {[0.1, 0.28, 0.46, 0.64, 0.82].map((f) => (
        <rect key={f} x={x + w * f} y={y} width={1.5} height={8} rx={0.5} fill={BEACH.trimShadow} stroke={S} strokeWidth={0.35} />
      ))}
    </>
  )
}

function PorchStairs({ cx, y, w = 12 }: { cx: number; y: number; w?: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={cx - w / 2 - i} y={y + i * 2.5} width={w + i * 2} height={2} rx={0.5} fill={BEACH.deck} stroke={S} strokeWidth={0.4} />
      ))}
    </>
  )
}

function GableRoof({
  leftX,
  rightX,
  eaveY,
  peakX,
  peakY,
  fill = BEACH.roofGray,
}: {
  leftX: number
  rightX: number
  eaveY: number
  peakX: number
  peakY: number
  fill?: string
}) {
  return (
    <polygon
      points={`${leftX},${eaveY} ${peakX},${peakY} ${rightX},${eaveY}`}
      fill={fill}
      stroke={S}
      strokeWidth={SW}
      strokeLinejoin="round"
    />
  )
}

function WallPanel({
  x,
  y,
  w,
  h,
  fill,
  siding = 'plain',
}: {
  x: number
  y: number
  w: number
  h: number
  fill: string
  siding?: 'plain' | 'horizontal' | 'vertical'
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={S} strokeWidth={SW * 0.7} />
      {siding === 'horizontal' &&
        Array.from({ length: Math.ceil(h / 4) }).map((_, i) => (
          <line key={i} x1={x + 1} y1={y + i * 4} x2={x + w - 1} y2={y + i * 4} stroke={BEACH.trim} strokeWidth={0.7} opacity={0.65} />
        ))}
      {siding === 'vertical' &&
        Array.from({ length: Math.ceil(w / 5) }).map((_, i) => (
          <line key={i} x1={x + i * 5} y1={y + 1} x2={x + i * 5} y2={y + h - 1} stroke={BEACH.trim} strokeWidth={1.2} opacity={0.75} />
        ))}
      <rect x={x + w - 2} y={y + 1} width={1.5} height={h - 2} fill="#000" opacity={0.06} />
    </g>
  )
}

function BeachWindow({
  x,
  y,
  w,
  h,
  shutters,
}: {
  x: number
  y: number
  w: number
  h: number
  shutters?: string
}) {
  return (
    <g>
      {shutters && (
        <>
          <rect x={x - 4} y={y} width={3} height={h} rx={0.5} fill={shutters} stroke={S} strokeWidth={0.5} />
          <rect x={x + w + 1} y={y} width={3} height={h} rx={0.5} fill={shutters} stroke={S} strokeWidth={0.5} />
        </>
      )}
      <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} fill={BEACH.trim} stroke={S} strokeWidth={0.6} />
      <rect x={x} y={y} width={w} height={h} fill={BEACH.window} stroke={S} strokeWidth={0.5} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={BEACH.trimShadow} strokeWidth={0.5} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={BEACH.trimShadow} strokeWidth={0.5} />
    </g>
  )
}

function BeachDoor({ x, y, w, h, color }: { x: number; y: number; w: number; h: number; color: string }) {
  return (
    <>
      <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} fill={BEACH.trim} stroke={S} strokeWidth={0.7} />
      <rect x={x} y={y} width={w} height={h} fill={color} stroke={S} strokeWidth={0.6} />
      <circle cx={x + w - 3} cy={y + h * 0.55} r={1} fill={TOCA.wattle} />
    </>
  )
}

function SandBase({ cx, w }: { cx: number; w: number }) {
  return (
    <g className="beach-sand-base" aria-hidden="true">
      <ellipse cx={cx} cy={106} rx={w * 0.48} ry={5} fill={BEACH.sand} opacity={0.55} />
      {[0.2, 0.45, 0.7].map((f) => (
        <ellipse key={f} cx={cx - w * 0.3 + f * w * 0.6} cy={104} rx={3} ry={1.5} fill={BEACH.grass} opacity={0.7} />
      ))}
    </g>
  )
}

function RoundWindow({ cx, cy, r = 3.5 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r + 1} fill={BEACH.trim} stroke={S} strokeWidth={0.6} />
      <circle cx={cx} cy={cy} r={r} fill={BEACH.window} stroke={S} strokeWidth={0.5} />
    </>
  )
}

function Fanlight({ cx, y, w }: { cx: number; y: number; w: number }) {
  return (
    <>
      <path
        d={`M ${cx - w / 2} ${y + 4} Q ${cx} ${y - 2} ${cx + w / 2} ${y + 4}`}
        fill={BEACH.trim}
        stroke={S}
        strokeWidth={0.6}
      />
      <path
        d={`M ${cx - w / 2 + 2} ${y + 3} Q ${cx} ${y + 1} ${cx + w / 2 - 2} ${y + 3}`}
        fill={BEACH.window}
        stroke={S}
        strokeWidth={0.4}
      />
    </>
  )
}

/** Two-story pink stilt house — blue door, red shutters */
export function PinkBeachHouseToca() {
  const cx = 45
  const bx = 22
  const bw = 46
  const deckY = 74
  const deckX = 14
  const deckW = 62

  return (
    <TocaWrap>
      <TocaShadow cy={108} rx={34} />
      <SandBase cx={cx} w={deckW} />
      <StiltBase deckX={deckX} deckW={deckW} deckY={deckY} postXs={[deckX + 4, deckX + deckW - 8, cx - 2, cx + 14]} />
      <PorchRail x={deckX} y={deckY - 6} w={deckW} />
      <PorchStairs cx={cx} y={deckY + 6} />
      <WallPanel x={bx} y={54} w={bw} h={20} fill="#F48FB1" />
      <WallPanel x={bx} y={32} w={bw} h={22} fill="#F06292" />
      <rect x={bx} y={52} width={bw} height={3} fill={BEACH.trim} stroke={S} strokeWidth={0.5} />
      <GableRoof leftX={bx - 3} rightX={bx + bw + 3} eaveY={32} peakX={cx} peakY={14} />
      <RoundWindow cx={cx} cy={22} r={3} />
      <BeachWindow x={bx + 14} y={36} w={18} h={12} shutters="#E53935" />
      <BeachWindow x={bx + 4} y={58} w={8} h={8} />
      <BeachWindow x={bx + 34} y={58} w={8} h={8} />
      <BeachDoor x={cx - 7} y={58} w={14} h={14} color="#42A5F5" />
    </TocaWrap>
  )
}

/** Wide red stilt house — white board-and-batten stripes, blue & yellow doors */
export function RedBeachHouseToca() {
  const cx = 45
  const bx = 12
  const bw = 66
  const deckY = 72
  const deckX = 8
  const deckW = 74

  return (
    <TocaWrap>
      <TocaShadow cy={106} rx={38} />
      <SandBase cx={cx} w={deckW} />
      <StiltBase deckX={deckX} deckW={deckW} deckY={deckY} postXs={[deckX + 4, deckX + 22, deckX + deckW - 22, deckX + deckW - 8]} />
      <PorchRail x={deckX} y={deckY - 6} w={deckW} />
      <PorchStairs cx={cx - 12} y={deckY + 6} w={14} />
      <PorchStairs cx={cx + 12} y={deckY + 6} w={14} />
      <WallPanel x={bx} y={42} w={bw} h={30} fill="#E53935" siding="vertical" />
      <GableRoof leftX={bx - 2} rightX={bx + bw + 2} eaveY={42} peakX={cx} peakY={24} />
      <BeachWindow x={bx + 4} y={50} w={7} h={8} />
      <BeachWindow x={bx + bw - 11} y={50} w={7} h={8} />
      <BeachDoor x={bx + 18} y={54} w={12} h={16} color="#42A5F5" />
      <BeachDoor x={bx + 36} y={54} w={12} h={16} color="#FFCA28" />
    </TocaWrap>
  )
}

/** Orange stilt house — double glass doors, fanlight above */
export function OrangeBeachHouseToca() {
  const cx = 45
  const bx = 18
  const bw = 54
  const deckY = 74
  const deckX = 12
  const deckW = 66

  return (
    <TocaWrap>
      <TocaShadow cy={108} rx={34} />
      <SandBase cx={cx} w={deckW} />
      <StiltBase deckX={deckX} deckW={deckW} deckY={deckY} postXs={[deckX + 6, deckX + deckW - 10, cx - 4, cx + 12]} />
      <PorchRail x={deckX} y={deckY - 6} w={deckW} />
      <PorchStairs cx={cx} y={deckY + 6} />
      <WallPanel x={bx} y={44} w={bw} h={30} fill="#FFB74D" />
      <GableRoof leftX={bx - 3} rightX={bx + bw + 3} eaveY={44} peakX={cx} peakY={24} />
      <Fanlight cx={cx} y={46} w={20} />
      <rect x={cx - 12} y={54} width={24} height={18} fill={BEACH.trim} stroke={S} strokeWidth={0.8} />
      <rect x={cx - 10} y={56} width={10} height={14} fill={BEACH.window} stroke={S} strokeWidth={0.5} />
      <rect x={cx} y={56} width={10} height={14} fill={adjustColor(BEACH.window, -8)} stroke={S} strokeWidth={0.5} />
      <line x1={cx} y1={56} x2={cx} y2={70} stroke={BEACH.trimShadow} strokeWidth={0.6} />
      <BeachWindow x={bx + 4} y={52} w={7} h={8} />
      <BeachWindow x={bx + bw - 11} y={52} w={7} h={8} />
    </TocaWrap>
  )
}

/** Tall blue loft stilt house — lap siding, yellow double doors */
export function BlueBeachHouseToca() {
  const cx = 45
  const bx = 24
  const bw = 42
  const deckY = 76
  const deckX = 16
  const deckW = 58

  return (
    <TocaWrap>
      <TocaShadow cy={110} rx={32} />
      <SandBase cx={cx} w={deckW} />
      <StiltBase deckX={deckX} deckW={deckW} deckY={deckY} postXs={[deckX + 4, deckX + deckW - 8, cx - 2, cx + 10]} />
      <PorchRail x={deckX} y={deckY - 6} w={deckW} />
      <PorchStairs cx={cx} y={deckY + 6} w={11} />
      <WallPanel x={bx} y={36} w={bw} h={40} fill="#42A5F5" siding="horizontal" />
      <GableRoof leftX={bx - 2} rightX={bx + bw + 2} eaveY={36} peakX={cx} peakY={16} fill={BEACH.roofBrown} />
      <BeachWindow x={cx - 8} y={40} w={16} h={10} />
      <BeachDoor x={cx - 10} y={56} w={9} h={18} color="#FFCA28" />
      <BeachDoor x={cx + 1} y={56} w={9} h={18} color={adjustColor('#FFCA28', -10)} />
      <BeachWindow x={bx + 2} y={58} w={6} h={7} />
      <BeachWindow x={bx + bw - 8} y={58} w={6} h={7} />
    </TocaWrap>
  )
}

const BEACH_HOUSE_ART: Record<string, () => ReactNode> = {
  'pink-beach-house': PinkBeachHouseToca,
  'red-beach-house': RedBeachHouseToca,
  'orange-beach-house': OrangeBeachHouseToca,
  'blue-beach-house': BlueBeachHouseToca,
}

export function getBeachHouseArt(id: string): ReactNode | null {
  const render = BEACH_HOUSE_ART[id]
  return render ? render() : null
}
