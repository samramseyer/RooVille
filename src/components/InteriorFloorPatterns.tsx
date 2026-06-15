import type { FloorTypeId } from '../data/interiorStyles'
import { adjustColor } from './toca/tocaShading'

interface PlankTone {
  floorColor: string
  dark: string
  mid: string
  light: string
  groove: string
}

function plankFill(base: string, variant: number) {
  if (variant % 3 === 1) return adjustColor(base, -5)
  if (variant % 3 === 2) return adjustColor(base, 6)
  return base
}

/** One horizontal plank with visible wood grain curves */
function WoodPlank({
  x,
  y,
  width,
  height,
  tone,
  variant,
  showRightSeam = true,
}: {
  x: number
  y: number
  width: number
  height: number
  tone: PlankTone
  variant: number
  showRightSeam?: boolean
}) {
  const fill = plankFill(tone.floorColor, variant)
  const grainY1 = y + height * 0.28
  const grainY2 = y + height * 0.52
  const grainY3 = y + height * 0.74

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <rect x={x} y={y} width={width} height={height * 0.42} fill={tone.light} opacity={0.3} />
      <path
        d={`M ${x + 3} ${grainY1} Q ${x + width * 0.28} ${grainY1 - 1.5} ${x + width * 0.55} ${grainY1 + 0.5} T ${x + width - 3} ${grainY1 - 0.5}`}
        fill="none"
        stroke={tone.dark}
        strokeWidth={0.9}
        opacity={0.38}
      />
      <path
        d={`M ${x + 5} ${grainY2} Q ${x + width * 0.35} ${grainY2 + 1.2} ${x + width * 0.62} ${grainY2 - 0.8} T ${x + width - 4} ${grainY2 + 0.6}`}
        fill="none"
        stroke={tone.mid}
        strokeWidth={0.7}
        opacity={0.32}
      />
      <path
        d={`M ${x + 2} ${grainY3} Q ${x + width * 0.4} ${grainY3 - 1} ${x + width * 0.7} ${grainY3 + 0.8} T ${x + width - 2} ${grainY3}`}
        fill="none"
        stroke={tone.dark}
        strokeWidth={0.65}
        opacity={0.28}
      />
      {variant % 4 === 0 && (
        <>
          <ellipse
            cx={x + width * 0.35}
            cy={y + height * 0.45}
            rx={width * 0.08}
            ry={height * 0.14}
            fill={tone.dark}
            opacity={0.18}
          />
          <ellipse
            cx={x + width * 0.35}
            cy={y + height * 0.45}
            rx={width * 0.04}
            ry={height * 0.07}
            fill={tone.mid}
            opacity={0.22}
          />
        </>
      )}
      {showRightSeam && (
        <line
          x1={x + width}
          y1={y}
          x2={x + width}
          y2={y + height}
          stroke={tone.groove}
          strokeWidth={1.1}
          opacity={0.55}
        />
      )}
    </g>
  )
}

function WoodPlankPattern({ floorColor }: { floorColor: string }) {
  const tone: PlankTone = {
    floorColor,
    dark: adjustColor(floorColor, -26),
    mid: adjustColor(floorColor, -12),
    light: adjustColor(floorColor, 16),
    groove: adjustColor(floorColor, -36),
  }
  const rowH = 22
  const patternW = 112
  const patternH = rowH * 2

  return (
    <pattern id="interior-floor" width={patternW} height={patternH} patternUnits="userSpaceOnUse">
      <rect width={patternW} height={patternH} fill={floorColor} />
      <WoodPlank x={0} y={0} width={36} height={rowH} tone={tone} variant={0} />
      <WoodPlank x={36} y={0} width={40} height={rowH} tone={tone} variant={1} />
      <WoodPlank x={76} y={0} width={36} height={rowH} tone={tone} variant={2} showRightSeam={false} />
      <line x1={0} y1={rowH} x2={patternW} y2={rowH} stroke={tone.groove} strokeWidth={1.2} opacity={0.5} />
      <WoodPlank x={18} y={rowH} width={34} height={rowH} tone={tone} variant={3} />
      <WoodPlank x={52} y={rowH} width={38} height={rowH} tone={tone} variant={4} />
      <WoodPlank x={90} y={rowH} width={22} height={rowH} tone={tone} variant={5} showRightSeam={false} />
      <WoodPlank x={0} y={rowH} width={18} height={rowH} tone={tone} variant={6} showRightSeam={false} />
    </pattern>
  )
}

