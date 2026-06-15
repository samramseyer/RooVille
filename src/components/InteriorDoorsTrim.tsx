import type { DoorStyleId, WindowStyleId } from '../data/interiorTrimStyles'
import { getWindowFrameRadius, isPortholeWindow } from '../data/interiorTrimStyles'
import type { TrimProfileId } from '../types'
import type { WindowViewId } from '../data/interiorWindowView'
import { OpeningCasing } from './InteriorTrimProfiles'
import { adjustColor } from './toca/tocaShading'
import { WindowViewScene } from './InteriorWindowViews'

const S = '#4E342E'

function WindowPaneCore({
  x,
  y,
  width,
  height,
  view,
  windowStyleId,
  frameColor,
  clipId,
  casingProfile = 'standard',
}: {
  x: number
  y: number
  width: number
  height: number
  view: WindowViewId
  windowStyleId: WindowStyleId
  frameColor: string
  clipId: string
  casingProfile?: TrimProfileId
}) {
  const porthole = isPortholeWindow(windowStyleId)
  const inset = porthole ? 5 : windowStyleId === 'wide' ? 5 : 4
  const innerX = x + inset
  const innerY = y + inset
  const innerW = width - inset * 2
  const innerH = height - inset * 2
  const frameRx = getWindowFrameRadius(windowStyleId)
  const frameDark = adjustColor(frameColor, -18)
  const strokeW = windowStyleId === 'minimal' ? 1.5 : 2

  return (
    <>
      {!porthole && (
        <OpeningCasing
          profile={casingProfile}
          x={x}
          y={y}
          width={width}
          height={height}
          trimColor={frameColor}
          rx={frameRx}
        />
      )}
      <defs>
        <clipPath id={clipId}>
          {porthole ? (
            <circle cx={x + width / 2} cy={y + height / 2} r={width / 2 - inset} />
          ) : (
            <rect x={innerX} y={innerY} width={innerW} height={innerH} rx={Math.max(2, frameRx - 1)} />
          )}
        </clipPath>
      </defs>
      {windowStyleId === 'wide' && (
        <rect
          x={x - 2}
          y={y + height - 8}
          width={width + 4}
          height={10}
          rx={3}
          fill={frameDark}
          stroke={S}
          strokeWidth={1.5}
        />
      )}
      {porthole ? (
        <circle cx={x + width / 2} cy={y + height / 2} r={width / 2} fill={frameColor} stroke={S} strokeWidth={3} />
      ) : (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={frameRx}
          fill={frameColor}
          stroke={S}
          strokeWidth={strokeW}
        />
      )}
      <g clipPath={`url(#${clipId})`}>
        <WindowViewScene view={view} x={innerX} y={innerY} width={innerW} height={innerH} />
      </g>
      {renderWindowPanes(windowStyleId, x, y, width, height, inset, porthole)}
    </>
  )
}

function BayWindow({
  x,
  y,
  width,
  height,
  view,
  frameColor,
  clipPrefix,
  casingProfile = 'standard',
}: {
  x: number
  y: number
  width: number
  height: number
  view: WindowViewId
  frameColor: string
  clipPrefix: string
  casingProfile?: TrimProfileId
}) {
  const wingW = Math.max(width * 0.34, 14)
  const wingH = height * 0.9
  const wingY = y + (height - wingH) / 2
  const centerW = width
  const centerX = x
  const leftX = x - wingW * 0.82
  const rightX = x + centerW - wingW * 0.18
  const frameDark = adjustColor(frameColor, -18)

  return (
    <g>
      {/* Bench seat sill */}
      <rect
        x={leftX - 4}
        y={y + height - 6}
        width={rightX + wingW - leftX + 8}
        height={10}
        rx={3}
        fill={frameDark}
        stroke={S}
        strokeWidth={1.5}
      />
      {/* Left angled wing */}
      <polygon
        points={`${leftX},${wingY + wingH} ${leftX + wingW},${wingY + wingH * 0.12} ${leftX + wingW},${wingY + wingH * 0.88} ${leftX},${wingY}`}
        fill={frameColor}
        stroke={S}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <polygon
        points={`${leftX + 4},${wingY + wingH - 6} ${leftX + wingW - 3},${wingY + wingH * 0.22} ${leftX + wingW - 3},${wingY + wingH * 0.78} ${leftX + 4},${wingY + 6}`}
        fill="#B8E8E4"
        opacity={0.85}
      />
      {/* Right angled wing */}
      <polygon
        points={`${rightX + wingW},${wingY + wingH} ${rightX},${wingY + wingH * 0.12} ${rightX},${wingY + wingH * 0.88} ${rightX + wingW},${wingY}`}
        fill={frameColor}
        stroke={S}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <polygon
        points={`${rightX + wingW - 4},${wingY + wingH - 6} ${rightX + 3},${wingY + wingH * 0.22} ${rightX + 3},${wingY + wingH * 0.78} ${rightX + wingW - 4},${wingY + 6}`}
        fill="#B8E8E4"
        opacity={0.85}
      />
      <WindowPaneCore
        x={centerX}
        y={y}
        width={centerW}
        height={height}
        view={view}
        windowStyleId="classic"
        frameColor={frameColor}
        clipId={`${clipPrefix}-center`}
        casingProfile={casingProfile}
      />
    </g>
  )
}

