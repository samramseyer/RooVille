import type { TrimProfileId } from '../types'
import { adjustColor } from './toca/tocaShading'

const S = '#4E342E'

/** Extra room around openings so casing moulding is not clipped by the SVG viewBox. */
export const OPENING_CASE_INSET = 12

export function BaseTrimMolding({
  profile,
  trimColor,
  wallLineY = 200,
  roomWidth = 640,
}: {
  profile: TrimProfileId
  trimColor: string
  wallLineY?: number
  roomWidth?: number
}) {
  const dark = adjustColor(trimColor, -22)
  const light = adjustColor(trimColor, 14)

  if (profile === 'standard') {
    return (
      <>
        <line x1={0} y1={wallLineY} x2={roomWidth} y2={wallLineY} stroke={trimColor} strokeWidth={6} />
        <rect x={0} y={wallLineY} width={roomWidth} height={8} fill="#000000" opacity={0.06} />
      </>
    )
  }

  if (profile === 'decorative') {
    const top = wallLineY - 14
    return (
      <>
        <rect x={0} y={top} width={roomWidth} height={14} fill={trimColor} stroke={S} strokeWidth={1.5} />
        <rect x={0} y={top} width={roomWidth} height={3} fill={light} opacity={0.55} />
        {Array.from({ length: Math.floor(roomWidth / 28) }).map((_, i) => (
          <rect
            key={i}
            x={i * 28 + 4}
            y={top - 1}
            width={18}
            height={4}
            rx={1}
            fill={dark}
            opacity={0.45}
          />
        ))}
        <line x1={0} y1={top + 6} x2={roomWidth} y2={top + 6} stroke={dark} strokeWidth={1} opacity={0.35} />
        <rect x={0} y={wallLineY} width={roomWidth} height={6} fill="#000000" opacity={0.07} />
      </>
    )
  }

  // rustic — stacked plank baseboard
  return (
    <>
      {[0, 5, 10].map((offset) => (
        <g key={offset}>
          <rect
            x={0}
            y={wallLineY - 14 + offset}
            width={roomWidth}
            height={6}
            fill={offset === 5 ? adjustColor(trimColor, -8) : trimColor}
            stroke={S}
            strokeWidth={1}
            opacity={0.95}
          />
          <line
            x1={8}
            y1={wallLineY - 11 + offset}
            x2={roomWidth - 8}
            y2={wallLineY - 11 + offset}
            stroke={dark}
            strokeWidth={0.8}
            opacity={0.3}
          />
        </g>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`seam-${i}`}
          x1={i * 54 + 20}
          y1={wallLineY - 14}
          x2={i * 54 + 14}
          y2={wallLineY + 2}
          stroke={S}
          strokeWidth={1.2}
          opacity={0.25}
        />
      ))}
      <rect x={0} y={wallLineY} width={roomWidth} height={7} fill="#000000" opacity={0.08} />
    </>
  )
}

export function OpeningCasing({
  profile,
  x,
  y,
  width,
  height,
  trimColor,
  rx = 4,
}: {
  profile: TrimProfileId
  x: number
  y: number
  width: number
  height: number
  trimColor: string
  rx?: number
}) {
  if (profile === 'standard') return null

  const dark = adjustColor(trimColor, -24)
  const light = adjustColor(trimColor, 12)
  const pad = profile === 'decorative' ? 5 : 6

  if (profile === 'decorative') {
    return (
      <g>
        <rect
          x={x - pad}
          y={y - pad}
          width={width + pad * 2}
          height={height + pad * 2}
          rx={rx + 2}
          fill={dark}
          stroke={S}
          strokeWidth={2}
          opacity={0.85}
        />
        <rect x={x - pad + 2} y={y - pad + 2} width={pad - 1} height={pad - 1} rx={1} fill={light} opacity={0.5} />
        <rect
          x={x + width + 1}
          y={y - pad + 2}
          width={pad - 1}
          height={pad - 1}
          rx={1}
          fill={light}
          opacity={0.5}
        />
        <rect
          x={x - pad + 2}
          y={y + height + 1}
          width={pad - 1}
          height={pad - 1}
          rx={1}
          fill={light}
          opacity={0.5}
        />
        <rect
          x={x + width + 1}
          y={y + height + 1}
          width={pad - 1}
          height={pad - 1}
          rx={1}
          fill={light}
          opacity={0.5}
        />
        <rect
          x={x - pad - 1}
          y={y + height - 2}
          width={width + pad * 2 + 2}
          height={8}
          rx={2}
          fill={trimColor}
          stroke={S}
          strokeWidth={1.5}
          opacity={0.9}
        />
      </g>
    )
  }

  // rustic casing — thick rough boards
  return (
    <g>
      <rect
        x={x - pad}
        y={y - pad}
        width={width + pad * 2}
        height={height + pad * 2}
        rx={2}
        fill={trimColor}
        stroke={S}
        strokeWidth={2.5}
      />
      <line
        x1={x - pad + 4}
        y1={y - pad + 6}
        x2={x + width + pad - 4}
        y2={y - pad + 6}
        stroke={dark}
        strokeWidth={1}
        opacity={0.35}
      />
      <line
        x1={x - pad + 4}
        y1={y + height + pad - 6}
        x2={x + width + pad - 4}
        y2={y + height + pad - 6}
        stroke={dark}
        strokeWidth={1}
        opacity={0.35}
      />
      <line x1={x - 2} y1={y - pad} x2={x - 2} y2={y + height + pad} stroke={S} strokeWidth={1.5} opacity={0.3} />
      <line
        x1={x + width + 2}
        y1={y - pad}
        x2={x + width + 2}
        y2={y + height + pad}
        stroke={S}
        strokeWidth={1.5}
        opacity={0.3}
      />
    </g>
  )
}

export function TrimProfilePreviewSwatch({
  profile,
  kind,
  trimColor,
}: {
  profile: TrimProfileId
  kind: 'base' | 'casing'
  trimColor: string
}) {
  if (kind === 'base') {
    return (
      <svg viewBox="0 0 40 28" width={40} height={28} aria-hidden="true">
        <rect width={40} height={28} rx={6} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />
        <rect x={4} y={4} width={32} height={14} fill="#E8E0D8" rx={2} />
        <g transform="translate(0, 18)">
          <BaseTrimMolding profile={profile} trimColor={trimColor} wallLineY={0} roomWidth={40} />
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
      <rect width={40} height={32} rx={6} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />
      <OpeningCasing profile={profile} x={10} y={6} width={20} height={18} trimColor={trimColor} />
      <rect x={12} y={8} width={16} height={14} rx={2} fill="#B8E8E4" stroke={S} strokeWidth={1.5} />
    </svg>
  )
}
