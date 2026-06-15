import type { ReactNode } from 'react'
import { TOCA, TocaShadow, TocaWrap } from './TocaHouseArt'

const WOOD = {
  top: '#E8C872',
  front: '#C4956A',
  side: '#A08050',
  dark: '#8B6914',
  grain: '#B8956A',
}

const WATER = {
  surface: TOCA.ocean,
  ripple: 'rgba(255,255,255,0.25)',
}

type DockOrientation = 'horizontal' | 'horizontal-flip' | 'vertical' | 'vertical-flip'

export function getDockOrientation(rotation: number): DockOrientation {
  const r = ((rotation % 360) + 360) % 360
  if (r === 90) return 'vertical'
  if (r === 270) return 'vertical-flip'
  if (r === 180) return 'horizontal-flip'
  return 'horizontal'
}

function WaterLayerBottom({ y = 38, height = 18 }: { y?: number; height?: number }) {
  return (
    <>
      <rect x={0} y={y} width={120} height={height} fill={WATER.surface} opacity={0.55} />
      <path
        d={`M 0 ${y + 6} Q 30 ${y + 3} 60 ${y + 6} Q 90 ${y + 9} 120 ${y + 5}`}
        fill="none"
        stroke={WATER.ripple}
        strokeWidth={2}
      />
    </>
  )
}

function WaterLayerSide({ x, y, height }: { x: number; y: number; height: number }) {
  return (
    <>
      <rect x={x} y={y} width={14} height={height} fill={WATER.surface} opacity={0.55} />
      <path
        d={`M ${x + 4} ${y} Q ${x + 7} ${y + height * 0.25} ${x + 4} ${y + height * 0.5} Q ${x + 1} ${y + height * 0.75} ${x + 4} ${y + height}`}
        fill="none"
        stroke={WATER.ripple}
        strokeWidth={2}
      />
    </>
  )
}

function Piling3D({ x, topY, height = 22 }: { x: number; topY: number; height?: number }) {
  return (
    <g>
      <rect x={x - 3} y={topY} width={6} height={height} rx={2} fill={WOOD.dark} stroke={TOCA.stroke} strokeWidth={1.8} />
      <ellipse cx={x} cy={topY} rx={5} ry={2.5} fill={WOOD.grain} stroke={TOCA.stroke} strokeWidth={1.5} />
      <rect x={x + 1} y={topY + 2} width={2} height={height - 2} fill={WOOD.side} opacity={0.45} />
    </g>
  )
}

