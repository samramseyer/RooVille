import type { BuildingDef, PlacedItem, WindowViewSetting } from '../types'
import { getBuilding } from './buildings'

export type WindowViewId = Exclude<WindowViewSetting, 'auto'>

export interface MapSize {
  width: number
  height: number
}

export const WINDOW_VIEW_OPTIONS: { id: WindowViewSetting; name: string; emoji: string }[] = [
  { id: 'auto', name: 'Auto (by location)', emoji: '📍' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊' },
  { id: 'beach', name: 'Beach', emoji: '🏖️' },
  { id: 'dock', name: 'Dock', emoji: '⚓' },
  { id: 'town', name: 'Town', emoji: '🏘️' },
  { id: 'landscape', name: 'Landscape', emoji: '🌄' },
]

const DOCK_CATEGORIES = new Set(['docks', 'boathouses', 'boats'])

/** Map layout matches App.css: land top ~58%, beach band, ocean bottom ~38% */
const LAND_TOP_MAX = 0.58
const BEACH_TOP_MAX = 0.7

function buildingCenter(item: PlacedItem, building: BuildingDef) {
  return {
    x: item.x + building.width / 2,
    y: item.y + building.height / 2,
  }
}

function hasNearbyDock(
  item: PlacedItem,
  building: BuildingDef,
  allItems: PlacedItem[],
  radius: number,
): boolean {
  const center = buildingCenter(item, building)

  for (const other of allItems) {
    if (other.id === item.id) continue
    const otherBuilding = getBuilding(other.buildingId)
    if (!otherBuilding || !DOCK_CATEGORIES.has(otherBuilding.category)) continue

    const otherCenter = buildingCenter(other, otherBuilding)
    if (Math.hypot(center.x - otherCenter.x, center.y - otherCenter.y) <= radius) {
      return true
    }
  }

  return false
}

export function detectWindowViewFromLocation(
  item: PlacedItem,
  building: BuildingDef,
  allItems: PlacedItem[],
  mapSize: MapSize,
): WindowViewId {
  const height = Math.max(mapSize.height, 1)
  const center = buildingCenter(item, building)
  const yNorm = center.y / height

  if (hasNearbyDock(item, building, allItems, Math.max(160, mapSize.width * 0.18))) {
    return 'dock'
  }

  if (building.category === 'boats' || yNorm >= BEACH_TOP_MAX) {
    return 'ocean'
  }

  if (yNorm >= LAND_TOP_MAX) {
    return 'beach'
  }

  if (yNorm >= 0.32) {
    return 'town'
  }

  return 'landscape'
}

export function resolveWindowView(
  item: PlacedItem,
  building: BuildingDef,
  allItems: PlacedItem[],
  mapSize: MapSize,
  setting: WindowViewSetting | undefined,
): WindowViewId {
  if (setting && setting !== 'auto') {
    return setting
  }
  return detectWindowViewFromLocation(item, building, allItems, mapSize)
}

export function sanitizeWindowViewSetting(raw: unknown): WindowViewSetting {
  if (raw === 'auto') return 'auto'
  if (
    raw === 'ocean' ||
    raw === 'beach' ||
    raw === 'dock' ||
    raw === 'town' ||
    raw === 'landscape'
  ) {
    return raw
  }
  return 'auto'
}
