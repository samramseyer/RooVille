import type { InteriorOpening } from '../types'
import type { BuildingInteriorLayout } from './interiorLayouts'

export const TOWN_EXIT_DOOR_ID = 'door-main'

export function isLivingAreaRoom(layout: BuildingInteriorLayout | null, currentRoomId: string): boolean {
  if (!layout) return true
  return currentRoomId === layout.defaultRoomId
}

export function getTownExitDoor(openings: InteriorOpening[]): InteriorOpening | null {
  return openings.find((o) => o.kind === 'door' && o.id === TOWN_EXIT_DOOR_ID) ?? null
}

export function isTownExitDoor(
  opening: InteriorOpening,
  layout: BuildingInteriorLayout | null,
  currentRoomId: string,
): boolean {
  return (
    opening.kind === 'door' &&
    opening.id === TOWN_EXIT_DOOR_ID &&
    isLivingAreaRoom(layout, currentRoomId)
  )
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