/** Walk path runs left-to-right; deck width runs top-to-bottom (for 90° map rotation). */
function Deck3DAlongX({
  x,
  y,
  length,
  width,
  plankCount = 8,
  waterSide = 'right',
}: {
  x: number
  y: number
  length: number
  width: number
  plankCount?: number
  waterSide?: 'left' | 'right'
}) {
  const plankH = width / plankCount
  const faceDepth = 8
  const deckX = waterSide === 'right' ? x : x + faceDepth
  const faceX = waterSide === 'right' ? x + length : x

  return (
    <g>
      <path
        d={
          waterSide === 'right'
            ? `M ${faceX} ${y} L ${faceX + faceDepth} ${y + 4} L ${faceX + faceDepth} ${y + width + 8} L ${faceX} ${y + width} Z`
            : `M ${faceX} ${y} L ${faceX - faceDepth} ${y + 4} L ${faceX - faceDepth} ${y + width + 8} L ${faceX} ${y + width} Z`
        }
        fill={WOOD.front}
        stroke={TOCA.stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {Array.from({ length: plankCount }).map((_, i) => (
        <rect
          key={i}
          x={deckX + 1}
          y={y + i * plankH + 1}
          width={length - 2}
          height={plankH - 2}
          rx={1.5}
          fill={i % 2 === 0 ? WOOD.top : WOOD.grain}
          stroke={TOCA.stroke}
          strokeWidth={1.2}
        />
      ))}
      <path
        d={
          waterSide === 'right'
            ? `M ${deckX} ${y + width} L ${deckX - 4} ${y + width + 4} L ${deckX - 4} ${y + width + 10} L ${deckX} ${y + width + 6} Z`
            : `M ${deckX + length} ${y + width} L ${deckX + length + 4} ${y + width + 4} L ${deckX + length + 4} ${y + width + 10} L ${deckX + length} ${y + width + 6} Z`
        }
        fill={WOOD.side}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
        opacity={0.85}
      />
    </g>
  )
}

/** Walk path runs left-to-right; deck depth runs top-to-bottom (default map orientation). */
function Deck3D({
  x,
  y,
  width,
  depth = 10,
  plankCount = 6,
}: {
  x: number
  y: number
  width: number
  depth?: number
  plankCount?: number
}) {
  const plankW = width / plankCount
  return (
    <g>
      <path
        d={`M ${x} ${y + depth} L ${x + width} ${y + depth} L ${x + width} ${y + depth + 8} L ${x} ${y + depth + 8} Z`}
        fill={WOOD.front}
        stroke={TOCA.stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {Array.from({ length: plankCount }).map((_, i) => (
        <rect
          key={i}
          x={x + i * plankW + 1}
          y={y}
          width={plankW - 2}
          height={depth}
          rx={1.5}
          fill={i % 2 === 0 ? WOOD.top : WOOD.grain}
          stroke={TOCA.stroke}
          strokeWidth={1.2}
        />
      ))}
      <path
        d={`M ${x + width} ${y} L ${x + width + 5} ${y + 4} L ${x + width + 5} ${y + depth + 12} L ${x + width} ${y + depth + 8} Z`}
        fill={WOOD.side}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
        opacity={0.85}
      />
    </g>
  )
}

function Bollard3D({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 4} y={y} width={8} height={10} rx={3} fill={TOCA.corrugated} stroke={TOCA.stroke} strokeWidth={1.8} />
      <ellipse cx={x} cy={y} rx={5} ry={2.5} fill={TOCA.corrugatedDark} stroke={TOCA.stroke} strokeWidth={1.5} />
      <ellipse cx={x} cy={y + 10} rx={5} ry={2} fill={TOCA.corrugatedDark} stroke={TOCA.stroke} strokeWidth={1.2} />
    </g>
  )
}

function PierHorizontal({ flip, withLegs = false }: { flip?: boolean; withLegs?: boolean }) {
  return (
    <g transform={flip ? 'translate(120 0) scale(-1 1)' : undefined}>
      <TocaShadow cx={60} cy={52} rx={52} />
      <WaterLayerBottom y={36} height={16} />
      <Deck3D x={8} y={14} width={100} depth={12} plankCount={10} />
      {withLegs &&
        [18, 38, 58, 78, 98].map((x) => (
          <Piling3D key={x} x={x} topY={26} height={24} />
        ))}
      <rect x={106} y={8} width={5} height={18} rx={2} fill={WOOD.grain} stroke={TOCA.stroke} strokeWidth={1.8} />
      <ellipse cx={108} cy={8} rx={4} ry={2} fill={WOOD.top} stroke={TOCA.stroke} strokeWidth={1.5} />
      <line x1={106} y1={10} x2={100} y2={14} stroke={WOOD.grain} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={14} cy={20} rx={5} ry={3} fill={TOCA.cream} stroke={TOCA.stroke} strokeWidth={1.5} />
    </g>
  )
}

function PierVertical({ flip }: { flip?: boolean }) {
  const waterSide = flip ? 'left' : 'right'
  const deckX = 10
  const deckY = 8
  const deckLength = 96
  const deckWidth = 34
  const waterX = flip ? 0 : 106

  return (
    <g>
      <TocaShadow cx={60} cy={28} rx={44} />
      <WaterLayerSide x={waterX} y={deckY - 2} height={deckWidth + 16} />
      <Deck3DAlongX
        x={deckX}
        y={deckY}
        length={deckLength}
        width={deckWidth}
        plankCount={9}
        waterSide={waterSide}
      />
      <rect
        x={flip ? deckX - 2 : deckX + deckLength - 3}
        y={deckY - 6}
        width={5}
        height={16}
        rx={2}
        fill={WOOD.grain}
        stroke={TOCA.stroke}
        strokeWidth={1.8}
      />
      <ellipse
        cx={flip ? deckX + 1 : deckX + deckLength + 1}
        cy={deckY - 6}
        rx={4}
        ry={2}
        fill={WOOD.top}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
      />
      <line
        x1={flip ? deckX + 4 : deckX + deckLength - 4}
        y1={deckY - 4}
        x2={flip ? deckX + 12 : deckX + deckLength - 12}
        y2={deckY + 2}
        stroke={WOOD.grain}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <ellipse
        cx={flip ? deckX + deckLength - 10 : deckX + 10}
        cy={deckY + 10}
        rx={5}
        ry={3}
        fill={TOCA.cream}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
      />
    </g>
  )
}

function MarinaHorizontal({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? 'translate(110 0) scale(-1 1)' : undefined}>
      <TocaShadow cx={55} cy={56} rx={48} />
      <WaterLayerBottom y={40} height={18} />
      <Deck3D x={10} y={18} width={90} depth={11} plankCount={9} />
      <Deck3D x={38} y={8} width={34} depth={11} plankCount={4} />
      <path d="M 38 29 L 72 29 L 72 37 L 38 37 Z" fill={WOOD.front} stroke={TOCA.stroke} strokeWidth={2} />
      <Bollard3D x={22} y={16} />
      <Bollard3D x={55} y={16} />
      <Bollard3D x={78} y={16} />
      <ellipse cx={90} cy={22} rx={4} ry={2.5} fill={TOCA.ochre} stroke={TOCA.stroke} strokeWidth={1.5} />
      <circle cx={95} cy={14} r={6} fill={TOCA.corrugated} stroke={TOCA.stroke} strokeWidth={2} />
      <path d="M 95 10 L 95 18 M 92 14 L 98 14" stroke={TOCA.stroke} strokeWidth={1.5} />
    </g>
  )
}

