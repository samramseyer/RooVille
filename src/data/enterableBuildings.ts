import type { BuildingCategory, BuildingDef, PlacedItem } from '../types'
import { getBuilding } from './buildings'

const ENTERABLE_CATEGORIES: BuildingCategory[] = ['houses', 'businesses', 'boats', 'boathouses']

export type InteriorTheme = 'home' | 'shop' | 'boat'

export function isEnterableBuilding(building: BuildingDef): boolean {
  return ENTERABLE_CATEGORIES.includes(building.category)
}

export function getInteriorTheme(building: BuildingDef): InteriorTheme {
  if (building.category === 'boats') return 'boat'
  if (building.category === 'businesses') return 'shop'
  return 'home'
}

export function getBuildingBounds(item: PlacedItem, building: BuildingDef) {
  return {
    left: item.x,
    top: item.y,
    right: item.x + building.width,
    bottom: item.y + building.height,
    centerX: item.x + building.width / 2,
    centerY: item.y + building.height / 2,
  }
}

export function isAvatarNearBuilding(
  avatarPosition: { x: number; y: number },
  item: PlacedItem,
  building: BuildingDef,
  padding = 48,
): boolean {
  const bounds = getBuildingBounds(item, building)
  const avatarCenterX = avatarPosition.x + 30
  const avatarCenterY = avatarPosition.y + 30
  const reach = Math.max(building.width, building.height) / 2 + padding
  return Math.hypot(avatarCenterX - bounds.centerX, avatarCenterY - bounds.centerY) <= reach
}

export function findNearbyEnterable(
  avatarPosition: { x: number; y: number },
  items: PlacedItem[],
  padding = 48,
): { item: PlacedItem; building: BuildingDef } | null {
  let closest: { item: PlacedItem; building: BuildingDef; dist: number } | null = null

  for (const item of items) {
    const building = getBuilding(item.buildingId)
    if (!building || !isEnterableBuilding(building)) continue
    if (!isAvatarNearBuilding(avatarPosition, item, building, padding)) continue

    const bounds = getBuildingBounds(item, building)
    const avatarCenterX = avatarPosition.x + 30
    const avatarCenterY = avatarPosition.y + 30
    const dist = Math.hypot(avatarCenterX - bounds.centerX, avatarCenterY - bounds.centerY)
    if (!closest || dist < closest.dist) {
      closest = { item, building, dist }
    }
  }

  return closest ? { item: closest.item, building: closest.building } : null
}

export function getExitAvatarPosition(item: PlacedItem, building: BuildingDef) {
  return {
    x: item.x + building.width / 2 - 30,
    y: item.y + building.height + 8,
  }
}