export function InteriorWindow({
  x,
  y,
  width,
  height,
  view,
  windowStyleId,
  frameColor,
  clipId,
  casingProfile = 'standard',
}: {
  x: number
  y: number
  width: number
  height: number
  view: WindowViewId
  windowStyleId: WindowStyleId
  frameColor: string
  clipId: string
  casingProfile?: TrimProfileId
}) {
  if (windowStyleId === 'bay') {
    return (
      <BayWindow
        x={x}
        y={y}
        width={width}
        height={height}
        view={view}
        frameColor={frameColor}
        clipPrefix={clipId}
        casingProfile={casingProfile}
      />
    )
  }

  return (
    <WindowPaneCore
      x={x}
      y={y}
      width={width}
      height={height}
      view={view}
      windowStyleId={windowStyleId}
      frameColor={frameColor}
      clipId={clipId}
      casingProfile={casingProfile}
    />
  )
}

function renderWindowPanes(
  windowStyleId: WindowStyleId,
  x: number,
  y: number,
  width: number,
  height: number,
  inset: number,
  porthole: boolean,
) {
  const cx = x + width / 2
  const cy = y + height / 2
  const opacity = windowStyleId === 'minimal' ? 0.25 : 0.4
  const sw = windowStyleId === 'minimal' ? 1 : 1.5

  if (porthole) {
    return (
      <>
        <circle cx={cx} cy={cy} r={width / 2 - 2} fill="none" stroke={S} strokeWidth={2.5} />
        <line x1={cx} y1={y + inset} x2={cx} y2={y + height - inset} stroke={S} strokeWidth={sw} opacity={opacity} />
        <line x1={x + inset} y1={cy} x2={x + width - inset} y2={cy} stroke={S} strokeWidth={sw} opacity={opacity} />
      </>
    )
  }

  if (windowStyleId === 'colonial') {
    const thirdW = width / 3
    const halfH = height / 2
    return (
      <>
        <line x1={x + thirdW} y1={y + inset} x2={x + thirdW} y2={y + height - inset} stroke={S} strokeWidth={sw} opacity={opacity} />
        <line x1={x + thirdW * 2} y1={y + inset} x2={x + thirdW * 2} y2={y + height - inset} stroke={S} strokeWidth={sw} opacity={opacity} />
        <line x1={x + inset} y1={y + halfH} x2={x + width - inset} y2={y + halfH} stroke={S} strokeWidth={sw} opacity={opacity} />
      </>
    )
  }

  if (windowStyleId === 'minimal') {
    return (
      <rect
        x={x + inset}
        y={y + inset}
        width={width - inset * 2}
        height={height - inset * 2}
        rx={2}
        fill="none"
        stroke={S}
        strokeWidth={1}
        opacity={0.35}
      />
    )
  }

  if (windowStyleId === 'picture') {
    return (
      <rect
        x={x + inset + 1}
        y={y + inset + 1}
        width={width - inset * 2 - 2}
        height={height - inset * 2 - 2}
        rx={3}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.2}
        opacity={0.28}
      />
    )
  }

  return (
    <>
      <line x1={cx} y1={y + inset} x2={cx} y2={y + height - inset} stroke={S} strokeWidth={sw} opacity={opacity} />
      <line x1={x + inset} y1={cy} x2={x + width - inset} y2={cy} stroke={S} strokeWidth={sw} opacity={opacity} />
    </>
  )
}