function WoodPlankPreview({ floorColor }: { floorColor: string }) {
  const tone: PlankTone = {
    floorColor,
    dark: adjustColor(floorColor, -26),
    mid: adjustColor(floorColor, -12),
    light: adjustColor(floorColor, 16),
    groove: adjustColor(floorColor, -36),
  }

  return (
    <>
      <WoodPlank x={2} y={2} width={14} height={7} tone={tone} variant={0} />
      <WoodPlank x={16} y={2} width={12} height={7} tone={tone} variant={1} />
      <WoodPlank x={28} y={2} width={10} height={7} tone={tone} variant={2} showRightSeam={false} />
      <line x1={2} y1={9} x2={38} y2={9} stroke={tone.groove} strokeWidth={0.7} opacity={0.45} />
      <WoodPlank x={8} y={10} width={13} height={7} tone={tone} variant={3} />
      <WoodPlank x={21} y={10} width={11} height={7} tone={tone} variant={4} />
      <WoodPlank x={32} y={10} width={6} height={7} tone={tone} variant={5} showRightSeam={false} />
      <WoodPlank x={2} y={10} width={6} height={7} tone={tone} variant={6} showRightSeam={false} />
      <line x1={2} y1={17} x2={38} y2={17} stroke={tone.groove} strokeWidth={0.7} opacity={0.45} />
      <WoodPlank x={2} y={18} width={15} height={7} tone={tone} variant={7} />
      <WoodPlank x={17} y={18} width={13} height={7} tone={tone} variant={8} />
      <WoodPlank x={30} y={18} width={8} height={7} tone={tone} variant={9} showRightSeam={false} />
    </>
  )
}

export function FloorPatternDefs({
  floorTypeId,
  floorColor,
}: {
  floorTypeId: FloorTypeId | string
  floorColor: string
}) {
  if (floorTypeId === 'paint') return null

  const dark = adjustColor(floorColor, -22)
  const mid = adjustColor(floorColor, -10)
  const light = adjustColor(floorColor, 14)
  const groove = adjustColor(floorColor, -32)

  switch (floorTypeId) {
    case 'wood-planks':
      return <WoodPlankPattern floorColor={floorColor} />
    case 'hardwood':
      return (
        <pattern id="interior-floor" width={48} height={14} patternUnits="userSpaceOnUse">
          <rect width={48} height={14} fill={floorColor} />
          <rect y={0} width={48} height={7} fill={light} opacity={0.35} />
          <line x1={0} y1={13.5} x2={48} y2={13.5} stroke={groove} strokeWidth={1} opacity={0.5} />
          <path
            d="M 4 4 Q 12 6 20 4 Q 28 2 36 5 Q 42 7 46 4"
            fill="none"
            stroke={dark}
            strokeWidth={0.8}
            opacity={0.25}
          />
          <path
            d="M 2 10 Q 14 8 26 11 Q 38 13 46 9"
            fill="none"
            stroke={dark}
            strokeWidth={0.6}
            opacity={0.2}
          />
        </pattern>
      )
    case 'lvp':
      return (
        <pattern id="interior-floor" width={64} height={18} patternUnits="userSpaceOnUse">
          <rect width={64} height={18} fill={floorColor} />
          <rect y={0} width={64} height={9} fill={light} opacity={0.28} />
          <line x1={0} y1={17.5} x2={64} y2={17.5} stroke={groove} strokeWidth={1.2} opacity={0.55} />
          <line x1={32} y1={0} x2={32} y2={18} stroke={groove} strokeWidth={0.8} opacity={0.35} />
          <rect x={1} y={2} width={30} height={6} rx={1} fill={mid} opacity={0.12} />
          <rect x={33} y={10} width={30} height={6} rx={1} fill={mid} opacity={0.1} />
        </pattern>
      )
    case 'tile':
      return (
        <pattern id="interior-floor" width={36} height={36} patternUnits="userSpaceOnUse">
          <rect width={36} height={36} fill={floorColor} />
          <rect x={1} y={1} width={34} height={34} rx={2} fill={light} opacity={0.2} />
          <line x1={36} y1={0} x2={36} y2={36} stroke={groove} strokeWidth={1.5} opacity={0.45} />
          <line x1={0} y1={36} x2={36} y2={36} stroke={groove} strokeWidth={1.5} opacity={0.45} />
          <circle cx={8} cy={10} r={1.2} fill={dark} opacity={0.15} />
          <circle cx={28} cy={26} r={1} fill={dark} opacity={0.12} />
        </pattern>
      )
    case 'stone':
      return (
        <pattern id="interior-floor" width={56} height={40} patternUnits="userSpaceOnUse">
          <rect width={56} height={40} fill={floorColor} />
          <path
            d="M 2 2 L 26 2 L 24 18 L 2 20 Z"
            fill={light}
            stroke={groove}
            strokeWidth={1}
            opacity={0.35}
          />
          <path
            d="M 28 2 L 54 4 L 52 20 L 26 18 Z"
            fill={mid}
            stroke={groove}
            strokeWidth={1}
            opacity={0.3}
          />
          <path
            d="M 2 22 L 24 20 L 26 38 L 4 38 Z"
            fill={mid}
            stroke={groove}
            strokeWidth={1}
            opacity={0.28}
          />
          <path
            d="M 28 22 L 52 22 L 54 38 L 30 38 Z"
            fill={light}
            stroke={groove}
            strokeWidth={1}
            opacity={0.32}
          />
        </pattern>
      )
    default:
      return null
  }
}

