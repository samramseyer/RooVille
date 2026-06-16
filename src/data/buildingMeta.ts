import type { BuildingCategory } from '../types'
import { getBuildingInteriorLayout } from './interiorLayouts'
import { isEnterableBuilding } from './enterableBuildings'
import { getBuilding } from './buildings'

export interface BuildingRoomSummary {
  roomCount: number
  label: string
  hasBalcony: boolean
}

export function getBuildingRoomSummary(buildingId: string): BuildingRoomSummary | null {
  const layout = getBuildingInteriorLayout(buildingId)
  if (!layout) return null
  const hasBalcony = layout.rooms.some((r) => r.variant === 'balcony')
  const count = layout.rooms.length
  const label =
    count === 1
      ? '1 room'
      : hasBalcony
        ? `${count} rooms · balcony`
        : `${count} rooms`
  return { roomCount: count, label, hasBalcony }
}

export function isEnterableBuildingId(buildingId: string): boolean {
  const building = getBuilding(buildingId)
  return building ? isEnterableBuilding(building) : false
}

/** Quest id → build-menu category to highlight for the next incomplete quest. */
export function getSuggestedBuildCategory(
  completedQuests: string[],
): BuildingCategory | null {
  const order: { questId: string; category: BuildingCategory }[] = [
    { questId: 'first-home', category: 'houses' },
    { questId: 'zoo-keeper', category: 'zoos' },
    { questId: 'harbour-master', category: 'docks' },
    { questId: 'shop-owner', category: 'businesses' },
    { questId: 'decorator', category: 'decor' },
    { questId: 'boathouse-bay', category: 'boathouses' },
    { questId: 'town-planner', category: 'roads' },
  ]
  for (const entry of order) {
    if (!completedQuests.includes(entry.questId)) return entry.category
  }
  return null
}
