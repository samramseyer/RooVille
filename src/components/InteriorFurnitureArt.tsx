import type { InteriorTheme } from '../data/enterableBuildings'
import type { WindowViewId } from '../data/interiorWindowView'
import { getFloorColor, getWallpaperColor } from '../data/interiorStyles'
import type { InteriorStyle } from '../types'
import { FloorPatternDefs } from './InteriorFloorPatterns'
import {
  BenchArt,
  ClockArt,
  CoffeeTableArt,
  DeskArt,
  DeskLampArt,
  DiningChairArt,
  DiningTableArt,
  DresserArt,
  LaundryArt,
  MicrowaveArt,
  MirrorArt,
  NightstandArt,
  OttomanArt,
  SectionalArt,
  ShelfArt,
  SinkArt,
  StoveArt,
  SurfboardArt,
} from './InteriorFurniturePieces'
import {
  C,
  Cushion,
  FurnSvg,
  GroundShadow,
  S,
  SW,
  ShadedCylinder,
  ShadedEllipse,
  ShadedRect,
  TocaShadeDefs,
  WoodGrainRect,
  WoodLegs,
  adjustColor,
} from './InteriorFurnitureShared'
import { BaseTrimMolding } from './InteriorTrimProfiles'
import { WallpaperPatternDefs } from './InteriorWallpaperPatterns'

function SofaArt() {
  return (
    <FurnSvg viewBox="0 0 92 52">
      <GroundShadow cx={46} cy={50} rx={40} ry={4} />
      <WoodLegs xs={[14, 78]} y={44} h={7} w={4} />
      <ShadedRect x={5} y={28} width={82} height={16} rx={8} fill={C.fabricDark} depth={5} strokeWidth={SW} />
      <ShadedRect x={7} y={19} width={78} height={13} rx={7} fill={C.fabric} depth={4} strokeWidth={SW} />
      <ShadedRect x={7} y={8} width={78} height={14} rx={8} fill={adjustColor(C.fabric, 12)} depth={4} strokeWidth={SW} />
      <rect x={5} y={14} width={9} height={24} rx={4} fill={C.fabricDark} stroke={S} strokeWidth={2} />
      <rect x={78} y={14} width={9} height={24} rx={4} fill={C.fabricDark} stroke={S} strokeWidth={2} />
      <Cushion x={14} y={21} w={22} h={9} fill={C.cream} />
      <Cushion x={56} y={21} w={22} h={9} fill={C.cream} />
      <ellipse cx={46} cy={23} rx={9} ry={5} fill={C.terracotta} stroke={S} strokeWidth={1.5} />
      {[20, 46, 72].map((x) => (
        <circle key={x} cx={x} cy={14} r={2} fill={adjustColor(C.fabric, -10)} stroke={S} strokeWidth={0.8} opacity={0.5} />
      ))}
    </FurnSvg>
  )
}

function ArmchairArt() {
  return (
    <FurnSvg viewBox="0 0 50 50">
      <GroundShadow cx={25} cy={48} rx={18} ry={3} />
      <ShadedCylinder x={14} topY={42} width={5} height={6} fill={C.wood} stroke={S} />
      <ShadedCylinder x={36} topY={42} width={5} height={6} fill={C.wood} stroke={S} />
      <ShadedRect x={10} y={24} width={30} height={18} rx={9} fill={C.terracotta} depth={5} strokeWidth={SW} />
      <ShadedRect x={10} y={12} width={30} height={16} rx={8} fill={adjustColor(C.terracotta, 15)} depth={4} strokeWidth={SW} />
      <rect x={8} y={18} width={6} height={20} rx={3} fill={adjustColor(C.terracotta, -15)} stroke={S} strokeWidth={1.8} />
      <rect x={36} y={18} width={6} height={20} rx={3} fill={adjustColor(C.terracotta, -15)} stroke={S} strokeWidth={1.8} />
      <Cushion x={16} y={26} w={18} h={10} fill={C.cream} />
    </FurnSvg>
  )
}

