import {
  C,
  Cushion,
  DrawerFront,
  FurnSvg,
  GroundShadow,
  S,
  SW,
  ShadedRect,
  WoodGrainRect,
  WoodLegs,
  adjustColor,
} from './InteriorFurnitureShared'

export function SectionalArt() {
  return (
    <FurnSvg viewBox="0 0 110 55">
      <GroundShadow cx={55} cy={53} rx={48} ry={4} />
      <WoodLegs xs={[12, 98]} y={46} h={7} />
      <ShadedRect x={4} y={28} width={102} height={18} rx={8} fill={C.fabricDark} depth={5} strokeWidth={SW} />
      <ShadedRect x={6} y={18} width={58} height={14} rx={7} fill={C.fabric} depth={4} strokeWidth={SW} />
      <ShadedRect x={62} y={22} width={42} height={14} rx={7} fill={adjustColor(C.fabric, 8)} depth={4} strokeWidth={SW} />
      <ShadedRect x={6} y={8} width={58} height={14} rx={8} fill={adjustColor(C.fabric, 14)} depth={4} strokeWidth={SW} />
      <ShadedRect x={62} y={10} width={42} height={14} rx={8} fill={adjustColor(C.fabric, 10)} depth={4} strokeWidth={SW} />
      <rect x={4} y={14} width={8} height={24} rx={4} fill={C.fabricDark} stroke={S} strokeWidth={2} />
      <Cushion x={12} y={20} w={22} h={10} fill={C.cream} />
      <Cushion x={68} y={24} w={18} h={9} fill={C.wattle} />
    </FurnSvg>
  )
}

export function OttomanArt() {
  return (
    <FurnSvg viewBox="0 0 45 38">
      <GroundShadow cx={22} cy={36} rx={18} ry={3} />
      <WoodLegs xs={[10, 35]} y={30} h={6} w={4} />
      <ShadedRect x={4} y={14} width={37} height={18} rx={9} fill={C.terracotta} depth={5} strokeWidth={SW} />
      <ellipse cx={22} cy={16} rx={16} ry={8} fill={adjustColor(C.terracotta, 12)} stroke={S} strokeWidth={1.8} />
    </FurnSvg>
  )
}

export function NightstandArt() {
  return (
    <FurnSvg viewBox="0 0 42 48">
      <GroundShadow cx={21} cy={46} rx={16} ry={3} />
      <ShadedRect x={4} y={8} width={34} height={36} rx={4} fill={C.wood} depth={5} strokeWidth={SW} />
      <WoodGrainRect x={6} y={10} width={30} height={6} rx={2} />
      <DrawerFront x={8} y={20} w={26} h={10} knobX={28} />
      <DrawerFront x={8} y={32} w={26} h={10} knobX={28} />
    </FurnSvg>
  )
}

export function DresserArt() {
  return (
    <FurnSvg viewBox="0 0 75 55">
      <GroundShadow cx={37} cy={53} rx={30} ry={3} />
      <ShadedRect x={4} y={10} width={67} height={40} rx={5} fill={C.wood} depth={6} strokeWidth={SW} />
      <WoodGrainRect x={6} y={12} width={63} height={8} rx={2} />
      {[22, 34, 46].map((y) => (
        <DrawerFront key={y} x={8} y={y} w={59} h={9} knobX={62} />
      ))}
    </FurnSvg>
  )
}

export function DiningTableArt() {
  return (
    <FurnSvg viewBox="0 0 85 55">
      <GroundShadow cx={42} cy={53} rx={36} ry={3} />
      <WoodGrainRect x={8} y={8} width={69} height={14} rx={4} fill={C.woodLight} />
      <WoodLegs xs={[18, 42, 67]} y={24} h={26} w={5} />
    </FurnSvg>
  )
}

