import { createContext, useContext } from 'react'
import type { CountertopMaterial } from '../data/interiorCabinetStyles'
import { DEFAULT_CABINET_COLOR, DEFAULT_COUNTERTOP_MATERIAL } from '../data/interiorCabinetStyles'
import {
  C,
  DrawerFront,
  FurnSvg,
  GroundShadow,
  S,
  SW,
  ShadedRect,
  WoodGrainRect,
  adjustColor,
} from './InteriorFurnitureShared'

export type { CountertopMaterial }

interface CabinetFinish {
  bodyColor: string
  countertopMaterial: CountertopMaterial
}

const CabinetFinishContext = createContext<CabinetFinish>({
  bodyColor: DEFAULT_CABINET_COLOR,
  countertopMaterial: DEFAULT_COUNTERTOP_MATERIAL,
})

export function CabinetFinishProvider({
  bodyColor,
  countertopMaterial,
  children,
}: {
  bodyColor: string
  countertopMaterial: CountertopMaterial
  children: React.ReactNode
}) {
  return (
    <CabinetFinishContext.Provider value={{ bodyColor, countertopMaterial }}>
      {children}
    </CabinetFinishContext.Provider>
  )
}

function useCabinetFinish() {
  return useContext(CabinetFinishContext)
}

const COUNTERTOP: Record<
  CountertopMaterial,
  { fill: string; accent?: string; grain?: boolean; speckle?: boolean }
> = {
  wood: { fill: C.woodLight, grain: true },
  butcher: { fill: '#C4956A', grain: true },
  marble: { fill: '#F2F0EC', accent: '#C8C4BC' },
  granite: { fill: '#7A8494', accent: '#4A5568', speckle: true },
  quartz: { fill: '#F5F5F0', accent: '#E8E8E0' },
  concrete: { fill: '#A8A8A8', accent: '#888888' },
  teal: { fill: '#48B5B0', accent: '#2A9D8F' },
  laminate: { fill: C.cream },
}

function CountertopRect({
  x,
  y,
  width,
  height,
  material,
  rx = 3,
}: {
  x: number
  y: number
  width: number
  height: number
  material: CountertopMaterial
  rx?: number
}) {
  const style = COUNTERTOP[material]
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={rx} fill={style.fill} stroke={S} strokeWidth={1.8} />
      {style.grain &&
        Array.from({ length: Math.max(2, Math.floor(width / 24)) }).map((_, i) => (
          <line
            key={i}
            x1={x + 6 + i * 22}
            y1={y + 3}
            x2={x + 10 + i * 22}
            y2={y + height - 3}
            stroke={adjustColor(style.fill, -18)}
            strokeWidth={0.8}
            opacity={0.35}
          />
        ))}
      {style.accent && !style.speckle && (
        <path
          d={`M ${x + 8} ${y + height * 0.6} Q ${x + width * 0.4} ${y + height * 0.3} ${x + width - 10} ${y + height * 0.55}`}
          fill="none"
          stroke={style.accent}
          strokeWidth={1.2}
          opacity={0.45}
        />
      )}
      {style.speckle &&
        [
          [0.2, 0.35],
          [0.45, 0.55],
          [0.7, 0.3],
          [0.55, 0.7],
          [0.85, 0.6],
        ].map(([px, py], i) => (
          <circle
            key={i}
            cx={x + width * px}
            cy={y + height * py}
            r={1.2}
            fill={style.accent}
            opacity={0.55}
          />
        ))}
      <rect x={x + 2} y={y + 1} width={width * 0.35} height={height * 0.35} rx={2} fill="#FFFFFF" opacity={0.15} />
    </g>
  )
}

function CabinetDoors({
  x,
  y,
  width,
  height,
  doors,
  glass = false,
  bodyColor,
}: {
  x: number
  y: number
  width: number
  height: number
  doors: number
  glass?: boolean
  bodyColor: string
}) {
  const gap = 4
  const doorW = (width - gap * (doors + 1)) / doors
  return (
    <>
      {Array.from({ length: doors }).map((_, i) => {
        const dx = x + gap + i * (doorW + gap)
        if (glass) {
          return (
            <g key={i}>
              <rect x={dx} y={y} width={doorW} height={height} rx={2} fill={C.glass} stroke={S} strokeWidth={1.5} opacity={0.75} />
              <rect x={dx + 2} y={y + 2} width={doorW * 0.4} height={height * 0.35} rx={1} fill="#FFFFFF" opacity={0.3} />
            </g>
          )
        }
        return i === 0 && doors > 1 ? (
          <DrawerFront key={i} x={dx} y={y} w={doorW} h={height} knobX={dx + doorW - 6} />
        ) : (
          <g key={i}>
            <rect x={dx} y={y} width={doorW} height={height} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
            <circle cx={dx + doorW - 6} cy={y + height / 2} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
          </g>
        )
      })}
    </>
  )
}

