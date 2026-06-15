import type { ReactNode } from 'react'
import { useId } from 'react'
import { ShadedCylinder, ShadePrefixProvider, TocaShadeDefs, adjustColor } from './toca/tocaShading'

export { GroundShadow, ShadedCylinder, ShadedEllipse, ShadedRect, ShadePrefixProvider, TocaShadeDefs, adjustColor } from './toca/tocaShading'

export const S = '#4E342E'
export const SW = 2.5

export const C = {
  ocean: '#48B5B0',
  oceanDark: '#2A9D8F',
  sand: '#E8C872',
  ochre: '#C4956A',
  cream: '#FFF8F0',
  weatherboard: '#F5F0E8',
  wattle: '#FFD54F',
  eucalyptus: '#6B9E6B',
  gumGreen: '#4A7C59',
  terracotta: '#C4684A',
  tinRed: '#B74A42',
  corrugated: '#7B8FA1',
  window: '#B3E5FC',
  wood: '#8B6914',
  woodLight: '#C4956A',
  woodDark: '#6B4423',
  fabric: '#5A8F8A',
  fabricDark: '#3D7370',
  metal: '#9E9E9E',
  glass: '#C8E6F5',
  charcoal: '#424242',
}

export function FurnSvg({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  const shadePrefix = `${useId().replace(/:/g, '')}-`
  return (
    <ShadePrefixProvider prefix={shadePrefix}>
      <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <TocaShadeDefs />
        {children}
      </svg>
    </ShadePrefixProvider>
  )
}

export function WoodLegs({ xs, y, h = 8, w = 5 }: { xs: number[]; y: number; h?: number; w?: number }) {
  return (
    <>
      {xs.map((x) => (
        <ShadedCylinder key={x} x={x} topY={y} width={w} height={h} fill={C.woodDark} stroke={S} />
      ))}
    </>
  )
}

export function WoodGrainRect({
  x,
  y,
  width,
  height,
  rx = 0,
  fill = C.woodLight,
}: {
  x: number
  y: number
  width: number
  height: number
  rx?: number
  fill?: string
}) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} rx={rx} fill={fill} stroke={S} strokeWidth={1.8} />
      <path
        d={`M ${x + 4} ${y + height * 0.3} Q ${x + width * 0.4} ${y + height * 0.25} ${x + width - 4} ${y + height * 0.32}`}
        fill="none"
        stroke={adjustColor(fill, -25)}
        strokeWidth={0.8}
        opacity={0.35}
      />
    </>
  )
}

export function Cushion({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={h * 0.35} fill={fill} stroke={S} strokeWidth={1.8} />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h * 0.35} rx={2} fill="#FFFFFF" opacity={0.22} />
      <line x1={x + 4} y1={y + h * 0.5} x2={x + w - 4} y2={y + h * 0.5} stroke={adjustColor(fill, -15)} strokeWidth={0.8} opacity={0.35} />
    </>
  )
}

export function DrawerFront({ x, y, w, h, knobX }: { x: number; y: number; w: number; h: number; knobX: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={2} fill={C.woodLight} stroke={S} strokeWidth={1.5} />
      <line x1={x + 2} y1={y + 2} x2={x + w - 2} y2={y + 2} stroke="#FFFFFF" opacity={0.25} strokeWidth={1} />
      <circle cx={knobX} cy={y + h / 2} r={2.5} fill={C.metal} stroke={S} strokeWidth={1} />
    </>
  )
}