export function DiningChairArt() {
  return (
    <FurnSvg viewBox="0 0 38 52">
      <GroundShadow cx={19} cy={50} rx={14} ry={2.5} />
      <WoodLegs xs={[8, 30]} y={38} h={12} w={4} />
      <ShadedRect x={6} y={24} width={26} height={14} rx={3} fill={C.woodLight} depth={3} strokeWidth={2} />
      <ShadedRect x={8} y={6} width={22} height={18} rx={6} fill={C.fabric} depth={4} strokeWidth={SW} />
      <rect x={6} y={18} width={4} height={22} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={28} y={18} width={4} height={22} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function CoffeeTableArt() {
  return (
    <FurnSvg viewBox="0 0 72 42">
      <GroundShadow cx={36} cy={40} rx={30} ry={3} />
      <ShadedRect x={6} y={10} width={60} height={12} rx={4} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <WoodLegs xs={[14, 58]} y={22} h={16} />
    </FurnSvg>
  )
}

export function DeskArt() {
  return (
    <FurnSvg viewBox="0 0 80 52">
      <GroundShadow cx={40} cy={50} rx={32} ry={3} />
      <ShadedRect x={4} y={14} width={72} height={10} rx={3} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <WoodLegs xs={[10, 70]} y={24} h={24} />
      <rect x={44} y={10} width={22} height={14} rx={2} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
      <rect x={46} y={12} width={18} height={10} rx={1} fill={C.ocean} opacity={0.7} />
    </FurnSvg>
  )
}

export function BenchArt() {
  return (
    <FurnSvg viewBox="0 0 70 38">
      <GroundShadow cx={35} cy={36} rx={30} ry={3} />
      <WoodLegs xs={[10, 60]} y={28} h={8} />
      <WoodGrainRect x={4} y={12} width={62} height={16} rx={4} />
    </FurnSvg>
  )
}

export function DeskLampArt() {
  return (
    <FurnSvg viewBox="0 0 28 38">
      <GroundShadow cx={14} cy={36} rx={10} ry={2} />
      <ellipse cx={14} cy={34} rx={9} ry={3} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <rect x={12} y={18} width={4} height={16} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <path d="M 4 18 L 14 6 L 24 18 Z" fill={C.wattle} stroke={S} strokeWidth={2} />
    </FurnSvg>
  )
}

export function ShelfArt() {
  return (
    <FurnSvg viewBox="0 0 55 28">
      <ShadedRect x={4} y={4} width={47} height={6} rx={2} fill={C.woodLight} depth={3} strokeWidth={2} />
      <ShadedRect x={4} y={16} width={47} height={6} rx={2} fill={C.woodLight} depth={3} strokeWidth={2} />
      <rect x={2} y={6} width={4} height={16} rx={1} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={49} y={6} width={4} height={16} rx={1} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function MirrorArt() {
  return (
    <FurnSvg viewBox="0 0 45 55">
      <ShadedRect x={4} y={4} width={37} height={47} rx={6} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <rect x={8} y={8} width={29} height={39} rx={4} fill={C.glass} stroke={S} strokeWidth={2} />
      <rect x={10} y={10} width={10} height={14} rx={2} fill="#FFFFFF" opacity={0.35} />
    </FurnSvg>
  )
}

export function ClockArt() {
  return (
    <FurnSvg viewBox="0 0 38 38">
      <circle cx={19} cy={19} r={16} fill={C.cream} stroke={S} strokeWidth={2.5} />
      <circle cx={19} cy={19} r={13} fill={C.weatherboard} stroke={S} strokeWidth={1.5} />
      <line x1={19} y1={19} x2={19} y2={10} stroke={S} strokeWidth={2} strokeLinecap="round" />
      <line x1={19} y1={19} x2={26} y2={19} stroke={S} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={19} cy={19} r={2} fill={C.tinRed} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function StoveArt() {
  return (
    <FurnSvg viewBox="0 0 50 55">
      <GroundShadow cx={25} cy={53} rx={20} ry={3} />
      <ShadedRect x={4} y={8} width={42} height={42} rx={4} fill={C.charcoal} depth={5} strokeWidth={SW} />
      {[14, 25, 36].map((x) => (
        <circle key={x} cx={x} cy={17} r={4} fill={C.metal} stroke={S} strokeWidth={1.5} />
      ))}
      <rect x={8} y={28} width={34} height={20} rx={2} fill={C.corrugated} stroke={S} strokeWidth={1.8} />
    </FurnSvg>
  )
}

export function SinkArt() {
  return (
    <FurnSvg viewBox="0 0 55 48">
      <GroundShadow cx={27} cy={46} rx={22} ry={3} />
      <ShadedRect x={4} y={14} width={47} height={28} rx={4} fill={C.weatherboard} depth={4} strokeWidth={SW} />
      <ellipse cx={27} cy={28} rx={18} ry={10} fill={C.metal} stroke={S} strokeWidth={2} />
      <rect x={24} y={4} width={6} height={14} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function MicrowaveArt() {
  return (
    <FurnSvg viewBox="0 0 48 32">
      <GroundShadow cx={24} cy={30} rx={20} ry={2} />
      <ShadedRect x={3} y={4} width={42} height={24} rx={4} fill={C.cream} depth={4} strokeWidth={SW} />
      <rect x={6} y={8} width={24} height={16} rx={2} fill={C.glass} stroke={S} strokeWidth={1.5} opacity={0.7} />
    </FurnSvg>
  )
}

export function LaundryArt() {
  return (
    <FurnSvg viewBox="0 0 40 45">
      <GroundShadow cx={20} cy={43} rx={14} ry={2.5} />
      <path d="M 8 18 L 10 40 L 30 40 L 32 18 Z" fill={C.cream} stroke={S} strokeWidth={2} strokeLinejoin="round" />
      <ellipse cx={20} cy={18} rx={12} ry={4} fill={C.weatherboard} stroke={S} strokeWidth={1.8} />
    </FurnSvg>
  )
}

export function SurfboardArt() {
  return (
    <FurnSvg viewBox="0 0 28 85">
      <GroundShadow cx={14} cy={82} rx={10} ry={2} />
      <ellipse cx={14} cy={42} rx={11} ry={38} fill={C.ocean} stroke={S} strokeWidth={2.5} />
      <path d="M 14 8 Q 18 42 14 76" fill="none" stroke={C.wattle} strokeWidth={2} opacity={0.7} />
    </FurnSvg>
  )
}
