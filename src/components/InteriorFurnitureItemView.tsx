import type { InteriorItem } from '../types'
import type { CountertopMaterial } from '../data/interiorCabinetStyles'
import type { FurnitureDef } from '../data/interiorFurniture'
import { getFurnitureDimensions, isResizableFurniture, isWallBaseMounted, isWallMounted } from '../data/interiorFurniture'
import { InteriorFurnitureArt } from './InteriorFurnitureArt'

const ROOM_WIDTH = 640
const ROOM_HEIGHT = 480

interface InteriorFurnitureItemViewProps {
  item: InteriorItem
  def: FurnitureDef
  selected: boolean
  cabinetColor?: string
  countertopMaterial?: CountertopMaterial
  onPointerDown: (e: React.PointerEvent) => void
  onResizePointerDown: (e: React.PointerEvent) => void
  onPointerMove?: (e: React.PointerEvent) => void
  onPointerUp?: (e: React.PointerEvent) => void
}

export function InteriorFurnitureItemView({
  item,
  def,
  selected,
  cabinetColor,
  countertopMaterial,
  onPointerDown,
  onResizePointerDown,
  onPointerMove,
  onPointerUp,
}: InteriorFurnitureItemViewProps) {
  const { width, height } = getFurnitureDimensions(item, def)
  const resizable = isResizableFurniture(item.furnitureId)

  return (
    <div
      className={`interior-furniture${selected ? ' selected' : ''}${item.furnitureId === 'rug' ? ' is-rug' : ''}${isWallMounted(item.furnitureId, item.y, height) ? ' is-wall' : ''}${isWallBaseMounted(item.furnitureId, item.y, height) ? ' is-wall-base' : ''}${resizable ? ' is-resizable' : ''}`}
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
      <InteriorFurnitureArt
        id={item.furnitureId}
        emoji={def.emoji}
        cabinetColor={cabinetColor}
        countertopMaterial={countertopMaterial}
      />
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