export function InteriorDoor({
  x,
  y,
  width,
  height,
  doorStyleId,
  trimColor,
  casingProfile = 'standard',
}: {
  x: number
  y: number
  width: number
  height: number
  doorStyleId: DoorStyleId
  trimColor: string
  casingProfile?: TrimProfileId
}) {
  const dark = adjustColor(trimColor, -22)
  const light = adjustColor(trimColor, 12)
  const doorRx = doorStyleId === 'barn' ? 4 : 6

  return (
    <g>
      <OpeningCasing
        profile={casingProfile}
        x={x}
        y={y}
        width={width}
        height={height}
        trimColor={trimColor}
        rx={doorRx}
      />
      {doorStyleId === 'sliding' ? (
        <rect x={x} y={y} width={width} height={height} rx={4} fill="none" stroke={trimColor} strokeWidth={2.5} />
      ) : (
        <rect x={x} y={y} width={width} height={height} rx={doorStyleId === 'barn' ? 4 : 6} fill={trimColor} stroke={S} strokeWidth={3} opacity={0.92} />
      )}
      {doorStyleId === 'panel' && (
        <>
          <rect x={x + 8} y={y + 8} width={width / 2 - 12} height={height / 2 - 12} rx={3} fill={light} stroke={S} strokeWidth={1.5} opacity={0.55} />
          <rect x={x + width / 2 + 4} y={y + 8} width={width / 2 - 12} height={height / 2 - 12} rx={3} fill={light} stroke={S} strokeWidth={1.5} opacity={0.55} />
          <rect x={x + 8} y={y + height / 2 + 4} width={width / 2 - 12} height={height / 2 - 12} rx={3} fill={dark} stroke={S} strokeWidth={1.5} opacity={0.35} />
          <rect x={x + width / 2 + 4} y={y + height / 2 + 4} width={width / 2 - 12} height={height / 2 - 12} rx={3} fill={dark} stroke={S} strokeWidth={1.5} opacity={0.35} />
        </>
      )}
      {doorStyleId === 'glass' && (
        <>
          <rect x={x + 8} y={y + 8} width={width - 16} height={height * 0.42} rx={3} fill="#B8E8E4" stroke={S} strokeWidth={1.5} opacity={0.75} />
          <rect x={x + 8} y={y + height * 0.52} width={width - 16} height={height * 0.38} rx={3} fill={light} stroke={S} strokeWidth={1.5} opacity={0.45} />
        </>
      )}
      {doorStyleId === 'coastal' && (
        <>
          {[0.12, 0.28, 0.44, 0.6, 0.76].map((p) => (
            <rect
              key={p}
              x={x + 6}
              y={y + height * p}
              width={width - 12}
              height={height * 0.1}
              rx={2}
              fill={Math.round(p * 100) % 24 === 12 ? light : dark}
              opacity={0.4}
              stroke={S}
              strokeWidth={0.8}
            />
          ))}
        </>
      )}
      {doorStyleId === 'barn' && (
        <>
          <line x1={x + 8} y1={y + 8} x2={x + width - 8} y2={y + height - 8} stroke={dark} strokeWidth={3} opacity={0.55} />
          <line x1={x + width - 8} y1={y + 8} x2={x + 8} y2={y + height - 8} stroke={dark} strokeWidth={3} opacity={0.55} />
        </>
      )}
      {doorStyleId === 'french' && (
        <>
          <line x1={x + width / 2} y1={y + 6} x2={x + width / 2} y2={y + height - 6} stroke={S} strokeWidth={2} opacity={0.45} />
          <rect x={x + 8} y={y + 8} width={width / 2 - 14} height={height - 16} rx={3} fill={light} stroke={S} strokeWidth={1.2} opacity={0.35} />
          <rect x={x + width / 2 + 6} y={y + 8} width={width / 2 - 14} height={height - 16} rx={3} fill={light} stroke={S} strokeWidth={1.2} opacity={0.35} />
        </>
      )}
      {doorStyleId === 'hatch' && (
        <>
          <rect x={x + 10} y={y + 10} width={width - 20} height={height - 20} rx={4} fill={dark} stroke={S} strokeWidth={2} opacity={0.45} />
          <line x1={x + 14} y1={y + 14} x2={x + width - 14} y2={y + height - 14} stroke={S} strokeWidth={2} opacity={0.35} />
          <line x1={x + width - 14} y1={y + 14} x2={x + 14} y2={y + height - 14} stroke={S} strokeWidth={2} opacity={0.35} />
          <circle cx={x + width - 16} cy={y + height / 2} r={5} fill="#FFD54F" stroke={S} strokeWidth={1.5} />
        </>
      )}
      {doorStyleId === 'sliding' && (
        <>
          <rect x={x + 4} y={y + 4} width={width - 8} height={height - 10} rx={3} fill="#C8E6F5" stroke={S} strokeWidth={1.8} opacity={0.82} />
          <line x1={x + width / 2} y1={y + 6} x2={x + width / 2} y2={y + height - 12} stroke={S} strokeWidth={1.8} opacity={0.45} />
          <rect x={x + 8} y={y + 10} width={width / 2 - 14} height={height - 24} rx={2} fill="#FFFFFF" opacity={0.22} />
          <rect x={x + width / 2 + 6} y={y + 10} width={width / 2 - 14} height={height - 24} rx={2} fill="#FFFFFF" opacity={0.15} />
          <rect x={x + 3} y={y + height - 8} width={width - 6} height={5} rx={2} fill={dark} stroke={S} strokeWidth={1.2} opacity={0.65} />
          <line x1={x + 8} y1={y + height - 5} x2={x + width - 8} y2={y + height - 5} stroke={S} strokeWidth={1} opacity={0.35} />
        </>
      )}
      {doorStyleId !== 'hatch' && doorStyleId !== 'sliding' && (
        <circle cx={x + width - 14} cy={y + height / 2} r={4} fill="#FFD54F" stroke={S} strokeWidth={1.5} />
      )}
      {doorStyleId === 'sliding' && (
        <circle cx={x + width - 12} cy={y + height / 2} r={3.5} fill="#C0C0C0" stroke={S} strokeWidth={1.2} />
      )}
    </g>
  )
}

