import type { ReactNode } from 'react'

/** Shift a hex colour lighter (+) or darker (-). */
export function adjustColor(hex: string, amount: number): string {
  const raw = hex.replace('#', '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  const num = parseInt(full, 16)
  const clamp = (v: number) => Math.max(0, Math.min(255, v))
  const r = clamp((num >> 16) + amount)
  const g = clamp(((num >> 8) & 0xff) + amount)
  const b = clamp((num & 0xff) + amount)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export const SHADE = {
  stroke: '#4E342E',
  depth: 7,
  groundShadow: 'rgba(44, 36, 32, 0.22)',
  groundShadowSoft: 'rgba(44, 36, 32, 0.1)',
}

export function TocaShadeDefs() {
  return (
    <defs>
      <linearGradient id="toca-surface-light" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
        <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="toca-surface-side" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id="toca-roof-shine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="interior-wall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="interior-floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
      </linearGradient>
    </defs>
  )
}

export function ShadedRect({
  x,
  y,
  width,
  height,
  fill,
  rx = 6,
  depth = SHADE.depth,
  stroke = SHADE.stroke,
  strokeWidth = 2.5,
}: {
  x: number
  y: number
  width: number
  height: number
  fill: string
  rx?: number
  depth?: number
  stroke?: string
  strokeWidth?: number
}) {
  const side = adjustColor(fill, -32)
  const bottom = adjustColor(fill, -42)
  return (
    <g>
      <path
        d={`M ${x + width} ${y + rx * 0.4} L ${x + width + depth} ${y + rx * 0.4 + depth * 0.42} L ${x + width + depth} ${y + height + depth * 0.38} L ${x + width} ${y + height} Z`}
        fill={side}
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path
        d={`M ${x + rx} ${y + height} L ${x + width - rx * 0.5} ${y + height} L ${x + width + depth} ${y + height + depth * 0.32} L ${x + depth} ${y + height + depth * 0.32} Z`}
        fill={bottom}
        stroke={stroke}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <rect
        x={x + 2}
        y={y + 2}
        width={width - 4}
        height={Math.max(height * 0.18, 4)}
        rx={Math.max(rx * 0.5, 2)}
        fill="url(#toca-surface-light)"
        pointerEvents="none"
      />
      <rect
        x={x + width - 4}
        y={y + 4}
        width={3}
        height={height - 8}
        rx={1.5}
        fill="url(#toca-surface-side)"
        pointerEvents="none"
      />
    </g>
  )
}

export function ShadedEllipse({
  cx,
  cy,
  rx,
  ry,
  fill,
  stroke = SHADE.stroke,
  strokeWidth = 2,
}: {
  cx: number
  cy: number
  rx: number
  ry: number
  fill: string
  stroke?: string
  strokeWidth?: number
}) {
  return (
    <g>
      <ellipse cx={cx + 2} cy={cy + 3} rx={rx} ry={ry} fill={SHADE.groundShadowSoft} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <ellipse cx={cx - rx * 0.25} cy={cy - ry * 0.3} rx={rx * 0.35} ry={ry * 0.35} fill="#FFFFFF" opacity={0.25} />
    </g>
  )
}

export function GroundShadow({
  cx,
  cy,
  rx,
  ry = 5,
}: {
  cx: number
  cy: number
  rx: number
  ry?: number
}) {
  return (
    <>
      <ellipse cx={cx} cy={cy + 2} rx={rx * 1.08} ry={ry + 2} fill={SHADE.groundShadowSoft} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={SHADE.groundShadow} />
    </>
  )
}

export function ShadedCylinder({
  x,
  topY,
  width,
  height,
  fill,
  stroke = SHADE.stroke,
}: {
  x: number
  topY: number
  width: number
  height: number
  fill: string
  stroke?: string
}) {
  const capRy = width * 0.35
  return (
    <g>
      <rect
        x={x - width / 2 + 1}
        y={topY}
        width={width - 2}
        height={height}
        rx={width * 0.28}
        fill={adjustColor(fill, -28)}
        stroke={stroke}
        strokeWidth={1.8}
      />
      <ellipse cx={x} cy={topY} rx={width / 2 + 1} ry={capRy} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <rect
        x={x + width * 0.15}
        y={topY + 2}
        width={width * 0.18}
        height={height - 2}
        rx={2}
        fill="#FFFFFF"
        opacity={0.18}
      />
    </g>
  )
}

export function ShadedSvgRoot({ children, viewBox }: { children: ReactNode; viewBox: string }) {
  return (
    <svg viewBox={viewBox} width="100%" height="100%" aria-hidden="true">
      <TocaShadeDefs />
      {children}
    </svg>
  )
}
