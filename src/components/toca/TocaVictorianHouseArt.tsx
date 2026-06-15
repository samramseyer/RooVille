import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'
import { adjustColor } from './tocaShading'

const S = TOCA.stroke
const SW = 1.6

export const VICTORIAN = {
  siding: '#545963',
  sidingDark: '#434851',
  sidingLine: '#616878',
  trim: '#F2F2F4',
  trimShadow: '#D8D8DC',
  roof: '#B8885A',
  roofDark: '#9A7048',
  roofShingle: '#A07848',
  windowTop: '#7EB8D8',
  windowBottom: '#C49AD4',
  door: '#8D6E63',
  doorDark: '#6D4C41',
  garage: '#F5F5F5',
  garageSlat: '#E0E0E0',
  lantern: '#2C2C2C',
  foundation: '#C8C0B8',
  lawn: '#6B9E6B',
  lawnDark: '#557838',
}

function VictorianDefs() {
  return (
    <defs>
      <linearGradient id="vic-window" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={VICTORIAN.windowTop} />
        <stop offset="100%" stopColor={VICTORIAN.windowBottom} />
      </linearGradient>
    </defs>
  )
}

function SidingWall({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const rows = Math.ceil(h / 3.5)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={VICTORIAN.siding} />
      {Array.from({ length: rows }).map((_, i) => (
        <line
          key={i}
          x1={x}
          y1={y + i * 3.5}
          x2={x + w}
          y2={y + i * 3.5}
          stroke={VICTORIAN.sidingLine}
          strokeWidth={0.45}
          opacity={0.55}
        />
      ))}
      <rect x={x + w - 2} y={y + 1} width={2} height={h - 2} fill="#000" opacity={0.08} />
    </g>
  )
}

function TrimBand({ x, y, w, thick = 3 }: { x: number; y: number; w: number; thick?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={thick} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.7} />
      <rect x={x} y={y + thick} width={w} height={1} fill={VICTORIAN.trimShadow} opacity={0.5} />
    </>
  )
}

function Corbels({ x, y, count = 3, w = 14 }: { x: number; y: number; count?: number; w?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <path
          key={i}
          d={`M ${x + (w / count) * i} ${y} L ${x + (w / count) * i + 2} ${y + 3} L ${x + (w / count) * (i + 1)} ${y}`}
          fill={VICTORIAN.trim}
          stroke={S}
          strokeWidth={0.4}
        />
      ))}
    </>
  )
}

function VicWindow({
  x,
  y,
  w,
  h,
  pediment = true,
}: {
  x: number
  y: number
  w: number
  h: number
  pediment?: boolean
}) {
  return (
    <g>
      {pediment && (
        <>
          <path d={`M ${x - 1} ${y} L ${x + w / 2} ${y - 4} L ${x + w + 1} ${y} Z`} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.6} />
          <Corbels x={x} y={y - 1} w={w} count={4} />
        </>
      )}
      <rect x={x - 1} y={y} width={w + 2} height={h + 2} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.7} />
      <rect x={x} y={y + 1} width={w} height={h} fill="url(#vic-window)" stroke={S} strokeWidth={0.5} />
      <line x1={x + w / 2} y1={y + 1} x2={x + w / 2} y2={y + h} stroke={VICTORIAN.trim} strokeWidth={0.6} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={VICTORIAN.trim} strokeWidth={0.6} />
      <rect x={x + 1.5} y={y + 2} width={w * 0.35} height={h * 0.25} rx={0.5} fill="#FFFFFF" opacity={0.25} />
    </g>
  )
}