function BaseCabinetArtInner({
  width,
  doors,
  bodyColor,
  material,
}: {
  width: number
  doors: number
  bodyColor: string
  material: CountertopMaterial
}) {
  const height = 52
  const bodyH = 36
  const topH = 8
  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <GroundShadow cx={width / 2} cy={height - 2} rx={width * 0.38} ry={3} />
      <ShadedRect x={4} y={10} width={width - 8} height={bodyH} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CountertopRect x={5} y={4} width={width - 10} height={topH} material={material} />
      <CabinetDoors x={8} y={22} width={width - 16} height={20} doors={doors} bodyColor={bodyColor} />
    </FurnSvg>
  )
}

function BaseCabinetFromFinish({ width, doors }: { width: number; doors: number }) {
  const finish = useCabinetFinish()
  return <BaseCabinetArtInner width={width} doors={doors} bodyColor={finish.bodyColor} material={finish.countertopMaterial} />
}

export function BaseCabinetArt() {
  return <BaseCabinetFromFinish width={60} doors={2} />
}

export function BaseCabinetWideArt() {
  return <BaseCabinetFromFinish width={88} doors={3} />
}

export function BaseCabinetNarrowArt() {
  return <BaseCabinetFromFinish width={36} doors={1} />
}

export function BaseCabinetMarbleArt() {
  return <BaseCabinetFromFinish width={60} doors={2} />
}

export function BaseCabinetGraniteArt() {
  return <BaseCabinetFromFinish width={88} doors={3} />
}

function SinkBaseArtInner({
  width,
  bowls,
  storage = 'doors',
  doors,
  variant = 'standard',
}: {
  width: number
  bowls: 1 | 2
  storage?: 'doors' | 'drawers'
  doors?: number
  variant?: 'standard' | 'farmhouse'
}) {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  const height = variant === 'farmhouse' ? 54 : 52
  const bodyH = height - 16
  const topH = 8
  const cx = width / 2
  const doorCount = doors ?? (bowls === 1 ? 2 : 3)

  const renderSink = () => {
    if (variant === 'farmhouse') {
      return (
        <>
          <rect x={cx - 18} y={8} width={36} height={10} rx={2} fill={C.metal} stroke={S} strokeWidth={1.8} />
          <path
            d={`M ${cx - 16} 18 L ${cx - 14} ${height - 6} L ${cx + 14} ${height - 6} L ${cx + 16} 18 Z`}
            fill={adjustColor(bodyColor, -4)}
            stroke={S}
            strokeWidth={2}
          />
          <path
            d={`M ${cx - 4} 0 Q ${cx + 8} 0 ${cx + 8} 10 L ${cx + 8} 14`}
            fill="none"
            stroke={C.metal}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <circle cx={cx - 4} cy={0} r={2.5} fill={C.metal} stroke={S} strokeWidth={1.2} />
        </>
      )
    }
    const bowlRx = width <= 40 ? 10 : bowls === 1 ? 14 : 12
    return (
      <>
        {bowls === 1 ? (
          <ellipse cx={cx} cy={12} rx={bowlRx} ry={5} fill={C.metal} stroke={S} strokeWidth={1.8} />
        ) : (
          <>
            <ellipse cx={cx - 16} cy={12} rx={bowlRx} ry={5} fill={C.metal} stroke={S} strokeWidth={1.8} />
            <ellipse cx={cx + 16} cy={12} rx={bowlRx} ry={5} fill={C.metal} stroke={S} strokeWidth={1.8} />
          </>
        )}
        <rect x={cx - 3} y={0} width={6} height={10} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
        <circle cx={cx} cy={1} r={2.5} fill={C.metal} stroke={S} strokeWidth={1.2} />
      </>
    )
  }

  const renderStorage = () => {
    if (variant === 'farmhouse') {
      return (
        <>
          <rect x={8} y={28} width={12} height={20} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
          <circle cx={17} cy={38} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
          <rect x={width - 20} y={28} width={12} height={20} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
          <circle cx={width - 11} cy={38} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
        </>
      )
    }
    if (storage === 'drawers') {
      return (
        <>
          <DrawerFront x={8} y={16} w={width - 16} h={10} knobX={width - 10} />
          <DrawerFront x={8} y={28} w={width - 16} h={10} knobX={width - 10} />
          <DrawerFront x={8} y={40} w={width - 16} h={6} knobX={width - 10} />
        </>
      )
    }
    return (
      <CabinetDoors x={8} y={22} width={width - 16} height={20} doors={doorCount} bodyColor={bodyColor} />
    )
  }

  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <GroundShadow cx={width / 2} cy={height - 2} rx={width * 0.38} ry={3} />
      <ShadedRect x={4} y={10} width={width - 8} height={bodyH} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CountertopRect x={5} y={4} width={width - 10} height={topH} material={countertopMaterial} />
      {renderSink()}
      {renderStorage()}
    </FurnSvg>
  )
}

