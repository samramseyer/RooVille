import {
  C,
  FurnSvg,
  GroundShadow,
  S,
  SW,
  ShadedRect,
  WoodGrainRect,
  adjustColor,
} from './InteriorFurnitureShared'

export function ClawfootTubArt() {
  return (
    <FurnSvg viewBox="0 0 75 42">
      <GroundShadow cx={37} cy={40} rx={32} ry={3} />
      <ellipse cx={37} cy={22} rx={30} ry={14} fill={C.cream} stroke={S} strokeWidth={SW} />
      <ellipse cx={37} cy={20} rx={26} ry={11} fill={C.glass} stroke={S} strokeWidth={1.8} opacity={0.55} />
      {[14, 26, 48, 60].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={34} rx={4} ry={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
          <path d={`M ${x} 31 L ${x} 26`} stroke={C.metal} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}
      <rect x={32} y={6} width={10} height={8} rx={4} fill={C.metal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function AlcoveTubArt() {
  return (
    <FurnSvg viewBox="0 0 70 38">
      <GroundShadow cx={35} cy={36} rx={30} ry={3} />
      <ShadedRect x={4} y={8} width={62} height={24} rx={8} fill={C.cream} depth={5} strokeWidth={SW} />
      <rect x={8} y={12} width={54} height={16} rx={6} fill={C.glass} stroke={S} strokeWidth={1.8} opacity={0.5} />
      <rect x={4} y={8} width={8} height={24} rx={4} fill={adjustColor(C.cream, -10)} stroke={S} strokeWidth={1.5} />
      <rect x={58} y={8} width={8} height={24} rx={4} fill={adjustColor(C.cream, -10)} stroke={S} strokeWidth={1.5} />
      <circle cx={62} cy={16} r={2.5} fill={C.metal} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function TileShowerArt() {
  return (
    <FurnSvg viewBox="0 0 55 72">
      <ShadedRect x={4} y={4} width={47} height={64} rx={3} fill={adjustColor(C.ocean, 20)} depth={5} strokeWidth={SW} />
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={8 + col * 11}
            y={10 + row * 11}
            width={9}
            height={9}
            rx={1}
            fill={row % 2 === col % 2 ? '#E8E8E8' : '#D0D0D0'}
            stroke={S}
            strokeWidth={0.6}
            opacity={0.85}
          />
        )),
      )}
      <circle cx={27} cy={14} r={4} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <path d="M 27 18 L 27 28" stroke={C.metal} strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={27} cy={30} rx={5} ry={2} fill={C.metal} stroke={S} strokeWidth={1.2} />
      <rect x={6} y={62} width={43} height={4} rx={1} fill={C.charcoal} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function GlassShowerArt() {
  return (
    <FurnSvg viewBox="0 0 58 68">
      <rect x={4} y={4} width={50} height={60} rx={2} fill={C.glass} stroke={S} strokeWidth={2} opacity={0.35} />
      <line x1={4} y1={4} x2={54} y2={64} stroke={S} strokeWidth={1.5} opacity={0.25} />
      <rect x={4} y={4} width={6} height={60} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <circle cx={30} cy={12} r={3.5} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <path d="M 30 16 L 30 24" stroke={C.metal} strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={30} cy={26} rx={4} ry={1.8} fill={C.metal} stroke={S} strokeWidth={1} />
      <rect x={8} y={8} width={14} height={20} rx={2} fill="#FFFFFF" opacity={0.2} />
    </FurnSvg>
  )
}

export function JacuzziArt() {
  return (
    <FurnSvg viewBox="0 0 85 48">
      <GroundShadow cx={42} cy={46} rx={36} ry={3} />
      <ShadedRect x={6} y={10} width={73} height={30} rx={14} fill={C.cream} depth={6} strokeWidth={SW} />
      <ellipse cx={42} cy={24} rx={30} ry={12} fill={C.ocean} stroke={S} strokeWidth={2} opacity={0.65} />
      {[22, 42, 62].map((x) => (
        <circle key={x} cx={x} cy={28} r={2} fill="#FFFFFF" opacity={0.45} />
      ))}
      <rect x={38} y={4} width={10} height={8} rx={3} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function HotTubArt() {
  return (
    <FurnSvg viewBox="0 0 95 52">
      <GroundShadow cx={47} cy={50} rx={40} ry={3.5} />
      <ShadedRect x={5} y={12} width={85} height={32} rx={16} fill={adjustColor(C.corrugated, 10)} depth={6} strokeWidth={SW} />
      <WoodGrainRect x={10} y={16} width={75} height={6} rx={2} fill={C.woodDark} />
      <ellipse cx={47} cy={28} rx={34} ry={13} fill={C.oceanDark} stroke={S} strokeWidth={2} opacity={0.7} />
      {[25, 47, 69].map((x) => (
        <circle key={x} cx={x} cy={32} r={2.5} fill="#FFFFFF" opacity={0.4} />
      ))}
      <ellipse cx={47} cy={14} rx={8} ry={3} fill={C.charcoal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function ToiletArt() {
  return (
    <FurnSvg viewBox="0 0 38 48">
      <GroundShadow cx={19} cy={46} rx={14} ry={2.5} />
      <ellipse cx={19} cy={34} rx={14} ry={10} fill={C.cream} stroke={S} strokeWidth={SW} />
      <rect x={10} y={8} width={18} height={18} rx={4} fill={C.cream} stroke={S} strokeWidth={2} />
      <rect x={12} y={10} width={14} height={6} rx={2} fill={adjustColor(C.cream, -8)} stroke={S} strokeWidth={1.2} />
      <ellipse cx={19} cy={32} rx={10} ry={6} fill={C.glass} stroke={S} strokeWidth={1.5} opacity={0.4} />
    </FurnSvg>
  )
}

export function PedestalSinkArt() {
  return (
    <FurnSvg viewBox="0 0 42 55">
      <GroundShadow cx={21} cy={53} rx={12} ry={2.5} />
      <ellipse cx={21} cy={16} rx={16} ry={8} fill={C.cream} stroke={S} strokeWidth={SW} />
      <ellipse cx={21} cy={15} rx={12} ry={5} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <rect x={18} y={4} width={6} height={10} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <path d="M 21 24 L 21 42 Q 21 48 16 48 L 26 48 Q 21 48 21 42 Z" fill={C.cream} stroke={S} strokeWidth={2} />
    </FurnSvg>
  )
}

export function BidetArt() {
  return (
    <FurnSvg viewBox="0 0 36 42">
      <GroundShadow cx={18} cy={40} rx={12} ry={2.5} />
      <ellipse cx={18} cy={28} rx={13} ry={9} fill={C.cream} stroke={S} strokeWidth={SW} />
      <ellipse cx={18} cy={26} rx={8} ry={4} fill={C.glass} stroke={S} strokeWidth={1.5} opacity={0.45} />
      <rect x={14} y={6} width={8} height={10} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
    </FurnSvg>
  )
}

export function BathroomMirrorArt() {
  return (
    <FurnSvg viewBox="0 0 45 55">
      <ShadedRect x={4} y={4} width={37} height={47} rx={6} fill={C.woodLight} depth={4} strokeWidth={SW} />
      <rect x={8} y={8} width={29} height={39} rx={4} fill={C.glass} stroke={S} strokeWidth={2} />
      <rect x={10} y={10} width={10} height={14} rx={2} fill="#FFFFFF" opacity={0.35} />
      <circle cx={32} cy={42} r={3} fill={C.metal} stroke={S} strokeWidth={1.2} />
    </FurnSvg>
  )
}

export function BathroomMirrorRoundArt() {
  return (
    <FurnSvg viewBox="0 0 42 42">
      <circle cx={21} cy={21} r={18} fill={C.woodLight} stroke={S} strokeWidth={SW} />
      <circle cx={21} cy={21} r={14} fill={C.glass} stroke={S} strokeWidth={2} />
      <ellipse cx={16} cy={16} rx={5} ry={4} fill="#FFFFFF" opacity={0.3} />
    </FurnSvg>
  )
}

export function TowelRackArt() {
  return (
    <FurnSvg viewBox="0 0 48 38">
      <rect x={4} y={6} width={6} height={28} rx={3} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <rect x={38} y={6} width={6} height={28} rx={3} fill={C.metal} stroke={S} strokeWidth={1.8} />
      {[12, 22, 32].map((y) => (
        <rect key={y} x={8} y={y} width={32} height={5} rx={2.5} fill={C.metal} stroke={S} strokeWidth={1.5} />
      ))}
      <rect x={10} y={14} width={28} height={18} rx={3} fill={C.fabric} stroke={S} strokeWidth={1.5} opacity={0.85} />
      <line x1={12} y1={18} x2={36} y2={18} stroke={adjustColor(C.fabric, -15)} strokeWidth={1} opacity={0.5} />
      <line x1={12} y1={24} x2={36} y2={24} stroke={adjustColor(C.fabric, -15)} strokeWidth={1} opacity={0.5} />
    </FurnSvg>
  )
}

export function TowelBarArt() {
  return (
    <FurnSvg viewBox="0 0 52 12" stretch>
      <rect x={2} y={2} width={5} height={8} rx={2.5} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <rect x={45} y={2} width={5} height={8} rx={2.5} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <rect x={6} y={4} width={40} height={4} rx={2} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <rect x={14} y={5} width={24} height={8} rx={2} fill={C.ocean} stroke={S} strokeWidth={1.2} opacity={0.75} />
    </FurnSvg>
  )
}

export function HeatedTowelRailArt() {
  return (
    <FurnSvg viewBox="0 0 40 55">
      <rect x={6} y={4} width={28} height={47} rx={4} fill={C.metal} stroke={S} strokeWidth={2} />
      {[14, 22, 30].map((y) => (
        <g key={y}>
          <rect x={10} y={y} width={20} height={4} rx={2} fill={adjustColor(C.metal, 15)} stroke={S} strokeWidth={1.2} />
        </g>
      ))}
      <rect x={12} y={18} width={16} height={22} rx={2} fill={C.cream} stroke={S} strokeWidth={1.2} opacity={0.8} />
    </FurnSvg>
  )
}

export function TowelHookArt() {
  return (
    <FurnSvg viewBox="0 0 18 22">
      <circle cx={9} cy={5} r={4} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <path d="M 9 9 Q 14 12 14 18" fill="none" stroke={C.metal} strokeWidth={2.5} strokeLinecap="round" />
      <ellipse cx={14} cy={19} rx={3} ry={2} fill={C.ocean} stroke={S} strokeWidth={1.2} opacity={0.8} />
    </FurnSvg>
  )
}

export function BathMatArt() {
  return (
    <FurnSvg viewBox="0 0 55 28" stretch>
      <rect x={2} y={4} width={51} height={20} rx={6} fill={C.fabricDark} stroke={S} strokeWidth={2} />
      {[10, 20, 30, 40].map((x) => (
        <line key={x} x1={x} y1={8} x2={x} y2={20} stroke={adjustColor(C.fabricDark, 12)} strokeWidth={1.5} opacity={0.5} />
      ))}
    </FurnSvg>
  )
}

export function ToiletPaperHolderArt() {
  return (
    <FurnSvg viewBox="0 0 22 28">
      <rect x={4} y={4} width={14} height={8} rx={3} fill={C.metal} stroke={S} strokeWidth={1.8} />
      <circle cx={11} cy={18} r={6} fill={C.cream} stroke={S} strokeWidth={1.8} />
      <circle cx={11} cy={18} r={2} fill={adjustColor(C.cream, -10)} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function BathStoolArt() {
  return (
    <FurnSvg viewBox="0 0 35 32">
      <GroundShadow cx={17} cy={30} rx={14} ry={2} />
      <ShadedRect x={4} y={8} width={27} height={8} rx={4} fill={C.woodLight} depth={3} strokeWidth={SW} />
      <WoodGrainRect x={6} y={10} width={23} height={3} rx={1} />
      {[8, 27].map((x) => (
        <rect key={x} x={x} y={16} width={4} height={12} rx={2} fill={C.woodDark} stroke={S} strokeWidth={1.5} />
      ))}
    </FurnSvg>
  )
}

export function LaundryHamperArt() {
  return (
    <FurnSvg viewBox="0 0 38 48">
      <GroundShadow cx={19} cy={46} rx={14} ry={2.5} />
      <ShadedRect x={6} y={10} width={26} height={32} rx={6} fill={C.fabric} depth={4} strokeWidth={SW} />
      <ellipse cx={19} cy={10} rx={13} ry={4} fill={adjustColor(C.fabric, -10)} stroke={S} strokeWidth={1.8} />
      <line x1={10} y1={20} x2={28} y2={20} stroke={S} strokeWidth={1.2} opacity={0.3} />
      <line x1={10} y1={30} x2={28} y2={30} stroke={S} strokeWidth={1.2} opacity={0.3} />
    </FurnSvg>
  )
}

export function BathShelfArt() {
  return (
    <FurnSvg viewBox="0 0 42 22">
      <rect x={4} y={4} width={5} height={14} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <rect x={33} y={4} width={5} height={14} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <rect x={6} y={6} width={30} height={5} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <rect x={8} y={13} width={26} height={5} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <rect x={12} y={7} width={6} height={8} rx={2} fill={C.ocean} stroke={S} strokeWidth={1} opacity={0.7} />
      <rect x={22} y={7} width={5} height={6} rx={2} fill={C.cream} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}

export function SoapDispenserArt() {
  return (
    <FurnSvg viewBox="0 0 22 32">
      <GroundShadow cx={11} cy={30} rx={8} ry={1.5} />
      <rect x={6} y={14} width={10} height={14} rx={3} fill={C.glass} stroke={S} strokeWidth={1.8} opacity={0.75} />
      <rect x={7} y={18} width={8} height={6} rx={2} fill={C.ocean} opacity={0.55} />
      <rect x={8} y={6} width={6} height={10} rx={3} fill={C.metal} stroke={S} strokeWidth={1.5} />
      <circle cx={11} cy={5} r={2} fill={C.metal} stroke={S} strokeWidth={1} />
    </FurnSvg>
  )
}
