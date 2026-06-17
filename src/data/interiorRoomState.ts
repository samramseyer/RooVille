import type { InteriorTheme } from './enterableBuildings'
import type { BuildingInteriorLayout } from './interiorLayouts'
import {
  getBuildingInteriorLayout,
  getRoomDef,
  getRoomDefaultOpenings,
} from './interiorLayouts'
import { getBuildingCatalogDefaultStyle } from './buildingInteriorCatalog'
import { ensureLivingRoomExitDoor } from './interiorExitDoor'
import { resolveInteriorOpenings } from './interiorOpenings'
import { resolveInteriorStyle } from './interiorStyles'
import type { InteriorRoomState, PlacedItem } from '../types'

function hasLegacyInteriorData(item: PlacedItem): boolean {
  return !!(
    (item.interior && item.interior.length > 0) ||
    item.interiorStyle ||
    item.interiorOpenings !== undefined ||
    item.interiorAvatarPosition
  )
}

export function getRawRoomState(item: PlacedItem, roomId: string, defaultRoomId: string): InteriorRoomState {
  if (item.interiorRooms?.[roomId]) {
    return item.interiorRooms[roomId]!
  }

  if (roomId === defaultRoomId && hasLegacyInteriorData(item)) {
    return {
      interior: item.interior,
      interiorOpenings: item.interiorOpenings,
      interiorAvatarPosition: item.interiorAvatarPosition,
      interiorStyle: item.interiorStyle,
    }
  }

  return {}
}

export function patchRoomState(
  item: PlacedItem,
  roomId: string,
  defaultRoomId: string,
  patch: Partial<InteriorRoomState>,
): Partial<PlacedItem> {
  const layout = getBuildingInteriorLayout(item.buildingId)
  if (!layout) {
    return patch as Partial<PlacedItem>
  }

  const current = getRawRoomState(item, roomId, defaultRoomId)
  const nextRoom: InteriorRoomState = { ...current, ...patch }

  return {
    interiorRooms: {
      ...item.interiorRooms,
      [roomId]: nextRoom,
    },
  }
}

export function resolveCurrentRoomId(item: PlacedItem, layout: BuildingInteriorLayout): string {
  const saved = item.currentInteriorRoomId
  if (saved && layout.rooms.some((room) => room.id === saved)) {
    return saved
  }
  return layout.defaultRoomId
}

export function resolveRoomInteriorStyle(
  item: PlacedItem,
  layout: BuildingInteriorLayout,
  roomId: string,
  theme: InteriorTheme,
) {
  const roomDef = getRoomDef(layout, roomId)
  const raw = getRawRoomState(item, roomId, layout.defaultRoomId)
  const catalogStyle = getBuildingCatalogDefaultStyle(item.buildingId)
  const base = resolveInteriorStyle(raw.interiorStyle, theme)
  if (!roomDef?.defaultStyle && !catalogStyle) return base
  return resolveInteriorStyle({ ...catalogStyle, ...roomDef?.defaultStyle, ...raw.interiorStyle }, theme)
}

export function resolveRoomOpenings(
  item: PlacedItem,
  layout: BuildingInteriorLayout,
  roomId: string,
  theme: InteriorTheme,
  style: ReturnType<typeof resolveInteriorStyle>,
) {
  const roomDef = getRoomDef(layout, roomId)
  const raw = getRawRoomState(item, roomId, layout.defaultRoomId)

  let openings =
    raw.interiorOpenings === undefined
      ? roomDef
        ? getRoomDefaultOpenings(roomDef)
        : []
      : raw.interiorOpenings.length === 0
        ? []
        : resolveInteriorOpenings(theme, style, raw.interiorOpenings)

  if (roomId === layout.defaultRoomId) {
    openings = ensureLivingRoomExitDoor(openings, theme, style)
  }

  if (roomDef?.variant === 'balcony') {
    openings = openings.filter((o) => o.id !== 'balcony-rail')
  }

  return openings
}

export function resolveRoomAvatarPosition(
  item: PlacedItem,
  layout: BuildingInteriorLayout,
  roomId: string,
): { x: number; y: number } {
  const roomDef = getRoomDef(layout, roomId)
  const raw = getRawRoomState(item, roomId, layout.defaultRoomId)
  return raw.interiorAvatarPosition ?? roomDef?.defaultAvatar ?? { x: 290, y: 340 }
}

export function resolveRoomInteriorItems(
  item: PlacedItem,
  layout: BuildingInteriorLayout,
  roomId: string,
) {
  return getRawRoomState(item, roomId, layout.defaultRoomId).interior ?? []
}

export function migratePlacedItemRooms(item: PlacedItem): PlacedItem {
  const layout = getBuildingInteriorLayout(item.buildingId)
  if (!layout) return item

  let next = item
  if (
    item.buildingId === 'petting-zoo' &&
    item.interiorRooms?.['petting-zoo-ground'] &&
    !item.interiorRooms[layout.defaultRoomId]
  ) {
    const legacy = item.interiorRooms['petting-zoo-ground']!
    const { ['petting-zoo-ground']: _removed, ...restRooms } = item.interiorRooms
    next = {
      ...item,
      interiorRooms: {
        ...restRooms,
        [layout.defaultRoomId]: legacy,
      },
      currentInteriorRoomId:
        item.currentInteriorRoomId === 'petting-zoo-ground'
          ? layout.defaultRoomId
          : item.currentInteriorRoomId,
    }
  }

  if (next.interiorRooms && Object.keys(next.interiorRooms).length > 0) {
    return {
      ...next,
      currentInteriorRoomId: resolveCurrentRoomId(next, layout),
    }
  }

  if (!hasLegacyInteriorData(next)) {
    return {
      ...next,
      currentInteriorRoomId: layout.defaultRoomId,
    }
  }

  return {
    ...next,
    interiorRooms: {
      [layout.defaultRoomId]: {
        interior: next.interior,
        interiorOpenings: next.interiorOpenings,
        interiorAvatarPosition: next.interiorAvatarPosition,
        interiorStyle: next.interiorStyle,
      },
    },
    currentInteriorRoomId: layout.defaultRoomId,
  }
}