function BedArt() {
  return (
    <FurnSvg viewBox="0 0 85 62">
      <GroundShadow cx={42} cy={60} rx={36} ry={4} />
      <ShadedRect x={4} y={24} width={77} height={32} rx={6} fill={C.woodLight} depth={5} strokeWidth={SW} />
      <rect x={8} y={26} width={69} height={26} rx={5} fill={C.cream} stroke={S} strokeWidth={2} />
      <ShadedRect x={5} y={6} width={34} height={20} rx={8} fill={C.wood} depth={4} strokeWidth={SW} />
      <ShadedRect x={46} y={28} width={34} height={18} rx={4} fill={C.woodDark} depth={3} strokeWidth={2} />
      <rect x={10} y={14} width={24} height={11} rx={5} fill={C.cream} stroke={S} strokeWidth={1.8} />
      <rect x={38} y={15} width={20} height={10} rx={4} fill={C.cream} stroke={S} strokeWidth={1.5} />
      <rect x={10} y={34} width={62} height={16} rx={4} fill={C.eucalyptus} stroke={S} strokeWidth={1.5} opacity={0.85} />
      <path d="M 12 38 Q 42 34 72 38" fill="none" stroke={adjustColor(C.eucalyptus, -20)} strokeWidth={1.5} opacity={0.4} />
      <path d="M 12 42 Q 42 46 72 42" fill="none" stroke={adjustColor(C.eucalyptus, -20)} strokeWidth={1.5} opacity={0.35} />
    </FurnSvg>
  )
}

