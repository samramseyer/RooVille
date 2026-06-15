import { useCallback, useEffect, useRef, useState } from 'react'
import type { BuildingDef, DoorStyleId, GameState, InteriorItem, InteriorOpening, PlacedItem, WindowStyleId } from '../types'
import type { FurnitureDef } from '../data/interiorFurniture'
import { getFurniture, isWallFurniture } from '../data/interiorFurniture'
import { getInteriorTheme } from '../data/enterableBuildings'
import {
  clampDoorOpening,
  clampOpening,
  clampWindowOpening,
  DEFAULT_NEW_DOOR,
  DEFAULT_NEW_WINDOW,
  resolveInteriorOpenings,
} from '../data/interiorOpenings'
import { resolveInteriorStyle } from '../data/interiorStyles'
import { resolveWindowView, type MapSize } from '../data/interiorWindowView'
import { playDeleteSound, playPlaceSound, playRotateSound } from '../audio/sounds'
import { AvatarSprite } from './AvatarSprite'
import { InteriorFurnitureArt, InteriorRoomBackground } from './InteriorFurnitureArt'
import { InteriorOpeningView } from './InteriorOpeningView'
import { InteriorPalette } from './InteriorPalette'

const ROOM_WIDTH = 640
const ROOM_HEIGHT = 480
const FLOOR_TOP = 200
const DEFAULT_AVATAR_INTERIOR = { x: 290, y: 340 }
const AVATAR_RADIUS = 28

type PlacementMode = 'window' | 'door' | null
type DragMode = 'avatar' | 'furniture' | 'opening' | 'resize-opening' | null

function clampFurniturePosition(
  x: number,
  y: number,
  width: number,
  height: number,
  furnitureId?: string,
) {
  const clampedX = Math.max(0, Math.min(ROOM_WIDTH - width, x))

  if (furnitureId && isWallFurniture(furnitureId)) {
    return {
      x: clampedX,
      y: Math.max(0, Math.min(FLOOR_TOP - height, y)),
    }
  }

  return {
    x: clampedX,
    y: Math.max(FLOOR_TOP, Math.min(ROOM_HEIGHT - height, y)),
  }
}

function clampAvatarPosition(x: number, y: number) {
  return {
    x: Math.max(AVATAR_RADIUS, Math.min(ROOM_WIDTH - AVATAR_RADIUS, x)),
    y: Math.max(FLOOR_TOP + AVATAR_RADIUS, Math.min(ROOM_HEIGHT - AVATAR_RADIUS, y)),
  }
}

interface BuildingInteriorProps {
  gameState: GameState
  placedItem: PlacedItem
  building: BuildingDef
  mapSize: MapSize
  onUpdate: (updater: (prev: GameState) => GameState) => void
  onExit: () => void
}

function updatePlacedItem(
  items: PlacedItem[],
  itemId: string,
  patch: Partial<PlacedItem>,
): PlacedItem[] {
  return items.map((item) => (item.id === itemId ? { ...item, ...patch } : item))
}

