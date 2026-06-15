import type { InteriorOpening, InteriorStyle } from '../types'
import type { InteriorTheme } from './enterableBuildings'
import type { BuildingInteriorLayout } from './interiorLayouts'
import { getDefaultOpenings } from './interiorOpenings'

export const TOWN_EXIT_DOOR_ID = 'door-main'

export function isLivingAreaRoom(layout: BuildingInteriorLayout | null, currentRoomId: string): boolean {
  if (!layout) return true
  return currentRoomId === layout.defaultRoomId
}

/** Prefer door-main; otherwise the lowest door (typical exit at the room entrance). */
export function getTownExitDoor(openings: InteriorOpening[]): InteriorOpening | null {
  const main = openings.find((o) => o.kind === 'door' && o.id === TOWN_EXIT_DOOR_ID)
  if (main) return main

  const doors = openings.filter((o) => o.kind === 'door')
  if (doors.length === 0) return null
  if (doors.length === 1) return doors[0]!

  return doors.reduce((best, door) =>
    door.y + door.height > best.y + best.height ? door : best,
  )
}

export function ensureLivingRoomExitDoor(
  openings: InteriorOpening[],
  theme: InteriorTheme,
  style: InteriorStyle,
): InteriorOpening[] {
  if (openings.some((o) => o.kind === 'door' && o.id === TOWN_EXIT_DOOR_ID)) {
    return openings
  }
  const defaultDoor = getDefaultOpenings(theme, style).find(
    (o) => o.kind === 'door' && o.id === TOWN_EXIT_DOOR_ID,
  )
  if (!defaultDoor) return openings
  return [...openings, defaultDoor]
}

export function isTownExitDoor(
  opening: InteriorOpening,
  openings: InteriorOpening[],
  layout: BuildingInteriorLayout | null,
  currentRoomId: string,
): boolean {
  if (!isLivingAreaRoom(layout, currentRoomId) || opening.kind !== 'door') return false
  const exitDoor = getTownExitDoor(openings)
  return exitDoor?.id === opening.id
}

export function isAvatarNearExitDoor(
  avatarPosition: { x: number; y: number },
  door: InteriorOpening,
  padding = 80,
): boolean {
  const doorCenterX = door.x + door.width / 2
  const doorCenterY = door.y + door.height / 2
  return Math.hypot(avatarPosition.x - doorCenterX, avatarPosition.y - doorCenterY) <= padding
}
