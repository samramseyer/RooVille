import type { InteriorStyle } from '../types'

export type CountertopMaterial =
  | 'wood'
  | 'marble'
  | 'granite'
  | 'quartz'
  | 'butcher'
  | 'concrete'
  | 'teal'
  | 'laminate'

export interface PaintOption {
  id: string
  name: string
  color: string
}

export interface CountertopOption {
  id: CountertopMaterial
  name: string
  emoji: string
}

export const CABINET_COLORS: PaintOption[] = [
  { id: 'cream', name: 'Cream', color: '#FFF8F0' },
  { id: 'white', name: 'White', color: '#FFFFFF' },
  { id: 'warm-gray', name: 'Warm gray', color: '#E8E4DE' },
  { id: 'sage', name: 'Sage', color: '#9CAF88' },
  { id: 'navy', name: 'Navy', color: '#3D5A80' },
  { id: 'walnut', name: 'Walnut', color: '#8B6914' },
  { id: 'charcoal', name: 'Charcoal', color: '#5A5A5A' },
  { id: 'teal', name: 'Coastal teal', color: '#48B5B0' },
  { id: 'blush', name: 'Blush', color: '#E8C4B8' },
  { id: 'ocean', name: 'Ocean blue', color: '#6BA3BE' },
]

export const COUNTERTOP_MATERIALS: CountertopOption[] = [
  { id: 'wood', name: 'Wood', emoji: '🪵' },
  { id: 'butcher', name: 'Butcher block', emoji: '🪵' },
  { id: 'marble', name: 'Marble', emoji: '🪨' },
  { id: 'granite', name: 'Granite', emoji: '🪨' },
  { id: 'quartz', name: 'Quartz', emoji: '✨' },
  { id: 'concrete', name: 'Concrete', emoji: '🩶' },
  { id: 'teal', name: 'Coastal teal', emoji: '🌊' },
  { id: 'laminate', name: 'Laminate', emoji: '⬜' },
]

export const DEFAULT_CABINET_COLOR = '#FFF8F0'
export const DEFAULT_COUNTERTOP_MATERIAL: CountertopMaterial = 'wood'

export function sanitizeCabinetColor(raw: unknown): string {
  if (typeof raw === 'string' && CABINET_COLORS.some((c) => c.color === raw)) return raw
  if (typeof raw === 'string' && /^#[0-9A-Fa-f]{6}$/.test(raw)) return raw
  return DEFAULT_CABINET_COLOR
}

export function sanitizeCountertopMaterial(raw: unknown): CountertopMaterial {
  if (typeof raw === 'string' && COUNTERTOP_MATERIALS.some((m) => m.id === raw)) {
    return raw as CountertopMaterial
  }
  return DEFAULT_COUNTERTOP_MATERIAL
}

export function resolveCabinetStyleFields(
  style: Partial<InteriorStyle> | undefined,
): Pick<InteriorStyle, 'cabinetColor' | 'countertopMaterial'> {
  return {
    cabinetColor: sanitizeCabinetColor(style?.cabinetColor),
    countertopMaterial: sanitizeCountertopMaterial(style?.countertopMaterial),
  }
}

export function usesCabinetFinishes(furnitureId: string): boolean {
  return (
    furnitureId.startsWith('base-cabinet') ||
    furnitureId.startsWith('sink-base') ||
    furnitureId.startsWith('wall-cabinet') ||
    furnitureId.startsWith('pantry-cabinet') ||
    furnitureId.startsWith('kitchen-island') ||
    furnitureId.startsWith('corner-cabinet') ||
    furnitureId.startsWith('hood-vent') ||
    furnitureId.startsWith('counter-') ||
    furnitureId.startsWith('bathroom-') ||
    furnitureId === 'medicine-cabinet'
  )
}
