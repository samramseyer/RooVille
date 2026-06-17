import type { ComponentType } from 'react'
import {
  Branch,
  K_OUTLINE,
  KawaiiAnimalSvg,
  KawaiiBlush,
  KawaiiEyes,
  KawaiiFace,
  KawaiiSmile,
} from './zoo/kawaiiAnimalParts'

type ArtProps = { w: number; h: number }

function LionArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <circle cx={40} cy={34} r={18} fill="#FF9800" stroke={K_OUTLINE} strokeWidth={1.4} />
      <ellipse cx={40} cy={52} rx={14} ry={11} fill="#FFC107" stroke={K_OUTLINE} strokeWidth={1.4} />
      <circle cx={40} cy={32} r={13} fill="#FFC107" stroke={K_OUTLINE} strokeWidth={1.3} />
      <KawaiiFace cx={40} cy={31} spacing={4} />
      <ellipse cx={40} cy={28} rx={1.8} ry={1.2} fill="#FF8A65" />
      <ellipse cx={58} cy={54} rx={4} ry={3} fill="#FFC107" stroke={K_OUTLINE} strokeWidth={1} />
      <circle cx={60} cy={52} r={3} fill="#FF9800" stroke={K_OUTLINE} strokeWidth={0.8} />
    </KawaiiAnimalSvg>
  )
}

function ElephantArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={48} cy={54} rx={18} ry={12} fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.4} />
      <ellipse cx={30} cy={42} rx={16} ry={14} fill="#CFD8DC" stroke={K_OUTLINE} strokeWidth={1.4} />
      <ellipse cx={18} cy={40} rx={9} ry={11} fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={18} cy={40} rx={5} ry={7} fill="#FFCCBC" />
      <ellipse cx={42} cy={40} rx={9} ry={11} fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={42} cy={40} rx={5} ry={7} fill="#FFCCBC" />
      <path d="M 22 48 Q 12 58 16 68 Q 18 62 24 56" fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.2} />
      <KawaiiFace cx={30} cy={40} spacing={4} />
    </KawaiiAnimalSvg>
  )
}

function MonkeyArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <Branch x1={8} y1={18} x2={72} y2={22} />
      <ellipse cx={48} cy={30} rx={9} ry={11} fill="#6D4C41" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={48} cy={32} rx={6} ry={7} fill="#FFCCBC" />
      <ellipse cx={52} cy={42} rx={10} ry={9} fill="#6D4C41" stroke={K_OUTLINE} strokeWidth={1.2} />
      <path d="M 58 36 Q 68 28 66 48" stroke="#5D4037" strokeWidth={3} fill="none" strokeLinecap="round" />
      <KawaiiFace cx={48} cy={30} spacing={3.5} />
      <ellipse cx={40} cy={48} rx={4} ry={5} fill="#6D4C41" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={56} cy={48} rx={4} ry={5} fill="#6D4C41" stroke={K_OUTLINE} strokeWidth={1} />
    </KawaiiAnimalSvg>
  )
}

function GiraffeArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <rect x={34} y={28} width={12} height={34} rx={5} fill="#FFCA28" stroke={K_OUTLINE} strokeWidth={1.3} />
      {[
        [38, 36],
        [42, 44],
        [36, 50],
        [40, 56],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={2.5} ry={2} fill="#F57C00" />
      ))}
      <ellipse cx={40} cy={22} rx={10} ry={9} fill="#FFCA28" stroke={K_OUTLINE} strokeWidth={1.3} />
      <rect x={36} y={10} width={3} height={6} rx={1.5} fill="#FFCA28" stroke={K_OUTLINE} strokeWidth={0.8} />
      <rect x={41} y={10} width={3} height={6} rx={1.5} fill="#FFCA28" stroke={K_OUTLINE} strokeWidth={0.8} />
      <circle cx={37} cy={10} r={2} fill="#F57C00" stroke={K_OUTLINE} strokeWidth={0.7} />
      <circle cx={42} cy={10} r={2} fill="#F57C00" stroke={K_OUTLINE} strokeWidth={0.7} />
      <ellipse cx={40} cy={64} rx={12} ry={8} fill="#FFCA28" stroke={K_OUTLINE} strokeWidth={1.2} />
      <line x1={34} y1={62} x2={34} y2={72} stroke={K_OUTLINE} strokeWidth={2} />
      <line x1={46} y1={62} x2={46} y2={72} stroke={K_OUTLINE} strokeWidth={2} />
      <KawaiiFace cx={40} cy={22} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function FlamingoArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <line x1={40} y1={68} x2={40} y2={52} stroke="#F48FB1" strokeWidth={2.5} />
      <line x1={40} y1={68} x2={48} y2={72} stroke="#F48FB1" strokeWidth={2} />
      <path
        d="M 40 52 Q 46 38 40 24 Q 34 16 38 12"
        fill="none"
        stroke="#F06292"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <ellipse cx={38} cy={14} rx={8} ry={7} fill="#F06292" stroke={K_OUTLINE} strokeWidth={1.2} />
      <path d="M 44 14 L 52 13 L 46 17 Z" fill="#FF7043" stroke={K_OUTLINE} strokeWidth={0.8} />
      <KawaiiEyes cx={36} cy={13} spacing={3} />
      <KawaiiBlush cx={36} cy={13} spacing={3} />
    </KawaiiAnimalSvg>
  )
}

function SlothArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <Branch x1={6} y1={28} x2={74} y2={32} />
      <ellipse cx={44} cy={36} rx={16} ry={8} fill="#A1887F" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={28} cy={34} rx={9} ry={8} fill="#BCAAA4" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={28} cy={35} rx={6} ry={5} fill="#FFCCBC" />
      <ellipse cx={60} cy={36} rx={5} ry={4} fill="#A1887F" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={68} cy={36} rx={5} ry={4} fill="#A1887F" stroke={K_OUTLINE} strokeWidth={1} />
      <KawaiiFace cx={28} cy={33} spacing={3} />
    </KawaiiAnimalSvg>
  )
}

function PenguinArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={54} rx={13} ry={15} fill="#37474F" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={40} cy={56} rx={8} ry={11} fill="#FAFAFA" />
      <circle cx={40} cy={34} r={11} fill="#455A64" stroke={K_OUTLINE} strokeWidth={1.3} />
      <polygon points="37,36 43,36 40,40" fill="#FFB300" />
      <KawaiiEyes cx={40} cy={33} spacing={4} />
      <KawaiiBlush cx={40} cy={33} spacing={4} />
    </KawaiiAnimalSvg>
  )
}

function TigerArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={52} rx={15} ry={11} fill="#FF9800" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={40} cy={32} r={13} fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={1.3} />
      {[-8, -2, 4, 10].map((dx) => (
        <line key={dx} x1={40 + dx} y1={26} x2={40 + dx + 1} y2={34} stroke={K_OUTLINE} strokeWidth={1.8} />
      ))}
      <KawaiiFace cx={40} cy={31} spacing={4} />
      <path d="M 28 24 L 30 18 L 34 23 Z" fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={0.8} />
      <path d="M 52 24 L 50 18 L 46 23 Z" fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={0.8} />
    </KawaiiAnimalSvg>
  )
}

function ZebraArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={44} cy={52} rx={17} ry={10} fill="#FAFAFA" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={28} cy={40} rx={12} ry={10} fill="#FAFAFA" stroke={K_OUTLINE} strokeWidth={1.3} />
      {[32, 38, 44, 50, 56].map((x) => (
        <rect key={x} x={x} y={44} width={3} height={14} fill="#424242" rx={1} />
      ))}
      {[30, 36, 42].map((x) => (
        <rect key={`h-${x}`} x={x} y={34} width={2.5} height={8} fill="#424242" rx={1} />
      ))}
      <KawaiiFace cx={28} cy={39} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function SnakeArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <path
        d="M 18 58 Q 28 44 38 50 Q 48 56 58 40 Q 62 32 54 24"
        fill="none"
        stroke="#66BB6A"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <path
        d="M 18 58 Q 28 44 38 50 Q 48 56 58 40 Q 62 32 54 24"
        fill="none"
        stroke={K_OUTLINE}
        strokeWidth={1.2}
      />
      <circle cx={52} cy={26} r={7} fill="#81C784" stroke={K_OUTLINE} strokeWidth={1.2} />
      <KawaiiEyes cx={50} cy={25} spacing={2.5} />
      <KawaiiSmile cx={50} cy={28} />
    </KawaiiAnimalSvg>
  )
}

