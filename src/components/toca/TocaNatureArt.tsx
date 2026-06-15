import type { ReactNode } from 'react'
import {
  GumLeaf,
  TOCA,
  TocaBody,
  TocaShadow,
  TocaWrap,
  WattleSprig,
} from './TocaHouseArt'

function CuteKangaroo({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={8} rx={11} ry={14} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={0} cy={-10} r={8} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={2} />
      <ellipse cx={-12} cy={2} rx={4} ry={7} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.5} />
      <circle cx={-2} cy={-12} r={2} fill={TOCA.stroke} />
      <path d="M -6 18 L -10 30 M 6 18 L 10 30" stroke={TOCA.ochre} strokeWidth={4} strokeLinecap="round" />
    </g>
  )
}

function CuteKoala({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={0} cy={0} r={11} fill="#9E9E9E" stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={0} cy={-8} r={9} fill="#9E9E9E" stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={-6} cy={-6} r={4} fill="#BDBDBD" stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={6} cy={-6} r={4} fill="#BDBDBD" stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={-3} cy={-9} r={2} fill={TOCA.stroke} />
      <circle cx={3} cy={-9} r={2} fill={TOCA.stroke} />
      <ellipse cx={0} cy={-4} rx={3} ry={2.5} fill={TOCA.stroke} />
    </g>
  )
}

function CuteCroc({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={4} rx={22} ry={7} fill={TOCA.eucalyptus} stroke={TOCA.gumGreen} strokeWidth={2} />
      <ellipse cx={18} cy={0} rx={10} ry={6} fill={TOCA.eucalyptus} stroke={TOCA.gumGreen} strokeWidth={2} />
      <circle cx={24} cy={-2} r={2.5} fill={TOCA.stroke} />
      <circle cx={20} cy={-2} r={1.5} fill={TOCA.white} />
      {/* Chunky teeth grin */}
      <path d="M 20 2 L 22 5 L 24 2" fill={TOCA.white} stroke={TOCA.stroke} strokeWidth={0.8} />
    </g>
  )
}

function Cockatoo({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx={0} cy={4} rx={9} ry={7} fill={TOCA.white} stroke={TOCA.stroke} strokeWidth={2} />
      <circle cx={4} cy={-2} r={7} fill={TOCA.white} stroke={TOCA.stroke} strokeWidth={2} />
      <polygon points="8,-6 14,-10 10,-2" fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={6} cy={-3} r={1.8} fill={TOCA.stroke} />
      <polygon points="12,2 20,0 14,6" fill={TOCA.wattleDark} stroke={TOCA.stroke} strokeWidth={1} />
    </g>
  )
}

export function KangarooPenToca() {
  return (
    <TocaWrap>
      <TocaShadow cy={76} rx={42} />
      {/* Grassy pen */}
      <TocaBody x={10} y={28} width={80} height={48} fill="#ABEBC6" rx={14} />
      {/* Rounded post fence */}
      {[18, 38, 58, 78].map((x) => (
        <rect key={x} x={x} y={24} width={4} height={54} rx={2} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.5} />
      ))}
      <rect x={10} y={24} width={80} height={5} rx={2} fill={TOCA.sand} stroke={TOCA.stroke} strokeWidth={1.5} />
      <CuteKangaroo x={35} y={48} scale={0.85} />
      <CuteKangaroo x={62} y={52} scale={0.7} />
      <WattleSprig x={16} y={30} />
      {/* Cute sign */}
      <rect x={72} y={32} width={14} height={10} rx={3} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.5} />
    </TocaWrap>
  )
}

export function KoalaTreeToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={35} cy={86} rx={20} />
      {/* Gum trunk */}
      <rect x={28} y={42} width={14} height={44} rx={6} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={2.5} />
      {/* Silvery gum canopy — chunky blobs */}
      <ellipse cx={35} cy={32} rx={28} ry={26} fill={TOCA.eucalyptus} stroke={TOCA.gumGreen} strokeWidth={2.5} />
      <ellipse cx={22} cy={38} rx={14} ry={16} fill="#8FB996" stroke={TOCA.gumGreen} strokeWidth={1.5} />
      <ellipse cx={48} cy={36} rx={12} ry={14} fill="#8FB996" stroke={TOCA.gumGreen} strokeWidth={1.5} />
      <CuteKoala x={38} y={48} />
      {/* Gum blossoms */}
      <circle cx={20} cy={28} r={4} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={24} cy={26} r={3} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={1} />
    </TocaWrap>
  )
}

