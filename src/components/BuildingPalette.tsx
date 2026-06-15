import { useState } from 'react'
import type { BuildingCategory, BuildingDef } from '../types'
import { BUILDINGS, CATEGORY_LABELS, getBuildingsByCategory } from '../data/buildings'
import { BuildingArt } from './BuildingArt'

interface BuildingPaletteProps {
  onSelectBuilding: (building: BuildingDef) => void
  selectedBuildingId: string | null
  editMode?: boolean
}

const CATEGORIES: BuildingCategory[] = [
  'houses',
  'businesses',
  'docks',
  'boats',
  'boathouses',
  'zoos',
  'decor',
]

export function BuildingPalette({ onSelectBuilding, selectedBuildingId, editMode }: BuildingPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<BuildingCategory>('houses')
  const items = getBuildingsByCategory(activeCategory)

  return (
    <aside className={`building-palette${editMode ? ' palette-dimmed' : ''}`}>
      <h3 className="palette-title">Build Menu</h3>
      <p className="palette-hint">
        {editMode
          ? 'Tap Done in the edit panel below, or tap empty map to finish editing.'
          : 'Pick something, then tap the map to place it!'}
      </p>

      <nav className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </nav>

      <div className="building-grid">
        {items.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`building-card${selectedBuildingId === b.id ? ' selected' : ''}`}
            onClick={() => onSelectBuilding(b)}
            title={b.name}
          >
            <BuildingArt id={b.id} width={48} height={48} className="building-preview" />
            <span className="building-name">{b.name}</span>
          </button>
        ))}
      </div>

      <div className="palette-footer">
        <p className="palette-tip">
          💡 Tap any placed item to select it — then turn or delete it
        </p>
      </div>
    </aside>
  )
}

export { BUILDINGS }
