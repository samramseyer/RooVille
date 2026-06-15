import type { InteriorItem } from '../types'
import { ROOM_HEIGHT, ROOM_WIDTH } from './interiorOpenings'

export type FurniturePlacement = 'floor' | 'wall' | 'both'

export type FurnitureCategory = 'furniture' | 'kitchen-cabinets' | 'appliances' | 'bathroom-accessories' | 'patio' | 'countertops'

export interface FurnitureCategoryDef {
  id: FurnitureCategory
  name: string
  emoji: string
}

export const FURNITURE_CATEGORIES: FurnitureCategoryDef[] = [
  { id: 'furniture', name: 'Furniture', emoji: '🛋️' },
  { id: 'kitchen-cabinets', name: 'Cabinets', emoji: '🗄️' },
  { id: 'countertops', name: 'Countertops', emoji: '🪨' },
  { id: 'appliances', name: 'Appliances', emoji: '🍳' },
  { id: 'bathroom-accessories', name: 'Bathroom', emoji: '🛁' },
  { id: 'patio', name: 'Patio', emoji: '🌴' },
]

const SIZE_LIMITS: Record<string, { minW: number; minH: number; maxW: number; maxH: number }> = {
  tv: { minW: 44, minH: 32, maxW: 160, maxH: 110 },
  'flat-screen-tv': { minW: 56, minH: 28, maxW: 240, maxH: 150 },
}

export function clampFurniturePosition(
  x: number,
  y: number,
  width: number,
  height: number,
  _furnitureId?: string,
  _tapY?: number,
) {
  // Same bounds for every interior theme: home, shop, boat, and multi-room boathouses.
  return {
    x: Math.max(0, Math.min(ROOM_WIDTH - width, x)),
    y: Math.max(0, Math.min(ROOM_HEIGHT - height, y)),
  }
}

function clampPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  furnitureId: string,
) {
  return clampFurniturePosition(x, y, width, height, furnitureId)
}

export interface FurnitureDef {
  id: string
  name: string
  emoji: string
  width: number
  height: number
  category: FurnitureCategory
  placement?: FurniturePlacement
  /** Can be resized after placing (drag corner handle). */
  resizable?: boolean
}

