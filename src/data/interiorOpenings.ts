import type { InteriorTheme } from './enterableBuildings'
import type { InteriorOpening, InteriorStyle, OpeningScaleId } from '../types'

export interface OpeningRect {
  x: number
  y: number
  width: number
  height: number
}

export const OPENING_SCALE_MIN = 0.55
export const OPENING_SCALE_MAX = 1.55

export const WINDOW_SCALE_PRESETS: Record<OpeningScaleId, number> = {
  small: 0.72,
  medium: 1,
  large: 1.38,
}

export const DOOR_SCALE_PRESETS: Record<OpeningScaleId, number> = {
  small: 0.78,
  medium: 1,
  large: 1.42,
}

export const OPENING_SCALE_OPTIONS: { id: OpeningScaleId; name: string; emoji: string }[] = [
  { id: 'small', name: 'Small', emoji: '🔹' },
  { id: 'medium', name: 'Medium', emoji: '🔷' },
  { id: 'large', name: 'Large', emoji: '🔶' },
]

const THEME_WINDOWS: Record<InteriorTheme, { left: OpeningRect; right: OpeningRect }> = {
  home: {
    left: { x: 40, y: 40, width: 80, height: 60 },
    right: { x: 520, y: 40, width: 80, height: 60 },
  },
  shop: {
    left: { x: 48, y: 36, width: 72, height: 54 },
    right: { x: 520, y: 36, width: 72, height: 54 },
  },
  boat: {
    left: { x: 92, y: 62, width: 56, height: 56 },
    right: { x: 492, y: 62, width: 56, height: 56 },
  },
}

const THEME_DOOR: Record<InteriorTheme, OpeningRect> = {
  home: { x: 280, y: 430, width: 80, height: 50 },
  shop: { x: 280, y: 430, width: 80, height: 50 },
  boat: { x: 280, y: 430, width: 80, height: 50 },
}

export function clampOpeningScale(scale: number): number {
  return Math.max(OPENING_SCALE_MIN, Math.min(OPENING_SCALE_MAX, scale))
}

export function sanitizeOpeningScale(raw: unknown, fallback = 1): number {
  if (typeof raw !== 'number' || Number.isNaN(raw)) return fallback
  return clampOpeningScale(raw)
}

export function nearestOpeningScaleId(scale: number, presets: Record<OpeningScaleId, number>): OpeningScaleId {
  let best: OpeningScaleId = 'medium'
  let bestDiff = Infinity
  for (const [id, value] of Object.entries(presets) as [OpeningScaleId, number][]) {
    const diff = Math.abs(scale - value)
    if (diff < bestDiff) {
      bestDiff = diff
      best = id
    }
  }
  return bestDiff < 0.06 ? best : 'medium'
}

function scaleWindowRect(rect: OpeningRect, scale: number, anchor: 'left' | 'right'): OpeningRect {
  const width = rect.width * scale
  const height = rect.height * scale
  const y = rect.y + (rect.height - height) / 2
  const x =
    anchor === 'left'
      ? rect.x
      : rect.x + rect.width - width
  return { x, y, width, height }
}

function scaleDoorRect(rect: OpeningRect, scale: number): OpeningRect {
  const width = rect.width * scale
  const height = rect.height * scale
  return {
    x: rect.x + (rect.width - width) / 2,
    y: rect.y + rect.height - height,
    width,
    height,
  }
}

export function getThemeWindowRects(
  theme: InteriorTheme,
  scale: number,
): { left: OpeningRect; right: OpeningRect } {
  const base = THEME_WINDOWS[theme]
  const s = clampOpeningScale(scale)
  return {
    left: scaleWindowRect(base.left, s, 'left'),
    right: scaleWindowRect(base.right, s, 'right'),
  }
}

export function getThemeDoorRect(theme: InteriorTheme, scale: number): OpeningRect {
  return scaleDoorRect(THEME_DOOR[theme], clampOpeningScale(scale))
}

export const ROOM_WIDTH = 640
export const ROOM_HEIGHT = 480
export const WALL_BOTTOM = 200

export const DEFAULT_NEW_WINDOW = { width: 80, height: 60 }
export const DEFAULT_NEW_DOOR = { width: 80, height: 50 }

export const MIN_OPENING = { window: { width: 28, height: 28 }, door: { width: 36, height: 36 } }
export const MAX_OPENING = { window: { width: 280, height: 180 }, door: { width: 200, height: 120 } }

export function clampWindowOpening(o: Pick<InteriorOpening, 'x' | 'y' | 'width' | 'height'>): OpeningRect {
  const width = Math.max(MIN_OPENING.window.width, Math.min(MAX_OPENING.window.width, o.width))
  const height = Math.max(MIN_OPENING.window.height, Math.min(MAX_OPENING.window.height, o.height))
  const x = Math.max(0, Math.min(ROOM_WIDTH - width, o.x))
  const y = Math.max(0, Math.min(WALL_BOTTOM - height, o.y))
  return { x, y, width, height }
}

export function clampDoorOpening(o: Pick<InteriorOpening, 'x' | 'y' | 'width' | 'height'>): OpeningRect {
  const width = Math.max(MIN_OPENING.door.width, Math.min(MAX_OPENING.door.width, o.width))
  const height = Math.max(MIN_OPENING.door.height, Math.min(MAX_OPENING.door.height, o.height))
  const x = Math.max(0, Math.min(ROOM_WIDTH - width, o.x))
  const minY = WALL_BOTTOM - 20
  const maxY = ROOM_HEIGHT - height - 4
  const y = Math.max(minY, Math.min(maxY, o.y))
  return { x, y, width, height }
}

export function clampOpening(opening: InteriorOpening): InteriorOpening {
  const rect =
    opening.kind === 'window' ? clampWindowOpening(opening) : clampDoorOpening(opening)
  return { ...opening, ...rect }
}

export function getDefaultOpenings(theme: InteriorTheme, style: InteriorStyle): InteriorOpening[] {
  const windowScale = style.windowScale ?? 1
  const doorScale = style.doorScale ?? 1
  const windows = getThemeWindowRects(theme, windowScale)
  const door = getThemeDoorRect(theme, doorScale)
  return [
    { id: 'win-left', kind: 'window', ...windows.left },
    { id: 'win-right', kind: 'window', ...windows.right },
    { id: 'door-main', kind: 'door', ...door },
  ]
}

export function resolveInteriorOpenings(
  theme: InteriorTheme,
  style: InteriorStyle,
  saved: InteriorOpening[] | undefined,
): InteriorOpening[] {
  if (saved === undefined) {
    return getDefaultOpenings(theme, style)
  }
  return saved.map(clampOpening)
}

export function sanitizeInteriorOpenings(raw: unknown): InteriorOpening[] | undefined {
  if (raw === undefined) return undefined
  if (!Array.isArray(raw)) return undefined
  const valid = raw
    .filter(
      (item): item is InteriorOpening =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as InteriorOpening).id === 'string' &&
        ((item as InteriorOpening).kind === 'window' || (item as InteriorOpening).kind === 'door') &&
        typeof (item as InteriorOpening).x === 'number' &&
        typeof (item as InteriorOpening).y === 'number' &&
        typeof (item as InteriorOpening).width === 'number' &&
        typeof (item as InteriorOpening).height === 'number',
    )
    .map(clampOpening)
  return valid
}
