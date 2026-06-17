import type { BuildingDef, PlacedItem } from '../types'
import { getPlacedDisplayPosition } from '../data/buildingDisplay'
import { mapPercentStyle } from '../data/mapCoordinates'
import { BuildingArt } from './BuildingArt'

interface PlacementGhostProps {
  item: PlacedItem
  building: BuildingDef
}

export function PlacementGhost({ item, building }: PlacementGhostProps) {
  const display = getPlacedDisplayPosition(item, building)
  const posStyle = mapPercentStyle(display)

  return (
    <div
      className="placement-ghost"
      style={{
        ...posStyle,
        transform: `rotate(${item.rotation}deg)`,
        transformOrigin: 'center bottom',
      }}
      aria-hidden="true"
    >
      <BuildingArt id={item.buildingId} rotation={item.rotation} variant="placed" />
    </div>
  )
}
