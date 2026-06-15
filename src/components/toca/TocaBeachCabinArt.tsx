import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = 1.8

/** Rustic log cabin palette — warm cedar, dark shingles, sky-blue glass */
export const CABIN = {
  log: '#C4784A',
  logDark: '#A8623A',
  logLight: '#D8925A',
  logEnd: '#8B5A32',
  roof: '#5D4037',
  roofDark: '#4E342E',
  roofShingle: '#6D4C41',
  deck: '#B8885A',
  deckDark: '#9A7048',
  rail: '#A07848',
  post: '#8B6840',
  frame: '#F5F0E8',
  window: '#87CEEB',
  windowShine: '#FFFFFF',
  door: '#6D4C41',
  chimney: '#78909C',
  rock: '#C4A882',
  rockDark: '#A08868',
  flowerRed: '#E57373',
  flowerYellow: '#FFD54F',
  sand: '#E8C872',
}

function LogWall({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rows = Math.ceil(h / 5.5)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={CABIN.logDark} rx={2} />
      {Array.from({ length: rows }).map((_, i) => {
        const ly = y + i * 5.5 + 1
        const shade = i % 2 === 0 ? CABIN.log : CABIN.logLight
        return (
          <g key={i}>
            <rect x={x + 1} y={ly} width={w - 2} height={4.5} rx={2.2} fill={shade} stroke={S} strokeWidth={0.5} />
            <circle cx={x + 3} cy={ly + 2.25} r={1.8} fill={CABIN.logEnd} stroke={S} strokeWidth={0.35} />
            <circle cx={x + w - 3} cy={ly + 2.25} r={1.8} fill={CABIN.logEnd} stroke={S} strokeWidth={0.35} />
            <line x1={x + 5} y1={ly + 2.25} x2={x + w - 5} y2={ly + 2.25} stroke={adjustColor(shade, -12)} strokeWidth={0.4} opacity={0.4} />
          </g>
        )
      })}
      <rect x={x + w - 2} y={y + 2} width={2} height={h - 4} fill="#000" opacity={0.07} />
    </g>
  )
}

function ShingleRoof({
  leftX,
  rightX,
  eaveY,
  peakX,
  peakY,
}: {
  leftX: number
  rightX: number
  eaveY: number
  peakX: number
  peakY: number
}) {
  return (
    <g>
      <polygon
        points={`${leftX - 3},${eaveY + 2} ${rightX + 3},${eaveY + 2} ${rightX + 1},${eaveY} ${leftX - 1},${eaveY}`}
        fill={CABIN.roofDark}
        stroke={S}
        strokeWidth={1}
      />
      <polygon
        points={`${leftX},${eaveY} ${peakX},${peakY} ${rightX},${eaveY}`}
        fill={CABIN.roof}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {Array.from({ length: 7 }).map((_, i) => {
        const t = (i + 1) / 8
        const y1 = eaveY - t * (eaveY - peakY) * 0.15
        const xL = leftX + (peakX - leftX) * t * 0.85
        const xR = rightX - (rightX - peakX) * t * 0.85
        return (
          <line
            key={i}
            x1={xL}
            y1={y1}
            x2={xR}
            y2={y1 + (eaveY - peakY) * 0.08}
            stroke={CABIN.roofShingle}
            strokeWidth={1.2}
            opacity={0.55}
          />
        )
      })}
    </g>
  )
}

function CabinWindow({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} fill={CABIN.frame} stroke={S} strokeWidth={0.8} />
      <rect x={x} y={y} width={w} height={h} fill={CABIN.window} stroke={S} strokeWidth={0.6} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={CABIN.frame} strokeWidth={0.7} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={CABIN.frame} strokeWidth={0.7} />
      <rect x={x + 1.5} y={y + 1.5} width={w * 0.35} height={h * 0.3} rx={0.5} fill={CABIN.windowShine} opacity={0.45} />
    </g>
  )
}

function DeckRail({ x, y, w, h = 4 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={CABIN.rail} stroke={S} strokeWidth={0.8} />
      {[0.08, 0.25, 0.42, 0.58, 0.75, 0.92].map((f) => (
        <rect key={f} x={x + w * f - 0.8} y={y} width={1.6} height={h + 5} rx={0.5} fill={CABIN.deckDark} stroke={S} strokeWidth={0.4} />
      ))}
    </>
  )
}

function CabinPost({ x, topY, height }: { x: number; topY: number; height: number }) {
  return (
    <rect x={x} y={topY} width={4} height={height} rx={1.5} fill={CABIN.post} stroke={S} strokeWidth={0.8} />
  )
}

function CabinStairs({ x, y, steps = 3 }: { x: number; y: number; steps?: number }) {
  return (
    <>
      {Array.from({ length: steps }).map((_, i) => (
        <rect
          key={i}
          x={x - i}
          y={y + i * 3}
          width={14 + i * 2}
          height={2.5}
          rx={0.5}
          fill={CABIN.deck}
          stroke={S}
          strokeWidth={0.5}
        />
      ))}
    </>
  )
}

