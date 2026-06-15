import type { BuildingCategory, BuildingDef, PlacedItem } from '../types'

/** Y coordinate in SVG viewBox where the asset meets ground or water. */
const GROUND_Y_BY_ID: Partial<Record<string, number>> = {
  sailboat: 66,
  'fishing-boat': 42,
  kayak: 24,
  yacht: 58,
  pier: 50,
  'raised-pier': 50,
  marina: 54,
  jetty: 44,
  lighthouse: 116,
}

const DOCK_GROUND_HORIZONTAL: Partial<Record<string, number>> = {
  pier: 50,
  'raised-pier': 50,
  marina: 54,
  jetty: 44,
}

const DOCK_GROUND_VERTICAL: Partial<Record<string, number>> = {
  pier: 52,
  'raised-pier': 52,
  marina: 58,
  jetty: 42,
}

const GROUND_FRAC_BY_CATEGORY: Partial<Record<BuildingCategory, number>> = {
  houses: 0.93,
  businesses: 0.94,
  boathouses: 0.9,
  zoos: 0.88,
  decor: 0.9,
}

/** Extra pixels to sink the display box into the map for a grounded look. */
const MAP_SINK_BY_CATEGORY: Partial<Record<BuildingCategory, number>> = {
  boats: 10,
  docks: 8,
  boathouses: 6,
  houses: 5,
  businesses: 5,
  zoos: 5,
}

export function getPlacedGroundY(
  id: string,
  category: BuildingCategory,
  viewBoxHeight: number,
  rotation = 0,
): number {
  if (GROUND_Y_BY_ID[id] !== undefined) {
    const base = GROUND_Y_BY_ID[id]!
    if (category === 'docks') {
      const r = ((rotation % 360) + 360) % 360
      const isVertical = r === 90 || r === 270
      const table = isVertical ? DOCK_GROUND_VERTICAL : DOCK_GROUND_HORIZONTAL
      return table[id] ?? base
    }
    return base
  }

  if (category === 'docks') {
    const r = ((rotation % 360) + 360) % 360
    const isVertical = r === 90 || r === 270
    const table = isVertical ? DOCK_GROUND_VERTICAL : DOCK_GROUND_HORIZONTAL
    if (table[id] !== undefined) return table[id]!
  }

  const frac = GROUND_FRAC_BY_CATEGORY[category] ?? 0.92
  return viewBoxHeight * frac
}

export function getPlacedMapSink(building: BuildingDef): number {
  if (building.category === 'roads' || building.category === 'decor') return 0
  return MAP_SINK_BY_CATEGORY[building.category] ?? 4
}

/** Map scale multiplier — palette stays small; placed buildings render larger. */
export const PLACED_SCALE_BY_CATEGORY: Record<BuildingCategory, number> = {
  roads: 1,
  boats: 1.35,
  decor: 1.3,
  docks: 1.4,
  boathouses: 1.45,
  zoos: 1.45,
  houses: 1.5,
  businesses: 1.55,
}

const EXTRA_SCALE_BY_ID: Partial<Record<string, number>> = {
  'five-star-hotel': 1.65,
  'skyline-tower': 1.6,
  'luxury-resort': 1.5,
  lighthouse: 1.55,
}

export function getPlacedDisplayScale(building: BuildingDef): number {
  return EXTRA_SCALE_BY_ID[building.id] ?? PLACED_SCALE_BY_CATEGORY[building.category]
}

export function getPlacedDisplaySize(building: BuildingDef, itemScale = 1) {
  const scale = getPlacedDisplayScale(building) * itemScale
  return {
    width: building.width * scale,
    height: building.height * scale,
    scale,
  }
}

/** Keep the building anchored on its stored footprint while growing visually. */
export function getPlacedDisplayPosition(item: PlacedItem, building: BuildingDef) {
  const { width, height } = getPlacedDisplaySize(building, item.scale)
  const offsetX = (building.width - width) / 2
  const offsetY = building.height - height
  const sink = getPlacedMapSink(building)
  return {
    left: item.x + offsetX,
    top: item.y + offsetY + sink,
    width,
    height,
  }
}

export function getPlacedCenter(item: PlacedItem, building: BuildingDef) {
  const pos = getPlacedDisplayPosition(item, building)
  return {
    x: pos.left + pos.width / 2,
    y: pos.top + pos.height / 2,
  }
}

export function itemPositionFromDisplay(
  displayLeft: number,
  displayTop: number,
  building: BuildingDef,
  itemScale = 1,
) {
  const { width, height } = getPlacedDisplaySize(building, itemScale)
  const offsetX = (building.width - width) / 2
  const offsetY = building.height - height
  return {
    x: displayLeft - offsetX,
    y: displayTop - offsetY,
  }
}
