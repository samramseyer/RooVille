import type { ReactNode } from 'react'
import { GroundShadow } from '../toca/tocaShading'

/** Thin brown outline matching the reference sticker set. */
export const K_OUTLINE = '#4D4035'

export function KawaiiAnimalSvg({ w, h: _h, children }: { w: number; h: number; children: ReactNode }) {
  const vb = 80
  return (
    <svg viewBox={`0 0 ${vb} ${vb}`} width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
      <GroundShadow cx={vb / 2} cy={vb - 3} rx={w * 0.22} ry={3.5} />
      {children}
    </svg>
  )
}

export function KawaiiEyes({ cx, cy, spacing = 5 }: { cx: number; cy: number; spacing?: number }) {
  return (
    <>
      <circle cx={cx - spacing} cy={cy} r={2.4} fill="#1a1a1a" />
      <circle cx={cx + spacing} cy={cy} r={2.4} fill="#1a1a1a" />
      <circle cx={cx - spacing + 0.7} cy={cy - 0.8} r={0.75} fill="#fff" />
      <circle cx={cx + spacing + 0.7} cy={cy - 0.8} r={0.75} fill="#fff" />
    </>
  )
}

export function KawaiiBlush({ cx, cy, spacing = 5 }: { cx: number; cy: number; spacing?: number }) {
  return (
    <>
      <ellipse cx={cx - spacing - 2.5} cy={cy + 3} rx={2.2} ry={1.4} fill="#F8BBD0" />
      <ellipse cx={cx + spacing + 2.5} cy={cy + 3} rx={2.2} ry={1.4} fill="#F8BBD0" />
    </>
  )
}

export function KawaiiSmile({ cx, cy }: { cx: number; cy: number }) {
  return (
    <path
      d={`M ${cx - 3} ${cy} Q ${cx} ${cy + 2.8} ${cx + 3} ${cy}`}
      fill="none"
      stroke={K_OUTLINE}
      strokeWidth={0.9}
      strokeLinecap="round"
    />
  )
}

export function KawaiiFace({ cx, cy, spacing = 5 }: { cx: number; cy: number; spacing?: number }) {
  return (
    <>
      <KawaiiEyes cx={cx} cy={cy} spacing={spacing} />
      <KawaiiBlush cx={cx} cy={cy} spacing={spacing} />
      <KawaiiSmile cx={cx} cy={cy + 1} />
    </>
  )
}

export function Branch({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#689F38" strokeWidth={3.5} strokeLinecap="round" />
  )
}