/** Tiny preview for floor type palette buttons */
export function FloorPreviewSwatch({
  floorTypeId,
  floorColor,
}: {
  floorTypeId: FloorTypeId | string
  floorColor: string
}) {
  const mid = adjustColor(floorColor, -10)
  const light = adjustColor(floorColor, 14)
  const groove = adjustColor(floorColor, -32)

  if (floorTypeId === 'paint') {
    return (
      <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
        <rect width={40} height={32} rx={6} fill={floorColor} stroke="#4E342E" strokeWidth={1.5} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
      <rect width={40} height={32} rx={6} fill={floorColor} stroke="#4E342E" strokeWidth={1.5} />
      {floorTypeId === 'wood-planks' && <WoodPlankPreview floorColor={floorColor} />}
      {floorTypeId === 'hardwood' &&
        [0, 8, 16, 24].map((y) => (
          <g key={y}>
            <rect x={2} y={y + 1} width={36} height={6} fill={light} opacity={0.3} />
            <line x1={2} y1={y + 7} x2={38} y2={y + 7} stroke={groove} strokeWidth={0.8} opacity={0.45} />
          </g>
        ))}
      {floorTypeId === 'lvp' &&
        [0, 10, 20].map((y) => (
          <g key={y}>
            <rect x={2} y={y + 1} width={17} height={8} fill={light} opacity={0.25} />
            <rect x={21} y={y + 1} width={17} height={8} fill={mid} opacity={0.15} />
            <line x1={2} y1={y + 9} x2={38} y2={y + 9} stroke={groove} strokeWidth={0.8} opacity={0.4} />
          </g>
        ))}
      {floorTypeId === 'tile' &&
        [0, 8, 16, 24].map((x) =>
          [0, 8, 16, 24].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x + 1}
              y={y + 1}
              width={7}
              height={7}
              fill="none"
              stroke={groove}
              strokeWidth={0.6}
              opacity={0.45}
            />
          )),
        )}
      {floorTypeId === 'stone' && (
        <>
          <path d="M 2 2 L 18 2 L 17 14 L 2 15 Z" fill={light} opacity={0.25} stroke={groove} strokeWidth={0.6} />
          <path d="M 20 2 L 38 3 L 37 14 L 19 14 Z" fill={mid} opacity={0.2} stroke={groove} strokeWidth={0.6} />
          <path d="M 2 17 L 17 16 L 18 30 L 3 30 Z" fill={mid} opacity={0.18} stroke={groove} strokeWidth={0.6} />
          <path d="M 20 16 L 37 16 L 38 30 L 21 30 Z" fill={light} opacity={0.22} stroke={groove} strokeWidth={0.6} />
        </>
      )}
    </svg>
  )
}
