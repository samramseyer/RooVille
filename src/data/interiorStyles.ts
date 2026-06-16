import type { InteriorStyle, WindowViewSetting } from '../types'
import type { InteriorTheme } from './enterableBuildings'
import { resolveCabinetStyleFields } from './interiorCabinetStyles'
import { resolveTrimStyleFields } from './interiorTrimStyles'
import { sanitizeWindowViewSetting } from './interiorWindowView'

export type WallpaperId =
  | 'none'
  | 'stripes'
  | 'dots'
  | 'waves'
  | 'eucalyptus'
  | 'checks'

export type PatternWallpaperId = Exclude<WallpaperId, 'none'>

export type FloorTypeId = 'paint' | 'hardwood' | 'wood-planks' | 'lvp' | 'tile' | 'stone'

export type PatternFloorTypeId = Exclude<FloorTypeId, 'paint'>

export interface PaintOption {
  id: string
  name: string
  color: string
}

export interface WallpaperOption {
  id: WallpaperId
  name: string
  emoji: string
}

export interface FloorTypeOption {
  id: FloorTypeId
  name: string
  emoji: string
}

export const WALL_PAINT_COLORS: PaintOption[] = [
  { id: 'cream', name: 'Cream', color: '#FFF8F0' },
  { id: 'sand', name: 'Sand', color: '#FFF0E0' },
  { id: 'sky', name: 'Sky', color: '#E8F6F8' },
  { id: 'ocean', name: 'Ocean', color: '#B8E8E4' },
  { id: 'eucalyptus', name: 'Gum', color: '#D4ECD4' },
  { id: 'wattle', name: 'Wattle', color: '#FFF3C4' },
  { id: 'coral', name: 'Coral', color: '#FFD4CC' },
  { id: 'lavender', name: 'Lilac', color: '#E8DCF5' },
  { id: 'weatherboard', name: 'White', color: '#F5F0E8' },
  { id: 'sunset', name: 'Peach', color: '#FFE0C8' },
  { id: 'mint', name: 'Mint', color: '#D8F0E8' },
  { id: 'rose', name: 'Rose', color: '#F8D8E0' },
  { id: 'butter', name: 'Butter', color: '#FFF8DC' },
  { id: 'powder', name: 'Powder', color: '#D0E8F0' },
  { id: 'sage', name: 'Sage', color: '#C8D8C0' },
  { id: 'blush', name: 'Blush', color: '#F5E0D8' },
  { id: 'lemon', name: 'Lemon', color: '#FFF9E6' },
  { id: 'seafoam', name: 'Seafoam', color: '#B0E0D8' },
  { id: 'dusty-pink', name: 'Dusty pink', color: '#E8C8C8' },
  { id: 'pale-blue', name: 'Pale blue', color: '#C8E0F0' },
  { id: 'honeydew', name: 'Honeydew', color: '#E8F5E0' },
  { id: 'apricot', name: 'Apricot', color: '#FFD8B8' },
]

export const FLOOR_PAINT_COLORS: PaintOption[] = [
  { id: 'honey', name: 'Honey', color: '#E8C872' },
  { id: 'oak', name: 'Oak', color: '#C4956A' },
  { id: 'driftwood', name: 'Driftwood', color: '#D5DBDB' },
  { id: 'cabin', name: 'Cabin', color: '#B8956A' },
  { id: 'white', name: 'White', color: '#F0EBE3' },
  { id: 'ocean', name: 'Teal', color: '#A8D4D0' },
  { id: 'terracotta', name: 'Terracotta', color: '#D4956A' },
  { id: 'charcoal', name: 'Slate', color: '#B0B8BE' },
]

export const WALLPAPERS: WallpaperOption[] = [
  { id: 'none', name: 'Plain paint', emoji: '🎨' },
  { id: 'stripes', name: 'Stripes', emoji: '📏' },
  { id: 'dots', name: 'Polka dots', emoji: '⚪' },
  { id: 'waves', name: 'Ocean waves', emoji: '🌊' },
  { id: 'eucalyptus', name: 'Gum leaves', emoji: '🍃' },
  { id: 'checks', name: 'Checks', emoji: '♟️' },
]

export const FLOOR_TYPES: FloorTypeOption[] = [
  { id: 'paint', name: 'Paint', emoji: '🎨' },
  { id: 'hardwood', name: 'Hardwood', emoji: '🌳' },
  { id: 'wood-planks', name: 'Wood planks', emoji: '🪵' },
  { id: 'lvp', name: 'LVP', emoji: '📐' },
  { id: 'tile', name: 'Tile', emoji: '🔲' },
  { id: 'stone', name: 'Stone', emoji: '🪨' },
]

