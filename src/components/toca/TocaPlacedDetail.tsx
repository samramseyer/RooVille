import type { ReactNode } from 'react'
import { getBuilding } from '../../data/buildings'
import { getPlacedGroundY } from '../../data/buildingDisplay'
import { TOCA, GumLeaf } from './TocaHouseArt'
import { STATELY } from './TocaStatelyHouseArt'
import { CABIN } from './TocaBeachCabinArt'
import { VICTORIAN } from './TocaVictorianHouseArt'

const BEACH_HOUSE_IDS = new Set([
  'pink-beach-house',
  'red-beach-house',
  'orange-beach-house',
  'blue-beach-house',
])

const NO_GROUND_DETAIL_IDS = new Set([...BEACH_HOUSE_IDS, 'lighthouse'])

function parseViewBox(viewBox: string) {
  const parts = viewBox.split(/\s+/).map(Number)
  return { w: parts[2] ?? 100, h: parts[3] ?? 100 }
}

function GroundBase({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      {[0.18, 0.32, 0.5, 0.68, 0.82].map((f) => (
        <circle key={f} cx={w * f} cy={groundY - 2} r={1.4} fill="#9E8060" opacity={0.55} />
      ))}
    </>
  )
}

function HouseDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <GroundBase w={w} groundY={groundY} />
      <rect x={w * 0.06} y={groundY - 5} width={w * 0.88} height={2.5} rx={1} fill={STATELY.foundation} opacity={0.7} />
      {[0.12, 0.32, 0.68, 0.88].map((f, i) => (
        <ellipse
          key={f}
          cx={w * f}
          cy={groundY - 2}
          rx={4 + (i % 2)}
          ry={3}
          fill={i % 2 === 0 ? STATELY.bushLight : STATELY.bush}
          stroke={STATELY.bushDark}
          strokeWidth={0.5}
          opacity={0.85}
        />
      ))}
    </>
  )
}

function BeachCabinDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      {[0.15, 0.35, 0.65, 0.85].map((f, i) => (
        <ellipse
          key={f}
          cx={w * f}
          cy={groundY - 2}
          rx={4 + (i % 2)}
          ry={2.8}
          fill={i % 2 === 0 ? CABIN.rock : CABIN.rockDark}
          stroke={TOCA.stroke}
          strokeWidth={0.4}
          opacity={0.75}
        />
      ))}
      {[0.22, 0.78].map((f) => (
        <circle key={f} cx={w * f} cy={groundY - 5} r={1.8} fill={CABIN.flowerYellow} stroke={TOCA.stroke} strokeWidth={0.35} />
      ))}
    </>
  )
}

function PaintedLadyDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <rect x={w * 0.04} y={groundY - 3} width={w * 0.92} height={3} fill={VICTORIAN.lawn} opacity={0.85} />
      {[0.1, 0.25, 0.5, 0.75, 0.9].map((f, i) => (
        <ellipse
          key={f}
          cx={w * f}
          cy={groundY - 4}
          rx={3 + (i % 2)}
          ry={2}
          fill={i % 2 === 0 ? VICTORIAN.lawn : VICTORIAN.lawnDark}
          opacity={0.7}
        />
      ))}
    </>
  )
}

function BusinessDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <GroundBase w={w} groundY={groundY} />
      <path
        d={`M ${w * 0.72} ${groundY - 14} L ${w * 0.72} ${groundY - 4} L ${w * 0.88} ${groundY - 6} Z`}
        fill={TOCA.cream}
        stroke={TOCA.stroke}
        strokeWidth={1.2}
      />
      <line x1={w * 0.8} y1={groundY - 12} x2={w * 0.8} y2={groundY - 7} stroke={TOCA.oceanDark} strokeWidth={1} />
      <rect x={w * 0.12} y={groundY - 10} width={Math.min(w * 0.22, 24)} height={4} rx={2} fill={TOCA.eucalyptus} opacity={0.85} />
      <circle cx={w * 0.14} cy={groundY - 12} r={2.5} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={0.8} />
      <circle cx={w * 0.22} cy={groundY - 13} r={2.5} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={0.8} />
      <circle cx={w * 0.3} cy={groundY - 12} r={2.5} fill={TOCA.tinRed} stroke={TOCA.stroke} strokeWidth={0.8} />
    </>
  )
}

function HotelDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <GroundBase w={w} groundY={groundY} />
      <rect x={w * 0.38} y={groundY - 6} width={w * 0.24} height={6} rx={2} fill={TOCA.tinRed} opacity={0.85} />
      <rect x={w * 0.4} y={groundY - 5} width={w * 0.2} height={4} rx={1} fill="#8B0000" opacity={0.35} />
      <line x1={w * 0.08} y1={groundY - 26} x2={w * 0.08} y2={groundY - 6} stroke={TOCA.ochre} strokeWidth={1.5} />
      <rect x={w * 0.04} y={groundY - 30} width={8} height={5} rx={1} fill={TOCA.tinRed} stroke={TOCA.stroke} strokeWidth={0.8} />
      <line x1={w * 0.92} y1={groundY - 24} x2={w * 0.92} y2={groundY - 6} stroke={TOCA.ochre} strokeWidth={1.5} />
      <rect x={w * 0.88} y={groundY - 28} width={8} height={5} rx={1} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={0.8} />
      <ellipse cx={w * 0.06} cy={groundY - 8} rx={5} ry={4} fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={0.8} />
      <ellipse cx={w * 0.94} cy={groundY - 8} rx={5} ry={4} fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={0.8} />
    </>
  )
}

function ResortDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <GroundBase w={w} groundY={groundY} />
      <ellipse cx={w * 0.5} cy={groundY - 4} rx={w * 0.18} ry={5} fill={TOCA.ocean} opacity={0.35} />
      {[0.2, 0.8].map((f) => (
        <g key={f}>
          <line x1={w * f} y1={groundY - 20} x2={w * f} y2={groundY - 8} stroke={TOCA.ochre} strokeWidth={1.5} />
          <ellipse cx={w * f} cy={groundY - 22} rx={7} ry={4} fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={0.8} />
        </g>
      ))}
      <rect x={w * 0.44} y={groundY - 9} width={w * 0.12} height={3} rx={1} fill={TOCA.wattle} opacity={0.8} />
    </>
  )
}

function DockDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <circle cx={w * 0.15} cy={groundY - 3} r={3} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={0.8} />
      <path
        d={`M ${w * 0.12} ${groundY - 3} Q ${w * 0.2} ${groundY - 9} ${w * 0.28} ${groundY - 3}`}
        fill="none"
        stroke={TOCA.corrugatedDark}
        strokeWidth={1.2}
      />
      {[0.25, 0.5, 0.75].map((f) => (
        <ellipse key={f} cx={w * f} cy={groundY} rx={w * 0.06} ry={1.5} fill={TOCA.oceanDark} opacity={0.35} />
      ))}
    </>
  )
}

function ZooDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <GroundBase w={w} groundY={groundY} />
      <rect x={w * 0.04} y={groundY - 14} width={w * 0.92} height={5} rx={2} fill="none" stroke={TOCA.eucalyptus} strokeWidth={1.5} opacity={0.7} />
      <GumLeaf x={w * 0.9} y={groundY - 18} flip />
    </>
  )
}

function BoatDetail({ w, groundY }: { w: number; groundY: number }) {
  return (
    <>
      <path
        d={`M ${w * 0.2} ${groundY} Q ${w * 0.35} ${groundY - 3} ${w * 0.5} ${groundY - 1} Q ${w * 0.65} ${groundY + 1} ${w * 0.8} ${groundY}`}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={1.2}
      />
      <ellipse cx={w * 0.35} cy={groundY + 1} rx={w * 0.08} ry={1.5} fill="rgba(255,255,255,0.25)" />
      <ellipse cx={w * 0.65} cy={groundY + 1} rx={w * 0.07} ry={1.2} fill="rgba(255,255,255,0.2)" />
    </>
  )
}

function DetailForId(id: string, w: number, groundY: number): ReactNode {
  switch (id) {
    case 'beach-cabin':
      return <BeachCabinDetail w={w} groundY={groundY} />
    case 'pink-beach-house':
    case 'red-beach-house':
    case 'orange-beach-house':
    case 'blue-beach-house':
      return null
    case 'painted-lady':
      return <PaintedLadyDetail w={w} groundY={groundY} />
    case 'five-star-hotel':
    case 'skyline-tower':
      return <HotelDetail w={w} groundY={groundY} />
    case 'luxury-resort':
      return <ResortDetail w={w} groundY={groundY} />
    default:
      return null
  }
}

export function TocaPlacedDetail({
  id,
  viewBox,
  rotation = 0,
}: {
  id: string
  viewBox: string
  rotation?: number
}) {
  const building = getBuilding(id)
  if (!building || building.category === 'roads' || building.category === 'decor') return null

  const { w, h } = parseViewBox(viewBox)
  const groundY = getPlacedGroundY(id, building.category, h, rotation)
  const specific = DetailForId(id, w, groundY)

  const categoryDetail = (() => {
    if (specific) return specific
    if (NO_GROUND_DETAIL_IDS.has(id)) return null
    switch (building.category) {
      case 'houses':
      case 'boathouses':
        return <HouseDetail w={w} groundY={groundY} />
      case 'businesses':
        return <BusinessDetail w={w} groundY={groundY} />
      case 'docks':
        return <DockDetail w={w} groundY={groundY} />
      case 'zoos':
        return <ZooDetail w={w} groundY={groundY} />
      case 'boats':
        return <BoatDetail w={w} groundY={groundY} />
      default:
        return <GroundBase w={w} groundY={groundY} />
    }
  })()

  if (!categoryDetail) return null

  return <g className="toca-placed-detail">{categoryDetail}</g>
}
