import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = 1.8

/** Stately townhouse palette — brick, stone trim, slate roof */
export const STATELY = {
  brick: '#C4564E',
  brickDark: '#A8443C',
  brickLight: '#D46860',
  mortar: '#E8DDD0',
  stone: '#F5F0E8',
  stoneDark: '#E5DDD0',
  sage: '#E8EDE4',
  sageDark: '#D4DDD0',
  roof: '#3D4654',
  roofTile: '#4A5568',
  roofLight: '#5C6778',
  door: '#5D4037',
  doorDark: '#4E342E',
  gold: '#C9A227',
  lantern: '#2C2C2C',
  bush: '#6B8E4E',
  bushLight: '#8FB060',
  bushDark: '#557038',
  foundation: '#B8B0A8',
}

function BrickWall({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rows = Math.ceil(h / 4)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={STATELY.brick} />
      {Array.from({ length: rows }).map((_, i) => (
        <line
          key={`m${i}`}
          x1={x}
          y1={y + i * 4}
          x2={x + w}
          y2={y + i * 4}
          stroke={STATELY.mortar}
          strokeWidth={0.5}
          opacity={0.65}
        />
      ))}
      {Array.from({ length: Math.ceil(w / 10) }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={x + i * 10}
          y1={y}
          x2={x + i * 10}
          y2={y + h}
          stroke={STATELY.brickDark}
          strokeWidth={0.35}
          opacity={0.25}
        />
      ))}
      <rect x={x + w - 3} y={y + 2} width={2} height={h - 4} fill="#000" opacity={0.06} />
    </g>
  )
}

function StoneWall({ x, y, w, h, fill = STATELY.stone }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={S} strokeWidth={SW * 0.7} />
      <rect x={x + 2} y={y + 2} width={w - 4} height={Math.min(h * 0.12, 6)} rx={1} fill="#FFFFFF" opacity={0.35} />
      <rect x={x + w - 3} y={y + 3} width={2} height={h - 6} fill={adjustColor(fill, -18)} opacity={0.5} />
    </g>
  )
}

function FloorBand({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={3} fill={STATELY.stone} stroke={S} strokeWidth={0.8} />
      <rect x={x} y={y + 3} width={w} height={1.5} fill={STATELY.stoneDark} opacity={0.6} />
    </>
  )
}

function WindowPane({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={TOCA.window} stroke={S} strokeWidth={0.7} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={STATELY.stoneDark} strokeWidth={0.6} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={STATELY.stoneDark} strokeWidth={0.6} />
      <rect x={x + 1} y={y + 1} width={w * 0.35} height={h * 0.3} rx={1} fill="#FFFFFF" opacity={0.35} />
    </>
  )
}

function ArchedWindow({
  x,
  y,
  w,
  h,
  sill = true,
}: {
  x: number
  y: number
  w: number
  h: number
  sill?: boolean
}) {
  const archH = w * 0.45
  return (
    <g>
      <path
        d={`M ${x} ${y + archH} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + archH} Q ${x + w / 2} ${y - archH * 0.15} ${x} ${y + archH}`}
        fill={STATELY.stone}
        stroke={S}
        strokeWidth={0.9}
      />
      <path
        d={`M ${x + 2} ${y + archH + 1} L ${x + 2} ${y + h - 2} L ${x + w - 2} ${y + h - 2} L ${x + w - 2} ${y + archH + 1} Q ${x + w / 2} ${y + 1} ${x + 2} ${y + archH + 1}`}
        fill={TOCA.window}
        stroke={S}
        strokeWidth={0.6}
      />
      <line x1={x + w / 2} y1={y + archH * 0.5} x2={x + w / 2} y2={y + h - 2} stroke={STATELY.stoneDark} strokeWidth={0.5} />
      <line x1={x + 2} y1={y + (h + archH) / 2} x2={x + w - 2} y2={y + (h + archH) / 2} stroke={STATELY.stoneDark} strokeWidth={0.5} />
      {sill && <rect x={x - 1} y={y + h} width={w + 2} height={2} rx={0.5} fill={STATELY.stoneDark} stroke={S} strokeWidth={0.5} />}
    </g>
  )
}

function TripleArchedWindow({ x, y, unitW, h, gap = 2 }: { x: number; y: number; unitW: number; h: number; gap?: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <ArchedWindow key={i} x={x + i * (unitW + gap)} y={y} w={unitW} h={h} sill={i === 1} />
      ))}
    </>
  )
}