function MarinaVertical({ flip }: { flip?: boolean }) {
  const waterSide = flip ? 'left' : 'right'
  const deckX = 12
  const deckY = 10
  const mainLength = 82
  const deckWidth = 32
  const waterX = flip ? 0 : 96

  return (
    <g>
      <TocaShadow cx={55} cy={30} rx={40} />
      <WaterLayerSide x={waterX} y={deckY - 2} height={deckWidth + 18} />
      <Deck3DAlongX x={deckX} y={deckY} length={mainLength} width={deckWidth} plankCount={8} waterSide={waterSide} />
      <Deck3DAlongX
        x={flip ? deckX + 8 : deckX + 44}
        y={deckY - 12}
        length={28}
        width={deckWidth}
        plankCount={4}
        waterSide={waterSide}
      />
      <Bollard3D x={flip ? deckX + 14 : deckX + 18} y={deckY + 6} />
      <Bollard3D x={flip ? deckX + 44 : deckX + 48} y={deckY + 6} />
      <Bollard3D x={flip ? deckX + 68 : deckX + 72} y={deckY + 6} />
      <circle
        cx={flip ? deckX + 4 : deckX + mainLength + 4}
        cy={deckY + 4}
        r={6}
        fill={TOCA.corrugated}
        stroke={TOCA.stroke}
        strokeWidth={2}
      />
      <path
        d={`M ${flip ? deckX + 4 : deckX + mainLength + 4} ${deckY} L ${flip ? deckX + 4 : deckX + mainLength + 4} ${deckY + 8} M ${flip ? deckX + 1 : deckX + mainLength + 1} ${deckY + 4} L ${flip ? deckX + 7 : deckX + mainLength + 7} ${deckY + 4}`}
        stroke={TOCA.stroke}
        strokeWidth={1.5}
      />
    </g>
  )
}

