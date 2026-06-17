import { useEffect, useState } from 'react'
import type { FurnitureCategory, FurnitureDef } from '../data/interiorFurniture'
import { FURNITURE_CATEGORIES, getFurniture, getFurnitureByCategory } from '../data/interiorFurniture'
import {
  filterCabinetColors,
  filterCountertopMaterials,
  filterDoorStyles,
  filterFloorPaints,
  filterFloorTypes,
  filterTrimColors,
  filterTrimProfiles,
  filterWainscoting,
  filterWallPaints,
  filterWallpapers,
  filterWindowStyles,
  getBuildingInteriorCatalog,
  getFurnitureForBuilding,
} from '../data/buildingInteriorCatalog'
import type { InteriorTheme } from '../data/enterableBuildings'
import type { CountertopMaterial } from '../data/interiorCabinetStyles'
import {
  getFloorColor,
  getWallpaperColor,
  type FloorTypeId,
  type WallpaperId,
} from '../data/interiorStyles'
import { OPENING_SCALE_OPTIONS } from '../data/interiorOpenings'
import { WINDOW_VIEW_OPTIONS, type WindowViewId } from '../data/interiorWindowView'
import type { InteriorStyle, InteriorOpening, OpeningScaleId, WindowViewSetting, WindowStyleId, DoorStyleId } from '../types'
import { DoorStylePreviewSwatch, WindowStylePreviewSwatch } from './InteriorDoorsTrim'
import { FloorPreviewSwatch } from './InteriorFloorPatterns'
import { InteriorFurnitureArt } from './InteriorFurnitureArt'
import { CountertopMaterialPreview } from './InteriorKitchenBathArt'
import { TrimProfilePreviewSwatch, WainscotingPreviewSwatch } from './InteriorTrimProfiles'
import { WindowViewPreviewSwatch } from './InteriorWindowViews'
import { WallpaperPreviewSwatch } from './InteriorWallpaperPatterns'

export type PaletteTab = 'furniture' | 'walls' | 'openings' | 'trim'
export type InteriorPaletteMode = 'decorate' | 'design' | 'full'

interface InteriorPaletteProps {
  theme?: InteriorTheme
  style: InteriorStyle
  resolvedWindowView: WindowViewId
  selectedOpening?: InteriorOpening | null
  onSelectFurniture: (furniture: FurnitureDef) => void
  onStyleChange: (patch: Partial<InteriorStyle>) => void
  onSelectWindowStyle: (styleId: WindowStyleId) => void
  onSelectDoorStyle: (styleId: DoorStyleId) => void
  onScaleSelectedWindow?: (scaleId: OpeningScaleId) => void
  selectedFurnitureId: string | null
  placementMode?: 'window' | 'door' | null
  onStartPlaceWindow?: () => void
  onStartPlaceDoor?: () => void
  editMode?: boolean
  /** Switches to this tab when set (e.g. when starting window placement). */
  activeTab?: PaletteTab | null
  /** Restrict tabs: decorate = furniture only, design = walls/openings/trim. */
  paletteMode?: InteriorPaletteMode
  /** When set, limits furniture and design options to this house's unique catalog. */
  buildingId?: string
}

const WINDOW_VIEW_LABELS: Record<WindowViewId, string> = {
  ocean: 'Ocean',
  beach: 'Beach',
  dock: 'Dock',
  town: 'Town',
  landscape: 'Landscape',
}

