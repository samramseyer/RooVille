import type { BuildingDef, PlacedItem } from '../types'
import { snapRoadPlacementFromCenter } from './roads'

/** Map-center coords → stored footprint for a new placed item. */
export function computeBuildingPlacement(
  building: BuildingDef,
  centerX: number,
  centerY: number,
  rotation: number,
) {
  if (building.category === 'roads') {
    const pos = snapRoadPlacementFromCenter(centerX, centerY, building.width, building.height)
    return { ...pos, rotation }
  }
  return {
    x: centerX - building.width / 2,
    y: centerY - building.height / 2,
    rotation: 0,
  }
}

export function buildPreviewPlacedItem(
  building: BuildingDef,
  centerX: number,
  centerY: number,
  rotation: number,
): PlacedItem {
  const placement = computeBuildingPlacement(building, centerX, centerY, rotation)
  return {
    id: '__preview__',
    buildingId: building.id,
    x: placement.x,
    y: placement.y,
    rotation: building.category === 'roads' ? rotation : placement.rotation,
    scale: 1,
  }
}
