import type { BuildingCategory } from '../types'
import { getBuilding } from './buildings'

export const ROAD_TILE = 48

export function isRoadCategory(category: BuildingCategory | undefined): boolean {
  return category === 'roads'
}

export function isRoadBuilding(buildingId: string): boolean {
  return getBuilding(buildingId)?.category === 'roads'
}

export function snapRoadCoord(value: number): number {
  return Math.round(value / ROAD_TILE) * ROAD_TILE
}

export function snapRoadPosition(x: number, y: number): { x: number; y: number } {
  return { x: snapRoadCoord(x), y: snapRoadCoord(y) }
}

export function snapRoadPlacementFromCenter(
  centerX: number,
  centerY: number,
  width: number,
  height: number,
): { x: number; y: number } {
  return snapRoadPosition(centerX - width / 2, centerY - height / 2)
}
