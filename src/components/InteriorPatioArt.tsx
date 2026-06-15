import {
  C,
  FurnSvg,
  GroundShadow,
  S,
  SW,
  ShadedRect,
  WoodGrainRect,
  WoodLegs,
  adjustColor,
} from './InteriorFurnitureShared'

export function PatioDiningTableArt() {
  return (
    <FurnSvg viewBox="0 0 88 58">
      <GroundShadow cx={44} cy={56} rx={36} ry={3} />
      <WoodLegs xs={[18, 66]} y={38} h={16} w={5} />
      <ShadedRect x={8} y={14} width={72} height={28} rx={14} fill={C.woodLight} depth={5} strokeWidth={SW} />
      <WoodGrainRect x={14} y={20} width={60} height={8} rx={3} fill={adjustColor(C.woodLight, -12)} />
      <ellipse cx={44} cy={28} rx={28} ry={10} fill={adjustColor(C.woodLight, 8)} stroke={S} strokeWidth={1.5} opacity={0.5} />
    </FurnSvg>
  )
}

export function PatioChairArt() {
  return (
    <FurnSvg viewBox="0 0 44 48">
      <GroundShadow cx={22} cy={46} rx={16} ry={2.5} />
      <path d="M 10 18 L 8 42 L 36 42 L 34 18 Z" fill={C.woodLight} stroke={S} strokeWidth={2} strokeLinejoin="round" />
      <path d="M 8 22 L 36 22 L 34 14 L 10 14 Z" fill={adjustColor(C.ocean, 15)} stroke={S} strokeWidth={1.8} />
      <rect x={10} y={14} width={24} height={6} rx={2} fill={adjustColor(C.ocean, 25)} stroke={S} strokeWidth={1.2} />
      <line x1={12} y1={28} x2={32} y2={28} stroke={S} strokeWidth={1} opacity={0.25} />
    </FurnSvg>
  )
}

export function PatioLoungeArt() {
  return (
    <FurnSvg viewBox="0 0 62 38">
      <GroundShadow cx={31} cy={36} rx={26} ry={2.5} />
      <ShadedRect x={4} y={16} width={54} height={14} rx={6} fill={C.fabric} depth={4} strokeWidth={SW} />
      <ShadedRect x={6} y={8} width={18} height={10} rx={5} fill={adjustColor(C.fabric, 10)} depth={3} strokeWidth={2} />
      <rect x={8} y={18} width={48} height={8} rx={3} fill={adjustColor(C.fabric, -8)} stroke={S} strokeWidth={1.2} />
      <WoodLegs xs={[10, 50]} y={28} h={8} w={4} />
    </FurnSvg>
  )
}

export function PatioSofaArt() {
  return (
    <FurnSvg viewBox="0 0 95 52">
      <GroundShadow cx={47} cy={50} rx={40} ry={3} />
      <WoodLegs xs={[12, 78]} y={42} h={8} w={4} />
      <ShadedRect x={6} y={24} width={83} height={18} rx={8} fill={C.fabric} depth={5} strokeWidth={SW} />
      <ShadedRect x={8} y={14} width={79} height={14} rx={7} fill={adjustColor(C.fabric, 12)} depth={4} strokeWidth={SW} />
      <rect x={10} y={16} width={22} height={10} rx={4} fill={C.ocean} stroke={S} strokeWidth={1.5} opacity={0.75} />
      <rect x={38} y={16} width={22} height={10} rx={4} fill={C.ocean} stroke={S} strokeWidth={1.5} opacity={0.75} />
      <rect x={66} y={16} width={18} height={10} rx={4} fill={C.ocean} stroke={S} strokeWidth={1.5} opacity={0.75} />
    </FurnSvg>
  )
}

export function PatioOttomanArt() {
  return (
    <FurnSvg viewBox="0 0 42 32">
      <GroundShadow cx={21} cy={30} rx={16} ry={2} />
      <ShadedRect x={4} y={8} width={34} height={18} rx={8} fill={C.fabric} depth={4} strokeWidth={SW} />
      <rect x={8} y={12} width={26} height={10} rx={4} fill={adjustColor(C.fabric, -10)} stroke={S} strokeWidth={1.2} />
    </FurnSvg>
  )
}