function shellSpots() {
  return (
    <>
      {[
        [34, 42],
        [40, 38],
        [46, 42],
        [40, 48],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} fill="#558B2F" opacity={0.55} />
      ))}
    </>
  )
}

function TurtleArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={46} rx={18} ry={13} fill="#689F38" stroke={K_OUTLINE} strokeWidth={1.3} />
      {shellSpots()}
      <ellipse cx={24} cy={48} rx={5} ry={4} fill="#8BC34A" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={56} cy={48} rx={5} ry={4} fill="#8BC34A" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={40} cy={58} rx={6} ry={4} fill="#8BC34A" stroke={K_OUTLINE} strokeWidth={1} />
      <circle cx={40} cy={32} r={8} fill="#8BC34A" stroke={K_OUTLINE} strokeWidth={1.2} />
      <KawaiiFace cx={40} cy={31} spacing={3} />
    </KawaiiAnimalSvg>
  )
}

function BearArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={54} rx={15} ry={11} fill="#8D6E63" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={40} cy={34} r={13} fill="#A1887F" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={28} cy={24} r={5} fill="#8D6E63" stroke={K_OUTLINE} strokeWidth={1} />
      <circle cx={52} cy={24} r={5} fill="#8D6E63" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={40} cy={37} rx={5} ry={4} fill="#FFCCBC" />
      <KawaiiEyes cx={40} cy={33} spacing={4} />
      <ellipse cx={40} cy={38} rx={2.5} ry={2} fill="#5D4037" />
    </KawaiiAnimalSvg>
  )
}

function MeerkatArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={58} rx={8} ry={10} fill="#BCAAA4" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={40} cy={38} rx={10} ry={11} fill="#D7CCC8" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={32} cy={26} rx={3} ry={6} fill="#BCAAA4" stroke={K_OUTLINE} strokeWidth={0.9} />
      <ellipse cx={48} cy={26} rx={3} ry={6} fill="#BCAAA4" stroke={K_OUTLINE} strokeWidth={0.9} />
      <KawaiiFace cx={40} cy={37} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function PandaArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={54} rx={14} ry={10} fill="#FAFAFA" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={40} cy={34} r={12} fill="#FFFFFF" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={34} cy={32} rx={3.5} ry={4} fill="#212121" />
      <ellipse cx={46} cy={32} rx={3.5} ry={4} fill="#212121" />
      <circle cx={28} cy={24} r={4.5} fill="#212121" />
      <circle cx={52} cy={24} r={4.5} fill="#212121" />
      <ellipse cx={40} cy={38} rx={3} ry={2.2} fill="#212121" />
      <KawaiiBlush cx={40} cy={34} spacing={4} />
    </KawaiiAnimalSvg>
  )
}

function HippoArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={44} cy={52} rx={18} ry={12} fill="#90A4AE" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={28} cy={40} rx={14} ry={12} fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={22} cy={42} rx={4} ry={3} fill="#FFCCBC" />
      <ellipse cx={34} cy={42} rx={4} ry={3} fill="#FFCCBC" />
      <KawaiiEyes cx={28} cy={38} spacing={4} />
      <KawaiiBlush cx={28} cy={38} spacing={4} />
      <path d="M 24 44 Q 28 46 32 44" fill="none" stroke={K_OUTLINE} strokeWidth={0.9} />
    </KawaiiAnimalSvg>
  )
}

function GorillaArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={50} rx={16} ry={10} fill="#424242" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={40} cy={32} r={12} fill="#616161" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={40} cy={36} rx={7} ry={5} fill="#757575" />
      <ellipse cx={24} cy={54} rx={5} ry={7} fill="#424242" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={56} cy={54} rx={5} ry={7} fill="#424242" stroke={K_OUTLINE} strokeWidth={1} />
      <KawaiiFace cx={40} cy={31} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function ParrotArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={42} cy={48} rx={12} ry={10} fill="#43A047" stroke={K_OUTLINE} strokeWidth={1.2} />
      <circle cx={36} cy={32} r={10} fill="#E53935" stroke={K_OUTLINE} strokeWidth={1.2} />
      <polygon points="32,32 28,34 32,36" fill="#FFB300" />
      <path d="M 50 44 L 58 40 L 52 48 Z" fill="#2E7D32" stroke={K_OUTLINE} strokeWidth={0.8} />
      <KawaiiEyes cx={36} cy={31} spacing={3} />
      <KawaiiBlush cx={36} cy={31} spacing={3} />
    </KawaiiAnimalSvg>
  )
}

function KangarooArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={52} rx={12} ry={10} fill="#FFCC80" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={38} cy={34} rx={10} ry={10} fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={32} cy={22} rx={4} ry={9} fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={44} cy={22} rx={4} ry={9} fill="#FFB74D" stroke={K_OUTLINE} strokeWidth={1} />
      <ellipse cx={56} cy={50} rx={5} ry={8} fill="#FFCC80" stroke={K_OUTLINE} strokeWidth={1} />
      <KawaiiFace cx={38} cy={33} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function RhinoArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={44} cy={52} rx={17} ry={11} fill="#90A4AE" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={28} cy={40} rx={13} ry={11} fill="#B0BEC5" stroke={K_OUTLINE} strokeWidth={1.3} />
      <polygon points="16,38 12,42 18,44" fill="#CFD8DC" stroke={K_OUTLINE} strokeWidth={0.8} />
      <polygon points="20,36 17,40 22,41" fill="#ECEFF1" stroke={K_OUTLINE} strokeWidth={0.7} />
      <KawaiiFace cx={28} cy={39} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function CrocodileArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={44} cy={48} rx={22} ry={9} fill="#66BB6A" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={22} cy={44} rx={12} ry={8} fill="#81C784" stroke={K_OUTLINE} strokeWidth={1.2} />
      <polygon points="14,42 8,44 14,46" fill="#FFB300" />
      {[30, 38, 46, 54].map((x) => (
        <circle key={x} cx={x} cy={42} r={2} fill="#388E3C" />
      ))}
      <KawaiiEyes cx={20} cy={42} spacing={3} />
      <KawaiiSmile cx={20} cy={45} />
    </KawaiiAnimalSvg>
  )
}

function OwlArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={46} rx={16} ry={18} fill="#8D6E63" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={32} cy={42} r={6} fill="#FFECB3" stroke={K_OUTLINE} strokeWidth={1} />
      <circle cx={48} cy={42} r={6} fill="#FFECB3" stroke={K_OUTLINE} strokeWidth={1} />
      <circle cx={32} cy={42} r={2.5} fill="#1a1a1a" />
      <circle cx={48} cy={42} r={2.5} fill="#1a1a1a" />
      <polygon points="40,48 36,54 44,54" fill="#FFB300" stroke={K_OUTLINE} strokeWidth={0.8} />
    </KawaiiAnimalSvg>
  )
}

function PeacockArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={48} cy={50} rx={8} ry={10} fill="#00897B" stroke={K_OUTLINE} strokeWidth={1.2} />
      <circle cx={36} cy={34} r={9} fill="#00695C" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={22} cy={38} rx={14} ry={16} fill="#26A69A" stroke={K_OUTLINE} strokeWidth={1.2} opacity={0.9} />
      {[18, 24, 30].map((y) => (
        <circle key={y} cx={20} cy={y} r={2} fill="#004D40" opacity={0.5} />
      ))}
      <polygon points="32,34 28,36 32,38" fill="#FFB300" />
      <KawaiiEyes cx={36} cy={33} spacing={3} />
    </KawaiiAnimalSvg>
  )
}

function SealArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={50} rx={17} ry={10} fill="#78909C" stroke={K_OUTLINE} strokeWidth={1.3} />
      <circle cx={26} cy={38} r={10} fill="#90A4AE" stroke={K_OUTLINE} strokeWidth={1.2} />
      <circle cx={22} cy={36} r={2} fill="#1a1a1a" />
      <ellipse cx={18} cy={38} rx={2} ry={1.2} fill="#1a1a1a" />
      <KawaiiBlush cx={26} cy={38} spacing={3} />
      <path d="M 20 40 Q 24 42 28 40" fill="none" stroke={K_OUTLINE} strokeWidth={0.8} />
    </KawaiiAnimalSvg>
  )
}

function DolphinArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={44} rx={22} ry={10} fill="#42A5F5" stroke={K_OUTLINE} strokeWidth={1.3} />
      <ellipse cx={22} cy={42} rx={8} ry={7} fill="#64B5F6" stroke={K_OUTLINE} strokeWidth={1.2} />
      <polygon points="58,40 66,34 60,46" fill="#1E88E5" stroke={K_OUTLINE} strokeWidth={0.8} />
      <KawaiiEyes cx={24} cy={41} spacing={3} />
      <KawaiiSmile cx={24} cy={44} />
    </KawaiiAnimalSvg>
  )
}

function RedPandaArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={52} rx={12} ry={9} fill="#E64A19" stroke={K_OUTLINE} strokeWidth={1.2} />
      <circle cx={40} cy={34} r={11} fill="#FF7043" stroke={K_OUTLINE} strokeWidth={1.2} />
      <ellipse cx={30} cy={24} rx={4} ry={5} fill="#BF360C" stroke={K_OUTLINE} strokeWidth={0.9} />
      <ellipse cx={50} cy={24} rx={4} ry={5} fill="#BF360C" stroke={K_OUTLINE} strokeWidth={0.9} />
      <path d="M 58 38 Q 68 30 66 48" stroke="#BF360C" strokeWidth={4} fill="none" strokeLinecap="round" />
      <KawaiiFace cx={40} cy={33} spacing={3.5} />
    </KawaiiAnimalSvg>
  )
}

function AxolotlArt({ w, h }: ArtProps) {
  return (
    <KawaiiAnimalSvg w={w} h={h}>
      <ellipse cx={40} cy={50} rx={14} ry={10} fill="#80DEEA" stroke={K_OUTLINE} strokeWidth={1.2} />
      <circle cx={40} cy={32} r={12} fill="#B2EBF2" stroke={K_OUTLINE} strokeWidth={1.2} />
      {[-1, 1].map((s) =>
        [0, 1, 2].map((i) => (
          <ellipse
            key={`${s}-${i}`}
            cx={40 + s * 14}
            cy={28 + i * 4}
            rx={3}
            ry={5}
            fill="#4DD0E1"
            stroke={K_OUTLINE}
            strokeWidth={0.7}
          />
        )),
      )}
      <ellipse cx={40} cy={58} rx={10} ry={5} fill="#4DD0E1" stroke={K_OUTLINE} strokeWidth={1} />
      <KawaiiFace cx={40} cy={31} spacing={4} />
    </KawaiiAnimalSvg>
  )
}

const ANIMAL_RENDERERS: Record<string, ComponentType<ArtProps>> = {
  'animal-lion': LionArt,
  'animal-monkey': MonkeyArt,
  'animal-axolotl': AxolotlArt,
  'animal-elephant': ElephantArt,
  'animal-giraffe': GiraffeArt,
  'animal-penguin': PenguinArt,
  'animal-tiger': TigerArt,
  'animal-zebra': ZebraArt,
  'animal-flamingo': FlamingoArt,
  'animal-snake': SnakeArt,
  'animal-turtle': TurtleArt,
  'animal-bear': BearArt,
  'animal-meerkat': MeerkatArt,
  'animal-panda': PandaArt,
  'animal-hippo': HippoArt,
  'animal-gorilla': GorillaArt,
  'animal-parrot': ParrotArt,
  'animal-kangaroo': KangarooArt,
  'animal-rhino': RhinoArt,
  'animal-crocodile': CrocodileArt,
  'animal-owl': OwlArt,
  'animal-peacock': PeacockArt,
  'animal-sloth': SlothArt,
  'animal-seal': SealArt,
  'animal-dolphin': DolphinArt,
  'animal-red-panda': RedPandaArt,
}

export function renderZooAnimalArt(id: string, width = 52, height = 52) {
  const Render = ANIMAL_RENDERERS[id]
  if (!Render) return null
  return <Render w={width} h={height} />
}
