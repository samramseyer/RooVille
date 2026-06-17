import type { ComponentType, ReactNode } from 'react'
import { GroundShadow, ShadedEllipse, adjustColor } from './toca/tocaShading'

const S = '#4E342E'

function AnimalSvg({ children, w, h }: { children: ReactNode; w: number; h: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
      <GroundShadow cx={w / 2} cy={h - 4} rx={w * 0.28} ry={4} />
      {children}
    </svg>
  )
}

function LionArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const cy = h * 0.55
  return (
    <AnimalSvg w={w} h={h}>
      <circle cx={cx} cy={cy - 8} r={16} fill="#F9A825" stroke={S} strokeWidth={1.5} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <ellipse
            key={deg}
            cx={cx + Math.cos(rad) * 18}
            cy={cy - 8 + Math.sin(rad) * 18}
            rx={5}
            ry={8}
            fill="#FFB300"
            stroke={S}
            strokeWidth={0.8}
          />
        )
      })}
      <circle cx={cx - 5} cy={cy - 10} r={2.5} fill={S} />
      <circle cx={cx + 5} cy={cy - 10} r={2.5} fill={S} />
      <ellipse cx={cx} cy={cy + 10} rx={12} ry={10} fill="#FFB300" stroke={S} strokeWidth={1.2} />
    </AnimalSvg>
  )
}

function MonkeyArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={14} ry={12} fill="#8D6E63" stroke={S} strokeWidth={1.3} />
      <circle cx={cx} cy={h * 0.38} r={13} fill="#A1887F" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx - 10} cy={h * 0.32} rx={4} ry={7} fill="#8D6E63" stroke={S} strokeWidth={1} />
      <ellipse cx={cx + 10} cy={h * 0.32} rx={4} ry={7} fill="#8D6E63" stroke={S} strokeWidth={1} />
      <circle cx={cx - 4} cy={h * 0.36} r={2} fill={S} />
      <circle cx={cx + 4} cy={h * 0.36} r={2} fill={S} />
      <path d={`M ${cx - 16} ${h * 0.55} Q ${cx - 28} ${h * 0.2} ${cx - 8} ${h * 0.42}`} stroke="#6D4C41" strokeWidth={3} fill="none" />
    </AnimalSvg>
  )
}

function AxolotlArt({ w, h }: { w: number; h: number }) {
  return (
    <AnimalSvg w={w} h={h}>
      <image href="/axolotl-companion.png" x={w * 0.08} y={h * 0.05} width={w * 0.84} height={h * 0.88} preserveAspectRatio="xMidYMid meet" />
    </AnimalSvg>
  )
}

function ElephantArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.62} rx={18} ry={12} fill="#B0BEC5" stroke={S} strokeWidth={1.4} />
      <ellipse cx={cx - 10} cy={h * 0.42} rx={14} ry={12} fill="#CFD8DC" stroke={S} strokeWidth={1.4} />
      <path d={`M ${cx - 18} ${h * 0.48} Q ${cx - 28} ${h * 0.72} ${cx - 14} ${h * 0.68}`} stroke="#90A4AE" strokeWidth={5} fill="none" />
      <ellipse cx={cx - 16} cy={h * 0.38} rx={5} ry={7} fill="#CFD8DC" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function GiraffeArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <rect x={cx - 4} y={h * 0.18} width={8} height={h * 0.48} rx={3} fill="#FFD54F" stroke={S} strokeWidth={1.2} />
      <ellipse cx={cx} cy={h * 0.68} rx={12} ry={8} fill="#FFCA28" stroke={S} strokeWidth={1.2} />
      <circle cx={cx} cy={h * 0.16} r={9} fill="#FFCA28" stroke={S} strokeWidth={1.2} />
      {[0.3, 0.45, 0.58].map((f) => (
        <circle key={f} cx={cx + 3} cy={h * f} r={2.5} fill="#F57F17" opacity={0.7} />
      ))}
    </AnimalSvg>
  )
}

function PenguinArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={12} ry={16} fill="#263238" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx} cy={h * 0.6} rx={7} ry={11} fill="#FFFFFF" />
      <circle cx={cx} cy={h * 0.38} r={10} fill="#37474F" stroke={S} strokeWidth={1.2} />
      <polygon points={`${cx - 3},${h * 0.4} ${cx + 3},${h * 0.4} ${cx},${h * 0.48}`} fill="#FFB300" />
    </AnimalSvg>
  )
}

function TigerArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={16} ry={11} fill="#FF9800" stroke={S} strokeWidth={1.3} />
      <circle cx={cx - 8} cy={h * 0.42} r={9} fill="#FFB74D" stroke={S} strokeWidth={1.2} />
      {[-6, 0, 6].map((dx) => (
        <line key={dx} x1={cx + dx - 8} y1={h * 0.38} x2={cx + dx - 6} y2={h * 0.48} stroke={S} strokeWidth={1.5} />
      ))}
    </AnimalSvg>
  )
}

function ZebraArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={16} ry={10} fill="#FFFFFF" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx - 10} cy={h * 0.44} rx={8} ry={7} fill="#FAFAFA" stroke={S} strokeWidth={1.2} />
      {[-4, 2, 8].map((dx) => (
        <line key={dx} x1={cx + dx} y1={h * 0.48} x2={cx + dx} y2={h * 0.66} stroke={S} strokeWidth={2} />
      ))}
    </AnimalSvg>
  )
}

function FlamingoArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <line x1={cx} y1={h * 0.72} x2={cx} y2={h * 0.42} stroke="#F48FB1" strokeWidth={3} />
      <ellipse cx={cx} cy={h * 0.36} rx={10} ry={8} fill="#F06292" stroke={S} strokeWidth={1.2} />
      <path d={`M ${cx + 8} ${h * 0.36} L ${cx + 18} ${h * 0.34} L ${cx + 8} ${h * 0.4} Z`} fill="#FF7043" />
    </AnimalSvg>
  )
}

function SnakeArt({ w, h }: { w: number; h: number }) {
  return (
    <AnimalSvg w={w} h={h}>
      <path
        d={`M ${w * 0.15} ${h * 0.7} Q ${w * 0.35} ${h * 0.35} ${w * 0.55} ${h * 0.55} T ${w * 0.85} ${h * 0.3}`}
        stroke="#66BB6A"
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={w * 0.85} cy={h * 0.3} r={5} fill="#43A047" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function TurtleArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ShadedEllipse cx={cx} cy={h * 0.55} rx={16} ry={12} fill="#689F38" stroke={S} strokeWidth={1.3} />
      <circle cx={cx - 14} cy={h * 0.52} r={5} fill="#8BC34A" stroke={S} strokeWidth={1} />
      <circle cx={cx + 14} cy={h * 0.52} r={5} fill="#8BC34A" stroke={S} strokeWidth={1} />
      <ellipse cx={cx - 18} cy={h * 0.48} rx={6} ry={5} fill="#558B2F" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function BearArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.6} rx={15} ry={11} fill="#6D4C41" stroke={S} strokeWidth={1.3} />
      <circle cx={cx} cy={h * 0.38} r={12} fill="#795548" stroke={S} strokeWidth={1.3} />
      <circle cx={cx - 10} cy={h * 0.28} r={5} fill="#6D4C41" stroke={S} strokeWidth={1} />
      <circle cx={cx + 10} cy={h * 0.28} r={5} fill="#6D4C41" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function MeerkatArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.68} rx={8} ry={10} fill="#D7CCC8" stroke={S} strokeWidth={1.2} />
      <circle cx={cx} cy={h * 0.42} r={9} fill="#BCAAA4" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 3} cy={h * 0.4} r={1.8} fill={S} />
      <circle cx={cx + 3} cy={h * 0.4} r={1.8} fill={S} />
    </AnimalSvg>
  )
}

function PandaArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.6} rx={14} ry={10} fill="#FFFFFF" stroke={S} strokeWidth={1.3} />
      <circle cx={cx} cy={h * 0.38} r={11} fill="#FAFAFA" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx - 5} cy={h * 0.36} rx={3} ry={4} fill={S} />
      <ellipse cx={cx + 5} cy={h * 0.36} rx={3} ry={4} fill={S} />
      <circle cx={cx - 9} cy={h * 0.28} r={4} fill={S} />
      <circle cx={cx + 9} cy={h * 0.28} r={4} fill={S} />
    </AnimalSvg>
  )
}

function HippoArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={18} ry={13} fill="#90A4AE" stroke={S} strokeWidth={1.4} />
      <ellipse cx={cx - 12} cy={h * 0.46} rx={10} ry={9} fill="#B0BEC5" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 15} cy={h * 0.44} r={2} fill={S} />
    </AnimalSvg>
  )
}

function GorillaArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.62} rx={16} ry={12} fill="#424242" stroke={S} strokeWidth={1.3} />
      <circle cx={cx} cy={h * 0.38} r={13} fill="#616161" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx} cy={h * 0.44} rx={8} ry={5} fill="#757575" />
    </AnimalSvg>
  )
}

function ParrotArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx - 4} cy={h * 0.52} rx={10} ry={7} fill="#E53935" stroke={S} strokeWidth={1.2} />
      <ellipse cx={cx + 6} cy={h * 0.48} rx={8} ry={6} fill="#1E88E5" stroke={S} strokeWidth={1.2} />
      <polygon points={`${cx - 2},${h * 0.38} ${cx + 2},${h * 0.3} ${cx + 6},${h * 0.4}`} fill="#FDD835" stroke={S} strokeWidth={0.8} />
    </AnimalSvg>
  )
}

function KangarooArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={11} ry={9} fill="#C4956A" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 6} cy={h * 0.4} r={7} fill="#C4956A" stroke={S} strokeWidth={1.2} />
      <ellipse cx={cx + 8} cy={h * 0.55} rx={5} ry={3} fill="#A1887F" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function RhinoArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.6} rx={17} ry={11} fill="#78909C" stroke={S} strokeWidth={1.3} />
      <ellipse cx={cx - 12} cy={h * 0.46} rx={10} ry={9} fill="#90A4AE" stroke={S} strokeWidth={1.2} />
      <polygon points={`${cx - 20},${h * 0.46} ${cx - 24},${h * 0.5} ${cx - 18},${h * 0.52}`} fill={adjustColor('#78909C', -15)} />
    </AnimalSvg>
  )
}

function CrocodileArt({ w, h }: { w: number; h: number }) {
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={w * 0.5} cy={h * 0.58} rx={20} ry={8} fill="#558B2F" stroke={S} strokeWidth={1.3} />
      <ellipse cx={w * 0.22} cy={h * 0.54} rx={10} ry={6} fill="#689F38" stroke={S} strokeWidth={1.2} />
      <circle cx={w * 0.16} cy={h * 0.5} r={2} fill={S} />
    </AnimalSvg>
  )
}

function OwlArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.5} rx={14} ry={16} fill="#8D6E63" stroke={S} strokeWidth={1.3} />
      <circle cx={cx - 5} cy={h * 0.46} r={5} fill="#FFECB3" stroke={S} strokeWidth={1} />
      <circle cx={cx + 5} cy={h * 0.46} r={5} fill="#FFECB3" stroke={S} strokeWidth={1} />
      <circle cx={cx - 5} cy={h * 0.46} r={2} fill={S} />
      <circle cx={cx + 5} cy={h * 0.46} r={2} fill={S} />
    </AnimalSvg>
  )
}

function PeacockArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx + 6} cy={h * 0.58} rx={8} ry={10} fill="#00897B" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 4} cy={h * 0.42} r={7} fill="#00695C" stroke={S} strokeWidth={1.2} />
      <ellipse cx={cx - 10} cy={h * 0.5} rx={12} ry={14} fill="#26A69A" opacity={0.85} stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

function SlothArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.55} rx={13} ry={10} fill="#A1887F" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 4} cy={h * 0.4} r={9} fill="#BCAAA4" stroke={S} strokeWidth={1.2} />
      <path d={`M ${cx + 10} ${h * 0.45} Q ${cx + 20} ${h * 0.2} ${cx + 8} ${h * 0.25}`} stroke="#8D6E63" strokeWidth={3} fill="none" />
    </AnimalSvg>
  )
}

function SealArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.58} rx={16} ry={10} fill="#546E7A" stroke={S} strokeWidth={1.3} />
      <circle cx={cx - 10} cy={h * 0.46} r={8} fill="#607D8B" stroke={S} strokeWidth={1.2} />
      <circle cx={cx - 12} cy={h * 0.44} r={2} fill={S} />
    </AnimalSvg>
  )
}

function DolphinArt({ w, h }: { w: number; h: number }) {
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={w * 0.5} cy={h * 0.52} rx={18} ry={9} fill="#42A5F5" stroke={S} strokeWidth={1.3} />
      <polygon points={`${w * 0.68},${h * 0.44} ${w * 0.78},${h * 0.36} ${w * 0.72},${h * 0.52}`} fill="#1E88E5" />
      <circle cx={w * 0.32} cy={h * 0.48} r={2} fill={S} />
    </AnimalSvg>
  )
}

function RedPandaArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <AnimalSvg w={w} h={h}>
      <ellipse cx={cx} cy={h * 0.6} rx={12} ry={9} fill="#BF360C" stroke={S} strokeWidth={1.2} />
      <circle cx={cx} cy={h * 0.4} r={10} fill="#E64A19" stroke={S} strokeWidth={1.2} />
      <ellipse cx={cx - 8} cy={h * 0.32} rx={4} ry={5} fill="#BF360C" stroke={S} strokeWidth={1} />
      <ellipse cx={cx + 8} cy={h * 0.32} rx={4} ry={5} fill="#BF360C" stroke={S} strokeWidth={1} />
    </AnimalSvg>
  )
}

const ANIMAL_RENDERERS: Record<string, React.ComponentType<{ w: number; h: number }>> = {
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
  const Render = ANIMAL_RENDERERS[id] as ComponentType<{ w: number; h: number }> | undefined
  if (!Render) return null
  return <Render w={width} h={height} />
}
