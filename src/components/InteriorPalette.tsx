import { useState } from 'react'
import type { FurnitureDef } from '../data/interiorFurniture'
import { INTERIOR_FURNITURE } from '../data/interiorFurniture'
import {
  FLOOR_PAINT_COLORS,
  FLOOR_TYPES,
  getFloorColor,
  getWallpaperColor,
  WALLPAPERS,
  WALL_PAINT_COLORS,
  type FloorTypeId,
  type WallpaperId,
} from '../data/interiorStyles'
import {
  DOOR_STYLES,
  TRIM_COLORS,
  WINDOW_STYLES,
} from '../data/interiorTrimStyles'
import { WINDOW_VIEW_OPTIONS, type WindowViewId } from '../data/interiorWindowView'
import type { InteriorStyle, WindowViewSetting } from '../types'
import { DoorStylePreviewSwatch, WindowStylePreviewSwatch } from './InteriorDoorsTrim'
import { FloorPreviewSwatch } from './InteriorFloorPatterns'
import { InteriorFurnitureArt } from './InteriorFurnitureArt'
import { WindowViewPreviewSwatch } from './InteriorWindowViews'
import { WallpaperPreviewSwatch } from './InteriorWallpaperPatterns'

type PaletteTab = 'furniture' | 'walls' | 'trim'

interface InteriorPaletteProps {
  style: InteriorStyle
  resolvedWindowView: WindowViewId
  onSelectFurniture: (furniture: FurnitureDef) => void
  onStyleChange: (patch: Partial<InteriorStyle>) => void
  selectedFurnitureId: string | null
  editMode?: boolean
}

const WINDOW_VIEW_LABELS: Record<WindowViewId, string> = {
  ocean: 'Ocean',
  beach: 'Beach',
  dock: 'Dock',
  town: 'Town',
  landscape: 'Landscape',
}

export function InteriorPalette({
  style,
  resolvedWindowView,
  onSelectFurniture,
  onStyleChange,
  selectedFurnitureId,
  editMode,
}: InteriorPaletteProps) {
  const [tab, setTab] = useState<PaletteTab>('furniture')
  const trimColor = style.trimColor ?? '#C4956A'

  return (
    <aside className={`interior-palette${editMode ? ' palette-dimmed' : ''}`}>
      <h3 className="palette-title">Decorate</h3>

      <nav className="interior-palette-tabs interior-palette-tabs-3">
        <button
          type="button"
          className={`interior-tab${tab === 'furniture' ? ' active' : ''}`}
          onClick={() => setTab('furniture')}
        >
          🛋️ Furniture
        </button>
        <button
          type="button"
          className={`interior-tab${tab === 'walls' ? ' active' : ''}`}
          onClick={() => setTab('walls')}
        >
          🎨 Walls
        </button>
        <button
          type="button"
          className={`interior-tab${tab === 'trim' ? ' active' : ''}`}
          onClick={() => setTab('trim')}
        >
          🪟 Trim
        </button>
      </nav>

      {tab === 'furniture' && (
        <>
          <p className="palette-hint">
            {editMode
              ? 'Tap Done below to finish moving furniture.'
              : 'Pick furniture, then tap the floor to place it!'}
          </p>
          <div className="interior-furniture-grid">
            {INTERIOR_FURNITURE.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`building-card interior-card${selectedFurnitureId === item.id ? ' selected' : ''}`}
                onClick={() => onSelectFurniture(item)}
              >
                <div className="building-preview interior-preview">
                  <InteriorFurnitureArt id={item.id} />
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
              {WALLPAPERS.map((wp) => (
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
                {WALL_PAINT_COLORS.map((paint) => (
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
                {WALLPAPERS.find((w) => w.id === style.wallpaperId)?.name ?? 'Pattern'} colour
              </h4>
              <div className="interior-color-row">
                {WALL_PAINT_COLORS.map((paint) => {
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
                {WALL_PAINT_COLORS.map((paint) => (
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
              {FLOOR_TYPES.map((ft) => (
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
                {FLOOR_PAINT_COLORS.map((paint) => (
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
                {FLOOR_TYPES.find((f) => f.id === style.floorTypeId)?.name ?? 'Floor'} colour
              </h4>
              <div className="interior-color-row">
                {FLOOR_PAINT_COLORS.map((paint) => {
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
                {FLOOR_PAINT_COLORS.map((paint) => (
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

      {tab === 'trim' && (
        <>
          <p className="palette-hint">Pick window frames, doors, and trim colours!</p>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Window style</h4>
            <div className="interior-wallpaper-grid">
              {WINDOW_STYLES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${style.windowStyleId === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ windowStyleId: option.id })}
                  title={option.name}
                >
                  <WindowStylePreviewSwatch windowStyleId={option.id} frameColor={trimColor} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Door style</h4>
            <div className="interior-wallpaper-grid">
              {DOOR_STYLES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`interior-wallpaper-btn${style.doorStyleId === option.id ? ' selected' : ''}`}
                  onClick={() => onStyleChange({ doorStyleId: option.id })}
                  title={option.name}
                >
                  <DoorStylePreviewSwatch doorStyleId={option.id} trimColor={trimColor} />
                  <span>{option.emoji}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="interior-style-section">
            <h4 className="interior-style-heading">Trim colour</h4>
            <p className="interior-style-note">Frames, baseboards, and doors.</p>
            <div className="interior-color-row">
              {TRIM_COLORS.map((paint) => (
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

          <section className="interior-style-section interior-style-subsection">
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
        </>
      )}
    </aside>
  )
}
