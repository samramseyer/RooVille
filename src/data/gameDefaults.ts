import type { GameState, InteriorItem, InteriorRoomState, PlacedItem } from '../types'
import { DEFAULT_AVATAR, sanitizeAvatar } from './avatarOptions'
import { getBuilding } from './buildings'
import { getInteriorTheme } from './enterableBuildings'
import { getBuildingInteriorLayout } from './interiorLayouts'
import { migratePlacedItemRooms } from './interiorRoomState'
import { clampInteriorFurnitureItem, getFurniture } from './interiorFurniture'
import { sanitizeInteriorStyle } from './interiorStyles'
import { sanitizeInteriorOpenings } from './interiorOpenings'

export const INITIAL_GAME_STATE: GameState = {
  avatar: DEFAULT_AVATAR,
  items: [],
  avatarPosition: { x: 400, y: 280 },
  completedQuests: [],
  soundEnabled: true,
  activeInteriorId: null,
  overworldAvatarPosition: null,
}

function sanitizeInterior(raw: unknown): InteriorItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(
      (item): item is InteriorItem =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as InteriorItem).id === 'string' &&
        typeof (item as InteriorItem).furnitureId === 'string',
    )
    .map((item) => {
      const def = getFurniture(item.furnitureId)
      if (!def) return item
      const normalized: InteriorItem = {
        id: item.id,
        furnitureId: item.furnitureId,
        x: typeof item.x === 'number' ? item.x : 0,
        y: typeof item.y === 'number' ? item.y : 0,
        rotation: typeof item.rotation === 'number' ? item.rotation : 0,
        width: typeof item.width === 'number' ? item.width : undefined,
        height: typeof item.height === 'number' ? item.height : undefined,
      }
      return clampInteriorFurnitureItem(normalized, def)
    })
}

function sanitizeInteriorRooms(
  raw: unknown,
  theme: ReturnType<typeof getInteriorTheme>,
): Partial<Record<string, InteriorRoomState>> | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const result: Partial<Record<string, InteriorRoomState>> = {}
  for (const [roomId, roomRaw] of Object.entries(raw as Record<string, unknown>)) {
    if (!roomRaw || typeof roomRaw !== 'object') continue
    const room = roomRaw as InteriorRoomState
    result[roomId] = {
      interior: sanitizeInterior(room.interior),
      interiorOpenings: sanitizeInteriorOpenings(room.interiorOpenings, theme),
      interiorAvatarPosition:
        room.interiorAvatarPosition &&
        typeof room.interiorAvatarPosition.x === 'number' &&
        typeof room.interiorAvatarPosition.y === 'number'
          ? room.interiorAvatarPosition
          : undefined,
      interiorStyle: room.interiorStyle
        ? sanitizeInteriorStyle(room.interiorStyle, theme)
        : undefined,
    }
  }
  return Object.keys(result).length > 0 ? result : undefined
}

function sanitizeItems(raw: unknown): PlacedItem[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(
      (item): item is PlacedItem =>
        !!item &&
        typeof item === 'object' &&
        typeof (item as PlacedItem).id === 'string' &&
        typeof (item as PlacedItem).buildingId === 'string',
    )
    .map((item) => {
      const building = getBuilding(item.buildingId)
      const theme = building ? getInteriorTheme(building) : 'home'
      const layout = getBuildingInteriorLayout(item.buildingId)
      const base: PlacedItem = {
        id: item.id,
        buildingId: item.buildingId,
        x: typeof item.x === 'number' ? item.x : 0,
        y: typeof item.y === 'number' ? item.y : 0,
        rotation: typeof item.rotation === 'number' ? item.rotation : 0,
        scale: typeof item.scale === 'number' ? item.scale : 1,
        interior: sanitizeInterior(item.interior),
        interiorOpenings: sanitizeInteriorOpenings(item.interiorOpenings, theme),
        interiorAvatarPosition:
          item.interiorAvatarPosition &&
          typeof item.interiorAvatarPosition.x === 'number' &&
          typeof item.interiorAvatarPosition.y === 'number'
            ? item.interiorAvatarPosition
            : undefined,
        interiorStyle: sanitizeInteriorStyle(item.interiorStyle, theme),
        interiorRooms: sanitizeInteriorRooms(item.interiorRooms, theme),
        currentInteriorRoomId:
          typeof item.currentInteriorRoomId === 'string' ? item.currentInteriorRoomId : undefined,
      }
      const migrated = migratePlacedItemRooms(base)
      if (!layout) return migrated
      const validRoomId =
        migrated.currentInteriorRoomId &&
        layout.rooms.some((room) => room.id === migrated.currentInteriorRoomId)
          ? migrated.currentInteriorRoomId
          : layout.defaultRoomId
      return { ...migrated, currentInteriorRoomId: validRoomId }
    })
}

export function migrateSave(raw: Partial<GameState>): GameState {
  const items = sanitizeItems(raw.items)
  let activeInteriorId = typeof raw.activeInteriorId === 'string' ? raw.activeInteriorId : null
  if (activeInteriorId && !items.some((item) => item.id === activeInteriorId)) {
    activeInteriorId = null
  }

  return {
    ...INITIAL_GAME_STATE,
    ...raw,
    avatar: sanitizeAvatar(raw.avatar),
    items,
    avatarPosition: raw.avatarPosition ?? INITIAL_GAME_STATE.avatarPosition,
    completedQuests: Array.isArray(raw.completedQuests) ? raw.completedQuests : [],
    soundEnabled: raw.soundEnabled ?? true,
    activeInteriorId,
    overworldAvatarPosition: raw.overworldAvatarPosition ?? null,
    tutorialCompleted: raw.tutorialCompleted === true,
    favoriteBuildingIds: Array.isArray(raw.favoriteBuildingIds)
      ? raw.favoriteBuildingIds.filter((id): id is string => typeof id === 'string')
      : [],
    tipsSeen: Array.isArray(raw.tipsSeen)
      ? raw.tipsSeen.filter((t): t is string => typeof t === 'string')
      : [],
  }
}
