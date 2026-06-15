import { useCallback, useEffect, useRef, useState } from 'react'
import type { BuildingDef, GameState, PlacedItem } from '../types'
import { getBuilding } from '../data/buildings'
import { QUESTS } from '../data/quests'
import {
  playDeleteSound,
  playPlaceSound,
  playQuestCompleteSound,
  playRotateSound,
  playSeagullSound,
  resumeAudio,
  setWaveVolume,
  startWaveAmbience,
  stopWaveAmbience,
} from '../audio/sounds'
import type { TimePhase } from '../hooks/useDayNight'
import { useDayNightCycle } from '../hooks/useDayNight'
import { AvatarSprite } from './AvatarSprite'
import { BuildingArt } from './BuildingArt'
import { BuildingInterior } from './BuildingInterior'
import { BuildingPalette } from './BuildingPalette'
import { ItemEditPanel } from './ItemEditPanel'
import { checkQuest, QuestPanel } from './QuestPanel'
import {
  findNearbyEnterable,
  getExitAvatarPosition,
  isEnterableBuilding,
} from '../data/enterableBuildings'

interface CoastalWorldProps {
  gameState: GameState
  onUpdate: (updater: (prev: GameState) => GameState) => void
  onEditAvatar: () => void
  onReset: () => void
}

type DragMode = 'avatar' | 'item' | null

const DRAG_THRESHOLD = 8