export const PATTERN_WALLPAPERS = WALLPAPERS.filter(
  (wp): wp is WallpaperOption & { id: PatternWallpaperId } => wp.id !== 'none',
)

export const PATTERN_FLOOR_TYPES = FLOOR_TYPES.filter(
  (ft): ft is FloorTypeOption & { id: PatternFloorTypeId } => ft.id !== 'paint',
)

const THEME_WALL_DEFAULTS: Record<InteriorTheme, string> = {
  home: '#FFF0E0',
  shop: '#FFF8F0',
  boat: '#E8D5A3',
  zoo: '#7CB342',
}

const THEME_FLOOR_DEFAULTS: Record<InteriorTheme, string> = {
  home: '#E8C872',
  shop: '#D5DBDB',
  boat: '#C4956A',
  zoo: '#7CB342',
}

const THEME_FLOOR_TYPE_DEFAULTS: Record<InteriorTheme, FloorTypeId> = {
  home: 'wood-planks',
  shop: 'tile',
  boat: 'wood-planks',
  zoo: 'paint',
}

function buildDefaultWallpaperColors(wallColor: string): Record<PatternWallpaperId, string> {
  return Object.fromEntries(
    PATTERN_WALLPAPERS.map((wp) => [wp.id, wallColor]),
  ) as Record<PatternWallpaperId, string>
}

function buildDefaultFloorTypeColors(floorColor: string): Record<PatternFloorTypeId, string> {
  return Object.fromEntries(
    PATTERN_FLOOR_TYPES.map((ft) => [ft.id, floorColor]),
  ) as Record<PatternFloorTypeId, string>
}

export function getDefaultInteriorStyle(theme: InteriorTheme): InteriorStyle {
  const wallColor = THEME_WALL_DEFAULTS[theme]
  const floorColor = THEME_FLOOR_DEFAULTS[theme]
  return {
    wallColor,
    floorColor,
    wallpaperId: 'none',
    floorTypeId: THEME_FLOOR_TYPE_DEFAULTS[theme],
    wallpaperColors: buildDefaultWallpaperColors(wallColor),
    floorTypeColors: buildDefaultFloorTypeColors(floorColor),
    windowViewId: 'auto',
  }
}

export function getWallpaperColor(
  style: InteriorStyle,
  wallpaperId: WallpaperId | string,
): string {
  if (wallpaperId === 'none') return style.wallColor
  const saved = style.wallpaperColors?.[wallpaperId]
  return saved ?? style.wallColor
}

export function getFloorColor(
  style: InteriorStyle,
  floorTypeId: FloorTypeId | string,
): string {
  if (floorTypeId === 'paint') return style.floorColor
  const saved = style.floorTypeColors?.[floorTypeId]
  return saved ?? style.floorColor
}

export function resolveInteriorStyle(
  style: Partial<InteriorStyle> | undefined,
  theme: InteriorTheme,
): InteriorStyle {
  const defaults = getDefaultInteriorStyle(theme)
  const wallColor = style?.wallColor ?? defaults.wallColor
  const wallpaperId =
    style?.wallpaperId && WALLPAPERS.some((w) => w.id === style.wallpaperId)
      ? style.wallpaperId
      : defaults.wallpaperId

  const wallpaperColors = buildDefaultWallpaperColors(wallColor)
  for (const wp of PATTERN_WALLPAPERS) {
    const saved = style?.wallpaperColors?.[wp.id]
    if (saved) wallpaperColors[wp.id] = saved
  }

  const floorColor = style?.floorColor ?? defaults.floorColor
  const floorTypeId =
    style?.floorTypeId && FLOOR_TYPES.some((f) => f.id === style.floorTypeId)
      ? style.floorTypeId
      : defaults.floorTypeId

  const floorTypeColors = buildDefaultFloorTypeColors(floorColor)
  for (const ft of PATTERN_FLOOR_TYPES) {
    const saved = style?.floorTypeColors?.[ft.id]
    if (saved) floorTypeColors[ft.id] = saved
  }

  return {
    wallColor,
    floorColor,
    wallpaperId,
    floorTypeId,
    wallpaperColors,
    floorTypeColors,
    windowViewId: sanitizeWindowViewSetting(style?.windowViewId) as WindowViewSetting,
    ...resolveTrimStyleFields(style, theme),
    ...resolveCabinetStyleFields(style),
  }
}

export function sanitizeInteriorStyle(raw: unknown, theme: InteriorTheme): InteriorStyle {
  if (!raw || typeof raw !== 'object') return getDefaultInteriorStyle(theme)
  const s = raw as Partial<InteriorStyle>
  return resolveInteriorStyle(s, theme)
}