function BayWindowStack({ x, y, w, floorH }: { x: number; y: number; w: number; floorH: number }) {
  const paneW = w / 3 - 1
  return (
    <g>
      {[0, 1].map((floor) => {
        const fy = y + floor * floorH
        return (
          <g key={floor}>
            <polygon
              points={`${x},${fy + 4} ${x + w / 2},${fy} ${x + w},${fy + 4}`}
              fill={VICTORIAN.roofDark}
              stroke={S}
              strokeWidth={0.7}
            />
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={x + i * (paneW + 1)}
                y={fy + 4}
                width={paneW}
                height={floorH - 8}
                fill={VICTORIAN.trim}
                stroke={S}
                strokeWidth={0.5}
              />
            ))}
            {[0, 1, 2].map((i) => (
              <rect
                key={`g${i}`}
                x={x + i * (paneW + 1) + 1}
                y={fy + 5}
                width={paneW - 2}
                height={floorH - 10}
                fill="url(#vic-window)"
                stroke={S}
                strokeWidth={0.4}
              />
            ))}
            <TrimBand x={x - 1} y={fy + floorH - 3} w={w + 2} thick={2} />
          </g>
        )
      })}
    </g>
  )
}

function LeftGable({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <polygon points={`${x},${y + 18} ${x + w / 2},${y} ${x + w},${y + 18}`} fill={VICTORIAN.roof} stroke={S} strokeWidth={SW} />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x + 4 + i * 3}
          y1={y + 16 - i}
          x2={x + w - 4 - i * 3}
          y2={y + 16 - i}
          stroke={VICTORIAN.roofShingle}
          strokeWidth={0.8}
          opacity={0.45}
        />
      ))}
      <path
        d={`M ${x + 4} ${y + 16} Q ${x + w / 2} ${y + 10} ${x + w - 4} ${y + 16}`}
        fill={VICTORIAN.trim}
        stroke={S}
        strokeWidth={0.7}
      />
      <circle cx={x + w / 2} cy={y + 12} r={4} fill="url(#vic-window)" stroke={VICTORIAN.trim} strokeWidth={1.2} />
      <circle cx={x + w / 2} cy={y + 12} r={2.5} fill="none" stroke={VICTORIAN.trim} strokeWidth={0.5} />
    </g>
  )
}

function GarageDoor({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const slats = Math.floor(h / 4)
  return (
    <g>
      {[x - 6, x + w + 2].map((lx) => (
        <g key={lx}>
          <rect x={lx} y={y + 6} width={4} height={7} rx={1} fill={VICTORIAN.lantern} stroke={S} strokeWidth={0.5} />
          <ellipse cx={lx + 2} cy={y + 8} rx={2} ry={2.5} fill={TOCA.wattle} opacity={0.75} />
        </g>
      ))}
      <rect x={x - 1} y={y} width={w + 2} height={h + 2} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.8} />
      <rect x={x} y={y + 1} width={w} height={h} fill={VICTORIAN.garage} stroke={S} strokeWidth={0.5} />
      {Array.from({ length: slats }).map((_, i) => (
        <line
          key={i}
          x1={x + 2}
          y1={y + 3 + i * 4}
          x2={x + w - 2}
          y2={y + 3 + i * 4}
          stroke={VICTORIAN.garageSlat}
          strokeWidth={1.2}
        />
      ))}
    </g>
  )
}

function DoubleDoor({ cx, y, w, h }: { cx: number; y: number; w: number; h: number }) {
  const x = cx - w / 2
  return (
    <g>
      {[0, 1, 2].map((s) => (
        <rect
          key={s}
          x={x - 2 + s * 2}
          y={y + h}
          width={w + 4 - s * 4}
          height={2}
          rx={0.5}
          fill={VICTORIAN.trim}
          stroke={S}
          strokeWidth={0.4}
        />
      ))}
      <rect x={x - 1} y={y - 1} width={w + 2} height={h + 2} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.8} />
      <rect x={x} y={y} width={w / 2 - 0.5} height={h} fill={VICTORIAN.door} stroke={S} strokeWidth={0.6} />
      <rect x={x + w / 2 + 0.5} y={y} width={w / 2 - 0.5} height={h} fill={adjustColor(VICTORIAN.door, -8)} stroke={S} strokeWidth={0.6} />
      <line x1={cx} y1={y + 2} x2={cx} y2={y + h - 2} stroke={VICTORIAN.doorDark} strokeWidth={0.8} />
      <circle cx={x + w * 0.42} cy={y + h * 0.55} r={1} fill={TOCA.wattle} />
      <circle cx={x + w * 0.58} cy={y + h * 0.55} r={1} fill={TOCA.wattle} />
    </g>
  )
}