export function BuildingInterior({
  gameState,
  placedItem,
  building,
  mapSize,
  onUpdate,
  onExit,
}: BuildingInteriorProps) {
  const theme = getInteriorTheme(building)
  const roomRef = useRef<HTMLDivElement>(null)
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureDef | null>(null)
  const [selectedInteriorId, setSelectedInteriorId] = useState<string | null>(null)
  const [selectedOpeningId, setSelectedOpeningId] = useState<string | null>(null)
  const [placementMode, setPlacementMode] = useState<PlacementMode>(null)
  const [dragMode, setDragMode] = useState<DragMode>(null)
  const [avatarPosition, setAvatarPosition] = useState(
    placedItem.interiorAvatarPosition ?? DEFAULT_AVATAR_INTERIOR,
  )
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const draggingFurnitureId = useRef<string | null>(null)
  const draggingOpeningId = useRef<string | null>(null)
  const resizeSnapshot = useRef({ x: 0, y: 0, width: 0, height: 0, pointerX: 0, pointerY: 0 })

  const liveItem = gameState.items.find((i) => i.id === placedItem.id) ?? placedItem
  const interiorItems = liveItem.interior ?? []
  const interiorStyle = resolveInteriorStyle(liveItem.interiorStyle, theme)
  const interiorOpenings = resolveInteriorOpenings(theme, interiorStyle, liveItem.interiorOpenings)
  const windowView = resolveWindowView(
    liveItem,
    building,
    gameState.items,
    mapSize,
    interiorStyle.windowViewId,
  )
  const soundOn = gameState.soundEnabled
  const trimColor = interiorStyle.trimColor ?? '#C4956A'
  const windowStyleId = interiorStyle.windowStyleId ?? 'classic'
  const doorStyleId = interiorStyle.doorStyleId ?? 'panel'

  const persistInterior = useCallback(
    (patch: Partial<PlacedItem>) => {
      onUpdate((prev) => ({
        ...prev,
        items: updatePlacedItem(prev.items, placedItem.id, patch),
      }))
    },
    [onUpdate, placedItem.id],
  )

  const persistOpenings = useCallback(
    (openings: InteriorOpening[]) => {
      persistInterior({ interiorOpenings: openings })
    },
    [persistInterior],
  )

  const persistAvatarPosition = useCallback(
    (pos: { x: number; y: number }) => {
      setAvatarPosition(pos)
      persistInterior({ interiorAvatarPosition: pos })
    },
    [persistInterior],
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
    persistInterior({ interior: [...interiorItems, newItem] })
    setSelectedInteriorId(newItem.id)
    setSelectedOpeningId(null)
    if (soundOn) playPlaceSound()
  }

  const placeOpening = (kind: 'window' | 'door', x: number, y: number) => {
    const defaults = kind === 'window' ? DEFAULT_NEW_WINDOW : DEFAULT_NEW_DOOR
    const draft: InteriorOpening = {
      id: crypto.randomUUID(),
      kind,
      x: x - defaults.width / 2,
      y: y - defaults.height / 2,
      width: defaults.width,
      height: defaults.height,
      ...(kind === 'window'
        ? { windowStyleId: windowStyleId }
        : { doorStyleId: doorStyleId }),
    }
    const placed = clampOpening(draft)
    persistOpenings([...interiorOpenings, placed])
    setSelectedOpeningId(placed.id)
    setSelectedInteriorId(null)
    setPlacementMode(null)
    if (soundOn) playPlaceSound()
  }

  const deleteFurniture = (id: string) => {
    persistInterior({ interior: interiorItems.filter((item) => item.id !== id) })
    setSelectedInteriorId(null)
    if (soundOn) playDeleteSound()
  }

  const deleteOpening = (id: string) => {
    persistOpenings(interiorOpenings.filter((item) => item.id !== id))
    setSelectedOpeningId(null)
    if (soundOn) playDeleteSound()
  }

  const rotateFurniture = (id: string, delta: number) => {
    persistInterior({
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
        return clampOpening({ ...item, ...patch })
      }),
    )
  }

  const applyStyleChange = (patch: Partial<typeof interiorStyle>) => {
    persistInterior({
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
    } else {
      applyStyleChange({ windowStyleId: styleId })
    }
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
      const clamped = clampAvatarPosition(coords.x - dragOffset.current.x, coords.y - dragOffset.current.y)
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
      const pos = clampFurniturePosition(
        coords.x - dragOffset.current.x,
        coords.y - dragOffset.current.y,
        def?.width ?? 50,
        def?.height ?? 50,
        furniture?.furnitureId,
      )
      persistInterior({
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
      const pos =
        opening.kind === 'window'
          ? clampWindowOpening({
              ...opening,
              x: coords.x - dragOffset.current.x,
              y: coords.y - dragOffset.current.y,
            })
          : clampDoorOpening({
              ...opening,
              x: coords.x - dragOffset.current.x,
              y: coords.y - dragOffset.current.y,
            })
      updateOpening(opening.id, pos)
      return
    }

    if (dragMode === 'resize-opening' && draggingOpeningId.current) {
      pointerMoved.current = true
      const opening = interiorOpenings.find((item) => item.id === draggingOpeningId.current)
      if (!opening) return
      const snap = resizeSnapshot.current
      const dw = coords.x - snap.pointerX
      const dh = coords.y - snap.pointerY
      const next =
        opening.kind === 'window'
          ? clampWindowOpening({
              x: snap.x,
              y: snap.y,
              width: snap.width + dw,
              height: snap.height + dh,
            })
          : clampDoorOpening({
              x: snap.x,
              y: snap.y,
              width: snap.width + dw,
              height: snap.height + dh,
            })
      updateOpening(opening.id, next)
    }
  }

  const stopDrag = () => {
    setDragMode(null)
    draggingFurnitureId.current = null
    draggingOpeningId.current = null
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
    dragOffset.current = { x: coords.x - opening.x, y: coords.y - opening.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingOpeningId.current = opening.id
    setSelectedOpeningId(opening.id)
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
    setSelectedOpeningId(opening.id)
    setDragMode('resize-opening')
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
      setSelectedOpeningId(draggingOpeningId.current)
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

  const selectedInterior = interiorItems.find((item) => item.id === selectedInteriorId)
  const selectedInteriorDef = selectedInterior ? getFurniture(selectedInterior.furnitureId) : null
  const selectedOpening = interiorOpenings.find((item) => item.id === selectedOpeningId)
  const isPlacing = !!selectedFurniture || !!placementMode

  return (
    <div className="building-interior">
      <header className="interior-header">
        <div className="interior-header-left">
          <button type="button" className="btn btn-edit interior-exit-btn" onClick={onExit}>
            ← Leave
          </button>
          <div>
            <h2>{building.name}</h2>
            <span className="interior-subtitle">Inside with {gameState.avatar.name}</span>
          </div>
        </div>
        {selectedFurniture && !selectedInteriorId && !selectedOpeningId && (
          <div className="placement-hint interior-placement-hint">
            Placing: {selectedFurniture.name}
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setSelectedFurniture(null)}>
              Cancel
            </button>
          </div>
        )}
        {placementMode && (
          <div className="placement-hint interior-placement-hint">
            Tap the {placementMode === 'window' ? 'wall' : 'floor'} to place a {placementMode}
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setPlacementMode(null)}>
              Cancel
            </button>
          </div>
        )}
      </header>

      <div className="interior-body">
        <InteriorPalette
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
          onStartPlaceWindow={() => {
            setPlacementMode('window')
            setSelectedFurniture(null)
            setSelectedInteriorId(null)
          }}
          onStartPlaceDoor={() => {
            setPlacementMode('door')
            setSelectedFurniture(null)
            setSelectedInteriorId(null)
          }}
          editMode={selectedInteriorId !== null || selectedOpeningId !== null}
        />

        <div className="interior-room-container">
          {selectedInterior && selectedInteriorDef && (
            <div className="item-toolbar interior-toolbar">
              <span>Moving: {selectedInteriorDef.name}</span>
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
            className={`interior-room interior-room--${theme}${isPlacing && !selectedInteriorId && !selectedOpeningId ? ' placing-mode' : ''}`}
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
              <InteriorRoomBackground theme={theme} style={interiorStyle} />
            </svg>

            {interiorOpenings.map((opening) => (
              <InteriorOpeningView
                key={opening.id}
                opening={opening}
                theme={theme}
                defaultWindowStyleId={windowStyleId}
                defaultDoorStyleId={doorStyleId}
                trimColor={trimColor}
                windowView={windowView}
                selected={opening.id === selectedOpeningId}
                onPointerDown={(e) => startOpeningDrag(e, opening)}
                onResizePointerDown={(e) => startOpeningResize(e, opening)}
                onPointerMove={handlePointerMove}
                onPointerUp={finishOpeningPointer}
              />
            ))}

            {interiorItems
              .slice()
              .sort((a, b) => {
                const aRug = a.furnitureId === 'rug' ? 0 : 1
                const bRug = b.furnitureId === 'rug' ? 0 : 1
                return aRug - bRug
              })
              .map((item) => {
                const def = getFurniture(item.furnitureId)
                if (!def) return null
                const isSelected = item.id === selectedInteriorId
                return (
                  <div
                    key={item.id}
                    className={`interior-furniture${isSelected ? ' selected' : ''}${item.furnitureId === 'rug' ? ' is-rug' : ''}${isWallFurniture(item.furnitureId) ? ' is-wall' : ''}`}
                    style={{
                      left: `${(item.x / ROOM_WIDTH) * 100}%`,
                      top: `${(item.y / ROOM_HEIGHT) * 100}%`,
                      width: `${(def.width / ROOM_WIDTH) * 100}%`,
                      height: `${(def.height / ROOM_HEIGHT) * 100}%`,
                      transform: `rotate(${item.rotation}deg)`,
                    }}
                    onPointerDown={(e) => startFurnitureDrag(e, item)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={finishFurniturePointer}
                    onPointerCancel={finishFurniturePointer}
                  >
                    <InteriorFurnitureArt id={item.furnitureId} />
                    {isSelected && <div className="selection-ring" />}
                  </div>
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
    </div>
  )
}