export function WindowStylePreviewSwatch({
  windowStyleId,
  frameColor,
  casingProfile = 'standard',
}: {
  windowStyleId: WindowStyleId
  frameColor: string
  casingProfile?: TrimProfileId
}) {
  const isBay = windowStyleId === 'bay'
  return (
    <svg viewBox={isBay ? '0 0 48 32' : '0 0 40 32'} width={40} height={32} aria-hidden="true">
      <rect width={isBay ? 48 : 40} height={32} rx={6} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />
      <InteriorWindow
        x={isBay ? 10 : 8}
        y={6}
        width={isBay ? 28 : 24}
        height={20}
        view="ocean"
        windowStyleId={windowStyleId}
        frameColor={frameColor}
        clipId={`preview-win-${windowStyleId}`}
        casingProfile={casingProfile}
      />
    </svg>
  )
}

export function DoorStylePreviewSwatch({
  doorStyleId,
  trimColor,
  casingProfile = 'standard',
}: {
  doorStyleId: DoorStyleId
  trimColor: string
  casingProfile?: TrimProfileId
}) {
  const isSliding = doorStyleId === 'sliding'
  return (
    <svg viewBox="0 0 40 32" width={40} height={32} aria-hidden="true">
      <rect width={40} height={32} rx={6} fill="#FFF8F0" stroke={S} strokeWidth={1.5} />
      <InteriorDoor
        x={isSliding ? 6 : 12}
        y={4}
        width={isSliding ? 28 : 16}
        height={24}
        doorStyleId={doorStyleId}
        trimColor={trimColor}
        casingProfile={casingProfile}
      />
    </svg>
  )
}