export function PatioUmbrellaArt() {
  return (
    <FurnSvg viewBox="0 0 72 65">
      <GroundShadow cx={36} cy={62} rx={14} ry={2} />
      <line x1={36} y1={28} x2={36} y2={58} stroke={C.woodDark} strokeWidth={3} strokeLinecap="round" />
      <path d="M 36 28 L 8 38 Q 36 8 64 38 Z" fill={C.tinRed} stroke={S} strokeWidth={2} strokeLinejoin="round" />
      <path d="M 36 28 L 14 36 Q 36 14 58 36 Z" fill={adjustColor(C.tinRed, 15)} opacity={0.85} />
      <ellipse cx={36} cy={58} rx={12} ry={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function PatioFirePitArt() {
  return (
    <FurnSvg viewBox="0 0 55 42">
      <GroundShadow cx={27} cy={40} rx={22} ry={2.5} />
      <ellipse cx={27} cy={28} rx={22} ry={10} fill={C.charcoal} stroke={S} strokeWidth={SW} />
      <ellipse cx={27} cy={24} rx={16} ry={7} fill={C.corrugated} stroke={S} strokeWidth={1.8} />
      <ellipse cx={27} cy={22} rx={10} ry={5} fill="#FF6B35" opacity={0.75} />
      <ellipse cx={24} cy={20} rx={4} ry={2} fill="#FFD54F" opacity={0.85} />
      <ellipse cx={30} cy={21} rx={3} ry={1.5} fill="#FFD54F" opacity={0.7} />
    </FurnSvg>
  )
}

export function PatioGrillArt() {
  return (
    <FurnSvg viewBox="0 0 52 55">
      <GroundShadow cx={26} cy={53} rx={20} ry={2.5} />
      <ShadedRect x={6} y={12} width={40} height={32} rx={5} fill={C.charcoal} depth={5} strokeWidth={SW} />
      <rect x={10} y={16} width={32} height={18} rx={3} fill={C.corrugated} stroke={S} strokeWidth={1.8} />
      {[18, 26, 34].map((y) => (
        <line key={y} x1={12} y1={y} x2={40} y2={y} stroke={S} strokeWidth={1} opacity={0.35} />
      ))}
      <rect x={8} y={44} width={8} height={8} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <rect x={36} y={44} width={8} height={8} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <circle cx={40} cy={8} r={3} fill={C.metal} stroke={S} strokeWidth={1.2} />
    </FurnSvg>
  )
}

export function PatioCoolerArt() {
  return (
    <FurnSvg viewBox="0 0 48 38">
      <GroundShadow cx={24} cy={36} rx={18} ry={2} />
      <ShadedRect x={4} y={8} width={40} height={26} rx={5} fill={C.ocean} depth={4} strokeWidth={SW} />
      <rect x={6} y={10} width={36} height={8} rx={3} fill={adjustColor(C.ocean, 15)} stroke={S} strokeWidth={1.5} />
      <rect x={18} y={6} width={12} height={6} rx={2} fill={C.metal} stroke={S} strokeWidth={1.2} />
      <line x1={8} y1={22} x2={40} y2={22} stroke="#FFFFFF" strokeWidth={1.5} opacity={0.35} />
    </FurnSvg>
  )
}

export function PatioPlanterArt() {
  return (
    <FurnSvg viewBox="0 0 48 38">
      <GroundShadow cx={24} cy={36} rx={18} ry={2} />
      <path d="M 8 16 L 10 34 L 38 34 L 40 16 Z" fill={C.terracotta} stroke={S} strokeWidth={2} />
      <rect x={6} y={12} width={36} height={8} rx={2} fill={adjustColor(C.terracotta, -10)} stroke={S} strokeWidth={1.5} />
      <ellipse cx={24} cy={10} rx={16} ry={6} fill={C.gumGreen} stroke={S} strokeWidth={1.5} />
      <circle cx={18} cy={6} r={5} fill={C.wattle} stroke={S} strokeWidth={1.2} />
      <circle cx={28} cy={5} r={4} fill={C.terracotta} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function PatioPlanterTallArt() {
  return (
    <FurnSvg viewBox="0 0 32 55">
      <GroundShadow cx={16} cy={53} rx={12} ry={2} />
      <path d="M 10 22 L 8 50 L 24 50 L 22 22 Z" fill={C.terracotta} stroke={S} strokeWidth={2} />
      <ellipse cx={16} cy={18} rx={12} ry={5} fill={C.gumGreen} stroke={S} strokeWidth={1.5} />
      <line x1={16} y1={4} x2={16} y2={14} stroke={C.gumGreen} strokeWidth={2.5} strokeLinecap="round" />
      <ellipse cx={16} cy={4} rx={8} ry={5} fill={C.eucalyptus} stroke={S} strokeWidth={1.2} />
    </FurnSvg>
  )
}

export function PatioHammockArt() {
  return (
    <FurnSvg viewBox="0 0 110 42">
      <rect x={4} y={4} width={6} height={34} rx={3} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={100} y={4} width={6} height={34} rx={3} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <path d="M 10 10 Q 55 28 100 10" fill="none" stroke={C.fabric} strokeWidth={3} />
      <path d="M 10 10 Q 55 32 100 10 L 100 22 Q 55 38 10 22 Z" fill={C.ocean} stroke={S} strokeWidth={1.8} opacity={0.85} />
      <line x1={10} y1={10} x2={10} y2={4} stroke={C.woodDark} strokeWidth={2} />
      <line x1={100} y1={10} x2={100} y2={4} stroke={C.woodDark} strokeWidth={2} />
    </FurnSvg>
  )
}

export function PatioSwingArt() {
  return (
    <FurnSvg viewBox="0 0 75 55">
      <GroundShadow cx={37} cy={52} rx={28} ry={2.5} />
      <rect x={8} y={4} width={4} height={38} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.2} />
      <rect x={63} y={4} width={4} height={38} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.2} />
      <rect x={8} y={4} width={59} height={5} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <line x1={20} y1={9} x2={20} y2={22} stroke={S} strokeWidth={1.5} />
      <line x1={55} y1={9} x2={55} y2={22} stroke={S} strokeWidth={1.5} />
      <ShadedRect x={14} y={22} width={47} height={22} rx={4} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <rect x={18} y={26} width={39} height={12} rx={3} fill={adjustColor(C.ocean, 10)} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function PatioSideTableArt() {
  return (
    <FurnSvg viewBox="0 0 38 38">
      <GroundShadow cx={19} cy={36} rx={14} ry={2} />
      <ShadedRect x={4} y={8} width={30} height={8} rx={4} fill={C.woodLight} depth={3} strokeWidth={SW} />
      <rect x={17} y={16} width={4} height={18} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function PatioRugArt() {
  return (
    <FurnSvg viewBox="0 0 100 58" stretch>
      <rect x={2} y={4} width={96} height={50} rx={8} fill={adjustColor(C.sand, -8)} stroke={S} strokeWidth={2} />
      {[20, 40, 60, 80].map((x) => (
        <line key={x} x1={x} y1={10} x2={x} y2={48} stroke={C.ochre} strokeWidth={1.5} opacity={0.35} />
      ))}
      {[18, 30, 42].map((y) => (
        <line key={y} x1={10} y1={y} x2={90} y2={y} stroke={C.ochre} strokeWidth={1} opacity={0.25} />
      ))}
    </FurnSvg>
  )
}

export function PatioStringLightsArt() {
  return (
    <FurnSvg viewBox="0 0 90 18" stretch>
      <path d="M 4 6 Q 22 12 45 6 Q 68 0 86 6" fill="none" stroke={S} strokeWidth={1.5} />
      {[12, 28, 45, 62, 78].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={6 + (i % 2) * 2} x2={x} y2={14} stroke={S} strokeWidth={1} />
          <circle cx={x} cy={15} r={3} fill="#FFF8DC" stroke={S} strokeWidth={1} opacity={0.9} />
        </g>
      ))}
    </FurnSvg>
  )
}

export function PatioLanternArt() {
  return (
    <FurnSvg viewBox="0 0 28 42">
      <GroundShadow cx={14} cy={40} rx={10} ry={1.5} />
      <rect x={8} y={32} width={12} height={8} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={6} y={10} width={16} height={22} rx={3} fill={C.glass} stroke={S} strokeWidth={2} opacity={0.65} />
      <rect x={8} y={4} width={12} height={8} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <ellipse cx={14} cy={20} rx={4} ry={6} fill="#FFD54F" opacity={0.55} />
    </FurnSvg>
  )
}

export function PatioFountainArt() {
  return (
    <FurnSvg viewBox="0 0 48 58">
      <GroundShadow cx={24} cy={56} rx={18} ry={2} />
      <ellipse cx={24} cy={48} rx={20} ry={8} fill={C.corrugated} stroke={S} strokeWidth={2} />
      <rect x={20} y={20} width={8} height={28} rx={3} fill={C.corrugated} stroke={S} strokeWidth={1.5} />
      <ellipse cx={24} cy={20} rx={14} ry={6} fill={C.corrugated} stroke={S} strokeWidth={1.8} />
      <path d="M 24 8 Q 28 14 24 18 Q 20 14 24 8" fill={C.ocean} stroke={S} strokeWidth={1.2} opacity={0.7} />
      <ellipse cx={24} cy={46} rx={16} ry={5} fill={C.ocean} opacity={0.45} />
    </FurnSvg>
  )
}

export function PatioBarCartArt() {
  return (
    <FurnSvg viewBox="0 0 45 52">
      <GroundShadow cx={22} cy={50} rx={16} ry={2} />
      <ShadedRect x={6} y={8} width={33} height={8} rx={3} fill={C.metal} depth={3} strokeWidth={SW} />
      <ShadedRect x={6} y={22} width={33} height={8} rx={3} fill={C.metal} depth={3} strokeWidth={SW} />
      <rect x={10} y={10} width={8} height={12} rx={2} fill={C.ocean} stroke={S} strokeWidth={1} opacity={0.7} />
      <circle cx={30} cy={14} r={4} fill={C.wattle} stroke={S} strokeWidth={1} />
      <circle cx={8} cy={38} r={4} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
      <circle cx={37} cy={38} r={4} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
      <line x1={8} y1={16} x2={8} y2={38} stroke={C.metal} strokeWidth={2} />
      <line x1={37} y1={16} x2={37} y2={38} stroke={C.metal} strokeWidth={2} />
    </FurnSvg>
  )
}

export function PatioTikiTorchArt() {
  return (
    <FurnSvg viewBox="0 0 22 55">
      <GroundShadow cx={11} cy={53} rx={8} ry={1.5} />
      <rect x={8} y={18} width={6} height={34} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <path d="M 6 18 L 16 18 L 14 8 L 8 8 Z" fill={C.terracotta} stroke={S} strokeWidth={1.8} />
      <ellipse cx={11} cy={6} rx={4} ry={5} fill="#FF6B35" opacity={0.8} />
      <ellipse cx={11} cy={5} rx={2} ry={3} fill="#FFD54F" opacity={0.85} />
    </FurnSvg>
  )
}

export function PatioPergolaArt() {
  return (
    <FurnSvg viewBox="0 0 120 72">
      <rect x={8} y={8} width={8} height={58} rx={3} fill={C.woodDark} stroke={S} strokeWidth={1.8} />
      <rect x={104} y={8} width={8} height={58} rx={3} fill={C.woodDark} stroke={S} strokeWidth={1.8} />
      <rect x={8} y={8} width={104} height={8} rx={3} fill={C.woodLight} stroke={S} strokeWidth={2} />
      {[24, 48, 72, 96].map((x) => (
        <line key={x} x1={x} y1={8} x2={x} y2={20} stroke={C.woodLight} strokeWidth={3} strokeLinecap="round" />
      ))}
      <path d="M 12 16 Q 40 28 60 18 Q 80 8 108 16" fill="none" stroke={C.gumGreen} strokeWidth={4} opacity={0.55} />
      <ellipse cx={35} cy={14} rx={12} ry={6} fill={C.eucalyptus} stroke={S} strokeWidth={1} opacity={0.65} />
      <ellipse cx={85} cy={12} rx={10} ry={5} fill={C.gumGreen} stroke={S} strokeWidth={1} opacity={0.65} />
    </FurnSvg>
  )
}

export function PatioBirdBathArt() {
  return (
    <FurnSvg viewBox="0 0 38 48">
      <GroundShadow cx={19} cy={46} rx={14} ry={2} />
      <rect x={16} y={22} width={6} height={22} rx={2} fill={C.corrugated} stroke={S} strokeWidth={1.5} />
      <ellipse cx={19} cy={22} rx={14} ry={5} fill={C.corrugated} stroke={S} strokeWidth={1.8} />
      <ellipse cx={19} cy={10} rx={12} ry={5} fill={C.glass} stroke={S} strokeWidth={2} opacity={0.55} />
      <ellipse cx={19} cy={9} rx={8} ry={3} fill={C.ocean} opacity={0.4} />
    </FurnSvg>
  )
}

export function PatioWindChimesArt() {
  return (
    <FurnSvg viewBox="0 0 24 38">
      <circle cx={12} cy={6} r={4} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <line x1={12} y1={10} x2={12} y2={14} stroke={S} strokeWidth={1.5} />
      <line x1={12} y1={14} x2={6} y2={32} stroke={C.metal} strokeWidth={1.5} />
      <line x1={12} y1={14} x2={12} y2={34} stroke={C.metal} strokeWidth={1.5} />
      <line x1={12} y1={14} x2={18} y2={30} stroke={C.metal} strokeWidth={1.5} />
      <circle cx={6} cy={33} r={2} fill={C.metal} stroke={S} strokeWidth={1} />
      <circle cx={12} cy={35} r={2} fill={C.metal} stroke={S} strokeWidth={1} />
      <circle cx={18} cy={31} r={2} fill={C.metal} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function PatioBenchArt() {
  return (
    <FurnSvg viewBox="0 0 78 42">
      <GroundShadow cx={39} cy={40} rx={32} ry={2.5} />
      <ShadedRect x={6} y={14} width={66} height={10} rx={4} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <WoodGrainRect x={10} y={16} width={58} height={4} rx={1} />
      <rect x={8} y={24} width={5} height={14} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={65} y={24} width={5} height={14} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      <rect x={36} y={24} width={5} height={14} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}