export function InteriorPalette({
  theme = 'home',
  style,
  resolvedWindowView,
  selectedOpening,
  onSelectFurniture,
  onStyleChange,
  onSelectWindowStyle,
  onSelectDoorStyle,
  onScaleSelectedWindow,
  selectedFurnitureId,
  placementMode,
  onStartPlaceWindow,
  onStartPlaceDoor,
  editMode,
  activeTab,
  paletteMode = 'full',
  buildingId,
}: InteriorPaletteProps) {
  const catalog = buildingId ? getBuildingInteriorCatalog(buildingId) : null
  const wallPaints = filterWallPaints(catalog)
  const floorPaints = filterFloorPaints(catalog)
  const wallpapers = filterWallpapers(catalog)
  const floorTypes = filterFloorTypes(catalog)
  const trimColors = filterTrimColors(catalog)
  const windowStyles = filterWindowStyles(catalog)
  const doorStyles = filterDoorStyles(catalog)
  const trimProfiles = filterTrimProfiles(catalog)
  const wainscotingOptions = filterWainscoting(catalog)
  const cabinetColors = filterCabinetColors(catalog)
  const countertopMaterials = filterCountertopMaterials(catalog)
  const visibleCategories = catalog
    ? FURNITURE_CATEGORIES.filter((cat) => getFurnitureForBuilding(buildingId!, cat.id).length > 0)
    : FURNITURE_CATEGORIES

  const [tab, setTab] = useState<PaletteTab>(paletteMode === 'design' ? 'walls' : 'furniture')
  const [furnitureCategory, setFurnitureCategory] = useState<FurnitureCategory>('furniture')

  useEffect(() => {
    if (activeTab) setTab(activeTab)
  }, [activeTab])

  useEffect(() => {
    if (paletteMode === 'decorate' && tab !== 'furniture') setTab('furniture')
    if (paletteMode === 'design' && tab === 'furniture') setTab('walls')
  }, [paletteMode, tab])

  useEffect(() => {
    if (visibleCategories.length > 0 && !visibleCategories.some((c) => c.id === furnitureCategory)) {
      setFurnitureCategory(visibleCategories[0]!.id)
    }
  }, [buildingId, furnitureCategory, visibleCategories])

  const categoryItems = buildingId
    ? getFurnitureForBuilding(buildingId, furnitureCategory)
    : getFurnitureByCategory(furnitureCategory)
  const selectedFurnitureDef = selectedFurnitureId ? getFurniture(selectedFurnitureId) : undefined
  const placementHint = editMode
    ? 'Tap Done below to finish moving furniture.'
    : selectedFurnitureDef
      ? furnitureCategory === 'patio'
        ? 'Tap anywhere to build your patio — deck, balcony, or backyard!'
        : 'Tap anywhere in the room — homes, shops, boats, and boathouses!'
      : 'Pick an item, then tap the room to place it!'
  const trimColor = style.trimColor ?? '#C4956A'
  const baseTrimProfile = style.baseTrimProfileId ?? 'standard'
  const casingTrimProfile = style.casingTrimProfileId ?? 'standard'
  const wainscotingId = style.wainscotingId ?? 'none'
  const defaultWindowStyle = style.windowStyleId ?? 'classic'
  const defaultDoorStyle = style.doorStyleId ?? 'panel'
  const activeWindowStyle =
    selectedOpening?.kind === 'window'
      ? (selectedOpening.windowStyleId ?? defaultWindowStyle)
      : defaultWindowStyle
  const activeDoorStyle =
    selectedOpening?.kind === 'door'
      ? (selectedOpening.doorStyleId ?? defaultDoorStyle)
      : defaultDoorStyle
  const cabinetColor = style.cabinetColor ?? '#FFF8F0'
  const countertopMaterial = style.countertopMaterial ?? 'wood'
  const showCabinetFinishes =
    furnitureCategory === 'kitchen-cabinets' || furnitureCategory === 'countertops'

  if (theme === 'zoo') {
    const animalItems = getFurnitureByCategory('zoo-animals')
    return (
      <aside className={`interior-palette${editMode ? ' palette-dimmed' : ''}`}>
        <h3 className="palette-title">Animals</h3>
        <p className="palette-hint">
          {selectedFurnitureDef
            ? `Placing: ${selectedFurnitureDef.name} — tap the room floor to place it`
            : 'Pick an animal, then tap the room to place it like furniture'}
        </p>
        <div className="interior-furniture-grid">
          {animalItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`interior-furniture-btn${selectedFurnitureId === item.id ? ' selected' : ''}`}
              onClick={() => onSelectFurniture(item)}
              title={item.name}
            >
              <InteriorFurnitureArt id={item.id} emoji={item.emoji} />
              <span>{item.emoji}</span>
            </button>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className={`interior-palette${editMode ? ' palette-dimmed' : ''}`}>
      <h3 className="palette-title">
        {catalog ? `${catalog.collectionName} · ${paletteMode === 'design' ? 'Design' : 'Decorate'}` : paletteMode === 'design' ? 'Design' : 'Decorate'}
      </h3>
      {catalog && (
        <p className="palette-hint palette-collection-note">Unique options for this house type only.</p>
      )}

      <nav className="interior-palette-tabs interior-palette-tabs-4">
        {(paletteMode === 'full' || paletteMode === 'decorate') && (
          <button
            type="button"
            className={`interior-tab${tab === 'furniture' ? ' active' : ''}`}
            onClick={() => setTab('furniture')}
          >
            🛋️ Furniture
          </button>
        )}
        {(paletteMode === 'full' || paletteMode === 'design') && (
          <>
            <button
              type="button"
              className={`interior-tab${tab === 'walls' ? ' active' : ''}`}
              onClick={() => setTab('walls')}
            >
              🎨 Walls
            </button>
            <button
              type="button"
              className={`interior-tab${tab === 'openings' ? ' active' : ''}`}
              onClick={() => setTab('openings')}
            >
              🪟 Windows
            </button>
            <button
              type="button"
              className={`interior-tab${tab === 'trim' ? ' active' : ''}`}
              onClick={() => setTab('trim')}
            >
              🖌️ Trim
            </button>
          </>
        )}
      </nav>

      {tab === 'furniture' && (
        <>
          <p className="palette-hint">{placementHint}</p>
          <div className="interior-furniture-categories">
            {visibleCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`interior-furniture-category${furnitureCategory === category.id ? ' active' : ''}`}
                onClick={() => setFurnitureCategory(category.id)}
                title={category.name}
              >
                {category.emoji} {category.name}
              </button>
            ))}
          </div>
          {showCabinetFinishes && (
            <>
              <section className="interior-style-section">
                <h4 className="interior-style-heading">Cabinet colour</h4>
                <p className="interior-style-note">Applies to all kitchen and bathroom cabinets in this room.</p>
                <div className="interior-color-row">
                  {cabinetColors.map((paint) => (
                    <button
                      key={paint.id}
                      type="button"
                      className={`color-swatch interior-color-swatch${cabinetColor === paint.color ? ' selected' : ''}`}
                      style={{ background: paint.color }}
                      onClick={() => onStyleChange({ cabinetColor: paint.color })}
                      title={paint.name}
                      aria-label={`Cabinet colour: ${paint.name}`}
                    />
                  ))}
                </div>
              </section>
              <section className="interior-style-section">
                <h4 className="interior-style-heading">Countertop material</h4>
                <p className="interior-style-note">Used on cabinets, islands, and countertop slabs.</p>
                <div className="interior-wallpaper-grid">
                  {countertopMaterials.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`interior-wallpaper-btn${countertopMaterial === option.id ? ' selected' : ''}`}
                      onClick={() =>
                        onStyleChange({ countertopMaterial: option.id as CountertopMaterial })
                      }
                      title={option.name}
                    >
                      <CountertopMaterialPreview material={option.id} />
                      <span>{option.emoji}</span>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}
          <div className="interior-furniture-grid">
            {categoryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`building-card interior-card${selectedFurnitureId === item.id ? ' selected' : ''}`}
                onClick={() => onSelectFurniture(item)}
              >
                <div
                  className="building-preview interior-preview"
                  style={{ width: '100%', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <InteriorFurnitureArt
                    id={item.id}
                    emoji={item.emoji}
                    cabinetColor={cabinetColor}
                    countertopMaterial={countertopMaterial}
                  />
                </div>
                <span className="building-card-name">
                  {item.emoji} {item.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {tab === 'walls' && (
        <>
          <p className="palette-hint">Customise walls and floors — each pattern remembers its colour!</p>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Wallpaper</h4>
            <div className="interior-wallpaper-grid">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  type="button"
                  className={`interior-wallpaper-btn${style.wallpaperId === wp.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ wallpaperId: wp.id as WallpaperId })}
                  title={wp.name}
                >
                  <WallpaperPreviewSwatch
                    wallpaperId={wp.id}
                    wallColor={getWallpaperColor(style, wp.id)}
                  />
                  <span>{wp.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          {style.wallpaperId === 'none' ? (
            <section className="interior-style-section">
              <h4 className="interior-style-heading">Wall paint</h4>
              <div className="interior-color-row">
                {wallPaints.map((paint) => (
                  <button
                    key={paint.id}
                    type="button"
                    className={`color-swatch interior-color-swatch${style.wallColor === paint.color ? ' selected' : ''}`}
                    style={{ background: paint.color }}
                    onClick={() => onStyleChange({ wallColor: paint.color })}
                    title={paint.name}
                    aria-label={`Wall colour: ${paint.name}`}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="interior-style-section">
              <h4 className="interior-style-heading">
                {wallpapers.find((w) => w.id === style.wallpaperId)?.name ?? 'Pattern'} colour
              </h4>
              <div className="interior-color-row">
                {wallPaints.map((paint) => {
                  const activeColor = getWallpaperColor(style, style.wallpaperId)
                  return (
                    <button
                      key={paint.id}
                      type="button"
                      className={`color-swatch interior-color-swatch${activeColor === paint.color ? ' selected' : ''}`}
                      style={{ background: paint.color }}
                      onClick={() =>
                        onStyleChange({
                          wallpaperColors: {
                            ...style.wallpaperColors,
                            [style.wallpaperId]: paint.color,
                          },
                        })
                      }
                      title={paint.name}
                      aria-label={`Wallpaper colour: ${paint.name}`}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {style.wallpaperId !== 'none' && (
            <section className="interior-style-section interior-style-subsection">
              <h4 className="interior-style-heading">Plain wall paint</h4>
              <p className="interior-style-note">Used when you switch back to plain walls.</p>
              <div className="interior-color-row">
                {wallPaints.map((paint) => (
                  <button
                    key={`plain-${paint.id}`}
                    type="button"
                    className={`color-swatch interior-color-swatch interior-color-swatch-sm${style.wallColor === paint.color ? ' selected' : ''}`}
                    style={{ background: paint.color }}
                    onClick={() => onStyleChange({ wallColor: paint.color })}
                    title={paint.name}
                    aria-label={`Plain wall colour: ${paint.name}`}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Flooring</h4>
            <div className="interior-wallpaper-grid">
              {floorTypes.map((ft) => (
                <button
                  key={ft.id}
                  type="button"
                  className={`interior-wallpaper-btn${style.floorTypeId === ft.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ floorTypeId: ft.id as FloorTypeId })}
                  title={ft.name}
                >
                  <FloorPreviewSwatch
                    floorTypeId={ft.id}
                    floorColor={getFloorColor(style, ft.id)}
                  />
                  <span>{ft.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          {style.floorTypeId === 'paint' ? (
            <section className="interior-style-section">
              <h4 className="interior-style-heading">Floor paint</h4>
              <div className="interior-color-row">
                {floorPaints.map((paint) => (
                  <button
                    key={paint.id}
                    type="button"
                    className={`color-swatch interior-color-swatch${style.floorColor === paint.color ? ' selected' : ''}`}
                    style={{ background: paint.color }}
                    onClick={() => onStyleChange({ floorColor: paint.color })}
                    title={paint.name}
                    aria-label={`Floor colour: ${paint.name}`}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="interior-style-section">
              <h4 className="interior-style-heading">
                {floorTypes.find((f) => f.id === style.floorTypeId)?.name ?? 'Floor'} colour
              </h4>
              <div className="interior-color-row">
                {floorPaints.map((paint) => {
                  const activeColor = getFloorColor(style, style.floorTypeId)
                  return (
                    <button
                      key={paint.id}
                      type="button"
                      className={`color-swatch interior-color-swatch${activeColor === paint.color ? ' selected' : ''}`}
                      style={{ background: paint.color }}
                      onClick={() =>
                        onStyleChange({
                          floorTypeColors: {
                            ...style.floorTypeColors,
                            [style.floorTypeId]: paint.color,
                          },
                        })
                      }
                      title={paint.name}
                      aria-label={`Floor colour: ${paint.name}`}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {style.floorTypeId !== 'paint' && (
            <section className="interior-style-section interior-style-subsection">
              <h4 className="interior-style-heading">Painted floor colour</h4>
              <p className="interior-style-note">Used when you switch back to painted floors.</p>
              <div className="interior-color-row">
                {floorPaints.map((paint) => (
                  <button
                    key={`floor-paint-${paint.id}`}
                    type="button"
                    className={`color-swatch interior-color-swatch interior-color-swatch-sm${style.floorColor === paint.color ? ' selected' : ''}`}
                    style={{ background: paint.color }}
                    onClick={() => onStyleChange({ floorColor: paint.color })}
                    title={paint.name}
                    aria-label={`Painted floor colour: ${paint.name}`}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {tab === 'openings' && (
        <>
          <section className="interior-style-section opening-place-section">
            <h4 className="interior-style-heading">Place on wall</h4>
            <p className="palette-hint">
              {placementMode === 'window'
                ? 'Tap a wall in the room — then drag along the wall or use the corner handle to resize.'
                : placementMode === 'door'
                  ? 'Tap the bottom wall to place a door.'
                  : 'Pick a window style below to place it, or tap ＋ Window for a classic window.'}
            </p>
            <div className="opening-place-row">
              <button
                type="button"
                className={`btn btn-small opening-place-btn${placementMode === 'window' ? ' active' : ''}`}
                onClick={onStartPlaceWindow}
              >
                ＋ Window
              </button>
              <button
                type="button"
                className={`btn btn-small opening-place-btn${placementMode === 'door' ? ' active' : ''}`}
                onClick={onStartPlaceDoor}
              >
                ＋ Door
              </button>
            </div>
          </section>

          {selectedOpening?.kind === 'window' && (
            <section className="interior-style-section opening-selected-banner">
              <h4 className="interior-style-heading">Selected window</h4>
              <p className="interior-style-note">
                Drag anywhere along the wall · corner handle to resize · style presets below.
              </p>
              {onScaleSelectedWindow && (
                <>
                  <p className="interior-style-note interior-style-note--tight">Quick size</p>
                  <div className="opening-place-row">
                    {OPENING_SCALE_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className="btn btn-small opening-place-btn"
                        onClick={() => onScaleSelectedWindow(option.id)}
                        title={option.name}
                      >
                        {option.emoji} {option.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

          {selectedOpening?.kind === 'door' && (
            <section className="interior-style-section opening-selected-banner">
              <h4 className="interior-style-heading">Selected door</h4>
              <p className="interior-style-note">
                Drag to move · corner to resize · pick a door style below.
              </p>
            </section>
          )}

          <section className="interior-style-section opening-style-section">
            <h4 className="interior-style-heading">Window style</h4>
            {selectedOpening?.kind === 'window' ? (
              <p className="interior-style-note">Style for the window you selected in the room.</p>
            ) : selectedOpening?.kind === 'door' ? (
              <p className="interior-style-note">Select a window in the room to change its style.</p>
            ) : (
              <p className="interior-style-note">
                Tap any style to place it on a wall like a picture — all styles move and resize the same way.
              </p>
            )}
            <div className="interior-wallpaper-grid">
              {windowStyles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${activeWindowStyle === option.id ? ' selected' : ''}`}
                  onClick={() => onSelectWindowStyle(option.id)}
                  title={option.name}
                  disabled={selectedOpening?.kind === 'door'}
                >
                  <WindowStylePreviewSwatch
                    windowStyleId={option.id}
                    frameColor={trimColor}
                    casingProfile={casingTrimProfile}
                  />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section interior-style-subsection opening-style-section">
            <h4 className="interior-style-heading">Window view</h4>
            <p className="interior-style-note">
              {(style.windowViewId ?? 'auto') === 'auto'
                ? `Auto: showing ${WINDOW_VIEW_LABELS[resolvedWindowView]} from where this building sits in town.`
                : `Pinned to ${WINDOW_VIEW_LABELS[resolvedWindowView]}.`}
            </p>
            <div className="interior-wallpaper-grid interior-window-grid">
              {WINDOW_VIEW_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${(style.windowViewId ?? 'auto') === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ windowViewId: option.id as WindowViewSetting })}
                  title={option.name}
                >
                  <WindowViewPreviewSwatch view={option.id} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section opening-style-section">
            <h4 className="interior-style-heading">Door style</h4>
            {selectedOpening?.kind === 'door' ? (
              <p className="interior-style-note">Style for the door you selected in the room.</p>
            ) : selectedOpening?.kind === 'window' ? (
              <p className="interior-style-note">Select a door in the room to change its style.</p>
            ) : (
              <p className="interior-style-note">
                Tap a door in the room, or pick a default style for new doors.
              </p>
            )}
            <div className="interior-wallpaper-grid">
              {doorStyles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${activeDoorStyle === option.id ? ' selected' : ''}`}
                  onClick={() => onSelectDoorStyle(option.id)}
                  title={option.name}
                  disabled={selectedOpening?.kind === 'window'}
                >
                  <DoorStylePreviewSwatch
                    doorStyleId={option.id}
                    trimColor={trimColor}
                    casingProfile={casingTrimProfile}
                  />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'trim' && (
        <>
          <p className="palette-hint">Choose trim profiles, wainscoting, colours, and casing for windows and doors.</p>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Base trim</h4>
            <p className="interior-style-note">Baseboard along the wall and floor line.</p>
            <div className="interior-wallpaper-grid">
              {trimProfiles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${baseTrimProfile === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ baseTrimProfileId: option.id })}
                  title={option.name}
                >
                  <TrimProfilePreviewSwatch profile={option.id} kind="base" trimColor={trimColor} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Window &amp; door casing</h4>
            <p className="interior-style-note">Outer frame moulding around openings.</p>
            <div className="interior-wallpaper-grid">
              {trimProfiles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${casingTrimProfile === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ casingTrimProfileId: option.id })}
                  title={option.name}
                >
                  <TrimProfilePreviewSwatch profile={option.id} kind="casing" trimColor={trimColor} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Wall wainscoting</h4>
            <p className="interior-style-note">Raised panels and chair rail on the lower wall.</p>
            <div className="interior-wallpaper-grid">
              {wainscotingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${wainscotingId === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ wainscotingId: option.id })}
                  title={option.name}
                >
                  <WainscotingPreviewSwatch wainscotingId={option.id} trimColor={trimColor} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Trim colour</h4>
            <p className="interior-style-note">Frames, baseboards, wainscoting, and doors.</p>
            <div className="interior-color-row">
              {trimColors.map((paint) => (
                <button
                  key={paint.id}
                  type="button"
                  className={`color-swatch interior-color-swatch${trimColor === paint.color ? ' selected' : ''}`}
                  style={{ background: paint.color }}
                  onClick={() => onStyleChange({ trimColor: paint.color })}
                  title={paint.name}
                  aria-label={`Trim colour: ${paint.name}`}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </aside>
  )
}
