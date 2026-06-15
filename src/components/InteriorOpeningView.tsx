import type { DoorStyleId, InteriorOpening, WindowStyleId } from '../types'
import type { WindowViewId } from '../data/interiorWindowView'
import { InteriorDoor, InteriorWindow } from './InteriorDoorsTrim'

interface InteriorOpeningViewProps {
  opening: InteriorOpening
  windowStyleId: WindowStyleId
  doorStyleId: DoorStyleId
  trimColor: string
  windowView: WindowViewId
  selected: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onResizePointerDown: (e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

export function InteriorOpeningView({
  opening,
  windowStyleId,
  doorStyleId,
  trimColor,
  windowView,
  selected,
  onPointerDown,
  onResizePointerDown,
  onPointerMove,
  onPointerUp,
}: InteriorOpeningViewProps) {
  const { kind, width, height } = opening

  return (
    <div
      className={`interior-opening interior-opening--${kind}${selected ? ' selected' : ''}`}
      style={{
        left: `${(opening.x / 640) * 100}%`,
        top: `${(opening.y / 480) * 100}%`,
        width: `${(width / 640) * 100}%`,
        height: `${(height / 480) * 100}%`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" aria-hidden="true">
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
          />
        ) : (
          <InteriorDoor
            x={0}
            y={0}
            width={width}
            height={height}
            doorStyleId={doorStyleId}
            trimColor={trimColor}
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