export const INTERIOR_FURNITURE: FurnitureDef[] = [
  { id: 'sofa', name: 'Sofa', emoji: '🛋️', width: 92, height: 52, category: 'furniture' },
  { id: 'armchair', name: 'Armchair', emoji: '💺', width: 52, height: 52, category: 'furniture' },
  { id: 'sectional', name: 'Sectional', emoji: '🛋️', width: 110, height: 55, category: 'furniture' },
  { id: 'ottoman', name: 'Ottoman', emoji: '🟫', width: 45, height: 38, category: 'furniture' },
  { id: 'bed', name: 'Bed', emoji: '🛏️', width: 85, height: 62, category: 'furniture' },
  { id: 'bunk', name: 'Bunk Bed', emoji: '🛌', width: 58, height: 72, category: 'furniture' },
  { id: 'nightstand', name: 'Nightstand', emoji: '🗄️', width: 42, height: 48, category: 'furniture' },
  { id: 'dresser', name: 'Dresser', emoji: '🗄️', width: 75, height: 55, category: 'furniture' },
  { id: 'dining-table', name: 'Dining Table', emoji: '🍽️', width: 85, height: 55, category: 'furniture' },
  { id: 'dining-chair', name: 'Dining Chair', emoji: '🪑', width: 38, height: 52, category: 'furniture' },
  { id: 'coffee-table', name: 'Coffee Table', emoji: '☕', width: 72, height: 42, category: 'furniture' },
  { id: 'desk', name: 'Desk', emoji: '🖥️', width: 80, height: 52, category: 'furniture' },
  { id: 'bench', name: 'Bench', emoji: '🪵', width: 70, height: 38, category: 'furniture' },
  { id: 'rug', name: 'Rug', emoji: '🟫', width: 105, height: 62, category: 'furniture' },
  { id: 'lamp', name: 'Floor Lamp', emoji: '💡', width: 32, height: 58, category: 'furniture' },
  { id: 'desk-lamp', name: 'Desk Lamp', emoji: '🔦', width: 28, height: 38, category: 'furniture' },
  { id: 'plant', name: 'Plant', emoji: '🪴', width: 42, height: 58, category: 'furniture' },
  { id: 'bookshelf', name: 'Bookshelf', emoji: '📚', width: 62, height: 72, category: 'furniture' },
  { id: 'shelf', name: 'Wall Shelf', emoji: '📦', width: 55, height: 28, category: 'furniture', placement: 'wall' },
  { id: 'tv', name: 'TV', emoji: '📺', width: 68, height: 48, category: 'furniture', resizable: true },
  {
    id: 'flat-screen-tv',
    name: 'Flat Screen TV',
    emoji: '🖥️',
    width: 96,
    height: 54,
    category: 'furniture',
    placement: 'wall',
    resizable: true,
  },
  { id: 'surfboard', name: 'Surfboard', emoji: '🏄', width: 28, height: 85, category: 'furniture' },
  { id: 'mirror', name: 'Mirror', emoji: '🪞', width: 45, height: 55, category: 'furniture', placement: 'wall' },
  { id: 'clock', name: 'Clock', emoji: '🕐', width: 38, height: 38, category: 'furniture', placement: 'wall' },
  { id: 'poster', name: 'Poster', emoji: '🖼️', width: 52, height: 42, category: 'furniture', placement: 'wall' },
  { id: 'base-cabinet', name: 'Base Cabinet', emoji: '🗄️', width: 60, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'base-cabinet-wide', name: 'Wide Base', emoji: '🗄️', width: 88, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'base-cabinet-narrow', name: 'Narrow Base', emoji: '🗄️', width: 36, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'base-cabinet-3drawer', name: '3-Drawer Base', emoji: '🗄️', width: 60, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'base-cabinet-marble', name: 'Marble Top Base', emoji: '🪨', width: 60, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'base-cabinet-granite', name: 'Granite Top Wide', emoji: '🪨', width: 88, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base', name: 'Sink Base', emoji: '🚰', width: 60, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base-wide', name: 'Double Sink Base', emoji: '🚰', width: 88, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base-narrow', name: 'Narrow Sink', emoji: '🚰', width: 36, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base-drawer', name: 'Drawer Sink Base', emoji: '🚰', width: 60, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base-farmhouse', name: 'Farmhouse Sink', emoji: '🚰', width: 72, height: 54, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'sink-base-corner', name: 'Corner Sink', emoji: '📐', width: 52, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'wall-cabinet', name: 'Wall Cabinet', emoji: '📦', width: 58, height: 42, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'wall-cabinet-wide', name: 'Wide Wall', emoji: '📦', width: 88, height: 42, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'wall-cabinet-glass', name: 'Glass Wall', emoji: '🪟', width: 58, height: 42, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'corner-cabinet', name: 'Corner Base', emoji: '📐', width: 52, height: 52, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'pantry-cabinet', name: 'Pantry', emoji: '🚪', width: 48, height: 72, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'pantry-cabinet-wide', name: 'Wide Pantry', emoji: '🚪', width: 58, height: 72, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'hood-vent', name: 'Wood Hood Vent', emoji: '💨', width: 60, height: 38, category: 'kitchen-cabinets', placement: 'wall' },
  { id: 'hood-vent-wide', name: 'Wide Hood Vent', emoji: '💨', width: 88, height: 38, category: 'kitchen-cabinets', placement: 'wall' },
  { id: 'kitchen-island', name: 'Island — Wood', emoji: '🏝️', width: 95, height: 58, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-large', name: 'Large Island — Wood', emoji: '🏝️', width: 128, height: 62, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-xl', name: 'XL Island — Wood', emoji: '🏝️', width: 162, height: 66, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-marble', name: 'Island — Marble', emoji: '🪨', width: 95, height: 58, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-large-marble', name: 'Large — Marble', emoji: '🪨', width: 128, height: 62, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-large-granite', name: 'Large — Granite', emoji: '🪨', width: 128, height: 62, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-large-butcher', name: 'Large — Butcher', emoji: '🪵', width: 128, height: 62, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-xl-quartz', name: 'XL — Quartz', emoji: '✨', width: 162, height: 66, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'kitchen-island-xl-teal', name: 'XL — Coastal Teal', emoji: '🌊', width: 162, height: 66, category: 'kitchen-cabinets', placement: 'floor' },
  { id: 'bathroom-vanity', name: 'Vanity', emoji: '🪞', width: 70, height: 55, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'bathroom-vanity-wide', name: 'Wide Vanity', emoji: '🪞', width: 95, height: 55, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'medicine-cabinet', name: 'Medicine Cabinet', emoji: '💊', width: 42, height: 48, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'bathroom-linen', name: 'Linen Cabinet', emoji: '🧴', width: 44, height: 68, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'bathroom-tower', name: 'Tower Cabinet', emoji: '🗄️', width: 40, height: 62, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'bathroom-tower-wide', name: 'Wide Tower', emoji: '🗄️', width: 52, height: 62, category: 'kitchen-cabinets', placement: 'both' },
  { id: 'counter-butcher-60', name: 'Butcher 60"', emoji: '🪵', width: 60, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-butcher-90', name: 'Butcher 90"', emoji: '🪵', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-butcher-120', name: 'Butcher 120"', emoji: '🪵', width: 120, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-marble-90', name: 'Marble 90"', emoji: '🪨', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-marble-120', name: 'Marble 120"', emoji: '🪨', width: 120, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-granite-90', name: 'Granite 90"', emoji: '🪨', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-granite-120', name: 'Granite 120"', emoji: '🪨', width: 120, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-quartz-90', name: 'Quartz 90"', emoji: '✨', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-quartz-120', name: 'Quartz 120"', emoji: '✨', width: 120, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-concrete-90', name: 'Concrete 90"', emoji: '🩶', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-teal-90', name: 'Coastal Teal 90"', emoji: '🌊', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'counter-laminate-90', name: 'Laminate 90"', emoji: '⬜', width: 90, height: 14, category: 'countertops', placement: 'both' },
  { id: 'fridge', name: 'Fridge', emoji: '🧊', width: 48, height: 68, category: 'appliances', placement: 'both' },
  { id: 'stove', name: 'Stove', emoji: '🍳', width: 50, height: 55, category: 'appliances', placement: 'both' },
  { id: 'sink', name: 'Kitchen Sink', emoji: '🚰', width: 55, height: 48, category: 'appliances', placement: 'both' },
  { id: 'microwave', name: 'Microwave', emoji: '📻', width: 48, height: 32, category: 'appliances', placement: 'both' },
  { id: 'dishwasher', name: 'Dishwasher', emoji: '🫧', width: 52, height: 58, category: 'appliances', placement: 'both' },
  { id: 'laundry', name: 'Washer', emoji: '🧺', width: 40, height: 45, category: 'appliances', placement: 'both' },
  { id: 'clawfoot-tub', name: 'Clawfoot Tub', emoji: '🛁', width: 75, height: 42, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'alcove-tub', name: 'Alcove Tub', emoji: '🛁', width: 70, height: 38, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'tile-shower', name: 'Tile Shower', emoji: '🚿', width: 55, height: 72, category: 'bathroom-accessories', placement: 'both' },
  { id: 'glass-shower', name: 'Glass Shower', emoji: '🚿', width: 58, height: 68, category: 'bathroom-accessories', placement: 'both' },
  { id: 'jacuzzi', name: 'Jacuzzi', emoji: '🛁', width: 85, height: 48, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'hot-tub', name: 'Hot Tub', emoji: '♨️', width: 95, height: 52, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'toilet', name: 'Toilet', emoji: '🚽', width: 38, height: 48, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'pedestal-sink', name: 'Pedestal Sink', emoji: '🚰', width: 42, height: 55, category: 'bathroom-accessories', placement: 'both' },
  { id: 'bidet', name: 'Bidet', emoji: '🚽', width: 36, height: 42, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'bathroom-mirror', name: 'Bathroom Mirror', emoji: '🪞', width: 45, height: 55, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'bathroom-mirror-round', name: 'Round Mirror', emoji: '🪞', width: 42, height: 42, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'towel-rack', name: 'Towel Rack', emoji: '🧺', width: 48, height: 38, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'towel-bar', name: 'Towel Bar', emoji: '🧴', width: 52, height: 12, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'heated-towel-rail', name: 'Heated Towel Rail', emoji: '♨️', width: 40, height: 55, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'towel-hook', name: 'Towel Hook', emoji: '🪝', width: 18, height: 22, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'bath-mat', name: 'Bath Mat', emoji: '🟫', width: 55, height: 28, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'toilet-paper-holder', name: 'TP Holder', emoji: '🧻', width: 22, height: 28, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'bath-stool', name: 'Bath Stool', emoji: '🪑', width: 35, height: 32, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'laundry-hamper', name: 'Laundry Hamper', emoji: '🧺', width: 38, height: 48, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'bath-shelf', name: 'Bath Shelf', emoji: '🧴', width: 42, height: 22, category: 'bathroom-accessories', placement: 'wall' },
  { id: 'soap-dispenser', name: 'Soap Dispenser', emoji: '🧼', width: 22, height: 32, category: 'bathroom-accessories', placement: 'floor' },
  { id: 'patio-dining-table', name: 'Patio Table', emoji: '🪑', width: 88, height: 58, category: 'patio' },
  { id: 'patio-chair', name: 'Adirondack Chair', emoji: '🪑', width: 44, height: 48, category: 'patio' },
  { id: 'patio-lounge', name: 'Chaise Lounge', emoji: '🏖️', width: 62, height: 38, category: 'patio' },
  { id: 'patio-sofa', name: 'Outdoor Sofa', emoji: '🛋️', width: 95, height: 52, category: 'patio' },
  { id: 'patio-ottoman', name: 'Outdoor Ottoman', emoji: '🟫', width: 42, height: 32, category: 'patio' },
  { id: 'patio-bench', name: 'Garden Bench', emoji: '🪵', width: 78, height: 42, category: 'patio' },
  { id: 'patio-swing', name: 'Porch Swing', emoji: '🪢', width: 75, height: 55, category: 'patio' },
  { id: 'patio-hammock', name: 'Hammock', emoji: '🏝️', width: 110, height: 42, category: 'patio' },
  { id: 'patio-side-table', name: 'Side Table', emoji: '🪵', width: 38, height: 38, category: 'patio' },
  { id: 'patio-umbrella', name: 'Patio Umbrella', emoji: '⛱️', width: 72, height: 65, category: 'patio' },
  { id: 'patio-pergola', name: 'Pergola', emoji: '🌿', width: 120, height: 72, category: 'patio' },
  { id: 'patio-fire-pit', name: 'Fire Pit', emoji: '🔥', width: 55, height: 42, category: 'patio' },
  { id: 'patio-grill', name: 'BBQ Grill', emoji: '🍖', width: 52, height: 55, category: 'patio' },
  { id: 'patio-cooler', name: 'Cooler', emoji: '🧊', width: 48, height: 38, category: 'patio' },
  { id: 'patio-bar-cart', name: 'Bar Cart', emoji: '🍹', width: 45, height: 52, category: 'patio' },
  { id: 'patio-planter', name: 'Planter Box', emoji: '🪴', width: 48, height: 38, category: 'patio' },
  { id: 'patio-planter-tall', name: 'Tall Planter', emoji: '🌿', width: 32, height: 55, category: 'patio' },
  { id: 'patio-fountain', name: 'Fountain', emoji: '⛲', width: 48, height: 58, category: 'patio' },
  { id: 'patio-bird-bath', name: 'Bird Bath', emoji: '🐦', width: 38, height: 48, category: 'patio' },
  { id: 'patio-rug', name: 'Outdoor Rug', emoji: '🟫', width: 100, height: 58, category: 'patio' },
  { id: 'patio-string-lights', name: 'String Lights', emoji: '✨', width: 90, height: 18, category: 'patio', placement: 'wall' },
  { id: 'patio-lantern', name: 'Lantern', emoji: '🏮', width: 28, height: 42, category: 'patio' },
  { id: 'patio-tiki-torch', name: 'Tiki Torch', emoji: '🔥', width: 22, height: 55, category: 'patio' },
  { id: 'patio-wind-chimes', name: 'Wind Chimes', emoji: '🎐', width: 24, height: 38, category: 'patio', placement: 'wall' },
]

export function getFurnitureByCategory(category: FurnitureCategory): FurnitureDef[] {
  return INTERIOR_FURNITURE.filter((item) => item.category === category)
}

export function getFurniture(id: string): FurnitureDef | undefined {
  return INTERIOR_FURNITURE.find((f) => f.id === id)
}

export function isResizableFurniture(id: string): boolean {
  return getFurniture(id)?.resizable === true
}

/** Rugs and outdoor mats render beneath other furniture. */
export function isFloorLayerFurniture(id: string): boolean {
  return id === 'rug' || id === 'patio-rug'
}

export function getFurnitureDimensions(
  item: Pick<InteriorItem, 'furnitureId' | 'width' | 'height'>,
  def: FurnitureDef,
): { width: number; height: number } {
  return {
    width: item.width ?? def.width,
    height: item.height ?? def.height,
  }
}

export function clampFurnitureDimensions(
  furnitureId: string,
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number; width: number; height: number } {
  const limits = SIZE_LIMITS[furnitureId] ?? { minW: 24, minH: 24, maxW: 200, maxH: 160 }
  const w = Math.max(limits.minW, Math.min(limits.maxW, width))
  const h = Math.max(limits.minH, Math.min(limits.maxH, height))
  const pos = clampPosition(x, y, w, h, furnitureId)
  return { ...pos, width: w, height: h }
}

export function clampInteriorFurnitureItem(item: InteriorItem, def: FurnitureDef): InteriorItem {
  const { width, height } = getFurnitureDimensions(item, def)
  const clamped = clampFurnitureDimensions(item.furnitureId, item.x, item.y, width, height)
  return {
    ...item,
    x: clamped.x,
    y: clamped.y,
    width: isResizableFurniture(item.furnitureId) ? clamped.width : undefined,
    height: isResizableFurniture(item.furnitureId) ? clamped.height : undefined,
  }
}
