import type { WallpaperId } from '../data/interiorStyles'
import { adjustColor } from './toca/tocaShading'

export function WallpaperPatternDefs({
  wallpaperId,
  wallColor,
}: {
  wallpaperId: WallpaperId | string
  wallColor: string
}) {
  if (wallpaperId === 'none') return null

  const dark = adjustColor(wallColor, -28)
  const mid = adjustColor(wallColor, -14)
  const light = adjustColor(wallColor, 12)
  const accent = adjustColor(wallColor, -40)

  switch (wallpaperId) {
    case 'stripes':
      return (
        <pattern id="interior-wallpaper" width={24} height={24} patternUnits="userSpaceOnUse">
          <rect width={24} height={24} fill={wallColor} />
          <rect x={0} width={12} height={24} fill={mid} opacity={0.45} />
        </pattern>
      )
    case 'dots':
      return (
        <pattern id="interior-wallpaper" width={28} height={28} patternUnits="userSpaceOnUse">
          <rect width={28} height={28} fill={wallColor} />
          <circle cx={7} cy={7} r={4} fill={dark} opacity={0.35} />
          <circle cx={21} cy={21} r={4} fill={dark} opacity={0.35} />
        </pattern>
      )
    case 'waves':
      return (
        <pattern id="interior-wallpaper" width={80} height={40} patternUnits="userSpaceOnUse">
          <rect width={80} height={40} fill={wallColor} />
          <path
            d="M 0 20 Q 20 12 40 20 Q 60 28 80 20"
            fill="none"
            stroke={dark}
            strokeWidth={3}
            opacity={0.4}
          />
          <path
            d="M 0 32 Q 20 24 40 32 Q 60 40 80 32"
            fill="none"
            stroke={mid}
            strokeWidth={2.5}
            opacity={0.35}
          />
        </pattern>
      )
    case 'eucalyptus':
      return (
        <pattern id="interior-wallpaper" width={36} height={36} patternUnits="userSpaceOnUse">
          <rect width={36} height={36} fill={wallColor} />
          <ellipse cx={10} cy={12} rx={8} ry={4} fill={dark} opacity={0.3} transform="rotate(-25 10 12)" />
          <ellipse cx={28} cy={26} rx={7} ry={3.5} fill={dark} opacity={0.28} transform="rotate(30 28 26)" />
          <ellipse cx={24} cy={8} rx={5} ry={2.5} fill={light} opacity={0.35} transform="rotate(-10 24 8)" />
        </pattern>
      )
    case 'checks':
      return (
        <pattern id="interior-wallpaper" width={32} height={32} patternUnits="userSpaceOnUse">
          <rect width={32} height={32} fill={wallColor} />
          <rect x={0} y={0} width={16} height={16} fill={mid} opacity={0.35} />
          <rect x={16} y={16} width={16} height={16} fill={mid} opacity={0.35} />
          <rect x={16} y={0} width={16} height={16} fill={accent} opacity={0.12} />
          <rect x={0} y={16} width={16} height={16} fill={accent} opacity={0.12} />
        </pattern>
      )
    default:
      return null
  }
}

/** Tiny preview for palette swatches */
export function WallpaperPreviewSwatch({
  wallpaperId,
  wallColor,
}: {
  wallpaperId: WallpaperId | string
  wallColor: string
}) {
  const dark = adjustColor(wallColor, -28)
  const mid = adjustColor(wallColor, -14)

  if (wallpaperId === 'none') {
    return (
      <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
        <rect width={40} height={32} rx={6} fill={wallColor} stroke="#4E342E" strokeWidth={1.5} />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
      <rect width={40} height={32} rx={6} fill={wallColor} stroke="#4E342E" strokeWidth={1.5} />
      {wallpaperId === 'stripes' &&
        [0, 8, 16, 24, 32].map((x) => (
          <rect key={x} x={x} width={4} height={32} fill={mid} opacity={0.45} />
        ))}
      {wallpaperId === 'dots' &&
        [
          [8, 8],
          [24, 8],
          [16, 20],
          [32, 20],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3} fill={dark} opacity={0.4} />
        ))}
      {wallpaperId === 'waves' && (
        <path
          d="M 2 18 Q 12 12 22 18 Q 32 24 38 18"
          fill="none"
          stroke={dark}
          strokeWidth={2}
          opacity={0.45}
        />
      )}
      {wallpaperId === 'eucalyptus' && (
        <>
          <ellipse cx={12} cy={14} rx={7} ry={3} fill={dark} opacity={0.35} transform="rotate(-20 12 14)" />
          <ellipse cx={28} cy={20} rx={6} ry={3} fill={dark} opacity={0.3} transform="rotate(25 28 20)" />
        </>
      )}
      {wallpaperId === 'checks' &&
        [0, 8, 16, 24].map((x) =>
          [0, 8, 16, 24].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={8}
              height={8}
              fill={(x + y) % 16 === 0 ? mid : 'transparent'}
              opacity={0.4}
            />
          )),
        )}
    </svg>
  )
}
