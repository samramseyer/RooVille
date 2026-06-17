import { useCallback, useEffect, useRef, useState } from 'react'
import type { BuildingDef, DoorStyleId, GameState, InteriorItem, InteriorOpening, InteriorRoomState, OpeningScaleId, PlacedItem, WindowStyleId } from '../types'
import type { FurnitureDef } from '../data/interiorFurniture'
import { getFurniture, getFurnitureDimensions, isFloorLayerFurniture, isResizableFurniture, clampFurnitureDimensions, clampFurniturePosition } from '../data/interiorFurniture'
import { getInteriorTheme, type InteriorTheme } from '../data/enterableBuildings'
import { WINDOW_STYLES } from '../data/interiorTrimStyles'
import {
  clampDoorOpening,
  clampOpening,
  clampWindowOpening,
  DEFAULT_NEW_DOOR,
  finalizeWindowOnWall,
  getDefaultWindowSize,
  getOpeningWallFace,
  getOpeningWindowStyle,
  getScaledWindowSize,
  resolveStoredOpenings,
  snapOpeningToWall,
  type OpeningWallFace,
} from '../data/interiorOpenings'
import {
  ensureLivingRoomExitDoor,
  getTownExitDoor,
  isAvatarNearExitDoor,
  isLivingAreaRoom,
  isTownExitDoor,
} from '../data/interiorExitDoor'
import { resolveInteriorStyle } from '../data/interiorStyles'
import { getBuildingCatalogDefaultStyle } from '../data/buildingInteriorCatalog'
import { getBuildingInteriorLayout, getRoomDef, getRoomFloorLabel, type RoomNavLink } from '../data/interiorLayouts'
import {
  getRawRoomState,
  patchRoomState,
  resolveCurrentRoomId,
  resolveRoomAvatarPosition,
  resolveRoomInteriorItems,
  resolveRoomInteriorStyle,
  resolveRoomOpenings,
} from '../data/interiorRoomState'
import { resolveWindowView } from '../data/interiorWindowView'
import { playDeleteSound, playPlaceSound, playRotateSound } from '../audio/sounds'
import { getQuickFurnishItems } from '../data/quickFurnish'
import { AvatarSprite } from './AvatarSprite'
import { InteriorFurnitureItemView } from './InteriorFurnitureItemView'
import { InteriorRoomBackground } from './InteriorFurnitureArt'
import { InteriorOpeningView } from './InteriorOpeningView'
import { InteriorPalette, type InteriorPaletteMode, type PaletteTab } from './InteriorPalette'
import { InteriorRoomMap } from './InteriorRoomMap'
import { InteriorRoomNav } from './InteriorRoomNav'
import { SoundToggle } from './SoundToggle'
import { UndoToast } from './UndoToast'

const ROOM_WIDTH = 640
const ROOM_HEIGHT = 480
const FLOOR_TOP = 200
const DEFAULT_AVATAR_INTERIOR = { x: 290, y: 340 }
const AVATAR_RADIUS = 28

type PlacementMode = 'window' | 'door' | null
type DragMode = 'avatar' | 'furniture' | 'opening' | 'resize-opening' | 'resize-furniture' | null
type InteriorMode = 'decorate' | 'design'

type InteriorUndoAction =
  | { type: 'delete-furniture'; item: InteriorItem; roomId: string }
  | { type: 'delete-opening'; opening: InteriorOpening; roomId: string }

function clampAvatarPosition(x: number, y: number, theme: InteriorTheme = 'home') {
  const floorTop = theme === 'zoo' ? AVATAR_RADIUS : FLOOR_TOP + AVATAR_RADIUS
  return {
    x: Math.max(AVATAR_RADIUS, Math.min(ROOM_WIDTH - AVATAR_RADIUS, x)),
    y: Math.max(floorTop, Math.min(ROOM_HEIGHT - AVATAR_RADIUS, y)),
  }
}

interface BuildingInteriorProps {
  gameState: GameState
  placedItem: PlacedItem
  building: BuildingDef
  onUpdate: (updater: (prev: GameState) => GameState) => void
  onExit: () => void
  toggleSound: () => void
}