function SinkBaseCornerArtInner() {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  const width = 52
  const height = 52

  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <GroundShadow cx={26} cy={50} rx={20} ry={3} />
      <path d="M 8 14 L 44 14 L 44 46 L 8 46 Z" fill={bodyColor} stroke={S} strokeWidth={2.5} />
      <CountertopRect x={6} y={6} width={40} height={8} material={countertopMaterial} />
      <ellipse cx={22} cy={12} rx={11} ry={4.5} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <rect x={20} y={0} width={5} height={9} rx={2.5} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <line x1={8} y1={14} x2={44} y2={46} stroke={S} strokeWidth={1.5} opacity={0.35} />
      <rect x={10} y={24} width={14} height={18} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
      <circle cx={17} cy={33} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function SinkBaseArt() {
  return <SinkBaseArtInner width={60} bowls={1} />
}

export function SinkBaseWideArt() {
  return <SinkBaseArtInner width={88} bowls={2} />
}

export function SinkBaseNarrowArt() {
  return <SinkBaseArtInner width={36} bowls={1} doors={1} />
}

export function SinkBaseDrawerArt() {
  return <SinkBaseArtInner width={60} bowls={1} storage="drawers" />
}

export function SinkBaseFarmhouseArt() {
  return <SinkBaseArtInner width={72} bowls={1} variant="farmhouse" storage="doors" doors={2} />
}

export function SinkBaseCornerArt() {
  return <SinkBaseCornerArtInner />
}

export function BaseCabinet3DrawerArt() {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  const width = 60
  const height = 52
  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <GroundShadow cx={30} cy={50} rx={24} ry={3} />
      <ShadedRect x={4} y={10} width={52} height={36} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CountertopRect x={5} y={4} width={50} height={8} material={countertopMaterial} />
      <DrawerFront x={8} y={16} w={44} h={10} knobX={48} />
      <DrawerFront x={8} y={28} w={44} h={10} knobX={48} />
      <DrawerFront x={8} y={40} w={44} h={6} knobX={48} />
    </FurnSvg>
  )
}

export function WallCabinetArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 58 42">
      <ShadedRect x={4} y={6} width={50} height={30} rx={4} fill={bodyColor} depth={4} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={46} height={5} rx={2} fill={adjustColor(bodyColor, 10)} />
      <line x1={31} y1={10} x2={31} y2={34} stroke={S} strokeWidth={1.5} opacity={0.35} />
      <CabinetDoors x={8} y={16} width={42} height={18} doors={2} bodyColor={bodyColor} />
    </FurnSvg>
  )
}

export function WallCabinetWideArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 88 42">
      <ShadedRect x={4} y={6} width={80} height={30} rx={4} fill={bodyColor} depth={4} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={76} height={5} rx={2} fill={adjustColor(bodyColor, 10)} />
      <CabinetDoors x={8} y={16} width={72} height={18} doors={3} bodyColor={bodyColor} />
    </FurnSvg>
  )
}

export function WallCabinetGlassArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 58 42">
      <ShadedRect x={4} y={6} width={50} height={30} rx={4} fill={bodyColor} depth={4} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={46} height={5} rx={2} fill={adjustColor(bodyColor, 10)} />
      <CabinetDoors x={8} y={16} width={42} height={18} doors={2} glass bodyColor={bodyColor} />
    </FurnSvg>
  )
}