function RoofSection({ x, y, w, h, dormer = false }: { x: number; y: number; w: number; h: number; dormer?: boolean }) {
  return (
    <g>
      <polygon points={`${x},${y + h} ${x + w},${y + h} ${x + w},${y + 4} ${x},${y + 4}`} fill={VICTORIAN.roof} stroke={S} strokeWidth={0.8} />
      {[0.2, 0.45, 0.7].map((f) => (
        <line key={f} x1={x + 2} y1={y + h * f} x2={x + w - 2} y2={y + h * f} stroke={VICTORIAN.roofShingle} strokeWidth={0.7} opacity={0.4} />
      ))}
      {dormer && (
        <g>
          <polygon points={`${x + w * 0.35},${y + 8} ${x + w * 0.5},${y} ${x + w * 0.65},${y + 8}`} fill={VICTORIAN.roofDark} stroke={S} strokeWidth={0.6} />
          <rect x={x + w * 0.38} y={y + 7} width={w * 0.24} height={6} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.5} />
          <rect x={x + w * 0.4} y={y + 8} width={w * 0.2} height={4} fill="url(#vic-window)" stroke={S} strokeWidth={0.35} />
        </g>
      )}
    </g>
  )
}

/** Victorian Painted Lady — grey siding, ornate trim, bay windows, garage */
export function PaintedLadyToca() {
  const baseY = 108
  const floorSplit = 68
  const bx = 6
  const totalW = 108

  return (
    <TocaWrap>
      <VictorianDefs />
      <TocaShadow cy={118} rx={48} />
      {/* Lawn & foundation */}
      <rect x={bx} y={baseY} width={totalW} height={3} fill={VICTORIAN.foundation} stroke={S} strokeWidth={0.6} />
      <rect x={bx - 2} y={baseY + 3} width={totalW + 4} height={4} fill={VICTORIAN.lawn} stroke={VICTORIAN.lawnDark} strokeWidth={0.6} />
      {/* Main wall blocks */}
      <SidingWall x={bx} y={floorSplit} w={totalW} h={baseY - floorSplit} />
      <SidingWall x={bx} y={38} w={totalW} h={floorSplit - 38} />
      <TrimBand x={bx} y={floorSplit - 2} w={totalW} thick={4} />
      <TrimBand x={bx} y={36} w={totalW} thick={3} />
      {/* Roofs */}
      <LeftGable x={bx} y={14} w={34} />
      <RoofSection x={bx + 34} y={22} w={40} h={16} />
      <RoofSection x={bx + 74} y={22} w={34} h={16} dormer />
      {/* Left bay windows */}
      <BayWindowStack x={bx + 4} y={42} w={28} floorH={30} />
      {/* Center upper windows */}
      <VicWindow x={bx + 46} y={44} w={12} h={14} />
      <VicWindow x={bx + 60} y={44} w={12} h={14} />
      {/* Center door */}
      <DoubleDoor cx={bx + 54} y={floorSplit + 6} w={16} h={22} />
      {/* Right upper windows */}
      <VicWindow x={bx + 78} y={44} w={11} h={14} pediment={false} />
      <VicWindow x={bx + 91} y={44} w={11} h={14} pediment={false} />
      <TrimBand x={bx + 76} y={58} w={28} thick={2} />
      {/* Garage */}
      <GarageDoor x={bx + 76} y={floorSplit + 4} w={26} h={26} />
      {/* Column trim between sections */}
      {[bx + 33, bx + 73].map((cx) => (
        <rect key={cx} x={cx} y={38} width={3} height={baseY - 38} fill={VICTORIAN.trim} stroke={S} strokeWidth={0.5} />
      ))}
    </TocaWrap>
  )
}

export function getVictorianHouseArt(id: string): ReactNode | null {
  if (id === 'painted-lady') return <PaintedLadyToca />
  return null
}