export function BuildingInterior({
  gameState,
  placedItem,
  building,
  onUpdate,
  onExit,
  toggleSound,
}: BuildingInteriorProps) {
  const theme = getInteriorTheme(building)
  const layout = getBuildingInteriorLayout(building.id)
  const roomRef = useRef<HTMLDivElement>(null)
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureDef | null>(null)
  const [selectedInteriorId, setSelectedInteriorId] = useState<string | null>(null)
  const [selectedOpeningId, setSelectedOpeningId] = useState<string | null>(null)
  const [placementMode, setPlacementMode] = useState<PlacementMode>(null)
  const [placementWindowStyle, setPlacementWindowStyle] = useState<WindowStyleId | null>(null)
  const [paletteTab, setPaletteTab] = useState<PaletteTab | null>(null)
  const [interiorMode, setInteriorMode] = useState<InteriorMode>('decorate')
  const [dragMode, setDragMode] = useState<DragMode>(null)
  const [undoAction, setUndoAction] = useState<InteriorUndoAction | null>(null)
  const undoTimerRef = useRef<number | null>(null)

  const liveItem = gameState.items.find((i) => i.id === placedItem.id) ?? placedItem
  const initialRoomId = layout ? resolveCurrentRoomId(liveItem, layout) : 'main'
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId)
  const [avatarPosition, setAvatarPosition] = useState(() =>
    layout
      ? resolveRoomAvatarPosition(liveItem, layout, initialRoomId)
      : liveItem.interiorAvatarPosition ?? DEFAULT_AVATAR_INTERIOR,
  )
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const draggingFurnitureId = useRef<string | null>(null)
  const draggingOpeningId = useRef<string | null>(null)
  const dragWallLock = useRef<OpeningWallFace | null>(null)
  const resizeSnapshot = useRef({ x: 0, y: 0, width: 0, height: 0, pointerX: 0, pointerY: 0 })

  const roomDef = layout ? getRoomDef(layout, currentRoomId) : undefined
  const interiorItems = layout
    ? resolveRoomInteriorItems(liveItem, layout, currentRoomId)
    : liveItem.interior ?? []
  const interiorStyle = layout
    ? resolveRoomInteriorStyle(liveItem, layout, currentRoomId, theme)
    : resolveInteriorStyle(
        { ...getBuildingCatalogDefaultStyle(building.id), ...liveItem.interiorStyle },
        theme,
      )
  const interiorOpeningsRaw = layout
    ? resolveRoomOpenings(liveItem, layout, currentRoomId, theme, interiorStyle)
    : resolveStoredOpenings(theme, interiorStyle, liveItem.interiorOpenings)
  const interiorOpenings: InteriorOpening[] =
    theme === 'zoo'
      ? interiorOpeningsRaw
      : !layout || currentRoomId === layout.defaultRoomId
        ? ensureLivingRoomExitDoor(interiorOpeningsRaw, theme, interiorStyle)
        : interiorOpeningsRaw
  const windowView = roomDef?.forceOceanView
    ? 'ocean'
    : resolveWindowView(liveItem, building, gameState.items, interiorStyle.windowViewId)
  const soundOn = gameState.soundEnabled
  const trimColor = interiorStyle.trimColor ?? '#C4956A'
  const windowStyleId = interiorStyle.windowStyleId ?? 'classic'
  const doorStyleId = interiorStyle.doorStyleId ?? 'panel'
  const casingTrimProfile = interiorStyle.casingTrimProfileId ?? 'standard'

  const persistRoomData = useCallback(
    (patch: Partial<InteriorRoomState>) => {
      onUpdate((prev) => ({
        ...prev,
        items: prev.items.map((item) => {
          if (item.id !== placedItem.id) return item
          if (!layout) {
            return { ...item, ...patch }
          }
          return {
            ...item,
            ...patchRoomState(item, currentRoomId, layout.defaultRoomId, patch),
          }
        }),
      }))
    },
    [onUpdate, placedItem.id, layout, currentRoomId],
  )

  const persistOpenings = useCallback(
    (openings: InteriorOpening[]) => {
      persistRoomData({ interiorOpenings: openings })
    },
    [persistRoomData],
  )

  const showInteriorUndo = useCallback((action: InteriorUndoAction) => {
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current)
    setUndoAction(action)
    undoTimerRef.current = window.setTimeout(() => setUndoAction(null), 5000)
  }, [])

  const handleInteriorUndo = useCallback(() => {
    if (!undoAction) return
    onUpdate((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== placedItem.id) return item
        if (undoAction.type === 'delete-furniture') {
          if (!layout) {
            const interior = [...(item.interior ?? []), undoAction.item]
            return { ...item, interior }
          }
          const room = getRawRoomState(item, undoAction.roomId, layout.defaultRoomId)
          const interior = [...(room?.interior ?? []), undoAction.item]
          return {
            ...item,
            ...patchRoomState(item, undoAction.roomId, layout.defaultRoomId, { interior }),
          }
        }
        if (!layout) {
          const interiorOpeningsList = [...(item.interiorOpenings ?? []), undoAction.opening]
          return { ...item, interiorOpenings: interiorOpeningsList }
        }
        const room = getRawRoomState(item, undoAction.roomId, layout.defaultRoomId)
        const interiorOpeningsList = [...(room?.interiorOpenings ?? []), undoAction.opening]
        return {
          ...item,
          ...patchRoomState(item, undoAction.roomId, layout.defaultRoomId, {
            interiorOpenings: interiorOpeningsList,
          }),
        }
      }),
    }))
    setUndoAction(null)
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current)
  }, [undoAction, onUpdate, placedItem.id, layout])

  const persistAvatarPosition = useCallback(
    (pos: { x: number; y: number }) => {
      setAvatarPosition(pos)
      persistRoomData({ interiorAvatarPosition: pos })
    },
    [persistRoomData],
  )

  const getCoords = (clientX: number, clientY: number) => {
    const rect = roomRef.current?.getBoundingClientRect()
    if (!rect) return null
    const scaleX = ROOM_WIDTH / rect.width
    const scaleY = ROOM_HEIGHT / rect.height
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const clearSelection = () => {
    setSelectedInteriorId(null)
    setSelectedOpeningId(null)
    setSelectedFurniture(null)
    setPlacementMode(null)
  }

  const placeFurniture = (x: number, y: number) => {
    if (!selectedFurniture) return
    const pos = clampFurniturePosition(
      x - selectedFurniture.width / 2,
      y - selectedFurniture.height / 2,
      selectedFurniture.width,
      selectedFurniture.height,
      selectedFurniture.id,
    )
    const newItem: InteriorItem = {
      id: crypto.randomUUID(),
      furnitureId: selectedFurniture.id,
      x: pos.x,
      y: pos.y,
      rotation: 0,
    }
    persistRoomData({ interior: [...interiorItems, newItem] })
    setSelectedFurniture(null)
    setSelectedInteriorId(null)
    setSelectedOpeningId(null)
    if (soundOn) playPlaceSound()
  }

  const placeOpening = (kind: 'window' | 'door', x: number, y: number) => {
    const styleForWindow = placementWindowStyle ?? windowStyleId
    const defaults =
      kind === 'window' ? getDefaultWindowSize(styleForWindow) : DEFAULT_NEW_DOOR
    const rect = snapOpeningToWall(x, y, defaults.width, defaults.height, kind)
    const draft: InteriorOpening = {
      id: crypto.randomUUID(),
      kind,
      ...rect,
      ...(kind === 'window'
        ? { windowStyleId: styleForWindow }
        : { doorStyleId: doorStyleId }),
    }
    const placed = clampOpening(draft)
    persistOpenings([...interiorOpenings, placed])
    setSelectedOpeningId(null)
    setSelectedInteriorId(null)
    setPlacementMode(null)
    if (soundOn) playPlaceSound()
  }

  const deleteFurniture = (id: string) => {
    const removed = interiorItems.find((item) => item.id === id)
    if (!removed) return
    persistRoomData({ interior: interiorItems.filter((item) => item.id !== id) })
    setSelectedInteriorId(null)
    if (soundOn) playDeleteSound()
    showInteriorUndo({ type: 'delete-furniture', item: removed, roomId: currentRoomId })
  }

  const deleteOpening = (id: string) => {
    const target = interiorOpenings.find((item) => item.id === id)
    if (
      target &&
      isTownExitDoor(target, interiorOpenings, layout, currentRoomId)
    ) {
      return
    }
    if (!target) return
    persistOpenings(interiorOpenings.filter((item) => item.id !== id))
    setSelectedOpeningId(null)
    if (soundOn) playDeleteSound()
    showInteriorUndo({ type: 'delete-opening', opening: target, roomId: currentRoomId })
  }

  const rotateFurniture = (id: string, delta: number) => {
    persistRoomData({
      interior: interiorItems.map((item) =>
        item.id === id ? { ...item, rotation: (item.rotation + delta + 360) % 360 } : item,
      ),
    })
    if (soundOn) playRotateSound()
  }

  const updateOpening = (id: string, patch: Partial<InteriorOpening>) => {
    persistOpenings(
      interiorOpenings.map((item) => {
        if (item.id !== id) return item
        const merged = { ...item, ...patch }
        if (merged.kind === 'window') {
          const wall = dragWallLock.current ?? getOpeningWallFace(merged)
          const rect = finalizeWindowOnWall(merged, wall)
          return clampOpening({ ...merged, ...rect })
        }
        return clampOpening(merged)
      }),
    )
  }

  const applyStyleChange = (patch: Partial<typeof interiorStyle>) => {
    persistRoomData({
      interiorStyle: { ...interiorStyle, ...patch },
    })
    setSelectedFurniture(null)
    if (soundOn) playPlaceSound()
  }

  const applyWindowStyleChoice = (styleId: WindowStyleId) => {
    const opening = interiorOpenings.find((o) => o.id === selectedOpeningId)
    if (opening?.kind === 'window') {
      updateOpening(opening.id, { windowStyleId: styleId })
      if (soundOn) playPlaceSound()
      return
    }
    applyStyleChange({ windowStyleId: styleId })
    setPlacementWindowStyle(styleId)
    setPlacementMode('window')
    setPaletteTab('openings')
    setSelectedFurniture(null)
    setSelectedInteriorId(null)
    setSelectedOpeningId(null)
    if (soundOn) playPlaceSound()
  }

  const scaleSelectedWindow = (scaleId: OpeningScaleId) => {
    const opening = interiorOpenings.find((o) => o.id === selectedOpeningId)
    if (!opening || opening.kind !== 'window') return
    const styleId = getOpeningWindowStyle(opening, windowStyleId, theme)
    const { width, height } = getScaledWindowSize(styleId, scaleId)
    const wall = getOpeningWallFace(opening)
    const centerX = opening.x + opening.width / 2
    const centerY = opening.y + opening.height / 2
    const rect = snapOpeningToWall(centerX, centerY, width, height, 'window', wall)
    updateOpening(opening.id, rect)
    if (soundOn) playPlaceSound()
  }

  const applyDoorStyleChoice = (styleId: DoorStyleId) => {
    const opening = interiorOpenings.find((o) => o.id === selectedOpeningId)
    if (opening?.kind === 'door') {
      updateOpening(opening.id, { doorStyleId: styleId })
      if (soundOn) playPlaceSound()
    } else {
      applyStyleChange({ doorStyleId: styleId })
    }
  }

  const handleRoomPointerDown = (e: React.PointerEvent) => {
    if (dragMode) return
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (placementMode === 'window' || placementMode === 'door') {
      placeOpening(placementMode, coords.x, coords.y)
      return
    }

    if (selectedFurniture) {
      placeFurniture(coords.x, coords.y)
    } else {
      clearSelection()
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (dragMode === 'avatar') {
      const clamped = clampAvatarPosition(coords.x - dragOffset.current.x, coords.y - dragOffset.current.y, theme)
      persistAvatarPosition(clamped)
      return
    }

    if (dragMode === 'furniture' && draggingFurnitureId.current) {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (!pointerMoved.current && Math.hypot(dx, dy) < 8) return

      pointerMoved.current = true
      const furniture = interiorItems.find((item) => item.id === draggingFurnitureId.current)
      const def = furniture ? getFurniture(furniture.furnitureId) : null
      if (!furniture || !def) return
      const size = getFurnitureDimensions(furniture, def)
      const pos = clampFurniturePosition(
        coords.x - dragOffset.current.x,
        coords.y - dragOffset.current.y,
        size.width,
        size.height,
        furniture.furnitureId,
      )
      persistRoomData({
        interior: interiorItems.map((item) =>
          item.id === draggingFurnitureId.current ? { ...item, x: pos.x, y: pos.y } : item,
        ),
      })
      return
    }

    if (dragMode === 'opening' && draggingOpeningId.current) {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (!pointerMoved.current && Math.hypot(dx, dy) < 8) return

      pointerMoved.current = true
      const opening = interiorOpenings.find((item) => item.id === draggingOpeningId.current)
      if (!opening) return
      const rawX = coords.x - dragOffset.current.x
      const rawY = coords.y - dragOffset.current.y
      const snapped = snapOpeningToWall(
        rawX + opening.width / 2,
        rawY + opening.height / 2,
        opening.width,
        opening.height,
        opening.kind,
        dragWallLock.current ?? undefined,
      )
      updateOpening(opening.id, snapped)
      return
    }

    if (dragMode === 'resize-opening' && draggingOpeningId.current) {
      pointerMoved.current = true
      const opening = interiorOpenings.find((item) => item.id === draggingOpeningId.current)
      if (!opening) return
      const snap = resizeSnapshot.current
      const dw = coords.x - snap.pointerX
      const dh = coords.y - snap.pointerY
      if (opening.kind === 'window') {
        const sized = clampWindowOpening({
          x: snap.x,
          y: snap.y,
          width: snap.width + dw,
          height: snap.height + dh,
        })
        const wall = dragWallLock.current ?? getOpeningWallFace(opening)
        const rect = finalizeWindowOnWall(sized, wall)
        updateOpening(opening.id, rect)
      } else {
        const next = clampDoorOpening({
          x: snap.x,
          y: snap.y,
          width: snap.width + dw,
          height: snap.height + dh,
        })
        updateOpening(opening.id, next)
      }
      return
    }

    if (dragMode === 'resize-furniture' && draggingFurnitureId.current) {
      pointerMoved.current = true
      const furniture = interiorItems.find((item) => item.id === draggingFurnitureId.current)
      const def = furniture ? getFurniture(furniture.furnitureId) : null
      if (!furniture || !def) return
      const snap = resizeSnapshot.current
      const dw = coords.x - snap.pointerX
      const dh = coords.y - snap.pointerY
      const next = clampFurnitureDimensions(
        furniture.furnitureId,
        snap.x,
        snap.y,
        snap.width + dw,
        snap.height + dh,
      )
      persistRoomData({
        interior: interiorItems.map((item) =>
          item.id === furniture.id
            ? { ...item, x: next.x, y: next.y, width: next.width, height: next.height }
            : item,
        ),
      })
    }
  }

  const stopDrag = () => {
    setDragMode(null)
    draggingFurnitureId.current = null
    draggingOpeningId.current = null
    dragWallLock.current = null
  }

  const startAvatarDrag = (e: React.PointerEvent) => {
    e.stopPropagation()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    dragOffset.current = { x: coords.x - avatarPosition.x, y: coords.y - avatarPosition.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    setDragMode('avatar')
    clearSelection()
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const startFurnitureDrag = (e: React.PointerEvent, item: InteriorItem) => {
    e.stopPropagation()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    dragOffset.current = { x: coords.x - item.x, y: coords.y - item.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingFurnitureId.current = item.id
    setSelectedInteriorId(item.id)
    setSelectedOpeningId(null)
    setSelectedFurniture(null)
    setPlacementMode(null)
    setDragMode('furniture')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const startOpeningDrag = (e: React.PointerEvent, opening: InteriorOpening) => {
    e.stopPropagation()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (placementMode) {
      setPlacementMode(null)
    }

    dragOffset.current = { x: coords.x - opening.x, y: coords.y - opening.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingOpeningId.current = opening.id
    dragWallLock.current = getOpeningWallFace(opening)
    const exitDoorTap =
      isTownExitDoor(opening, interiorOpenings, layout ?? null, currentRoomId) &&
      isAvatarNearExitDoor(avatarPosition, opening)
    if (!exitDoorTap) {
      setSelectedOpeningId(opening.id)
      setPaletteTab('openings')
    }
    setSelectedInteriorId(null)
    setSelectedFurniture(null)
    setPlacementMode(null)
    setDragMode('opening')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const startOpeningResize = (e: React.PointerEvent, opening: InteriorOpening) => {
    e.stopPropagation()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    resizeSnapshot.current = {
      x: opening.x,
      y: opening.y,
      width: opening.width,
      height: opening.height,
      pointerX: coords.x,
      pointerY: coords.y,
    }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingOpeningId.current = opening.id
    dragWallLock.current =
      opening.kind === 'window' ? getOpeningWallFace(opening) : null
    setSelectedOpeningId(opening.id)
    setPaletteTab('openings')
    setDragMode('resize-opening')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const startFurnitureResize = (e: React.PointerEvent, item: InteriorItem) => {
    e.stopPropagation()
    const def = getFurniture(item.furnitureId)
    if (!def) return
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    const size = getFurnitureDimensions(item, def)
    resizeSnapshot.current = {
      x: item.x,
      y: item.y,
      width: size.width,
      height: size.height,
      pointerX: coords.x,
      pointerY: coords.y,
    }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingFurnitureId.current = item.id
    setSelectedInteriorId(item.id)
    setDragMode('resize-furniture')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const finishFurniturePointer = () => {
    if (!pointerMoved.current && draggingFurnitureId.current) {
      setSelectedInteriorId(draggingFurnitureId.current)
    }
    stopDrag()
  }

  const finishOpeningPointer = () => {
    if (!pointerMoved.current && draggingOpeningId.current) {
      const opening = interiorOpenings.find((item) => item.id === draggingOpeningId.current)
      if (
        opening &&
        isTownExitDoor(opening, interiorOpenings, layout ?? null, currentRoomId) &&
        isAvatarNearExitDoor(avatarPosition, opening)
      ) {
        onExit()
      } else {
        setSelectedOpeningId(draggingOpeningId.current)
      }
    }
    stopDrag()
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (placementMode) setPlacementMode(null)
        else if (selectedOpeningId) setSelectedOpeningId(null)
        else if (selectedInteriorId) setSelectedInteriorId(null)
        else onExit()
      }
      if (selectedOpeningId) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault()
          deleteOpening(selectedOpeningId)
        }
        return
      }
      if (!selectedInteriorId) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteFurniture(selectedInteriorId)
      }
      if (e.key === 'ArrowLeft' || e.key === 'q') rotateFurniture(selectedInteriorId, -90)
      if (e.key === 'ArrowRight' || e.key === 'e') rotateFurniture(selectedInteriorId, 90)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedInteriorId, selectedOpeningId, placementMode, interiorItems, interiorOpenings, soundOn])

  const switchRoom = (link: RoomNavLink) => {
    if (!layout) return

    let nextSpawn = link.spawnPosition

    onUpdate((prev) => {
      const item = prev.items.find((entry) => entry.id === placedItem.id)
      if (!item) return prev

      const currentRoomState = getRawRoomState(item, currentRoomId, layout.defaultRoomId)
      const savedRooms = {
        ...item.interiorRooms,
        [currentRoomId]: {
          ...currentRoomState,
          interiorAvatarPosition: avatarPosition,
        },
      }

      const targetState = savedRooms[link.targetRoomId]
      nextSpawn =
        targetState?.interiorAvatarPosition ??
        getRoomDef(layout, link.targetRoomId)?.defaultAvatar ??
        link.spawnPosition

      return {
        ...prev,
        items: prev.items.map((entry) =>
          entry.id === placedItem.id
            ? {
                ...item,
                interiorRooms: savedRooms,
                currentInteriorRoomId: link.targetRoomId,
              }
            : entry,
        ),
      }
    })

    setCurrentRoomId(link.targetRoomId)
    setAvatarPosition(nextSpawn)
    clearSelection()
    if (soundOn) playPlaceSound()
  }

  const switchToRoomId = (targetRoomId: string) => {
    if (!layout || targetRoomId === currentRoomId) return
    const targetRoom = getRoomDef(layout, targetRoomId)
    if (!targetRoom) return

    let nextSpawn = targetRoom.defaultAvatar ?? DEFAULT_AVATAR_INTERIOR

    onUpdate((prev) => {
      const item = prev.items.find((entry) => entry.id === placedItem.id)
      if (!item) return prev

      const currentRoomState = getRawRoomState(item, currentRoomId, layout.defaultRoomId)
      const savedRooms = {
        ...item.interiorRooms,
        [currentRoomId]: {
          ...currentRoomState,
          interiorAvatarPosition: avatarPosition,
        },
      }

      const targetState = savedRooms[targetRoomId]
      nextSpawn = targetState?.interiorAvatarPosition ?? targetRoom.defaultAvatar ?? DEFAULT_AVATAR_INTERIOR

      return {
        ...prev,
        items: prev.items.map((entry) =>
          entry.id === placedItem.id
            ? {
                ...item,
                interiorRooms: savedRooms,
                currentInteriorRoomId: targetRoomId,
              }
            : entry,
        ),
      }
    })

    setCurrentRoomId(targetRoomId)
    setAvatarPosition(nextSpawn)
    clearSelection()
    if (soundOn) playPlaceSound()
  }

  const quickFurnishRoom = () => {
    if (!roomDef || interiorItems.length > 2) return
    const newItems = getQuickFurnishItems(roomDef.name, building.id)
    persistRoomData({ interior: [...interiorItems, ...newItems] })
    if (soundOn) playPlaceSound()
  }

  const paletteMode: InteriorPaletteMode = theme === 'zoo' ? 'full' : interiorMode === 'decorate' ? 'decorate' : 'design'

  const selectedInterior = interiorItems.find((item) => item.id === selectedInteriorId)
  const selectedInteriorDef = selectedInterior ? getFurniture(selectedInterior.furnitureId) : null
  const selectedOpening = interiorOpenings.find((item) => item.id === selectedOpeningId)
  const isPlacing = !!selectedFurniture || !!placementMode
  const townExitDoor = getTownExitDoor(interiorOpenings)
  const nearTownExitDoor =
    theme === 'zoo'
      ? avatarPosition.y > 350 && Math.abs(avatarPosition.x - ROOM_WIDTH / 2) < 110
      : townExitDoor !== null &&
        isLivingAreaRoom(layout ?? null, currentRoomId) &&
        isAvatarNearExitDoor(avatarPosition, townExitDoor)

  return (
    <div className="building-interior">
      <header className="interior-header">
        <div className="interior-header-left">
          <button type="button" className="btn btn-edit interior-exit-btn" onClick={onExit}>
            ← Leave
          </button>
          <div>
            <h2>{building.name}</h2>
            <span className="interior-subtitle">
              {roomDef ? (
                <>
                  {roomDef.emoji} {roomDef.name} · {getRoomFloorLabel(roomDef)}
                </>
              ) : (
                <>Inside with {gameState.avatar.name}</>
              )}
            </span>
          </div>
        </div>
        <div className="interior-header-actions">
          {theme !== 'zoo' && (
            <div className="interior-mode-toggle" role="group" aria-label="Interior mode">
              <button
                type="button"
                className={`btn btn-small${interiorMode === 'decorate' ? ' btn-primary' : ' btn-ghost'}`}
                onClick={() => {
                  setInteriorMode('decorate')
                  clearSelection()
                  setPaletteTab(null)
                }}
              >
                🛋️ Decorate
              </button>
              <button
                type="button"
                className={`btn btn-small${interiorMode === 'design' ? ' btn-primary' : ' btn-ghost'}`}
                onClick={() => {
                  setInteriorMode('design')
                  clearSelection()
                  setSelectedFurniture(null)
                  setPaletteTab('walls')
                }}
              >
                🎨 Design
              </button>
            </div>
          )}
          <SoundToggle enabled={soundOn} onToggle={toggleSound} compact />
        </div>
        {selectedFurniture && !selectedInteriorId && !selectedOpeningId && (
          <div className="placement-hint interior-placement-hint">
            Placing: {selectedFurniture.name} —{' '}
            {theme === 'zoo' ? 'tap the map to place animals & exhibits' : 'tap anywhere in the room (homes, shops, boats & boathouses)'}
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setSelectedFurniture(null)}>
              Cancel
            </button>
          </div>
        )}
        {placementMode && (
          <div className="placement-hint interior-placement-hint">
            {placementMode === 'window'
              ? `Tap a wall to place your ${WINDOW_STYLES.find((s) => s.id === (placementWindowStyle ?? windowStyleId))?.name.toLowerCase() ?? 'window'} — drag to move, corner to resize`
              : 'Tap the floor wall to place a door'}
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setPlacementMode(null)}>
              Cancel
            </button>
          </div>
        )}
      </header>

      <div className="interior-body">
        <InteriorPalette
          theme={theme}
          style={interiorStyle}
          resolvedWindowView={windowView}
          selectedOpening={selectedOpening ?? null}
          onSelectFurniture={(f) => {
            setSelectedFurniture(f)
            setSelectedInteriorId(null)
            setSelectedOpeningId(null)
            setPlacementMode(null)
          }}
          onStyleChange={applyStyleChange}
          onSelectWindowStyle={applyWindowStyleChoice}
          onSelectDoorStyle={applyDoorStyleChoice}
          selectedFurnitureId={selectedFurniture?.id ?? null}
          placementMode={placementMode}
          activeTab={paletteTab}
          onScaleSelectedWindow={scaleSelectedWindow}
          onStartPlaceWindow={() => {
            setPlacementWindowStyle(windowStyleId)
            setPlacementMode('window')
            setPaletteTab('openings')
            setSelectedFurniture(null)
            setSelectedInteriorId(null)
            setSelectedOpeningId(null)
          }}
          onStartPlaceDoor={() => {
            setPlacementMode('door')
            setPaletteTab('openings')
            setSelectedFurniture(null)
            setSelectedInteriorId(null)
            setSelectedOpeningId(null)
          }}
          editMode={(selectedInteriorId !== null || selectedOpeningId !== null) && !placementMode}
          paletteMode={paletteMode}
          buildingId={building.id}
        />

        <div className="interior-room-container">
          {layout && layout.rooms.length > 1 && (
            <InteriorRoomMap
              layout={layout}
              currentRoomId={currentRoomId}
              onSelectRoom={switchToRoomId}
            />
          )}

          {interiorMode === 'decorate' && theme !== 'zoo' && interiorItems.length <= 2 && roomDef && (
            <button type="button" className="btn btn-secondary btn-small quick-furnish-btn" onClick={quickFurnishRoom}>
              ✨ Quick furnish this room
            </button>
          )}
          {selectedInterior && selectedInteriorDef && (
            <div className="item-toolbar interior-toolbar">
              <span>
                {isResizableFurniture(selectedInterior.furnitureId)
                  ? `Moving: ${selectedInteriorDef.name} — drag corner to resize`
                  : `Moving: ${selectedInteriorDef.name}`}
              </span>
              <button type="button" className="btn btn-small" onClick={() => rotateFurniture(selectedInterior.id, -90)}>
                ↺
              </button>
              <button type="button" className="btn btn-small" onClick={() => rotateFurniture(selectedInterior.id, 90)}>
                ↻
              </button>
              <button type="button" className="btn btn-small btn-danger" onClick={() => deleteFurniture(selectedInterior.id)}>
                Delete
              </button>
              <button type="button" className="btn btn-ghost btn-small" onClick={() => setSelectedInteriorId(null)}>
                Done
              </button>
            </div>
          )}

          {selectedOpening && (
            <div className="item-toolbar interior-toolbar">
              <span>
                {selectedOpening.kind === 'window' ? 'Window' : 'Door'} — drag to move, corner to resize
              </span>
              <button type="button" className="btn btn-small btn-danger" onClick={() => deleteOpening(selectedOpening.id)}>
                Delete
              </button>
              <button type="button" className="btn btn-ghost btn-small" onClick={() => setSelectedOpeningId(null)}>
                Done
              </button>
            </div>
          )}

          <div
            ref={roomRef}
            className={`interior-room interior-room--${theme}${roomDef?.variant === 'zoo-topdown' ? ' interior-room--zoo-topdown' : roomDef ? ` interior-room--${roomDef.variant === 'lantern-deck' ? 'lantern-deck' : roomDef.floor}` : ''}${isPlacing && !selectedInteriorId && !selectedOpeningId ? ' placing-mode' : ''}${placementMode === 'window' ? ' placing-mode--window' : ''}${placementMode === 'door' ? ' placing-mode--door' : ''}`}
            onPointerDown={handleRoomPointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          >
            <svg
              className="interior-room-svg"
              viewBox={`0 0 ${ROOM_WIDTH} ${ROOM_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <InteriorRoomBackground
                theme={theme}
                style={interiorStyle}
                variant={roomDef?.variant ?? 'standard'}
              />
            </svg>

            {roomDef && (
              <InteriorRoomNav links={roomDef.nav} onNavigate={switchRoom} />
            )}

            {theme !== 'zoo' &&
              interiorOpenings.map((opening) => (
                <InteriorOpeningView
                  key={opening.id}
                  opening={opening}
                  theme={theme}
                  defaultWindowStyleId={windowStyleId}
                  defaultDoorStyleId={doorStyleId}
                  trimColor={trimColor}
                  windowView={windowView}
                  casingProfile={casingTrimProfile}
                  selected={opening.id === selectedOpeningId}
                  exitReady={
                    isTownExitDoor(opening, interiorOpenings, layout ?? null, currentRoomId) && nearTownExitDoor
                  }
                  onPointerDown={(e) => startOpeningDrag(e, opening)}
                  onResizePointerDown={(e) => startOpeningResize(e, opening)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishOpeningPointer}
                />
              ))}

            {nearTownExitDoor && (theme === 'zoo' || townExitDoor) && (
              <button
                type="button"
                className="exit-building-btn"
                style={{
                  left: `${((theme === 'zoo' ? ROOM_WIDTH / 2 : (townExitDoor!.x + townExitDoor!.width / 2)) / ROOM_WIDTH) * 100}%`,
                  top: `${((theme === 'zoo' ? 430 : townExitDoor!.y) / ROOM_HEIGHT) * 100}%`,
                }}
                onClick={onExit}
              >
                🚪 Exit to town
              </button>
            )}

            {interiorItems
              .slice()
              .sort((a, b) => {
                const aFloor = isFloorLayerFurniture(a.furnitureId) ? 0 : 1
                const bFloor = isFloorLayerFurniture(b.furnitureId) ? 0 : 1
                if (aFloor !== bFloor) return aFloor - bFloor
                return a.y - b.y
              })
              .map((item) => {
                const def = getFurniture(item.furnitureId)
                if (!def) return null
                return (
                  <InteriorFurnitureItemView
                    key={item.id}
                    item={item}
                    def={def}
                    selected={item.id === selectedInteriorId}
                    cabinetColor={interiorStyle.cabinetColor}
                    countertopMaterial={interiorStyle.countertopMaterial}
                    onPointerDown={(e) => startFurnitureDrag(e, item)}
                    onResizePointerDown={(e) => startFurnitureResize(e, item)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={finishFurniturePointer}
                  />
                )
              })}

            <div
              className="interior-avatar"
              style={{
                left: `${(avatarPosition.x / ROOM_WIDTH) * 100}%`,
                top: `${(avatarPosition.y / ROOM_HEIGHT) * 100}%`,
              }}
              onPointerDown={startAvatarDrag}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDrag}
              role="img"
              aria-label={`${gameState.avatar.name}'s avatar`}
            >
              <AvatarSprite avatar={gameState.avatar} size={56} />
            </div>
          </div>
        </div>
      </div>
      {undoAction && (
        <UndoToast
          message={
            undoAction.type === 'delete-furniture'
              ? 'Furniture removed'
              : `${undoAction.opening.kind === 'window' ? 'Window' : 'Door'} removed`
          }
          onUndo={handleInteriorUndo}
        />
      )}
    </div>
  )
}
