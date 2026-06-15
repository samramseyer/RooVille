import type { InteriorItem } from '../types'
import type { FurnitureDef } from '../data/interiorFurniture'
import { getFurnitureDimensions, isResizableFurniture, isWallFurniture } from '../data/interiorFurniture'
import { InteriorFurnitureArt } from './InteriorFurnitureArt'

const ROOM_WIDTH = 640
const ROOM_HEIGHT = 480

interface InteriorFurnitureItemViewProps {
  item: InteriorItem
  def: FurnitureDef
  selected: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onResizePointerDown: (e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

export function InteriorFurnitureItemView({
  item,
  def,
  selected,
  onPointerDown,
  onResizePointerDown,
  onPointerMove,
  onPointerUp,
}: InteriorFurnitureItemViewProps) {
  const { width, height } = getFurnitureDimensions(item, def)
  const resizable = isResizableFurniture(item.furnitureId)

  return (
    <div
      className={`interior-furniture${selected ? ' selected' : ''}${item.furnitureId === 'rug' ? ' is-rug' : ''}${isWallFurniture(item.furnitureId) ? ' is-wall' : ''}${resizable ? ' is-resizable' : ''}`}
      style={{
        left: `${(item.x / ROOM_WIDTH) * 100}%`,
        top: `${(item.y / ROOM_HEIGHT) * 100}%`,
        width: `${(width / ROOM_WIDTH) * 100}%`,
        height: `${(height / ROOM_HEIGHT) * 100}%`,
        transform: `rotate(${item.rotation}deg)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <InteriorFurnitureArt id={item.furnitureId} emoji={def.emoji} />
      {selected && (
        <>
          <div className="selection-ring" />
          {resizable && (
            <button
              type="button"
              className="opening-resize-handle furniture-resize-handle"
              aria-label="Resize"
              onPointerDown={onResizePointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          )}
        </>
      )}
    </div>
  )
}