function PlacedBuildingView({
  item,
  isSelected,
  onRotateLeft,
  onRotateRight,
  onDelete,
}: {
  item: PlacedItem
  isSelected: boolean
  onRotateLeft: () => void
  onRotateRight: () => void
  onDelete: () => void
}) {
  const building = getBuilding(item.buildingId)
  if (!building) return null

  return (
    <div
      className={`placed-building${isSelected ? ' selected' : ''}`}
      style={{
        left: item.x,
        top: item.y,
        transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
        width: building.width,
        height: building.height,
      }}
      role="button"
      tabIndex={0}
      aria-label={`${building.name}, tap to edit`}
    >
      <BuildingArt id={item.buildingId} rotation={item.rotation} width={building.width} height={building.height} />
      {isSelected && (
        <>
          <div className="selection-ring" />
          <div className="item-float-controls" onPointerDown={(e) => e.stopPropagation()}>
            <button type="button" className="float-btn" onClick={onRotateLeft} aria-label="Turn left">
              ↺
            </button>
            <button type="button" className="float-btn" onClick={onRotateRight} aria-label="Turn right">
              ↻
            </button>
            <button type="button" className="float-btn float-btn-delete" onClick={onDelete} aria-label="Delete">
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const PHASE_LABELS: Record<TimePhase, string> = {
  day: '☀️ Day',
  sunset: '🌅 Sunset',
  night: '🌙 Night',
  dawn: '🌄 Dawn',
}

export function CoastalWorld({ gameState, onUpdate, onEditAvatar, onReset }: CoastalWorldProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapSize, setMapSize] = useState({ width: 800, height: 520 })
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDef | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [dragMode, setDragMode] = useState<DragMode>(null)
  const [celebration, setCelebration] = useState<string | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const draggingItemId = useRef<string | null>(null)
  const { phase, paused, setPhaseManual, resumeCycle } = useDayNightCycle()

  const soundOn = gameState.soundEnabled

  const updateMapSize = useCallback(() => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (rect?.width && rect?.height) {
      setMapSize({ width: rect.width, height: rect.height })
    }
  }, [])

  useEffect(() => {
    updateMapSize()
    window.addEventListener('resize', updateMapSize)
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateMapSize) : null
    if (mapRef.current && observer) observer.observe(mapRef.current)
    return () => {
      window.removeEventListener('resize', updateMapSize)
      observer?.disconnect()
    }
  }, [updateMapSize])

  const initAudio = useCallback(() => {
    resumeAudio()
    if (soundOn) startWaveAmbience()
  }, [soundOn])

  useEffect(() => {
    initAudio()
    return () => stopWaveAmbience()
  }, [initAudio])

  useEffect(() => {
    const dayFactor = phase === 'day' ? 1 : phase === 'sunset' || phase === 'dawn' ? 0.5 : 0.2
    setWaveVolume(dayFactor)
  }, [phase])

  useEffect(() => {
    if (!soundOn) return
    const timer = setInterval(() => {
      if (phase === 'day' || phase === 'dawn') playSeagullSound()
    }, 25000)
    return () => clearInterval(timer)
  }, [soundOn, phase])

  useEffect(() => {
    const newlyCompleted = QUESTS.filter(
      (q) => !gameState.completedQuests.includes(q.id) && checkQuest(q.id, gameState.items),
    )
    if (newlyCompleted.length === 0) return

    onUpdate((prev) => ({
      ...prev,
      completedQuests: [...prev.completedQuests, ...newlyCompleted.map((q) => q.id)],
    }))

    const titles = newlyCompleted.map((q) => q.title).join(', ')
    setCelebration(`Quest complete: ${titles}!`)
    if (soundOn) playQuestCompleteSound()
    const timer = setTimeout(() => setCelebration(null), 4000)
    return () => clearTimeout(timer)
  }, [gameState.items, gameState.completedQuests, onUpdate, soundOn])

  const getCoords = (clientX: number, clientY: number) => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (!rect) return null
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const selectItem = (itemId: string) => {
    setSelectedItemId(itemId)
    setSelectedBuilding(null)
  }

  const placeBuilding = useCallback(
    (x: number, y: number) => {
      if (!selectedBuilding) return
      const newItem: PlacedItem = {
        id: crypto.randomUUID(),
        buildingId: selectedBuilding.id,
        x: x - selectedBuilding.width / 2,
        y: y - selectedBuilding.height / 2,
        rotation: 0,
        scale: 1,
      }
      onUpdate((prev) => ({ ...prev, items: [...prev.items, newItem] }))
      selectItem(newItem.id)
      if (soundOn) playPlaceSound()
    },
    [selectedBuilding, onUpdate, soundOn],
  )

  const stopDrag = () => {
    setDragMode(null)
    draggingItemId.current = null
  }

  const handleMapPointerDown = (e: React.PointerEvent) => {
    if (dragMode) return
    initAudio()
    pointerMoved.current = false

    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (selectedBuilding) {
      placeBuilding(coords.x, coords.y)
    } else {
      setSelectedItemId(null)
    }
  }

  const handleMapPointerMove = (e: React.PointerEvent) => {
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    if (dragMode === 'avatar') {
      onUpdate((prev) => ({
        ...prev,
        avatarPosition: {
          x: coords.x - dragOffset.current.x,
          y: coords.y - dragOffset.current.y,
        },
      }))
      return
    }

    if (dragMode === 'item' && draggingItemId.current) {
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      if (!pointerMoved.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return

      pointerMoved.current = true
      onUpdate((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === draggingItemId.current
            ? { ...item, x: coords.x - dragOffset.current.x, y: coords.y - dragOffset.current.y }
            : item,
        ),
      }))
    }
  }

  const startAvatarDrag = (e: React.PointerEvent) => {
    e.stopPropagation()
    initAudio()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return
    dragOffset.current = {
      x: coords.x - gameState.avatarPosition.x,
      y: coords.y - gameState.avatarPosition.y,
    }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    setDragMode('avatar')
    setSelectedItemId(null)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const startItemPointer = (e: React.PointerEvent, item: PlacedItem) => {
    e.stopPropagation()
    initAudio()
    const coords = getCoords(e.clientX, e.clientY)
    if (!coords) return

    dragOffset.current = { x: coords.x - item.x, y: coords.y - item.y }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingItemId.current = item.id
    selectItem(item.id)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const finishItemPointer = () => {
    if (!pointerMoved.current && draggingItemId.current) {
      selectItem(draggingItemId.current)
    }
    stopDrag()
  }

  const rotateItem = (itemId: string, delta: number) => {
    onUpdate((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, rotation: (item.rotation + delta + 360) % 360 } : item,
      ),
    }))
    setSelectedItemId(itemId)
    if (soundOn) playRotateSound()
  }

  const deleteItem = (itemId: string) => {
    onUpdate((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
      activeInteriorId: prev.activeInteriorId === itemId ? null : prev.activeInteriorId,
    }))
    setSelectedItemId(null)
    if (soundOn) playDeleteSound()
  }

  const enterBuilding = (itemId: string) => {
    onUpdate((prev) => ({
      ...prev,
      activeInteriorId: itemId,
      overworldAvatarPosition: prev.avatarPosition,
    }))
    setSelectedItemId(null)
    setSelectedBuilding(null)
    if (soundOn) playPlaceSound()
  }

  const exitInterior = () => {
    onUpdate((prev) => {
      if (!prev.activeInteriorId) return prev
      const item = prev.items.find((i) => i.id === prev.activeInteriorId)
      const building = item ? getBuilding(item.buildingId) : undefined
      const exitPos =
        item && building
          ? getExitAvatarPosition(item, building)
          : prev.overworldAvatarPosition ?? prev.avatarPosition
      return {
        ...prev,
        activeInteriorId: null,
        avatarPosition: exitPos,
        overworldAvatarPosition: null,
      }
    })
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!selectedItemId) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        deleteItem(selectedItemId)
      }
      if (e.key === 'ArrowLeft' || e.key === 'q') rotateItem(selectedItemId, -90)
      if (e.key === 'ArrowRight' || e.key === 'e') rotateItem(selectedItemId, 90)
      if (e.key === 'Escape') setSelectedItemId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedItemId, soundOn, onUpdate])

  const toggleSound = () => {
    onUpdate((prev) => {
      const next = !prev.soundEnabled
      if (next) {
        resumeAudio()
        startWaveAmbience()
      } else {
        stopWaveAmbience()
      }
      return { ...prev, soundEnabled: next }
    })
  }

  const selectedItem = gameState.items.find((i) => i.id === selectedItemId)
  const selectedDef = selectedItem ? getBuilding(selectedItem.buildingId) : null
  const activeInteriorItem = gameState.activeInteriorId
    ? gameState.items.find((i) => i.id === gameState.activeInteriorId)
    : null
  const activeInteriorDef = activeInteriorItem ? getBuilding(activeInteriorItem.buildingId) : null
  const nearbyEnterable =
    !selectedBuilding && !selectedItemId && !gameState.activeInteriorId
      ? findNearbyEnterable(gameState.avatarPosition, gameState.items)
      : null

  if (activeInteriorItem && activeInteriorDef) {
    return (
      <BuildingInterior
        gameState={gameState}
        placedItem={activeInteriorItem}
        building={activeInteriorDef}
        mapSize={mapSize}
        onUpdate={onUpdate}
        onExit={exitInterior}
      />
    )
  }

  return (
    <div className="coastal-world">
      <header className="world-header">
        <div className="world-header-left">
          <h2>RooVille</h2>
          <span className="player-name">👋 {gameState.avatar.name}</span>
        </div>
        <div className="world-header-actions">
          <button type="button" className="btn btn-ghost btn-small" onClick={toggleSound}>
            {soundOn ? '🔊 Sound on' : '🔇 Sound off'}
          </button>
          <div className="time-controls">
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => {
                const phases: TimePhase[] = ['day', 'sunset', 'night', 'dawn']
                const idx = phases.indexOf(phase)
                setPhaseManual(phases[(idx + 1) % phases.length])
              }}
            >
              {PHASE_LABELS[phase]}
            </button>
            {paused && (
              <button type="button" className="btn btn-ghost btn-small" onClick={resumeCycle}>
                Auto cycle
              </button>
            )}
          </div>
          <button type="button" className="btn btn-ghost" onClick={onEditAvatar}>
            Edit Avatar
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              if (confirm('Start over? Your town will be cleared.')) onReset()
            }}
          >
            New Town
          </button>
        </div>
      </header>

      {celebration && <div className="celebration-toast">{celebration}</div>}

      <div className="world-body">
        <aside className="sidebar-left">
          <BuildingPalette
            onSelectBuilding={(b) => {
              setSelectedBuilding(b)
              setSelectedItemId(null)
            }}
            selectedBuildingId={selectedBuilding?.id ?? null}
            editMode={selectedItemId !== null}
          />

          {selectedItem && selectedDef && (
            <ItemEditPanel
              item={selectedItem}
              building={selectedDef}
              onRotateLeft={() => rotateItem(selectedItem.id, -90)}
              onRotateRight={() => rotateItem(selectedItem.id, 90)}
              onDelete={() => deleteItem(selectedItem.id)}
              onDeselect={() => setSelectedItemId(null)}
              onEnter={isEnterableBuilding(selectedDef) ? () => enterBuilding(selectedItem.id) : undefined}
            />
          )}
        </aside>

        <div className="map-container">
          {selectedBuilding && !selectedItemId && (
            <div className="placement-hint">
              Placing: {selectedBuilding.name} — tap the map!
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={() => setSelectedBuilding(null)}
              >
                Cancel
              </button>
            </div>
          )}

          {selectedItem && selectedDef && (
            <div className="item-toolbar">
              <span>Editing: {selectedDef.name}</span>
              <button type="button" className="btn btn-small" onClick={() => rotateItem(selectedItem.id, -90)}>
                ↺ Left
              </button>
              <button type="button" className="btn btn-small" onClick={() => rotateItem(selectedItem.id, 90)}>
                Right ↻
              </button>
              <button type="button" className="btn btn-small btn-danger" onClick={() => deleteItem(selectedItem.id)}>
                Delete
              </button>
            </div>
          )}

          <div
            ref={mapRef}
            className={`coastal-map coastal-map--${phase}${selectedBuilding && !selectedItemId ? ' placing-mode' : ''}`}
            data-phase={phase}
            onPointerDown={handleMapPointerDown}
            onPointerMove={handleMapPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          >
            <div className="map-sky" />
            <div className="map-sun" aria-hidden="true" />
            <div className="map-moon" aria-hidden="true" />
            <div className="map-stars" aria-hidden="true" />

            <div className="map-ocean">
              <div className="wave wave-1" />
              <div className="wave wave-2" />
              <div className="wave wave-3" />
            </div>

            <div className="map-beach" />
            <div className="map-land" />

            {gameState.items.map((item) => (
              <div
                key={item.id}
                onPointerDown={(e) => {
                  startItemPointer(e, item)
                  setDragMode('item')
                }}
                onPointerMove={handleMapPointerMove}
                onPointerUp={finishItemPointer}
                onPointerCancel={finishItemPointer}
              >
                <PlacedBuildingView
                  item={item}
                  isSelected={item.id === selectedItemId}
                  onRotateLeft={() => rotateItem(item.id, -90)}
                  onRotateRight={() => rotateItem(item.id, 90)}
                  onDelete={() => deleteItem(item.id)}
                />
              </div>
            ))}

            <div
              className="player-avatar"
              style={{
                left: gameState.avatarPosition.x,
                top: gameState.avatarPosition.y,
              }}
              onPointerDown={startAvatarDrag}
              onPointerMove={handleMapPointerMove}
              onPointerUp={stopDrag}
              role="img"
              aria-label={`${gameState.avatar.name}'s avatar`}
            >
              <AvatarSprite avatar={gameState.avatar} size={60} />
              <span className="avatar-name-tag">{gameState.avatar.name}</span>
            </div>

            {nearbyEnterable && (
              <button
                type="button"
                className="enter-building-btn"
                style={{
                  left: nearbyEnterable.item.x + nearbyEnterable.building.width / 2,
                  top: nearbyEnterable.item.y - 12,
                }}
                onClick={() => enterBuilding(nearbyEnterable.item.id)}
              >
                🚪 Enter {nearbyEnterable.building.name}
              </button>
            )}
          </div>
        </div>

        <QuestPanel items={gameState.items} completedQuests={gameState.completedQuests} />
      </div>
    </div>
  )
}