export function CornerCabinetArt() {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 52 52">
      <GroundShadow cx={26} cy={50} rx={20} ry={3} />
      <path d="M 8 14 L 44 14 L 44 46 L 8 46 Z" fill={bodyColor} stroke={S} strokeWidth={2.5} />
      <CountertopRect x={6} y={6} width={40} height={8} material={countertopMaterial} />
      <line x1={8} y1={14} x2={44} y2={46} stroke={S} strokeWidth={1.5} opacity={0.35} />
      <rect x={10} y={24} width={14} height={18} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
      <circle cx={20} cy={33} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

function IslandArtInner({
  width,
  height,
  bodyColor,
  material,
  drawers,
}: {
  width: number
  height: number
  bodyColor: string
  material: CountertopMaterial
  drawers: number
}) {
  const bodyH = height - 22
  const drawerW = (width - 24 - (drawers - 1) * 4) / drawers
  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <GroundShadow cx={width / 2} cy={height - 2} rx={width * 0.38} ry={3} />
      <ShadedRect x={6} y={18} width={width - 12} height={bodyH} rx={5} fill={bodyColor} depth={6} strokeWidth={SW} />
      <CountertopRect x={7} y={8} width={width - 14} height={14} material={material} rx={4} />
      {Array.from({ length: drawers }).map((_, i) => {
        const dx = 12 + i * (drawerW + 4)
        const isDrawer = i < drawers - 1
        return isDrawer ? (
          <DrawerFront key={i} x={dx} y={26} w={drawerW} h={20} knobX={dx + drawerW - 6} />
        ) : (
          <g key={i}>
            <rect x={dx} y={26} width={drawerW} height={20} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
            <circle cx={dx + drawerW - 6} cy={36} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
          </g>
        )
      })}
    </FurnSvg>
  )
}

function IslandFromFinish({ width, height, drawers }: { width: number; height: number; drawers: number }) {
  const finish = useCabinetFinish()
  return (
    <IslandArtInner
      width={width}
      height={height}
      bodyColor={finish.bodyColor}
      material={finish.countertopMaterial}
      drawers={drawers}
    />
  )
}

export function KitchenIslandArt() {
  return <IslandFromFinish width={95} height={58} drawers={3} />
}

export function KitchenIslandLargeArt() {
  return <IslandFromFinish width={128} height={62} drawers={4} />
}

export function KitchenIslandXlArt() {
  return <IslandFromFinish width={162} height={66} drawers={5} />
}

export function KitchenIslandMarbleArt() {
  return <IslandFromFinish width={95} height={58} drawers={3} />
}

export function KitchenIslandLargeMarbleArt() {
  return <IslandFromFinish width={128} height={62} drawers={4} />
}

export function KitchenIslandLargeGraniteArt() {
  return <IslandFromFinish width={128} height={62} drawers={4} />
}

export function KitchenIslandLargeButcherArt() {
  return <IslandFromFinish width={128} height={62} drawers={4} />
}

export function KitchenIslandXlQuartzArt() {
  return <IslandFromFinish width={162} height={66} drawers={5} />
}

export function KitchenIslandXlTealArt() {
  return <IslandFromFinish width={162} height={66} drawers={5} />
}