function JettyHorizontal({ flip }: { flip?: boolean }) {
  return (
    <g transform={flip ? 'translate(100 0) scale(-1 1)' : undefined}>
      <TocaShadow cx={50} cy={42} rx={42} />
      <WaterLayerBottom y={28} height={14} />
      <Deck3D x={12} y={10} width={76} depth={9} plankCount={8} />
      <g transform="translate(84, 18)">
        <line x1={0} y1={0} x2={0} y2={16} stroke={TOCA.stroke} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={6} y1={0} x2={6} y2={16} stroke={TOCA.stroke} strokeWidth={2.5} strokeLinecap="round" />
        {[4, 8, 12].map((y) => (
          <line key={y} x1={0} y1={y} x2={6} y2={y} stroke={TOCA.stroke} strokeWidth={2} strokeLinecap="round" />
        ))}
      </g>
      <line x1={18} y1={8} x2={10} y2={2} stroke={WOOD.dark} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

function JettyVertical({ flip }: { flip?: boolean }) {
  const waterSide = flip ? 'left' : 'right'
  const deckX = 14
  const deckY = 8
  const deckLength = 72
  const deckWidth = 28
  const waterX = flip ? 0 : 88
  const ladderX = flip ? deckX - 2 : deckX + deckLength + 2

  return (
    <g>
      <TocaShadow cx={50} cy={24} rx={36} />
      <WaterLayerSide x={waterX} y={deckY - 2} height={deckWidth + 12} />
      <Deck3DAlongX x={deckX} y={deckY} length={deckLength} width={deckWidth} plankCount={7} waterSide={waterSide} />
      <g transform={`translate(${ladderX}, ${deckY + 4})`}>
        <line x1={0} y1={0} x2={0} y2={14} stroke={TOCA.stroke} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={6} y1={0} x2={6} y2={14} stroke={TOCA.stroke} strokeWidth={2.5} strokeLinecap="round" />
        {[4, 8, 12].map((y) => (
          <line key={y} x1={0} y1={y} x2={6} y2={y} stroke={TOCA.stroke} strokeWidth={2} strokeLinecap="round" />
        ))}
      </g>
      <line
        x1={flip ? deckX + 14 : deckX + deckLength - 14}
        y1={deckY + 4}
        x2={flip ? deckX + 6 : deckX + deckLength - 6}
        y2={deckY - 2}
        stroke={WOOD.dark}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  )
}

function renderDock(id: string, orientation: DockOrientation): ReactNode {
  const isVertical = orientation === 'vertical' || orientation === 'vertical-flip'
  const flip = orientation === 'horizontal-flip' || orientation === 'vertical-flip'

  switch (id) {
    case 'pier':
      return isVertical ? <PierVertical flip={flip} /> : <PierHorizontal flip={flip} />
    case 'raised-pier':
      return isVertical ? <PierVertical flip={flip} /> : <PierHorizontal flip={flip} withLegs />
    case 'marina':
      return isVertical ? <MarinaVertical flip={flip} /> : <MarinaHorizontal flip={flip} />
    case 'jetty':
      return isVertical ? <JettyVertical flip={flip} /> : <JettyHorizontal flip={flip} />
    default:
      return null
  }
}

export function PierToca() {
  return (
    <TocaWrap>
      <PierHorizontal />
    </TocaWrap>
  )
}

export function MarinaToca() {
  return (
    <TocaWrap>
      <MarinaHorizontal />
    </TocaWrap>
  )
}

export function JettyToca() {
  return (
    <TocaWrap>
      <JettyHorizontal />
    </TocaWrap>
  )
}

export function getTocaDockArt(id: string, rotation = 0): ReactNode | null {
  const orientation = getDockOrientation(rotation)
  const art = renderDock(id, orientation)
  if (!art) return null
  return <TocaWrap>{art}</TocaWrap>
}