function ChimneyPipe({ x, y, h = 12 }: { x: number; y: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={5} height={h} rx={1} fill={CABIN.chimney} stroke={S} strokeWidth={0.7} />
      <ellipse cx={x + 2.5} cy={y} rx={3.5} ry={1.5} fill={adjustColor(CABIN.chimney, -15)} stroke={S} strokeWidth={0.5} />
    </>
  )
}

function BeachRocks({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <>
      {[
        [0.1, 5, 3.5],
        [0.28, 4, 3],
        [0.55, 6, 4],
        [0.78, 4.5, 3.2],
        [0.92, 3.5, 2.8],
      ].map(([f, rx, ry], i) => (
        <ellipse
          key={i}
          cx={x + w * f}
          cy={y}
          rx={rx}
          ry={ry}
          fill={i % 2 === 0 ? CABIN.rock : CABIN.rockDark}
          stroke={S}
          strokeWidth={0.5}
        />
      ))}
    </>
  )
}

function Wildflowers({ x, y }: { x: number; y: number }) {
  const flowers: [number, string][] = [
    [0, CABIN.flowerRed],
    [8, CABIN.flowerYellow],
    [16, CABIN.flowerRed],
    [24, CABIN.flowerYellow],
  ]
  return (
    <>
      {flowers.map(([dx, color], i) => (
        <g key={i}>
          <line x1={x + dx} y1={y} x2={x + dx} y2={y + 5} stroke={CABIN.logDark} strokeWidth={0.8} />
          <circle cx={x + dx} cy={y - 1} r={2} fill={color} stroke={S} strokeWidth={0.4} />
        </g>
      ))}
    </>
  )
}

/** Rustic log cabin on a raised deck — beach / waterfront style */
export function BeachCabinToca() {
  const cx = 55
  const deckY = 78
  const deckW = 72
  const deckX = cx - deckW / 2
  const cabinX = cx - 26
  const cabinY = 46
  const cabinW = 52
  const cabinH = 32
  const eaveY = cabinY
  const peakY = 20

  return (
    <TocaWrap>
      <TocaShadow cy={112} rx={40} />
      {/* Water hint */}
      <ellipse cx={cx} cy={110} rx={48} ry={4} fill={TOCA.ocean} opacity={0.28} />
      <BeachRocks x={deckX - 4} y={104} w={deckW + 8} />
      <Wildflowers x={deckX + 4} y={100} />
      <Wildflowers x={deckX + deckW - 28} y={101} />
      {/* Stilts / posts */}
      {[deckX + 6, deckX + deckW - 10, deckX + deckW * 0.45, deckX + deckW * 0.72].map((px) => (
        <CabinPost key={px} x={px} topY={deckY + 4} height={22} />
      ))}
      {/* Deck platform */}
      <rect x={deckX} y={deckY} width={deckW} height={5} rx={1} fill={CABIN.deck} stroke={S} strokeWidth={1.2} />
      <rect x={deckX} y={deckY + 4} width={deckW} height={2} fill={CABIN.deckDark} opacity={0.5} />
      {/* Side deck wrap */}
      <rect x={deckX - 5} y={deckY - 2} width={6} height={22} fill={CABIN.deck} stroke={S} strokeWidth={0.8} />
      {[deckY, deckY + 8, deckY + 16].map((ry) => (
        <rect key={ry} x={deckX - 5} y={ry} width={6} height={1.5} fill={CABIN.rail} stroke={S} strokeWidth={0.4} />
      ))}
      <DeckRail x={deckX} y={deckY - 5} w={deckW} />
      {/* Stairs */}
      <CabinStairs x={cx - 7} y={deckY + 8} />
      {/* Cabin body */}
      <LogWall x={cabinX} y={cabinY} w={cabinW} h={cabinH} />
      {/* Roof */}
      <ShingleRoof leftX={cabinX - 4} rightX={cabinX + cabinW + 4} eaveY={eaveY} peakX={cx} peakY={peakY} />
      <ChimneyPipe x={cabinX + cabinW - 2} y={peakY + 4} h={14} />
      {/* Gable loft window */}
      <CabinWindow x={cx - 5} y={peakY + 8} w={10} h={8} />
      {/* Front windows & door */}
      <CabinWindow x={cabinX + 6} y={cabinY + 10} w={12} h={12} />
      <CabinWindow x={cabinX + 34} y={cabinY + 10} w={12} h={12} />
      <rect x={cx - 7} y={cabinY + 12} width={14} height={20} rx={1} fill={CABIN.frame} stroke={S} strokeWidth={0.9} />
      <rect x={cx - 5.5} y={cabinY + 14} width={11} height={16} rx={1} fill={CABIN.door} stroke={S} strokeWidth={0.7} />
      <circle cx={cx + 3} cy={cabinY + 24} r={1.2} fill={TOCA.wattle} />
      {/* Sand patch under deck */}
      <ellipse cx={cx} cy={106} rx={36} ry={5} fill={CABIN.sand} opacity={0.45} />
    </TocaWrap>
  )
}

export function getBeachCabinArt(id: string): ReactNode | null {
  if (id === 'beach-cabin') return <BeachCabinToca />
  return null
}
