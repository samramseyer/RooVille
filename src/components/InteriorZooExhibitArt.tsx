import type { ReactNode } from 'react'
import { GroundShadow, ShadedEllipse, adjustColor } from './toca/tocaShading'

const S = '#4E342E'
const GRASS = '#A5D6A7'
const FENCE = '#8D6E63'

function FurnSvg({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  return (
    <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  )
}

function PenBase({ w, h, children }: { w: number; h: number; children?: ReactNode }) {
  const cx = w / 2
  const cy = h * 0.52
  const rx = w * 0.42
  const ry = h * 0.38
  return (
    <>
      <GroundShadow cx={cx} cy={h - 4} rx={rx * 0.85} ry={5} />
      <ShadedEllipse cx={cx} cy={cy} rx={rx} ry={ry} fill={GRASS} stroke={FENCE} strokeWidth={2.2} />
      {[0.15, 0.38, 0.62, 0.85].map((f) => (
        <rect
          key={f}
          x={cx - rx + f * rx * 2 - 1.5}
          y={cy - ry - 2}
          width={3}
          height={ry * 2 + 4}
          rx={1}
          fill={FENCE}
          stroke={S}
          strokeWidth={0.6}
        />
      ))}
      {children}
    </>
  )
}

function TopDownKangaroo({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={0} cy={4} rx={10} ry={7} fill="#C4956A" stroke={S} strokeWidth={1.2} />
      <circle cx={-6} cy={-2} r={5} fill="#C4956A" stroke={S} strokeWidth={1.2} />
      <ellipse cx={8} cy={2} rx={4} ry={2.5} fill="#C4956A" stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownGoat({ cx, cy, light }: { cx: number; cy: number; light?: boolean }) {
  const fill = light ? '#FFFFFF' : '#A1887F'
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={-5} cy={2} rx={6} ry={4} fill={fill} stroke={S} strokeWidth={1} />
      <ellipse cx={6} cy={3} rx={6} ry={4} fill={light ? '#ECEFF1' : '#8D6E63'} stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownHorse({ cx, cy, light }: { cx: number; cy: number; light?: boolean }) {
  const fill = light ? '#FFFFFF' : '#8D6E63'
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={0} cy={2} rx={11} ry={6} fill={fill} stroke={S} strokeWidth={1.2} />
      <ellipse cx={-8} cy={0} rx={4} ry={3} fill={fill} stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownSheep({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <circle cx={-5} cy={2} r={6} fill="#FFFFFF" stroke={S} strokeWidth={1.2} />
      <circle cx={6} cy={3} r={5.5} fill="#F5F5F5" stroke={S} strokeWidth={1.2} />
    </g>
  )
}

function TopDownLlama({ cx, cy, light }: { cx: number; cy: number; light?: boolean }) {
  const fill = light ? '#FFFFFF' : '#D7CCC8'
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={-4} cy={2} rx={7} ry={5} fill={fill} stroke={S} strokeWidth={1.2} />
      <ellipse cx={7} cy={3} rx={6} ry={4.5} fill={light ? '#EEEEEE' : '#BCAAA4'} stroke={S} strokeWidth={1.2} />
      <ellipse cx={-4} cy={-4} rx={4} ry={5} fill={fill} stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownRabbit({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={-4} cy={3} rx={5} ry={4} fill="#BCAAA4" stroke={S} strokeWidth={1} />
      <ellipse cx={5} cy={4} rx={4.5} ry={3.5} fill="#A1887F" stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownPig({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={0} cy={3} rx={10} ry={6} fill="#F48FB1" stroke={S} strokeWidth={1.2} />
      <circle cx={-6} cy={0} r={4} fill="#F48FB1" stroke={S} strokeWidth={1} />
      <rect x={14} y={-6} width={14} height={12} rx={2} fill="#C4564E" stroke={S} strokeWidth={1} />
    </g>
  )
}

function TopDownParrot({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={-4} cy={2} rx={6} ry={4} fill="#E53935" stroke={S} strokeWidth={1} />
      <ellipse cx={5} cy={1} rx={5} ry={3.5} fill="#1E88E5" stroke={S} strokeWidth={1} />
      <polygon points="-2,-4 2,-8 6,-3" fill="#FDD835" stroke={S} strokeWidth={0.8} />
    </g>
  )
}

function TopDownDonkey({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx={-5} cy={2} rx={7} ry={5} fill="#8D6E63" stroke={S} strokeWidth={1.2} />
      <ellipse cx={7} cy={3} rx={6} ry={4.5} fill="#795548" stroke={S} strokeWidth={1.2} />
    </g>
  )
}

function AnimalPenArt({ w, h, animal }: { w: number; h: number; animal: ReactNode }) {
  return (
    <FurnSvg viewBox={`0 0 ${w} ${h}`}>
      <PenBase w={w} h={h}>
        {animal}
      </PenBase>
    </FurnSvg>
  )
}

function BarnStandArt({ w, h, icon, color }: { w: number; h: number; icon: string; color: string }) {
  return (
    <FurnSvg viewBox={`0 0 ${w} ${h}`}>
      <GroundShadow cx={w / 2} cy={h - 3} rx={w * 0.38} ry={3} />
      <rect x={4} y={h * 0.35} width={w - 8} height={h * 0.55} fill={color} stroke={S} strokeWidth={1.5} />
      <path d={`M 2 ${h * 0.35} L ${w / 2} ${h * 0.12} L ${w - 2} ${h * 0.35} Z`} fill={adjustColor(color, -25)} stroke={S} strokeWidth={1.5} />
      <circle cx={w / 2} cy={h * 0.58} r={h * 0.16} fill="#48CAE4" stroke={S} strokeWidth={1} />
      <text x={w / 2} y={h * 0.63} textAnchor="middle" fontSize={h * 0.22}>
        {icon}
      </text>
    </FurnSvg>
  )
}

function TreeArt({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const cy = h / 2
  return (
    <FurnSvg viewBox={`0 0 ${w} ${h}`}>
      <GroundShadow cx={cx} cy={h - 4} rx={14} ry={3} />
      <circle cx={cx} cy={cy} r={16} fill="#66BB6A" stroke={S} strokeWidth={1.5} />
      <circle cx={cx - 5} cy={cy - 4} r={6} fill="#A5D6A7" opacity={0.8} />
    </FurnSvg>
  )
}

function EmptyPenArt({ w, h }: { w: number; h: number }) {
  return (
    <FurnSvg viewBox={`0 0 ${w} ${h}`}>
      <PenBase w={w} h={h} />
    </FurnSvg>
  )
}

export function renderZooExhibitArt(id: string) {
  switch (id) {
    case 'exhibit-kangaroo':
      return <AnimalPenArt w={80} h={70} animal={<TopDownKangaroo cx={40} cy={38} />} />
    case 'exhibit-goat':
      return (
        <AnimalPenArt
          w={75}
          h={65}
          animal={
            <>
              <TopDownGoat cx={28} cy={36} light />
              <TopDownGoat cx={48} cy={38} />
            </>
          }
        />
      )
    case 'exhibit-horse':
      return (
        <AnimalPenArt
          w={85}
          h={70}
          animal={
            <>
              <TopDownHorse cx={32} cy={36} light />
              <TopDownHorse cx={54} cy={38} />
            </>
          }
        />
      )
    case 'exhibit-sheep':
      return (
        <AnimalPenArt
          w={75}
          h={65}
          animal={
            <>
              <TopDownSheep cx={30} cy={36} />
              <TopDownSheep cx={48} cy={38} />
            </>
          }
        />
      )
    case 'exhibit-llama':
      return (
        <AnimalPenArt
          w={80}
          h={70}
          animal={
            <>
              <TopDownLlama cx={30} cy={36} light />
              <TopDownLlama cx={52} cy={38} />
            </>
          }
        />
      )
    case 'exhibit-rabbit':
      return (
        <AnimalPenArt
          w={65}
          h={55}
          animal={
            <>
              <TopDownRabbit cx={26} cy={30} />
              <TopDownRabbit cx={42} cy={32} />
            </>
          }
        />
      )
    case 'exhibit-pig':
      return <AnimalPenArt w={80} h={70} animal={<TopDownPig cx={38} cy={36} />} />
    case 'exhibit-parrot':
      return <AnimalPenArt w={75} h={65} animal={<TopDownParrot cx={38} cy={34} />} />
    case 'exhibit-donkey':
      return (
        <AnimalPenArt
          w={80}
          h={70}
          animal={
            <>
              <TopDownDonkey cx={32} cy={36} />
              <TopDownDonkey cx={52} cy={38} />
            </>
          }
        />
      )
    case 'exhibit-empty-pen':
      return <EmptyPenArt w={75} h={65} />
    case 'exhibit-food-stand':
      return <BarnStandArt w={55} h={45} icon="🍴" color="#C4564E" />
    case 'exhibit-restroom':
      return <BarnStandArt w={50} h={40} icon="🚻" color="#C4564E" />
    case 'exhibit-gift-shop':
      return <BarnStandArt w={55} h={45} icon="🐾" color="#C4564E" />
    case 'exhibit-tree':
      return <TreeArt w={45} h={45} />
    default:
      return null
  }
}
