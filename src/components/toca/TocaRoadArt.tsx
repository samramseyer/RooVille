import type { ReactNode } from 'react'
import { TOCA } from './TocaHouseArt'

const ROAD = {
  gravel: '#C4A574',
  gravelDark: '#A08050',
  surface: '#8B7355',
  surfaceDark: '#6B5340',
  line: '#E8C872',
  edge: '#4A7C59',
}

function GravelBase() {
  return (
    <>
      <rect x={1} y={1} width={46} height={46} rx={4} fill={ROAD.gravel} stroke={ROAD.gravelDark} strokeWidth={1.5} />
      <rect x={4} y={4} width={40} height={40} rx={3} fill={ROAD.gravel} opacity={0.5} />
    </>
  )
}

function CenterDashes({ horizontal }: { horizontal: boolean }) {
  const dashes = horizontal
    ? [
        [8, 22, 6, 4],
        [20, 22, 6, 4],
        [32, 22, 6, 4],
      ]
    : [
        [22, 8, 4, 6],
        [22, 20, 4, 6],
        [22, 32, 4, 6],
      ]
  return (
    <>
      {dashes.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx={1} fill={ROAD.line} opacity={0.85} />
      ))}
    </>
  )
}

function StraightRoad() {
  return (
    <g>
      <GravelBase />
      <rect x={0} y={17} width={48} height={14} fill={ROAD.surface} />
      <rect x={0} y={17} width={48} height={3} fill={ROAD.surfaceDark} opacity={0.35} />
      <rect x={0} y={28} width={48} height={3} fill={ROAD.surfaceDark} opacity={0.2} />
      <CenterDashes horizontal />
      <rect x={0} y={16} width={48} height={1.5} fill={ROAD.edge} opacity={0.45} />
      <rect x={0} y={30.5} width={48} height={1.5} fill={ROAD.edge} opacity={0.45} />
    </g>
  )
}

/** L-shape: connects south and east at rotation 0°. */
function CornerRoad() {
  return (
    <g>
      <GravelBase />
      <rect x={17} y={17} width={31} height={14} fill={ROAD.surface} />
      <rect x={17} y={17} width={14} height={31} fill={ROAD.surface} />
      <rect x={17} y={17} width={31} height={3} fill={ROAD.surfaceDark} opacity={0.3} />
      <rect x={17} y={17} width={3} height={31} fill={ROAD.surfaceDark} opacity={0.25} />
      <path
        d="M 24 24 A 7 7 0 0 1 31 31"
        fill="none"
        stroke={ROAD.line}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.85}
      />
    </g>
  )
}

function CrossRoad() {
  return (
    <g>
      <GravelBase />
      <rect x={17} y={0} width={14} height={48} fill={ROAD.surface} />
      <rect x={0} y={17} width={48} height={14} fill={ROAD.surface} />
      <rect x={17} y={17} width={14} height={14} fill={ROAD.surfaceDark} opacity={0.15} />
      <CenterDashes horizontal />
      <CenterDashes horizontal={false} />
    </g>
  )
}

/** Dead-end: road enters from north at rotation 0°. */
function EndRoad() {
  return (
    <g>
      <GravelBase />
      <rect x={17} y={0} width={14} height={30} fill={ROAD.surface} />
      <ellipse cx={24} cy={32} rx={10} ry={8} fill={ROAD.surface} />
      <ellipse cx={24} cy={32} rx={7} ry={5.5} fill={ROAD.gravel} opacity={0.35} />
      <CenterDashes horizontal={false} />
    </g>
  )
}

const ROAD_ART: Record<string, () => ReactNode> = {
  'road-straight': StraightRoad,
  'road-corner': CornerRoad,
  'road-cross': CrossRoad,
  'road-end': EndRoad,
}

export function getTocaRoadArt(id: string): ReactNode | null {
  const render = ROAD_ART[id]
  if (!render) return null
  return (
    <g stroke={TOCA.stroke} strokeWidth={0.8} strokeLinejoin="round">
      {render()}
    </g>
  )
}
