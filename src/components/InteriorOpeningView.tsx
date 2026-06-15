import type { DoorStyleId, InteriorOpening, TrimProfileId, WindowStyleId } from '../types'
import type { WindowViewId } from '../data/interiorWindowView'
import { getOpeningDoorStyle, getOpeningWindowStyle } from '../data/interiorOpenings'
import type { InteriorTheme } from '../data/enterableBuildings'
import { InteriorDoor, InteriorWindow } from './InteriorDoorsTrim'
import { OPENING_CASE_INSET } from './InteriorTrimProfiles'

interface InteriorOpeningViewProps {
  opening: InteriorOpening
  theme: InteriorTheme
  defaultWindowStyleId: WindowStyleId
  defaultDoorStyleId: DoorStyleId
  trimColor: string
  windowView: WindowViewId
  casingProfile?: TrimProfileId
  selected: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onResizePointerDown: (e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

export function InteriorOpeningView({
  opening,
  theme,
  defaultWindowStyleId,
  defaultDoorStyleId,
  trimColor,
  windowView,
  casingProfile = 'standard',
  selected,
  onPointerDown,
  onResizePointerDown,
  onPointerMove,
  onPointerUp,
}: InteriorOpeningViewProps) {
  const { kind, width, height } = opening
  const windowStyleId = getOpeningWindowStyle(opening, defaultWindowStyleId, theme)
  const doorStyleId = getOpeningDoorStyle(opening, defaultDoorStyleId, theme)
  const caseInset = OPENING_CASE_INSET

  return (
    <div
      className={`interior-opening interior-opening--${kind}${selected ? ' selected' : ''}`}
      style={{
        left: `${(opening.x / 640) * 100}%`,
        top: `${(opening.y / 480) * 100}%`,
        width: `${(width / 640) * 100}%`,
        height: `${(height / 480) * 100}%`,
        overflow: 'visible',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <svg
        viewBox={`${-caseInset} ${-caseInset} ${width + caseInset * 2} ${height + caseInset * 2}`}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${(-caseInset / width) * 100}%`,
          top: `${(-caseInset / height) * 100}%`,
          width: `${((width + caseInset * 2) / width) * 100}%`,
          height: `${((height + caseInset * 2) / height) * 100}%`,
          overflow: 'visible',
        }}
      >
        {kind === 'window' ? (
          <InteriorWindow
            x={0}
            y={0}
            width={width}
            height={height}
            view={windowView}
            windowStyleId={windowStyleId}
            frameColor={trimColor}
            clipId={`opening-win-${opening.id}`}
            casingProfile={casingProfile}
          />
        ) : (
          <InteriorDoor
            x={0}
            y={0}
            width={width}
            height={height}
            doorStyleId={doorStyleId}
            trimColor={trimColor}
            casingProfile={casingProfile}
          />
        )}
      </svg>
      {selected && (
        <>
          <div className="selection-ring" />
          <button
            type="button"
            className="opening-resize-handle"
            aria-label="Resize"
            onPointerDown={onResizePointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
        </>
      )}
    </div>
  )
}
