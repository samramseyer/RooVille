import { useEffect, useMemo, useState } from 'react'
import type { BuildingCategory, BuildingDef } from '../types'
import { BUILDINGS, CATEGORY_LABELS, getBuildingsByCategory } from '../data/buildings'
import { getBuildingRoomSummary } from '../data/buildingMeta'
import { BuildingArt } from './BuildingArt'

interface BuildingPaletteProps {
  onSelectBuilding: (building: BuildingDef) => void
  selectedBuildingId: string | null
  editMode?: boolean
  favoriteBuildingIds?: string[]
  onToggleFavorite?: (buildingId: string) => void
  suggestedCategory?: BuildingCategory | null
}

const CATEGORIES: BuildingCategory[] = [
  'houses',
  'businesses',
  'docks',
  'roads',
  'boats',
  'boathouses',
  'zoos',
  'decor',
]

export function BuildingPalette({
  onSelectBuilding,
  selectedBuildingId,
  editMode,
  favoriteBuildingIds = [],
  onToggleFavorite,
  suggestedCategory,
}: BuildingPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<BuildingCategory>(
    suggestedCategory ?? 'houses',
  )
  const [search, setSearch] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  useEffect(() => {
    if (suggestedCategory) setActiveCategory(suggestedCategory)
  }, [suggestedCategory])

  const categoryItems = getBuildingsByCategory(activeCategory)

  const items = useMemo(() => {
    let list = categoryItems
    if (showFavoritesOnly) {
      list = list.filter((b) => favoriteBuildingIds.includes(b.id))
    }
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter((b) => b.name.toLowerCase().includes(q))
    }
    return list
  }, [categoryItems, showFavoritesOnly, favoriteBuildingIds, search])

  return (
    <aside className={`building-palette${editMode ? ' palette-dimmed' : ''}`}>
      <h3 className="palette-title">Build Menu</h3>
      <p className="palette-hint">
        {editMode
          ? 'Tap Done in the edit panel below, or tap empty map to finish editing.'
          : activeCategory === 'roads'
            ? 'Roads snap to a grid — rotate before placing, or tap a road to turn it after!'
            : 'Pick something, then tap the map to place it!'}
      </p>

      <div className="palette-search-row">
        <input
          type="search"
          className="palette-search-input"
          placeholder="Search buildings…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search buildings"
        />
        {favoriteBuildingIds.length > 0 && (
          <button
            type="button"
            className={`btn btn-small palette-fav-toggle${showFavoritesOnly ? ' active' : ''}`}
            onClick={() => setShowFavoritesOnly((v) => !v)}
            title="Show favorites only"
          >
            ★
          </button>
        )}
      </div>

      <nav className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab${activeCategory === cat ? ' active' : ''}${suggestedCategory === cat ? ' suggested' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {CATEGORY_LABELS[cat]}
            {suggestedCategory === cat && <span className="category-suggested-dot" aria-hidden="true" />}
          </button>
        ))}
      </nav>

      <div className="building-grid">
        {items.length === 0 && (
          <p className="palette-empty">
            {showFavoritesOnly ? 'No favorites in this category yet.' : 'No buildings match your search.'}
          </p>
        )}
        {items.map((b) => {
          const roomSummary = getBuildingRoomSummary(b.id)
          const isFavorite = favoriteBuildingIds.includes(b.id)
          return (
            <div key={b.id} className="building-card-wrap">
              {onToggleFavorite && (
                <button
                  type="button"
                  className={`building-fav-btn${isFavorite ? ' active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(b.id)
                  }}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              )}
              <button
                type="button"
                className={`building-card${selectedBuildingId === b.id ? ' selected' : ''}`}
                onClick={() => onSelectBuilding(b)}
                title={b.name}
              >
                <BuildingArt id={b.id} width={48} height={48} className="building-preview" />
                <span className="building-name">{b.name}</span>
                {roomSummary && <span className="building-room-label">{roomSummary.label}</span>}
              </button>
            </div>
          )
        })}
      </div>

      <div className="palette-footer">
        <p className="palette-tip">💡 Tap any placed item to select it — then turn or delete it</p>
      </div>
    </aside>
  )
}

export { BUILDINGS }