export function BirdAviaryToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={36} />
      <rect x={14} y={32} width={58} height={42} rx={12} fill={TOCA.skyBlue} opacity={0.35} stroke={TOCA.stroke} strokeWidth={2} />
      {/* Chunky wire dome */}
      <path
        d="M 14 38 Q 43 8 72 38 L 72 72 Q 43 78 14 72 Z"
        fill={TOCA.white}
        stroke={TOCA.stroke}
        strokeWidth={TOCA.strokeWidth}
        opacity={0.9}
      />
      {[24, 38, 52, 62].map((x) => (
        <line key={x} x1={x} y1={36} x2={x} y2={72} stroke={TOCA.corrugated} strokeWidth={1.5} opacity={0.5} />
      ))}
      <Cockatoo x={32} y={52} />
      {/* Galah — pink & grey */}
      <g transform="translate(54, 56)">
        <ellipse cx={0} cy={0} rx={7} ry={5} fill="#CE93D8" stroke={TOCA.stroke} strokeWidth={1.5} />
        <circle cx={4} cy={-4} r={5} fill="#CE93D8" stroke={TOCA.stroke} strokeWidth={1.5} />
        <circle cx={5} cy={-5} r={1.5} fill={TOCA.stroke} />
      </g>
    </TocaWrap>
  )
}

export function CrocPoolToca() {
  return (
    <TocaWrap>
      <TocaShadow rx={40} />
      {/* Billabong */}
      <ellipse cx={47} cy={48} rx={40} ry={20} fill={TOCA.ocean} stroke={TOCA.oceanDark} strokeWidth={2.5} />
      <ellipse cx={47} cy={48} rx={32} ry={14} fill={TOCA.oceanDark} opacity={0.35} />
      {/* Sandy bank */}
      <path d="M 12 58 Q 47 52 82 58 L 82 68 Q 47 62 12 68 Z" fill={TOCA.sand} stroke={TOCA.stroke} strokeWidth={1.5} />
      <CuteCroc x={50} y={44} />
      <GumLeaf x={18} y={52} />
      {/* Warning sign — cute AU style */}
      <rect x={68} y={28} width={16} height={14} rx={4} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={2} />
      <text x={76} y={38} textAnchor="middle" fontSize="9" fontWeight="bold" fill={TOCA.stroke}>!</text>
    </TocaWrap>
  )
}

export function PalmTreeToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={25} cy={80} rx={14} />
      <path d="M 23 38 Q 21 58 24 78" stroke={TOCA.ochre} strokeWidth={6} fill="none" strokeLinecap="round" />
      {[0, 55, 110, 165, 220, 280, 320].map((angle) => (
        <ellipse
          key={angle}
          cx={23}
          cy={32}
          rx={20}
          ry={6}
          fill={TOCA.gumGreen}
          stroke={TOCA.stroke}
          strokeWidth={1.5}
          transform={`rotate(${angle} 23 32)`}
        />
      ))}
      <circle cx={23} cy={30} r={6} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.5} />
      {/* Coconuts — coastal QLD */}
      <circle cx={28} cy={34} r={3.5} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
      <circle cx={20} cy={36} r={3} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
    </TocaWrap>
  )
}

export function GumTreeToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={27} cy={84} rx={16} />
      <rect x={22} y={48} width={10} height={36} rx={4} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={2.5} />
      <ellipse cx={27} cy={34} rx={24} ry={28} fill={TOCA.eucalyptus} stroke={TOCA.gumGreen} strokeWidth={2.5} />
      <ellipse cx={18} cy={40} rx={12} ry={14} fill="#8FB996" stroke={TOCA.gumGreen} strokeWidth={1.5} />
      {/* Gum nuts */}
      <ellipse cx={32} cy={22} rx={4} ry={6} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
      <ellipse cx={38} cy={26} rx={3.5} ry={5} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.2} />
      <WattleSprig x={10} y={58} />
    </TocaWrap>
  )
}

