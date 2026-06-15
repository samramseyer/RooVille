import type { InteriorStyle } from '../types'
import { getFloorColor } from '../data/interiorStyles'
import { OceanPanoramaWithBoats } from './InteriorWindowViews'
import { TocaShadeDefs, adjustColor } from './toca/tocaShading'

const S = '#4E342E'
const LH_RED = '#B74A42'
const LH_RED_DARK = '#9E3D36'
const METAL = '#7B8FA1'
const METAL_DARK = '#5C6F82'

/** Vertical center between the window view and deck — lantern straddles both. */
const LANTERN_CX = 320
const LANTERN_CENTER_Y = 218
const LANTERN_SCALE = 0.85
const LANTERN_LIFT = 100

function BigLantern() {
  const cx = LANTERN_CX
  const baseTop = 400 - LANTERN_LIFT
  const baseBottom = 458 - LANTERN_LIFT
  const glassTop = 228 - LANTERN_LIFT
  const glassBottom = 400 - LANTERN_LIFT
  const glassHalfW = 108
  const roofPeak = 196 - LANTERN_LIFT
  const lampY = LANTERN_CENTER_Y + 6

  const glassBars = [-72, -36, 0, 36, 72]

  return (
    <g
      className="lighthouse-lantern-art"
      transform={`translate(${LANTERN_CX} ${LANTERN_CENTER_Y}) scale(${LANTERN_SCALE}) translate(${-LANTERN_CX} ${-LANTERN_CENTER_Y})`}
      aria-hidden="true"
    >
      {/* Ambient glow — spills into window and onto deck */}
      <ellipse cx={cx} cy={LANTERN_CENTER_Y + 12} rx={190} ry={88} fill="#FFD54F" opacity={0.14} />
      <ellipse cx={cx} cy={LANTERN_CENTER_Y} rx={130} ry={58} fill="#FFE082" opacity={0.22} />

      {/* Deck platform ring */}
      <ellipse cx={cx} cy={baseBottom - 4} rx={132} ry={18} fill={adjustColor(METAL_DARK, -10)} stroke={S} strokeWidth={2.5} />
      <ellipse cx={cx} cy={baseBottom - 10} rx={118} ry={14} fill={METAL} stroke={S} strokeWidth={2} />

      {/* Heavy service base / pedestal */}
      <path
        d={`M ${cx - 98} ${baseTop} L ${cx - 88} ${baseBottom - 8} Q ${cx} ${baseBottom + 2} ${cx + 88} ${baseBottom - 8} L ${cx + 98} ${baseTop} Z`}
        fill={LH_RED_DARK}
        stroke={S}
        strokeWidth={3}
      />
      <rect x={cx - 82} y={baseTop - 18} width={164} height={22} rx={4} fill={LH_RED} stroke={S} strokeWidth={2.5} />
      {[cx - 62, cx - 20, cx + 20, cx + 62].map((x) => (
        <circle key={x} cx={x} cy={baseTop - 7} r={4} fill={METAL_DARK} stroke={S} strokeWidth={1} />
      ))}

      {/* Iron gallery rail below glass */}
      <rect x={cx - glassHalfW - 10} y={glassBottom - 8} width={(glassHalfW + 10) * 2} height={10} rx={3} fill={METAL_DARK} stroke={S} strokeWidth={2} />
      {[-90, -54, -18, 18, 54, 90].map((offset) => (
        <rect
          key={offset}
          x={cx + offset - 3}
          y={glassBottom - 28}
          width={6}
          height={22}
          rx={2}
          fill={METAL}
          stroke={S}
          strokeWidth={1.2}
        />
      ))}

      {/* Glass lantern room — tall cylindrical housing */}
      <rect
        x={cx - glassHalfW}
        y={glassTop}
        width={glassHalfW * 2}
        height={glassBottom - glassTop}
        rx={10}
        fill="#D8ECF8"
        stroke={S}
        strokeWidth={3}
        opacity={0.94}
      />
      <rect
        x={cx - glassHalfW + 10}
        y={glassTop + 10}
        width={glassHalfW * 2 - 20}
        height={glassBottom - glassTop - 20}
        rx={6}
        fill="#FFFDE7"
        stroke={LH_RED}
        strokeWidth={2}
        opacity={0.88}
      />

      {/* Fresnel-style lens segments */}
      {[-1, 1].map((side) => (
        <path
          key={side}
          d={`M ${cx + side * 28} ${glassTop + 18} Q ${cx + side * 78} ${(glassTop + glassBottom) / 2} ${cx + side * 28} ${glassBottom - 18}`}
          fill="none"
          stroke="#B3E5FC"
          strokeWidth={4}
          opacity={0.45}
        />
      ))}

      {/* Vertical mullions */}
      {glassBars.map((offset) => (
        <line
          key={offset}
          x1={cx + offset}
          y1={glassTop + 6}
          x2={cx + offset}
          y2={glassBottom - 6}
          stroke={LH_RED}
          strokeWidth={3.5}
        />
      ))}
      {[0.32, 0.52, 0.72].map((t) => (
        <line
          key={t}
          x1={cx - glassHalfW + 8}
          y1={glassTop + (glassBottom - glassTop) * t}
          x2={cx + glassHalfW - 8}
          y2={glassTop + (glassBottom - glassTop) * t}
          stroke={LH_RED}
          strokeWidth={2.5}
          opacity={0.85}
        />
      ))}

      {/* Inner lamp */}
      <ellipse cx={cx} cy={lampY + 8} rx={52} ry={38} fill="#FFD54F" opacity={0.92} />
      <ellipse cx={cx} cy={lampY + 2} rx={34} ry={24} fill="#FFF9C4" opacity={0.98} />
      <ellipse cx={cx - 10} cy={lampY - 4} rx={10} ry={7} fill="#FFFFFF" opacity={0.55} />

      {/* Conical roof */}
      <path
        d={`M ${cx - glassHalfW - 14} ${glassTop} L ${cx} ${roofPeak} L ${cx + glassHalfW + 14} ${glassTop} Z`}
        fill={LH_RED_DARK}
        stroke={S}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx - 42} ${glassTop + 4} L ${cx} ${roofPeak + 18} L ${cx + 42} ${glassTop + 4} Z`}
        fill={LH_RED}
        stroke={S}
        strokeWidth={2}
        opacity={0.85}
      />

      {/* Vent ball & lightning rod */}
      <rect x={cx - 14} y={roofPeak - 6} width={28} height={18} rx={8} fill={METAL} stroke={S} strokeWidth={2} />
      <circle cx={cx} cy={roofPeak - 10} r={10} fill={METAL_DARK} stroke={S} strokeWidth={2} />
      <line x1={cx} y1={roofPeak - 20} x2={cx} y2={118} stroke={METAL_DARK} strokeWidth={2.5} strokeLinecap="round" />

      {/* Light beams sweeping outward through the window */}
      <path d={`M ${cx - 40} ${lampY} L ${cx - 280} ${lampY - 60}`} stroke="#FFE082" strokeWidth={5} opacity={0.28} strokeLinecap="round" />
      <path d={`M ${cx + 40} ${lampY} L ${cx + 280} ${lampY - 60}`} stroke="#FFE082" strokeWidth={5} opacity={0.28} strokeLinecap="round" />
      <path d={`M ${cx - 20} ${lampY - 10} L ${cx - 180} ${lampY - 110}`} stroke="#FFF9C4" strokeWidth={3} opacity={0.2} strokeLinecap="round" />
      <path d={`M ${cx + 20} ${lampY - 10} L ${cx + 180} ${lampY - 110}`} stroke="#FFF9C4" strokeWidth={3} opacity={0.2} strokeLinecap="round" />
    </g>
  )
}

export function LighthouseLanternDeckBackground({ style }: { style: InteriorStyle }) {
  const deck = getFloorColor(style, style.floorTypeId)
  const deckDark = adjustColor(deck, -18)
  const trim = style.trimColor ?? LH_RED

  const winX = 24
  const winY = 16
  const winW = 592
  const winH = 168

  return (
    <>
      <TocaShadeDefs />
      <defs>
        <linearGradient id="lh-deck" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={deck} />
          <stop offset="100%" stopColor={deckDark} />
        </linearGradient>
        <clipPath id="lh-giant-window">
          <rect x={winX + 8} y={winY + 8} width={winW - 16} height={winH - 16} rx={4} />
        </clipPath>
      </defs>

      {/* Side wall strips */}
      <rect x={0} y={0} width={winX} height={200} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />
      <rect x={winX + winW} y={0} width={640 - winX - winW} height={200} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />

      {/* Giant window frame */}
      <rect x={winX} y={winY} width={winW} height={winH} rx={6} fill={trim} stroke={S} strokeWidth={3} />
      <rect x={winX + 4} y={winY + 4} width={winW - 8} height={winH - 8} rx={4} fill="#FFFFFF" stroke={LH_RED_DARK} strokeWidth={2} />

      {/* Panoramic sea view */}
      <g clipPath="url(#lh-giant-window)">
        <OceanPanoramaWithBoats x={winX + 8} y={winY + 8} width={winW - 16} height={winH - 16} />
      </g>

      {/* Window mullions */}
      <line x1={320} y1={winY + 8} x2={320} y2={winY + winH - 8} stroke={trim} strokeWidth={3} />
      <line x1={winX + 8} y1={winY + winH * 0.55} x2={winX + winW - 8} y2={winY + winH * 0.55} stroke={trim} strokeWidth={2.5} opacity={0.85} />

      {/* Sill + deck transition */}
      <rect x={0} y={188} width={640} height={14} fill={trim} stroke={S} strokeWidth={2} />
      <rect x={0} y={200} width={640} height={280} fill="url(#lh-deck)" />

      {/* Deck planks — visible on sides around the lantern base */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={i * 72}
          y1={200}
          x2={i * 72 - 20}
          y2={480}
          stroke={adjustColor(deck, -28)}
          strokeWidth={2}
          opacity={0.35}
        />
      ))}

      {/* Center lantern — overlaps the window and deck, centered on both */}
      <BigLantern />
    </>
  )
}
