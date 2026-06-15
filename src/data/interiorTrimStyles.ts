import type { DoorStyleId, InteriorStyle, TrimProfileId, WindowStyleId } from '../types'
import type { InteriorTheme } from './enterableBuildings'
import { sanitizeOpeningScale } from './interiorOpenings'

export type { DoorStyleId, WindowStyleId }

export interface StyleOption<T extends string> {
  id: T
  name: string
  emoji: string
}

export interface PaintOption {
  id: string
  name: string
  color: string
}

export const WINDOW_STYLES: StyleOption<WindowStyleId>[] = [
  { id: 'classic', name: 'Classic', emoji: '🪟' },
  { id: 'colonial', name: 'Colonial', emoji: '🏛️' },
  { id: 'wide', name: 'Wide sill', emoji: '📐' },
  { id: 'bay', name: 'Bay window', emoji: '🏠' },
  { id: 'picture', name: 'Picture', emoji: '🖼️' },
  { id: 'minimal', name: 'Minimal', emoji: '⬜' },
  { id: 'rounded', name: 'Rounded', emoji: '🔲' },
  { id: 'porthole', name: 'Porthole', emoji: '⚓' },
]

export const DOOR_STYLES: StyleOption<DoorStyleId>[] = [
  { id: 'panel', name: 'Panel', emoji: '🚪' },
  { id: 'glass', name: 'Glass top', emoji: '🪟' },
  { id: 'sliding', name: 'Sliding glass', emoji: '🚿' },
  { id: 'french', name: 'French', emoji: '🚪' },
  { id: 'coastal', name: 'Coastal', emoji: '🏖️' },
  { id: 'barn', name: 'Barn', emoji: '🌾' },
  { id: 'hatch', name: 'Hatch', emoji: '⚓' },
]

export const TRIM_PROFILES: StyleOption<TrimProfileId>[] = [
  { id: 'standard', name: 'Standard', emoji: '📏' },
  { id: 'decorative', name: 'Decorative', emoji: '✨' },
  { id: 'rustic', name: 'Rustic', emoji: '🪵' },
]

export const TRIM_COLORS: PaintOption[] = [
  { id: 'oak', name: 'Oak', color: '#C4956A' },
  { id: 'white', name: 'White', color: '#F5F0E8' },
  { id: 'cream', name: 'Cream', color: '#FFF8F0' },
  { id: 'teal', name: 'Teal', color: '#48B5B0' },
  { id: 'walnut', name: 'Walnut', color: '#8B6914' },
  { id: 'charcoal', name: 'Charcoal', color: '#8B8B8B' },
  { id: 'coral', name: 'Coral', color: '#E57373' },
  { id: 'gum', name: 'Gum green', color: '#7CB342' },
  { id: 'wattle', name: 'Wattle', color: '#FFD54F' },
  { id: 'ocean', name: 'Ocean', color: '#20B2AA' },
]

const THEME_TRIM_DEFAULTS: Record<InteriorTheme, string> = {
  home: '#C4956A',
  shop: '#48B5B0',
  boat: '#8B6914',
}

const THEME_WINDOW_DEFAULTS: Record<InteriorTheme, WindowStyleId> = {
  home: 'classic',
  shop: 'wide',
  boat: 'porthole',
}

const THEME_DOOR_DEFAULTS: Record<InteriorTheme, DoorStyleId> = {
  home: 'panel',
  shop: 'glass',
  boat: 'hatch',
}

export function sanitizeWindowStyleId(raw: unknown, theme: InteriorTheme): WindowStyleId {
  if (WINDOW_STYLES.some((s) => s.id === raw)) return raw as WindowStyleId
  return THEME_WINDOW_DEFAULTS[theme]
}

export function sanitizeDoorStyleId(raw: unknown, theme: InteriorTheme): DoorStyleId {
  if (DOOR_STYLES.some((s) => s.id === raw)) return raw as DoorStyleId
  return THEME_DOOR_DEFAULTS[theme]
}

export function sanitizeTrimProfileId(raw: unknown): TrimProfileId {
  if (TRIM_PROFILES.some((p) => p.id === raw)) return raw as TrimProfileId
  return 'standard'
}

export function sanitizeTrimColor(raw: unknown, theme: InteriorTheme): string {
  if (typeof raw === 'string' && TRIM_COLORS.some((c) => c.color === raw)) return raw
  if (typeof raw === 'string' && /^#[0-9A-Fa-f]{6}$/.test(raw)) return raw
  return THEME_TRIM_DEFAULTS[theme]
}

export function resolveTrimStyleFields(
  style: Partial<InteriorStyle> | undefined,
  theme: InteriorTheme,
): Pick<
  InteriorStyle,
  | 'windowStyleId'
  | 'doorStyleId'
  | 'trimColor'
  | 'baseTrimProfileId'
  | 'casingTrimProfileId'
  | 'windowScale'
  | 'doorScale'
> {
  return {
    windowStyleId: sanitizeWindowStyleId(style?.windowStyleId, theme),
    doorStyleId: sanitizeDoorStyleId(style?.doorStyleId, theme),
    trimColor: sanitizeTrimColor(style?.trimColor, theme),
    baseTrimProfileId: sanitizeTrimProfileId(style?.baseTrimProfileId),
    casingTrimProfileId: sanitizeTrimProfileId(style?.casingTrimProfileId),
    windowScale: sanitizeOpeningScale(style?.windowScale, 1),
    doorScale: sanitizeOpeningScale(style?.doorScale, 1),
  }
}

export function isPortholeWindow(windowStyleId: WindowStyleId): boolean {
  return windowStyleId === 'porthole'
}

export function getWindowFrameRadius(windowStyleId: WindowStyleId): number {
  if (windowStyleId === 'rounded') return 10
  if (windowStyleId === 'minimal') return 2
  return 4
}