export function SurfboardDecorToca() {
  return (
    <TocaWrap>
      <ellipse cx={14} cy={38} rx={10} ry={32} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={2.5} />
      <ellipse cx={14} cy={38} rx={5} ry={26} fill={TOCA.white} opacity={0.45} />
      {/* Green & gold stripe hint */}
      <rect x={8} y={20} width={12} height={5} rx={2} fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1} />
      <rect x={8} y={30} width={12} height={5} rx={2} fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={1} />
    </TocaWrap>
  )
}

export function BbqToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={24} cy={44} rx={16} />
      {/* Kettle BBQ — classic Aussie */}
      <ellipse cx={24} cy={28} rx={18} ry={14} fill={TOCA.corrugatedDark} stroke={TOCA.stroke} strokeWidth={2.5} />
      <ellipse cx={24} cy={22} rx={16} ry={6} fill={TOCA.corrugated} stroke={TOCA.stroke} strokeWidth={2} />
      {/* Snags on grill */}
      {[16, 24, 32].map((x) => (
        <rect key={x} x={x} y={20} width={6} height={3} rx={1.5} fill={TOCA.terracotta} stroke={TOCA.stroke} strokeWidth={1} />
      ))}
      {/* Legs */}
      <line x1={14} y1={38} x2={10} y2={44} stroke={TOCA.stroke} strokeWidth={3} strokeLinecap="round" />
      <line x1={34} y1={38} x2={38} y2={44} stroke={TOCA.stroke} strokeWidth={3} strokeLinecap="round" />
      {/* Smoke puff */}
      <circle cx={24} cy={12} r={5} fill={TOCA.white} opacity={0.6} stroke={TOCA.stroke} strokeWidth={1} />
      <circle cx={28} cy={8} r={3} fill={TOCA.white} opacity={0.4} />
    </TocaWrap>
  )
}

export function UmbrellaToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={26} cy={54} rx={18} />
      <line x1={26} y1={24} x2={26} y2={52} stroke={TOCA.ochre} strokeWidth={3} strokeLinecap="round" />
      {/* Green & gold umbrella panels */}
      <path d="M 6 24 Q 26 6 46 24" fill={TOCA.eucalyptus} stroke={TOCA.stroke} strokeWidth={2.5} />
      <path d="M 6 24 Q 16 14 26 24" fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.5} />
      <path d="M 26 24 Q 36 14 46 24" fill={TOCA.wattle} stroke={TOCA.stroke} strokeWidth={1.5} />
      {/* Towel on sand */}
      <rect x={14} y={50} width={24} height={5} rx={2} fill={TOCA.ocean} stroke={TOCA.stroke} strokeWidth={1.5} opacity={0.8} />
    </TocaWrap>
  )
}

export function ShellsToca() {
  return (
    <TocaWrap>
      <TocaShadow cx={19} cy={28} rx={14} />
      {/* Sand patch */}
      <ellipse cx={19} cy={24} rx={16} ry={5} fill={TOCA.sand} stroke={TOCA.stroke} strokeWidth={1.5} />
      {/* Scallop shell */}
      <ellipse cx={12} cy={20} rx={9} ry={7} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={2} />
      <path d="M 6 20 Q 12 14 18 20" fill="none" stroke={TOCA.ochre} strokeWidth={1} />
      {/* Cone shell */}
      <path d="M 26 24 L 30 14 L 34 24 Z" fill={TOCA.terracotta} stroke={TOCA.stroke} strokeWidth={1.5} strokeLinejoin="round" />
    </TocaWrap>
  )
}

export function getTocaNatureArt(id: string): ReactNode | null {
  switch (id) {
    case 'kangaroo-pen':
      return <KangarooPenToca />
    case 'koala-tree':
      return <KoalaTreeToca />
    case 'bird-aviary':
      return <BirdAviaryToca />
    case 'croc-pool':
      return <CrocPoolToca />
    case 'palm-tree':
      return <PalmTreeToca />
    case 'gum-tree':
      return <GumTreeToca />
    case 'surfboard':
      return <SurfboardDecorToca />
    case 'bbq':
      return <BbqToca />
    case 'umbrella':
      return <UmbrellaToca />
    case 'shells':
      return <ShellsToca />
    default:
      return null
  }
}
