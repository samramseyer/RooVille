import { useCallback, useEffect, useRef, useState } from 'react'
import type { BuildingDef, GameState, InteriorItem, PlacedItem } from '../types'
import type { FurnitureDef } from '../data/interiorFurniture'
import { getFurniture } from '../data/interiorFurniture'
import { getInteriorTheme } from '../data/enterableBuildings'
import { resolveInteriorStyle } from '../data/interiorStyles'
import { resolveWindowView, type MapSize } from '../data/interiorWindowView'
import { playDeleteSound, playPlaceSound, playRotateSound } from '../audio/sounds'
import { AvatarSprite } from './AvatarSprite'
import { InteriorFurnitureArt, InteriorRoomBackground } from './InteriorFurnitureArt'
import { InteriorPalette } from './InteriorPalette'

const ROOM_WIDTH = 640
const ROOM_HEIGHT = 480
const FLOOR_TOP = 200
const DEFAULT_AVATAR_INTERIOR = { x: 290, y: 340 }

interface BuildingInteriorProps {
  gameState: GameState
  placedItem: PlacedItem
  building: BuildingDef
  mapSize: MapSize
  onUpdate: (updater: (prev: GameState) => GameState) => void
  onExit: () => void
}

type DragMode = 'avatar' | 'furniture' | null

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
  const [dragMode, setDragMode] = useState<DragMode>(null)
  const [avatarPosition, setAvatarPosition] = useState(
    placedItem.interiorAvatarPosition ?? DEFAULT_AVATAR_INTERIOR,
  )
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const draggingFurnitureId = useRef<string | null>(null)

  const liveItem = gameState.items.find((i) => i.id === placedItem.id) ?? placedItem
  const interiorItems = liveItem.interior ?? []
  const interiorStyle = resolveInteriorStyle(liveItem.interiorStyle, theme)
  const windowView = resolveWindowView(
    liveItem,
    building,
    gameState.items,
    mapSize,
    interiorStyle.windowViewId,
  )
  const soundOn = gameState.soundEnabled

  const persistInterior = useCallback(
    (patch: Partial<PlacedItem>) => {
      onUpdate((prev) => ({
        ...prev,
        items: updatePlacedItem(prev.items, placedItem.id, patch),
      }))
    },
    [onUpdate, placedItem.id],
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

  const clampToFloor = (x: number, y: number, width = 60, height = 60) => ({
    x: Math.max(8, Math.min(ROOM_WIDTH - width - 8, x)),
    y: Math.max(FLOOR_TOP + 8, Math.min(ROOM_HEIGHT - height - 8, y)),
  })

  const placeFurniture = (x: number, y: number) => {
    if (!selectedFurniture) return
    const pos = clampToFloor(
      x - selectedFurniture.width / 2,
      y - selectedFurniture.height / 2,
      selectedFurniture.width,
      selectedFurniture.height,
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
    if (soundOn) playPlaceSound()
  }

  const deleteFurniture = (id: string) => {
    persistInterior({ interior: interiorItems.filter((item) => item.id !== id) })
    setSelectedInteriorId(null)
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

  const applyStyleChange = (patch: Partial<typeof interiorStyle>) => {
    persistInterior({
      interiorStyle: { ...interiorStyle, ...patch },
    })
    setSelectedFurniture(null)
    if (soundOn) playPlaceSound()
  }

  const handleRoomPointerDown = (e: React.PointerEvent) => {
    if (dragMode) return
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (selectedFurniture) {
      placeFurniture(coords.x, coords.y)
    } else {
      setSelectedInteriorId(null)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (dragMode === 'avatar') {
      const clamped = clampToFloor(coords.x - dragOffset.current.x, coords.y - dragOffset.current.y)
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
      const pos = clampToFloor(
        coords.x - dragOffset.current.x,
        coords.y - dragOffset.current.y,
        def?.width ?? 50,
        def?.height ?? 50,
      )
      persistInterior({
        interior: interiorItems.map((item) =>
          item.id === draggingFurnitureId.current ? { ...item, x: pos.x, y: pos.y } : item,
        ),
      })
    }
  }

  const stopDrag = () => {
    setDragMode(null)
    draggingFurnitureId.current = null
  }

  const startAvatarDrag = (e: React.PointerEvent) => {
    e.stopPropagation()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    dragOffset.current = { x: coords.x - avatarPosition.x, y: coords.y - avatarPosition.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    setDragMode('avatar')
    setSelectedInteriorId(null)
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
    setSelectedFurniture(null)
    setDragMode('furniture')
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const finishFurniturePointer = () => {
    if (!pointerMoved.current && draggingFurnitureId.current) {
      setSelectedInteriorId(draggingFurnitureId.current)
    }
    stopDrag()
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedInteriorId) setSelectedInteriorId(null)
        else onExit()
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
  }, [selectedInteriorId, interiorItems, soundOn])

  const selectedInterior = interiorItems.find((item) => item.id === selectedInteriorId)
  const selectedInteriorDef = selectedInterior ? getFurniture(selectedInterior.furnitureId) : null

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
        {selectedFurniture && !selectedInteriorId && (
          <div className="placement-hint interior-placement-hint">
            Placing: {selectedFurniture.name}
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setSelectedFurniture(null)}>
              Cancel
            </button>
          </div>
        )}
      </header>

      <div className="interior-body">
        <InteriorPalette
          style={interiorStyle}
          resolvedWindowView={windowView}
          onSelectFurniture={(f) => {
            setSelectedFurniture(f)
            setSelectedInteriorId(null)
          }}
          onStyleChange={applyStyleChange}
          selectedFurnitureId={selectedFurniture?.id ?? null}
          editMode={selectedInteriorId !== null}
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

          <div
            ref={roomRef}
            className={`interior-room interior-room--${theme}${selectedFurniture && !selectedInteriorId ? ' placing-mode' : ''}`}
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
              <InteriorRoomBackground theme={theme} style={interiorStyle} windowView={windowView} />
            </svg>

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
                    className={`interior-furniture${isSelected ? ' selected' : ''}${item.furnitureId === 'rug' ? ' is-rug' : ''}${item.furnitureId === 'poster' ? ' is-wall' : ''}`}
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