function BayWindow({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const roofOverhang = 3
  return (
    <g>
      <path
        d={`M ${x - 2} ${y + roofOverhang + 2} L ${x + w / 2} ${y} L ${x + w + 2} ${y + roofOverhang + 2} Z`}
        fill={STATELY.roof}
        stroke={S}
        strokeWidth={0.9}
      />
      <rect x={x} y={y + roofOverhang} width={w} height={h} fill={STATELY.stone} stroke={S} strokeWidth={0.9} />
      <WindowPane x={x + 2} y={y + roofOverhang + 3} w={w * 0.38} h={h - 6} />
      <WindowPane x={x + w * 0.34} y={y + roofOverhang + 3} w={w * 0.32} h={h - 6} />
      <rect x={x - 1} y={y + roofOverhang + h} width={w + 2} height={2.5} rx={0.5} fill={STATELY.stoneDark} stroke={S} strokeWidth={0.5} />
    </g>
  )
}

function MansardRoof({
  x,
  y,
  w,
  h,
  dormers = 3,
}: {
  x: number
  y: number
  w: number
  h: number
  dormers?: number
}) {
  const ridgeY = y
  const eaveY = y + h
  return (
    <g>
      <path
        d={`M ${x - 2} ${eaveY} L ${x + w + 2} ${eaveY} L ${x + w + 4} ${ridgeY + h * 0.35} L ${x + w / 2} ${ridgeY} L ${x - 4} ${ridgeY + h * 0.35} Z`}
        fill={STATELY.roof}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {[0.15, 0.35, 0.55, 0.75].map((f) => (
        <line
          key={f}
          x1={x + w * f}
          y1={ridgeY + h * 0.2}
          x2={x + w * (f + 0.08)}
          y2={eaveY - 1}
          stroke={STATELY.roofLight}
          strokeWidth={0.8}
          opacity={0.35}
        />
      ))}
      {dormers > 0 &&
        Array.from({ length: dormers }).map((_, i) => {
          const dx = x + (w / (dormers + 1)) * (i + 1) - 7
          return (
            <g key={i}>
              <path
                d={`M ${dx} ${ridgeY + 10} L ${dx + 14} ${ridgeY + 10} L ${dx + 14} ${ridgeY + 18} Q ${dx + 7} ${ridgeY + 6} ${dx} ${ridgeY + 18} Z`}
                fill={STATELY.stone}
                stroke={S}
                strokeWidth={0.8}
              />
              <path
                d={`M ${dx + 2} ${ridgeY + 11} L ${dx + 12} ${ridgeY + 11} L ${dx + 12} ${ridgeY + 16} Q ${dx + 7} ${ridgeY + 8} ${dx + 2} ${ridgeY + 16} Z`}
                fill={TOCA.window}
                stroke={S}
                strokeWidth={0.5}
              />
            </g>
          )
        })}
    </g>
  )
}

function Chimney({ x, y, h = 14 }: { x: number; y: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={h} fill={STATELY.brick} stroke={S} strokeWidth={0.8} />
      <rect x={x - 1} y={y} width={9} height={2.5} rx={0.5} fill={STATELY.stoneDark} stroke={S} strokeWidth={0.6} />
      <line x1={x} y1={y + 4} x2={x + 7} y2={y + 4} stroke={STATELY.mortar} strokeWidth={0.4} opacity={0.6} />
    </g>
  )
}

function StatelyEntrance({ cx, y, doorW = 14, doorH = 20 }: { cx: number; y: number; doorW?: number; doorH?: number }) {
  const x = cx - doorW / 2
  return (
    <g>
      {[x - 10, x + doorW + 4].map((lx) => (
        <g key={lx}>
          <rect x={lx} y={y + 4} width={4} height={6} rx={1} fill={STATELY.lantern} stroke={S} strokeWidth={0.6} />
          <ellipse cx={lx + 2} cy={y + 6} rx={2} ry={2.5} fill={TOCA.wattle} opacity={0.85} />
        </g>
      ))}
      <path d={`M ${x - 2} ${y} L ${cx} ${y - 5} L ${x + doorW + 2} ${y} Z`} fill={STATELY.stone} stroke={S} strokeWidth={0.8} />
      <rect x={x - 1} y={y} width={doorW + 2} height={doorH + 6} fill={STATELY.stone} stroke={S} strokeWidth={0.9} />
      <rect x={x + 1} y={y + 2} width={doorW - 2} height={doorH} rx={1} fill={STATELY.door} stroke={S} strokeWidth={0.8} />
      <circle cx={x + doorW - 4} cy={y + doorH * 0.55} r={1.2} fill={STATELY.gold} />
      <circle cx={cx} cy={y + doorH * 0.35} r={1.5} fill={STATELY.gold} stroke={S} strokeWidth={0.4} />
      {[0, 1, 2].map((s) => (
        <rect key={s} x={x - 2 + s * 2} y={y + doorH + 1} width={doorW + 4 - s * 4} height={2} rx={0.5} fill={STATELY.stoneDark} stroke={S} strokeWidth={0.4} />
      ))}
    </g>
  )
}

function Foundation({ x, y, w }: { x: number; y: number; w: number }) {
  return <rect x={x} y={y} width={w} height={3} fill={STATELY.foundation} stroke={S} strokeWidth={0.7} />
}

function StatelyBushes({ x, y, w }: { x: number; y: number; w: number }) {
  const clusters = [
    [0.08, 5],
    [0.22, 4],
    [0.38, 5.5],
    [0.55, 4],
    [0.72, 5],
    [0.88, 4.5],
  ]
  return (
    <>
      {clusters.map(([f, r], i) => (
        <ellipse
          key={i}
          cx={x + w * f}
          cy={y}
          rx={r + 1}
          ry={r}
          fill={i % 2 === 0 ? STATELY.bush : STATELY.bushLight}
          stroke={STATELY.bushDark}
          strokeWidth={0.6}
        />
      ))}
    </>
  )
}

/** Grand brick manor — three stories, mansard roof, bay windows (reference style) */
export function GrandManorToca() {
  const bx = 8
  const by = 48
  const bw = 84
  const bh = 58
  const cx = bx + bw / 2

  const bayW = 18
  const doorW = 14
  const bayGap = 9
  const leftBayX = cx - doorW / 2 - bayGap - bayW
  const rightBayX = cx + doorW / 2 + bayGap

  const tripleUnitW = 9
  const tripleGap = 2
  const tripleW = tripleUnitW * 3 + tripleGap * 2
  const centerWinW = 16
  const leftBayCenter = leftBayX + bayW / 2
  const rightBayCenter = rightBayX + bayW / 2
  const leftTripleX = leftBayCenter - tripleW / 2
  const rightTripleX = rightBayCenter - tripleW / 2
  const centerWinX = cx - centerWinW / 2

  return (
    <TocaWrap>
      <TocaShadow cy={114} rx={42} />
      <Foundation x={bx} y={106} w={bw} />
      <StatelyBushes x={bx} y={102} w={bw} />
      <BrickWall x={bx} y={by} w={bw} h={bh} />
      <FloorBand x={bx} y={by + 26} w={bw} />
      <FloorBand x={bx} y={by + 13} w={bw} />
      <MansardRoof x={bx} y={22} w={bw} h={28} dormers={3} />
      <Chimney x={bx + 2} y={16} />
      <Chimney x={bx + bw - 9} y={16} />
      {/* Second floor — centered on facade */}
      <TripleArchedWindow x={leftTripleX} y={by + 16} unitW={tripleUnitW} h={12} gap={tripleGap} />
      <ArchedWindow x={centerWinX} y={by + 14} w={centerWinW} h={14} />
      <TripleArchedWindow x={rightTripleX} y={by + 16} unitW={tripleUnitW} h={12} gap={tripleGap} />
      {/* Ground floor — bay windows mirror entrance */}
      <BayWindow x={leftBayX} y={by + 30} w={bayW} h={22} />
      <StatelyEntrance cx={cx} y={by + 32} doorW={doorW} doorH={20} />
      <BayWindow x={rightBayX} y={by + 30} w={bayW} h={22} />
    </TocaWrap>
  )
}

/** Cream stone townhouse — two stories, smaller symmetric facade */
export function HeritageCottageToca() {
  const bx = 14
  const by = 42
  const bw = 62
  const bh = 48
  return (
    <TocaWrap>
      <TocaShadow cy={100} rx={34} />
      <Foundation x={bx} y={92} w={bw} />
      <StatelyBushes x={bx} y={88} w={bw} />
      <StoneWall x={bx} y={by} w={bw} h={bh} fill={STATELY.sage} />
      <FloorBand x={bx} y={by + 24} w={bw} />
      <MansardRoof x={bx} y={24} w={bw} h={22} dormers={2} />
      <Chimney x={bx + bw - 8} y={20} h={10} />
      {/* Upper floor */}
      <ArchedWindow x={bx + 8} y={by + 8} w={12} h={13} />
      <ArchedWindow x={bx + 25} y={by + 6} w={14} h={15} />
      <ArchedWindow x={bx + 44} y={by + 8} w={12} h={13} />
      {/* Ground floor */}
      <BayWindow x={bx + 6} y={by + 26} w={16} h={18} />
      <StatelyEntrance cx={45} y={by + 28} doorW={12} doorH={16} />
      <BayWindow x={bx + 40} y={by + 26} w={16} h={18} />
    </TocaWrap>
  )
}

export function getStatelyHouseArt(id: string): ReactNode | null {
  switch (id) {
    case 'coastal-home':
      return <GrandManorToca />
    case 'beach-shack':
      return <HeritageCottageToca />
    default:
      return null
  }
}