function CountertopSlabArt({ width, material }: { width: number; material: CountertopMaterial }) {
  const height = 14
  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`} stretch>
      <CountertopRect x={1} y={1} width={width - 2} height={height - 2} material={material} rx={2} />
    </FurnSvg>
  )
}

function CounterSlabFromFinish({ width }: { width: number }) {
  const { countertopMaterial } = useCabinetFinish()
  return <CountertopSlabArt width={width} material={countertopMaterial} />
}

export function CounterButcher60Art() {
  return <CounterSlabFromFinish width={60} />
}
export function CounterButcher90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterButcher120Art() {
  return <CounterSlabFromFinish width={120} />
}
export function CounterMarble90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterMarble120Art() {
  return <CounterSlabFromFinish width={120} />
}
export function CounterGranite90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterGranite120Art() {
  return <CounterSlabFromFinish width={120} />
}
export function CounterQuartz90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterQuartz120Art() {
  return <CounterSlabFromFinish width={120} />
}
export function CounterConcrete90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterTeal90Art() {
  return <CounterSlabFromFinish width={90} />
}
export function CounterLaminate90Art() {
  return <CounterSlabFromFinish width={90} />
}

export function CountertopMaterialPreview({ material }: { material: CountertopMaterial }) {
  return (
    <svg viewBox="0 0 40 16" width={40} height={16} aria-hidden="true">
      <CountertopRect x={1} y={1} width={38} height={14} material={material} rx={2} />
    </svg>
  )
}

export function PantryCabinetArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 48 72">
      <GroundShadow cx={24} cy={70} rx={18} ry={3} />
      <ShadedRect x={4} y={6} width={40} height={60} rx={4} fill={bodyColor} depth={6} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={36} height={6} rx={2} fill={adjustColor(bodyColor, 10)} />
      <line x1={24} y1={10} x2={24} y2={64} stroke={S} strokeWidth={1.5} opacity={0.3} />
      <rect x={8} y={18} width={14} height={44} rx={2} fill={adjustColor(bodyColor, -6)} stroke={S} strokeWidth={1.5} />
      <rect x={26} y={18} width={14} height={44} rx={2} fill={adjustColor(bodyColor, -6)} stroke={S} strokeWidth={1.5} />
      <circle cx={15} cy={40} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
      <circle cx={33} cy={40} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function PantryCabinetWideArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 58 72">
      <GroundShadow cx={29} cy={70} rx={22} ry={3} />
      <ShadedRect x={4} y={6} width={50} height={60} rx={4} fill={bodyColor} depth={6} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={46} height={6} rx={2} fill={adjustColor(bodyColor, 10)} />
      <line x1={29} y1={10} x2={29} y2={64} stroke={S} strokeWidth={1.5} opacity={0.3} />
      <CabinetDoors x={8} y={18} width={42} height={44} doors={2} bodyColor={bodyColor} />
    </FurnSvg>
  )
}

function HoodVentArtInner({ width }: { width: number }) {
  const { bodyColor } = useCabinetFinish()
  const height = 38
  const canopyTop = 14
  const chimneyW = Math.round(width * 0.52)
  const chimneyX = (width - chimneyW) / 2
  const slatCount = width >= 80 ? 6 : 5
  const slatSpan = width - 24

  return (
    <FurnSvg viewBox={`0 0 ${width} ${height}`}>
      <ShadedRect
        x={chimneyX}
        y={2}
        width={chimneyW}
        height={11}
        rx={3}
        fill={bodyColor}
        depth={4}
        strokeWidth={SW}
      />
      <WoodGrainRect
        x={chimneyX + 2}
        y={4}
        width={chimneyW - 4}
        height={4}
        rx={1}
        fill={adjustColor(bodyColor, 10)}
      />
      <path
        d={`M 5 ${height - 3} L ${width - 5} ${height - 3} L ${width - 9} ${canopyTop} L 9 ${canopyTop} Z`}
        fill={bodyColor}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      <path
        d={`M 9 ${canopyTop + 2} L ${width - 9} ${canopyTop + 2} L ${width - 12} ${height - 8} L 12 ${height - 8} Z`}
        fill={adjustColor(bodyColor, -6)}
        stroke={S}
        strokeWidth={1.2}
        opacity={0.85}
      />
      <WoodGrainRect x={10} y={canopyTop + 4} width={width - 20} height={5} rx={1} fill={adjustColor(bodyColor, 8)} />
      {Array.from({ length: slatCount }).map((_, i) => {
        const x = 12 + (i * slatSpan) / (slatCount - 1)
        return (
          <line
            key={i}
            x1={x}
            y1={height - 7}
            x2={x}
            y2={height - 13}
            stroke={S}
            strokeWidth={1.2}
            opacity={0.45}
          />
        )
      })}
      <rect x={7} y={height - 5} width={width - 14} height={3} rx={1} fill={C.metal} stroke={S} strokeWidth={1} opacity={0.75} />
      <rect x={width / 2 - 8} y={height - 4} width={16} height={2} rx={1} fill="#FFF8DC" opacity={0.55} />
    </FurnSvg>
  )
}

export function HoodVentArt() {
  return <HoodVentArtInner width={60} />
}

export function HoodVentWideArt() {
  return <HoodVentArtInner width={88} />
}

export function DishwasherArt() {
  return (
    <FurnSvg viewBox="0 0 52 58">
      <GroundShadow cx={26} cy={56} rx={20} ry={3} />
      <ShadedRect x={4} y={8} width={44} height={44} rx={4} fill={C.corrugated} depth={5} strokeWidth={SW} />
      <rect x={8} y={14} width={36} height={28} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} opacity={0.75} />
      <rect x={10} y={16} width={14} height={10} rx={1} fill={C.glass} opacity={0.5} stroke={S} strokeWidth={1} />
      <circle cx={38} cy={42} r={4} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function BathroomVanityArt() {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 70 55">
      <GroundShadow cx={35} cy={53} rx={28} ry={3} />
      <ShadedRect x={4} y={22} width={62} height={28} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CountertopRect x={5} y={12} width={60} height={10} material={countertopMaterial} rx={3} />
      <ellipse cx={35} cy={16} rx={16} ry={8} fill={C.metal} stroke={S} strokeWidth={2} />
      <rect x={32} y={4} width={6} height={12} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <DrawerFront x={10} y={28} w={22} h={18} knobX={26} />
      <rect x={38} y={28} width={22} height={18} rx={2} fill={adjustColor(bodyColor, -8)} stroke={S} strokeWidth={1.5} />
      <circle cx={49} cy={37} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function BathroomVanityWideArt() {
  const { bodyColor, countertopMaterial } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 95 55">
      <GroundShadow cx={47} cy={53} rx={36} ry={3} />
      <ShadedRect x={4} y={22} width={87} height={28} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CountertopRect x={5} y={12} width={85} height={10} material={countertopMaterial} rx={3} />
      <ellipse cx={47} cy={16} rx={20} ry={8} fill={C.metal} stroke={S} strokeWidth={2} />
      <rect x={44} y={4} width={6} height={12} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <CabinetDoors x={10} y={28} width={75} height={18} doors={2} bodyColor={bodyColor} />
    </FurnSvg>
  )
}

export function MedicineCabinetArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 42 48">
      <ShadedRect x={4} y={4} width={34} height={40} rx={4} fill={bodyColor} depth={4} strokeWidth={SW} />
      <rect x={8} y={8} width={26} height={32} rx={2} fill={C.glass} stroke={S} strokeWidth={2} opacity={0.65} />
      <rect x={10} y={10} width={8} height={12} rx={1} fill="#FFFFFF" opacity={0.35} />
      <line x1={21} y1={8} x2={21} y2={40} stroke={S} strokeWidth={1.5} opacity={0.25} />
      <circle cx={32} cy={24} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function BathroomLinenArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 44 68">
      <GroundShadow cx={22} cy={66} rx={16} ry={3} />
      <ShadedRect x={4} y={6} width={36} height={56} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <WoodGrainRect x={6} y={8} width={32} height={5} rx={2} fill={adjustColor(bodyColor, 10)} />
      {[18, 30, 42, 54].map((y) => (
        <rect key={y} x={8} y={y} width={28} height={8} rx={2} fill={adjustColor(bodyColor, 4)} stroke={S} strokeWidth={1} opacity={0.85} />
      ))}
      <rect x={34} y={20} width={3} height={10} rx={1.5} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function BathroomTowerArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 40 62">
      <GroundShadow cx={20} cy={60} rx={14} ry={3} />
      <ShadedRect x={4} y={8} width={32} height={50} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <line x1={20} y1={10} x2={20} y2={56} stroke={S} strokeWidth={1.5} opacity={0.3} />
      <DrawerFront x={8} y={14} w={10} h={16} knobX={15} />
      <DrawerFront x={22} y={14} w={10} h={16} knobX={29} />
      <rect x={8} y={34} width={24} height={20} rx={2} fill={adjustColor(bodyColor, -6)} stroke={S} strokeWidth={1.5} />
      <circle cx={20} cy={44} r={2} fill={C.corrugated} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function BathroomTowerWideArt() {
  const { bodyColor } = useCabinetFinish()
  return (
    <FurnSvg viewBox="0 0 52 62">
      <GroundShadow cx={26} cy={60} rx={18} ry={3} />
      <ShadedRect x={4} y={8} width={44} height={50} rx={4} fill={bodyColor} depth={5} strokeWidth={SW} />
      <CabinetDoors x={8} y={14} width={36} height={40} doors={2} bodyColor={bodyColor} />
    </FurnSvg>
  )
}
