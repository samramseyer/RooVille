import type { BuildingDef, PlacedItem } from '../types'
import { BuildingArt } from './BuildingArt'

interface ItemEditPanelProps {
  item: PlacedItem
  building: BuildingDef
  onRotateLeft: () => void
  onRotateRight: () => void
  onDelete: () => void
  onDeselect: () => void
  onEnter?: () => void
}

export function ItemEditPanel({
  item,
  building,
  onRotateLeft,
  onRotateRight,
  onDelete,
  onDeselect,
  onEnter,
}: ItemEditPanelProps) {
  const facing =
    item.rotation === 0
      ? 'Facing right →'
      : item.rotation === 90
        ? 'Facing down ↓'
        : item.rotation === 180
          ? 'Facing left ←'
          : item.rotation === 270
            ? 'Facing up ↑'
            : `Rotated ${item.rotation}°`

  return (
    <div className="item-edit-panel">
      <div className="item-edit-header">
        <BuildingArt id={building.id} rotation={item.rotation} width={40} height={40} className="item-edit-preview" />
        <div>
          <strong>{building.name}</strong>
          <span className="item-edit-facing">{facing}</span>
        </div>
      </div>

      <p className="item-edit-hint">
        {building.category === 'roads'
          ? 'Tap ↺ Turn left / Turn right ↻ to rotate, then drag to reposition on the grid.'
          : onEnter
            ? 'Drag your avatar nearby, or go inside to decorate!'
            : 'Drag it on the map to move it'}
      </p>

      <div className="item-edit-actions">
        {onEnter && (
          <button type="button" className="btn btn-edit btn-enter" onClick={onEnter}>
            🚪 Go inside
          </button>
        )}
        <button type="button" className="btn btn-edit" onClick={onRotateLeft}>
          ↺ Turn left
        </button>
        <button type="button" className="btn btn-edit" onClick={onRotateRight}>
          Turn right ↻
        </button>
        <button type="button" className="btn btn-edit btn-delete" onClick={onDelete}>
          🗑️ Delete
        </button>
        <button type="button" className="btn btn-ghost btn-small item-edit-done" onClick={onDeselect}>
          Done
        </button>
      </div>
    </div>
  )
}