function BunkArt() {
  return (
    <FurnSvg viewBox="0 0 55 70">
      <GroundShadow cx={27} cy={68} rx={22} ry={3} />
      {/* Posts */}
      <ShadedRect x={10} y={6} width={5} height={58} rx={2} fill={C.wood} depth={3} strokeWidth={2} />
      <ShadedRect x={40} y={6} width={5} height={58} rx={2} fill={C.wood} depth={3} strokeWidth={2} />
      {/* Top bunk */}
      <ShadedRect x={8} y={8} width={39} height={22} rx={5} fill={C.cream} depth={4} strokeWidth={SW} />
      <rect x={12} y={12} width={31} height={12} rx={3} fill={C.ocean} opacity={0.35} stroke={S} strokeWidth={1.2} />
      {/* Ladder */}
      {[18, 28, 38, 48].map((y) => (
        <line key={y} x1={44} y1={y} x2={50} y2={y} stroke={S} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      <line x1={44} y1={14} x2={44} y2={58} stroke={S} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={50} y1={14} x2={50} y2={58} stroke={S} strokeWidth={2.5} strokeLinecap="round" />
      {/* Bottom bunk */}
      <ShadedRect x={8} y={38} width={39} height={22} rx={5} fill={C.sand} depth={4} strokeWidth={SW} />
      <rect x={12} y={42} width={31} height={12} rx={3} fill={C.wattle} opacity={0.4} stroke={S} strokeWidth={1.2} />
      {/* Porthole hint — boat cabin */}
      <circle cx={27} cy={4} r={4} fill={C.window} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

function TableArt() {
  return (
    <FurnSvg viewBox="0 0 70 50">
      <GroundShadow cx={35} cy={48} rx={28} ry={3} />
      <WoodGrainRect x={8} y={8} width={54} height={14} rx={4} />
      <WoodLegs xs={[16, 54]} y={24} h={22} />
    </FurnSvg>
  )
}

function RugArt() {
  return (
    <FurnSvg viewBox="0 0 100 60">
      <ShadedEllipse cx={50} cy={30} rx={46} ry={26} fill={C.terracotta} stroke={S} strokeWidth={SW} />
      <ellipse cx={50} cy={30} rx={38} ry={20} fill={C.ochre} stroke={S} strokeWidth={1.8} opacity={0.7} />
      <ellipse cx={50} cy={30} rx={22} ry={12} fill={C.sand} stroke={S} strokeWidth={1.5} opacity={0.8} />
      {/* Coastal wave motif */}
      <path
        d="M 22 32 Q 35 26 50 32 Q 65 38 78 32"
        fill="none"
        stroke={C.ocean}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.7}
      />
      <path
        d="M 26 38 Q 40 34 50 38 Q 60 42 74 38"
        fill="none"
        stroke={C.oceanDark}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.6}
      />
      {[30, 50, 70].map((x) => (
        <circle key={x} cx={x} cy={28} r={2.5} fill={C.wattle} stroke={S} strokeWidth={0.8} />
      ))}
    </FurnSvg>
  )
}

function LampArt() {
  return (
    <FurnSvg viewBox="0 0 30 55">
      <GroundShadow cx={15} cy={53} rx={10} ry={2} />
      {/* Base */}
      <ellipse cx={15} cy={50} rx={10} ry={4} fill={C.wood} stroke={S} strokeWidth={2} />
      <ShadedRect x={13} y={28} width={4} height={22} rx={2} fill={C.woodLight} depth={2} strokeWidth={1.8} />
      {/* Shade */}
      <path d="M 3 28 Q 15 10 27 28 Z" fill={C.wattle} stroke={S} strokeWidth={SW} />
      <path d="M 5 27 Q 15 14 25 27" fill="none" stroke={adjustColor(C.wattle, -20)} strokeWidth={1.5} opacity={0.5} />
      {/* Warm glow */}
      <ellipse cx={15} cy={22} rx={11} ry={9} fill={C.wattle} opacity={0.22} />
      <ellipse cx={15} cy={20} rx={6} ry={4} fill="#FFFFFF" opacity={0.35} />
    </FurnSvg>
  )
}

function PlantArt() {
  return (
    <FurnSvg viewBox="0 0 40 55">
      <GroundShadow cx={20} cy={53} rx={12} ry={2} />
      {/* Terracotta pot */}
      <path
        d="M 8 42 L 10 52 L 30 52 L 32 42 Z"
        fill={C.terracotta}
        stroke={S}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <ellipse cx={20} cy={42} rx={12} ry={4} fill={adjustColor(C.terracotta, 12)} stroke={S} strokeWidth={1.8} />
      <ellipse cx={20} cy={40} rx={10} ry={3} fill={C.ochre} stroke={S} strokeWidth={1.5} />
      {/* Gum-style leaves */}
      <ellipse cx={20} cy={26} rx={14} ry={16} fill={C.eucalyptus} stroke={S} strokeWidth={2.2} />
      <ellipse cx={12} cy={22} rx={9} ry={11} fill={C.gumGreen} stroke={S} strokeWidth={1.8} />
      <ellipse cx={28} cy={24} rx={8} ry={10} fill={C.gumGreen} stroke={S} strokeWidth={1.8} />
      <ellipse cx={18} cy={16} rx={7} ry={9} fill={adjustColor(C.eucalyptus, 10)} stroke={S} strokeWidth={1.5} />
      {/* Wattle blossom */}
      <circle cx={26} cy={18} r={4} fill={C.wattle} stroke={S} strokeWidth={1.2} />
      <circle cx={24} cy={16} r={3} fill={C.wattle} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

function BookshelfArt() {
  return (
    <FurnSvg viewBox="0 0 60 70">
      <GroundShadow cx={30} cy={68} rx={24} ry={3} />
      <ShadedRect x={6} y={6} width={48} height={58} rx={5} fill={C.wood} depth={6} strokeWidth={SW} />
      {/* Back panel */}
      <rect x={10} y={10} width={40} height={50} rx={3} fill={adjustColor(C.wood, -15)} stroke={S} strokeWidth={1.5} />
      {[24, 40, 56].map((y) => (
        <rect key={y} x={8} y={y - 2} width={44} height={4} rx={1} fill={C.woodLight} stroke={S} strokeWidth={1.2} />
      ))}
      {/* Books row 1 */}
      {[
        { x: 12, w: 8, h: 10, c: C.tinRed },
        { x: 22, w: 6, h: 10, c: C.ocean },
        { x: 30, w: 9, h: 10, c: C.wattle },
        { x: 41, w: 7, h: 10, c: C.eucalyptus },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={12} width={b.w} height={b.h} rx={1} fill={b.c} stroke={S} strokeWidth={1.2} />
      ))}
      {/* Row 2 */}
      {[
        { x: 13, w: 10, h: 12, c: C.terracotta },
        { x: 25, w: 8, h: 12, c: C.corrugated },
        { x: 35, w: 12, h: 12, c: C.oceanDark },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={28} width={b.w} height={b.h} rx={1} fill={b.c} stroke={S} strokeWidth={1.2} />
      ))}
      {/* Surf book + koala figurine */}
      <rect x={14} y={44} width={14} height={10} rx={1} fill={C.ocean} stroke={S} strokeWidth={1.2} />
      <text x={21} y={52} textAnchor="middle" fontSize={6} fontWeight={800} fill={C.cream}>
        SURF
      </text>
      <circle cx={42} cy={50} r={6} fill={C.ochre} stroke={S} strokeWidth={1.5} />
      <circle cx={42} cy={47} r={4} fill={C.ochre} stroke={S} strokeWidth={1.2} />
      <circle cx={40} cy={46} r={1.2} fill={S} />
      <circle cx={44} cy={46} r={1.2} fill={S} />
    </FurnSvg>
  )
}

function FlatScreenTvArt() {
  return (
    <FurnSvg viewBox="0 0 100 58" stretch>
      {/* Wall mount bracket */}
      <rect x={42} y={52} width={16} height={4} rx={1} fill={C.metal} stroke={S} strokeWidth={1.2} />
      <rect x={46} y={54} width={8} height={3} rx={1} fill={adjustColor(C.metal, -15)} stroke={S} strokeWidth={1} />
      {/* Ultra-thin bezel */}
      <rect x={2} y={2} width={96} height={48} rx={3} fill={C.charcoal} stroke={S} strokeWidth={2} />
      {/* Screen */}
      <rect x={5} y={5} width={90} height={42} rx={2} fill={C.ocean} stroke={S} strokeWidth={1.5} />
      <rect x={5} y={28} width={90} height={19} rx={1} fill={C.oceanDark} opacity={0.55} />
      <path d="M 8 30 Q 50 22 92 30" fill="none" stroke={C.cream} strokeWidth={1.5} opacity={0.55} />
      <circle cx={82} cy={14} r={5} fill={C.wattle} opacity={0.85} stroke={S} strokeWidth={1} />
      <rect x={8} y={8} width={22} height={12} rx={2} fill="#FFFFFF" opacity={0.18} />
      {/* Power LED */}
      <circle cx={92} cy={50} r={1.5} fill="#4CAF50" opacity={0.9} />
    </FurnSvg>
  )
}

function TvArt() {
  return (
    <FurnSvg viewBox="0 0 65 45" stretch>
      <GroundShadow cx={32} cy={43} rx={26} ry={3} />
      <ShadedRect x={4} y={4} width={57} height={34} rx={7} fill={C.corrugated} depth={5} strokeWidth={SW} />
      {/* Screen — ocean scene */}
      <rect x={10} y={10} width={45} height={24} rx={4} fill={C.ocean} stroke={S} strokeWidth={1.8} />
      <rect x={10} y={22} width={45} height={12} rx={2} fill={C.oceanDark} opacity={0.5} />
      <path d="M 12 24 Q 32 18 52 24" fill="none" stroke={C.cream} strokeWidth={1.5} opacity={0.6} />
      <circle cx={48} cy={14} r={4} fill={C.wattle} opacity={0.8} />
      {/* Screen shine */}
      <rect x={12} y={12} width={16} height={8} rx={2} fill="#FFFFFF" opacity={0.15} />
      {/* Stand */}
      <path d="M 26 38 L 32 42 L 38 38 Z" fill={adjustColor(C.corrugated, -20)} stroke={S} strokeWidth={1.8} />
      <rect x={30} y={38} width={4} height={4} rx={1} fill={C.corrugated} stroke={S} strokeWidth={1.2} />
    </FurnSvg>
  )
}

function FridgeArt() {
  return (
    <FurnSvg viewBox="0 0 45 65">
      <GroundShadow cx={22} cy={63} rx={16} ry={3} />
      <ShadedRect x={5} y={4} width={35} height={56} rx={6} fill={C.cream} depth={6} strokeWidth={SW} />
      {/* Freezer line */}
      <line x1={5} y1={26} x2={40} y2={26} stroke={S} strokeWidth={2} />
      <rect x={5} y={4} width={35} height={22} rx={6} fill={adjustColor(C.cream, -6)} stroke={S} strokeWidth={1.5} />
      {/* Handles */}
      <rect x={34} y={12} width={3} height={10} rx={1.5} fill={C.corrugated} stroke={S} strokeWidth={1.2} />
      <rect x={34} y={32} width={3} height={14} rx={1.5} fill={C.corrugated} stroke={S} strokeWidth={1.2} />
      {/* Aussie magnets */}
      <circle cx={16} cy={16} r={5} fill={C.wattle} stroke={S} strokeWidth={1.5} />
      <text x={16} y={18} textAnchor="middle" fontSize={6} fontWeight={800} fill={S}>
        AU
      </text>
      <ellipse cx={24} cy={38} rx={4} ry={7} fill={C.ocean} stroke={S} strokeWidth={1.2} />
      <ellipse cx={14} cy={40} rx={3} ry={5} fill={C.tinRed} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

function PosterArt() {
  return (
    <FurnSvg viewBox="0 0 50 40">
      {/* Frame */}
      <ShadedRect x={2} y={2} width={46} height={36} rx={3} fill={C.woodLight} depth={3} strokeWidth={2} />
      <rect x={6} y={6} width={38} height={28} rx={2} fill={C.window} stroke={S} strokeWidth={1.8} />
      {/* Sunset beach scene */}
      <rect x={6} y={20} width={38} height={14} fill={C.sand} />
      <rect x={6} y={6} width={38} height={14} fill={adjustColor(C.wattle, 10)} opacity={0.85} />
      <circle cx={36} cy={14} r={6} fill={C.wattle} stroke={S} strokeWidth={1.2} />
      <path d="M 8 28 Q 25 22 42 28 L 42 34 L 8 34 Z" fill={C.ocean} opacity={0.7} />
      {/* Palm silhouette */}
      <line x1={14} y1={34} x2={14} y2={22} stroke={C.gumGreen} strokeWidth={2.5} strokeLinecap="round" />
      <ellipse cx={12} cy={20} rx={5} ry={3} fill={C.gumGreen} stroke={S} strokeWidth={1} />
      <ellipse cx={16} cy={19} rx={4} ry={2.5} fill={C.eucalyptus} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function InteriorFurnitureArt({ id, emoji }: { id: string; emoji?: string }) {
  switch (id) {
    case 'sofa':
      return <SofaArt />
    case 'sectional':
      return <SectionalArt />
    case 'armchair':
      return <ArmchairArt />
    case 'ottoman':
      return <OttomanArt />
    case 'bed':
      return <BedArt />
    case 'bunk':
      return <BunkArt />
    case 'nightstand':
      return <NightstandArt />
    case 'dresser':
      return <DresserArt />
    case 'dining-table':
      return <DiningTableArt />
    case 'dining-chair':
      return <DiningChairArt />
    case 'coffee-table':
      return <CoffeeTableArt />
    case 'desk':
      return <DeskArt />
    case 'bench':
      return <BenchArt />
    case 'table':
      return <TableArt />
    case 'rug':
      return <RugArt />
    case 'lamp':
      return <LampArt />
    case 'desk-lamp':
      return <DeskLampArt />
    case 'plant':
      return <PlantArt />
    case 'bookshelf':
      return <BookshelfArt />
    case 'shelf':
      return <ShelfArt />
    case 'tv':
      return <TvArt />
    case 'flat-screen-tv':
      return <FlatScreenTvArt />
    case 'fridge':
      return <FridgeArt />
    case 'stove':
      return <StoveArt />
    case 'sink':
      return <SinkArt />
    case 'microwave':
      return <MicrowaveArt />
    case 'laundry':
      return <LaundryArt />
    case 'surfboard':
      return <SurfboardArt />
    case 'mirror':
      return <MirrorArt />
    case 'clock':
      return <ClockArt />
    case 'poster':
      return <PosterArt />
    default:
      return (
        <FurnSvg viewBox="0 0 40 40">
          {emoji ? (
            <text x={20} y={26} textAnchor="middle" fontSize={22}>
              {emoji}
            </text>
          ) : (
            <ShadedRect x={6} y={6} width={28} height={28} rx={6} fill={C.corrugated} depth={4} />
          )}
        </FurnSvg>
      )
  }
}

export function InteriorRoomBackground({
  theme,
  style,
}: {
  theme: InteriorTheme
  style: InteriorStyle
  windowView?: WindowViewId
}) {
  const wallBase =
    style.wallpaperId === 'none'
      ? style.wallColor
      : getWallpaperColor(style, style.wallpaperId)
  const wallDark = adjustColor(wallBase, -12)
  const floorBase = getFloorColor(style, style.floorTypeId)
  const floorDark = adjustColor(floorBase, -18)
  const trim = style.trimColor ?? '#C4956A'
  const baseTrimProfile = style.baseTrimProfileId ?? 'standard'
  const useWallpaper = style.wallpaperId !== 'none'
  const useFloorPattern = style.floorTypeId !== 'paint'
  const showPerspectivePlanks =
    style.floorTypeId === 'hardwood' ||
    style.floorTypeId === 'wood-planks' ||
    style.floorTypeId === 'lvp'

  return (
    <>
      <TocaShadeDefs />
      <defs>
        <linearGradient id="room-wall" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={wallBase} />
          <stop offset="100%" stopColor={wallDark} />
        </linearGradient>
        <linearGradient id="room-floor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={floorBase} />
          <stop offset="100%" stopColor={floorDark} />
        </linearGradient>
        <WallpaperPatternDefs wallpaperId={style.wallpaperId} wallColor={wallBase} />
        <FloorPatternDefs floorTypeId={style.floorTypeId} floorColor={floorBase} />
      </defs>
      <rect
        x={0}
        y={0}
        width={640}
        height={200}
        fill={useWallpaper ? 'url(#interior-wallpaper)' : 'url(#room-wall)'}
      />
      <rect x={0} y={0} width={640} height={200} fill="url(#interior-wall-grad)" />
      <rect
        x={0}
        y={200}
        width={640}
        height={280}
        fill={useFloorPattern ? 'url(#interior-floor)' : 'url(#room-floor)'}
      />
      <rect x={0} y={200} width={640} height={280} fill="url(#interior-floor-grad)" />
      {showPerspectivePlanks &&
        Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={i * 72}
            y1={200}
            x2={i * 72 - 20}
            y2={480}
            stroke={adjustColor(floorBase, -28)}
            strokeWidth={2}
            opacity={0.35}
          />
        ))}
      <BaseTrimMolding profile={baseTrimProfile} trimColor={trim} />
      {theme === 'boat' && (
        <>
          <rect x={0} y={0} width={640} height={16} fill={trim} />
          <rect x={0} y={14} width={640} height={4} fill="#000000" opacity={0.12} />
        </>
      )}
      {theme === 'shop' && (
        <>
          <rect x={0} y={160} width={640} height={40} fill="#48B5B0" opacity={0.25} />
          <text x={320} y={188} textAnchor="middle" fontSize={18} fontWeight={700} fill="#2A9D8F">
            OPEN
          </text>
        </>
      )}
    </>
  )
}
