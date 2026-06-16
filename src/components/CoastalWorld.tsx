import { useCallback, useEffect, useRef, useState } from 'react'
import type { BuildingDef, GameState, PlacedItem } from '../types'
import { getBuilding } from '../data/buildings'
import { getSuggestedBuildCategory } from '../data/buildingMeta'
import { getPlacedDisplayPosition, itemPositionFromDisplay } from '../data/buildingDisplay'
import {
  AVATAR_MAP_SIZE,
  MAP_VIEW_HEIGHT,
  MAP_VIEW_WIDTH,
  mapLengthToPercentWidth,
  mapPercentStyle,
  mapToPercentX,
  mapToPercentY,
  screenToMapCoords,
} from '../data/mapCoordinates'
import { isRoadBuilding, snapRoadPlacementFromCenter, snapRoadPosition } from '../data/roads'
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
import { useLocalWeather } from '../hooks/useLocalWeather'
import { CoastalMapTerrain } from './CoastalMapTerrain'
import { MapWeatherEffects } from './MapWeatherEffects'
import { AvatarSprite } from './AvatarSprite'
import { BuildingArt } from './BuildingArt'
import { BuildingInterior } from './BuildingInterior'
import { BuildingPalette } from './BuildingPalette'
import { ItemEditPanel } from './ItemEditPanel'
import { SidePanel } from './SidePanel'
import { SoundToggle } from './SoundToggle'
import { TutorialOverlay } from './TutorialOverlay'
import { NewTownModal } from './NewTownModal'
import { UndoToast } from './UndoToast'
import { MobileWorldNav, type MobilePanel } from './MobileWorldNav'
import { MobileHeaderMenu } from './MobileHeaderMenu'
import { useIsMobile } from '../hooks/useIsMobile'
import { checkQuest } from './QuestPanel'
import {
  findNearbyEnterable,
  getBuildingBounds,
  getExitAvatarPosition,
  isEnterableBuilding,
} from '../data/enterableBuildings'

interface CoastalWorldProps {
  gameState: GameState
  onUpdate: (updater: (prev: GameState) => GameState) => void
  onEditAvatar: () => void
  onReset: () => void
  lastSavedAt: Date | null
  saveFlash: boolean
  onSaveNow: () => void
  onExportSave?: () => void
  onImportSave?: (file: File, onDone: (ok: boolean) => void) => void
  toggleSound: () => void
}

type DragMode = 'avatar' | 'item' | null

type UndoAction =
  | { type: 'delete'; item: PlacedItem }
  | { type: 'move'; itemId: string; x: number; y: number }

const DRAG_THRESHOLD = 8
const VIEWPORT_PADDING = 120

function formatSavedTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function isItemInViewport(
  item: PlacedItem,
  building: BuildingDef,
  padding = VIEWPORT_PADDING,
): boolean {
  const display = getPlacedDisplayPosition(item, building)
  return (
    display.left + display.width > -padding &&
    display.top + display.height > -padding &&
    display.left < MAP_VIEW_WIDTH + padding &&
    display.top < MAP_VIEW_HEIGHT + padding
  )
}

function roadRotationLabel(rotation: number): string {
  const r = ((rotation % 360) + 360) % 360
  if (r === 0) return '→ east–west'
  if (r === 90) return '↓ north–south'
  if (r === 180) return '← east–west'
  return '↑ north–south'
}

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
  const isRoad = building.category === 'roads'
  const display = getPlacedDisplayPosition(item, building)
  const posStyle = mapPercentStyle(display)

  return (
    <div
      className={`placed-building placed-building--${building.category}${isRoad ? ' placed-road' : ''}${isSelected ? ' selected' : ''}`}
      style={{
        ...posStyle,
        transform: `rotate(${item.rotation}deg)`,
        transformOrigin: 'center bottom',
      }}
      role="button"
      tabIndex={0}
      aria-label={`${building.name}, tap to edit`}
    >
      <BuildingArt
        id={item.buildingId}
        rotation={item.rotation}
        variant="placed"
      />
      {isSelected && (
        <>
          <div className="selection-ring" />
          <div className={`item-float-controls${isRoad ? ' item-float-controls-road' : ''}`} onPointerDown={(e) => e.stopPropagation()}>
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

export function CoastalWorld({
  gameState,
  onUpdate,
  onEditAvatar,
  onReset,
  lastSavedAt,
  saveFlash,
  onSaveNow,
  onExportSave,
  onImportSave,
  toggleSound,
}: CoastalWorldProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDef | null>(null)
  const [placementRotation, setPlacementRotation] = useState(0)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [dragMode, setDragMode] = useState<DragMode>(null)
  const [celebration, setCelebration] = useState<string | null>(null)
  const [showTutorial, setShowTutorial] = useState(() => !gameState.tutorialCompleted)
  const [showNewTownModal, setShowNewTownModal] = useState(false)
  const [undoAction, setUndoAction] = useState<UndoAction | null>(null)
  const [placementTip, setPlacementTip] = useState<string | null>(null)
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('map')
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const pointerMoved = useRef(false)
  const draggingItemId = useRef<string | null>(null)
  const moveSnapshot = useRef<{ itemId: string; x: number; y: number } | null>(null)
  const undoTimerRef = useRef<number | null>(null)
  const { phase, localTimeLabel } = useDayNightCycle()
  const weather = useLocalWeather()
  const isMobile = useIsMobile()

  const soundOn = gameState.soundEnabled
  const favoriteBuildingIds = gameState.favoriteBuildingIds ?? []
  const suggestedCategory = getSuggestedBuildCategory(gameState.completedQuests)
  const activeQuestCount = QUESTS.filter((q) => !gameState.completedQuests.includes(q.id)).length

  const showUndo = useCallback((action: UndoAction) => {
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current)
    setUndoAction(action)
    undoTimerRef.current = window.setTimeout(() => setUndoAction(null), 5000)
  }, [])

  const handleUndo = useCallback(() => {
    if (!undoAction) return
    if (undoAction.type === 'delete') {
      onUpdate((prev) => ({ ...prev, items: [...prev.items, undoAction.item] }))
    } else {
      onUpdate((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === undoAction.itemId ? { ...item, x: undoAction.x, y: undoAction.y } : item,
        ),
      }))
    }
    setUndoAction(null)
    if (undoTimerRef.current) window.clearTimeout(undoTimerRef.current)
  }, [undoAction, onUpdate])

  const toggleFavorite = useCallback(
    (buildingId: string) => {
      onUpdate((prev) => {
        const current = prev.favoriteBuildingIds ?? []
        const next = current.includes(buildingId)
          ? current.filter((id) => id !== buildingId)
          : [...current, buildingId]
        return { ...prev, favoriteBuildingIds: next }
      })
    },
    [onUpdate],
  )

  const completeTutorial = useCallback(() => {
    setShowTutorial(false)
    onUpdate((prev) => ({ ...prev, tutorialCompleted: true }))
  }, [onUpdate])

  const markTipSeen = useCallback(
    (tipId: string) => {
      onUpdate((prev) => {
        const seen = prev.tipsSeen ?? []
        if (seen.includes(tipId)) return prev
        return { ...prev, tipsSeen: [...seen, tipId] }
      })
    },
    [onUpdate],
  )

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
    const weatherFactor =
      weather.kind === 'storm' ? 1.35 : weather.kind === 'windy' ? 1.2 : weather.kind === 'rain' ? 0.85 : 1
    setWaveVolume(dayFactor * weatherFactor)
  }, [phase, weather.kind])

  useEffect(() => {
    if (!soundOn) return
    const timer = setInterval(() => {
      if (phase === 'night') return
      if (weather.kind === 'rain' || weather.kind === 'storm' || weather.kind === 'snow') return
      if (phase === 'day' || phase === 'dawn') playSeagullSound()
    }, 25000)
    return () => clearInterval(timer)
  }, [soundOn, phase, weather.kind])

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
    return screenToMapCoords(clientX, clientY, rect)
  }

  const selectItem = (itemId: string) => {
    setSelectedItemId(itemId)
    setSelectedBuilding(null)
  }

  const placeBuilding = useCallback(
    (x: number, y: number) => {
      if (!selectedBuilding) return
      const placement =
        selectedBuilding.category === 'roads'
          ? snapRoadPlacementFromCenter(x, y, selectedBuilding.width, selectedBuilding.height)
          : { x: x - selectedBuilding.width / 2, y: y - selectedBuilding.height / 2 }
      const newItem: PlacedItem = {
        id: crypto.randomUUID(),
        buildingId: selectedBuilding.id,
        x: placement.x,
        y: placement.y,
        rotation: selectedBuilding.category === 'roads' ? placementRotation : 0,
        scale: 1,
      }
      onUpdate((prev) => ({ ...prev, items: [...prev.items, newItem] }))
      selectItem(newItem.id)
      if (soundOn) playPlaceSound()

      if (
        selectedBuilding.category === 'houses' &&
        !(gameState.tipsSeen ?? []).includes('first-house')
      ) {
        markTipSeen('first-house')
        setPlacementTip('Walk up to your house and tap Enter to go inside!')
        window.setTimeout(() => setPlacementTip(null), 6000)
      }
    },
    [selectedBuilding, placementRotation, onUpdate, soundOn, gameState.tipsSeen, markTipSeen],
  )

  const rotatePlacement = (delta: number) => {
    setPlacementRotation((prev) => (prev + delta + 360) % 360)
    if (soundOn) playRotateSound()
  }

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
        items: prev.items.map((item) => {
          if (item.id !== draggingItemId.current) return item
          const building = getBuilding(item.buildingId)
          if (!building) return item
          const nextDisplayLeft = coords.x - dragOffset.current.x
          const nextDisplayTop = coords.y - dragOffset.current.y
          const nextPos = itemPositionFromDisplay(nextDisplayLeft, nextDisplayTop, building, item.scale)
          let nextX = nextPos.x
          let nextY = nextPos.y
          if (isRoadBuilding(item.buildingId)) {
            const snapped = snapRoadPosition(nextX, nextY)
            nextX = snapped.x
            nextY = snapped.y
          }
          return { ...item, x: nextX, y: nextY }
        }),
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

    const building = getBuilding(item.buildingId)
    const display = building ? getPlacedDisplayPosition(item, building) : { left: item.x, top: item.y }
    dragOffset.current = { x: coords.x - display.left, y: coords.y - display.top }
    dragStart.current = { x: e.clientX, y: e.clientY }
    pointerMoved.current = false
    draggingItemId.current = item.id
    moveSnapshot.current = { itemId: item.id, x: item.x, y: item.y }
    selectItem(item.id)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const finishItemPointer = () => {
    if (pointerMoved.current && draggingItemId.current && moveSnapshot.current) {
      const snap = moveSnapshot.current
      const item = gameState.items.find((i) => i.id === snap.itemId)
      if (item && (item.x !== snap.x || item.y !== snap.y)) {
        showUndo({ type: 'move', itemId: snap.itemId, x: snap.x, y: snap.y })
      }
    } else if (!pointerMoved.current && draggingItemId.current) {
      selectItem(draggingItemId.current)
    }
    moveSnapshot.current = null
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

  const nudgeItem = (itemId: string, dx: number, dy: number) => {
    onUpdate((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== itemId) return item
        const building = getBuilding(item.buildingId)
        if (!building) return item
        let nextX = item.x + dx
        let nextY = item.y + dy
        if (isRoadBuilding(item.buildingId)) {
          const snapped = snapRoadPosition(nextX, nextY)
          nextX = snapped.x
          nextY = snapped.y
        }
        return { ...item, x: nextX, y: nextY }
      }),
    }))
    setSelectedItemId(itemId)
  }

  const deleteItem = (itemId: string) => {
    const item = gameState.items.find((i) => i.id === itemId)
    if (!item) return
    onUpdate((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.id !== itemId),
      activeInteriorId: prev.activeInteriorId === itemId ? null : prev.activeInteriorId,
    }))
    setSelectedItemId(null)
    if (soundOn) playDeleteSound()
    showUndo({ type: 'delete', item })
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
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        nudgeItem(selectedItemId, 0, -8)
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        nudgeItem(selectedItemId, 0, 8)
      }
      if (e.key === 'Escape') setSelectedItemId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedItemId, gameState.items, soundOn, onUpdate])

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

  const roadItems = gameState.items.filter(
    (item) => isRoadBuilding(item.buildingId) && getBuilding(item.buildingId) && isItemInViewport(item, getBuilding(item.buildingId)!),
  )
  const structureItems = gameState.items.filter(
    (item) => !isRoadBuilding(item.buildingId) && getBuilding(item.buildingId) && isItemInViewport(item, getBuilding(item.buildingId)!),
  )

  const handleMobileSelect = (panel: MobilePanel) => {
    setMobilePanel(panel)
    if (panel === 'you' || panel === 'quests') {
      setMobileDrawerOpen(true)
    } else {
      setMobileDrawerOpen(false)
    }
  }

  const closeMobileBuild = () => {
    if (mobilePanel === 'build') setMobilePanel('map')
  }

  const renderPlacedItem = (item: PlacedItem) => (
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
  )

  if (activeInteriorItem && activeInteriorDef) {
    return (
      <BuildingInterior
        gameState={gameState}
        placedItem={activeInteriorItem}
        building={activeInteriorDef}
        onUpdate={onUpdate}
        onExit={exitInterior}
        toggleSound={toggleSound}
      />
    )
  }

  return (
    <div
      className={`coastal-world${isMobile && mobilePanel === 'map' ? ' coastal-world--map-fullscreen' : ''}${isMobile && mobilePanel === 'build' ? ' coastal-world--build-open' : ''}`}
    >
      <header className="world-header">
        <div className="world-header-left">
          <h2>RooVille</h2>
          <span className="player-name player-name--mobile-compact">👋 {gameState.avatar.name}</span>
          {lastSavedAt && (
            <span className={`save-indicator save-indicator--desktop${saveFlash ? ' save-indicator-flash' : ''}`} aria-live="polite">
              {saveFlash ? 'Saved!' : `Saved ${formatSavedTime(lastSavedAt)}`}
            </span>
          )}
        </div>
        <div className="world-header-actions">
          <SoundToggle enabled={soundOn} onToggle={toggleSound} />
          <div className="time-controls time-controls--desktop">
            <span className="local-time-display btn btn-ghost btn-small" aria-live="polite">
              {weather.loading ? '🌤️ …' : `${weather.emoji} ${weather.label}`}
              {weather.temperature ? ` · ${weather.temperature}` : ''}
              {' · '}
              {PHASE_LABELS[phase]} · {localTimeLabel}
            </span>
          </div>
          <span className="time-controls time-controls--mobile" aria-live="polite">
            {weather.loading ? '🌤️' : weather.emoji} {PHASE_LABELS[phase]}
          </span>
          <button type="button" className="btn btn-ghost btn-small world-header-help-desktop" onClick={() => setShowTutorial(true)}>
            Help
          </button>
          <MobileHeaderMenu
            onHelp={() => setShowTutorial(true)}
            onEditAvatar={onEditAvatar}
            onNewTown={() => setShowNewTownModal(true)}
          />
          <button type="button" className="btn btn-ghost world-header-btn-desktop" onClick={onEditAvatar}>
            Edit Avatar
          </button>
          <button type="button" className="btn btn-ghost world-header-btn-desktop" onClick={() => setShowNewTownModal(true)}>
            New Town
          </button>
        </div>
      </header>

      {celebration && <div className="celebration-toast">{celebration}</div>}
      {placementTip && <div className="placement-tip-toast">{placementTip}</div>}
      {undoAction && (
        <UndoToast
          message={undoAction.type === 'delete' ? 'Item removed' : 'Item moved'}
          onUndo={handleUndo}
        />
      )}
      {showTutorial && (
        <TutorialOverlay onComplete={completeTutorial} onSkip={completeTutorial} />
      )}
      {showNewTownModal && (
        <NewTownModal
          onCancel={() => setShowNewTownModal(false)}
          onConfirm={() => {
            setShowNewTownModal(false)
            onReset()
          }}
        />
      )}

      <div className="world-body">
        {isMobile && mobilePanel === 'build' && (
          <button
            type="button"
            className="mobile-build-backdrop"
            aria-label="Close build menu"
            onClick={closeMobileBuild}
          />
        )}

        <aside
          className={`sidebar-left${isMobile ? ' sidebar-left--mobile-sheet' : ''}${isMobile && mobilePanel !== 'build' ? ' sidebar-left--mobile-hidden' : ''}`}
        >
          <BuildingPalette
            onSelectBuilding={(b) => {
              setSelectedBuilding(b)
              setPlacementRotation(0)
              setSelectedItemId(null)
            }}
            selectedBuildingId={selectedBuilding?.id ?? null}
            editMode={selectedItemId !== null}
            favoriteBuildingIds={favoriteBuildingIds}
            onToggleFavorite={toggleFavorite}
            suggestedCategory={suggestedCategory}
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
              Placing: {selectedBuilding.name}
              {selectedBuilding.category === 'roads' && (
                <span className="placement-rotation-label"> ({roadRotationLabel(placementRotation)})</span>
              )}
              {' '}— tap the map!
              {selectedBuilding.category === 'roads' && (
                <>
                  <button type="button" className="btn btn-small" onClick={() => rotatePlacement(-90)}>
                    ↺ Rotate
                  </button>
                  <button type="button" className="btn btn-small" onClick={() => rotatePlacement(90)}>
                    Rotate ↻
                  </button>
                </>
              )}
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
              <span>
                Editing: {selectedDef.name}
                {selectedDef.category === 'roads' && (
                  <span className="placement-rotation-label"> ({roadRotationLabel(selectedItem.rotation)})</span>
                )}
              </span>
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
            className={`coastal-map coastal-map--${phase} coastal-map--wx-${weather.kind}${selectedBuilding && !selectedItemId ? ' placing-mode' : ''}`}
            data-phase={phase}
            data-weather={weather.kind}
            onPointerDown={handleMapPointerDown}
            onPointerMove={handleMapPointerMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          >
            <CoastalMapTerrain phase={phase} weather={weather.kind} />
            <MapWeatherEffects weather={weather.kind} />
            <div className="map-moon" aria-hidden="true" />
            <div className="map-stars" aria-hidden="true" />

            {roadItems.map(renderPlacedItem)}
            {structureItems.map(renderPlacedItem)}

            <div
              className="player-avatar"
              style={{
                left: `${mapToPercentX(gameState.avatarPosition.x)}%`,
                top: `${mapToPercentY(gameState.avatarPosition.y)}%`,
                width: `${mapLengthToPercentWidth(AVATAR_MAP_SIZE)}%`,
              }}
              onPointerDown={startAvatarDrag}
              onPointerMove={handleMapPointerMove}
              onPointerUp={stopDrag}
              role="img"
              aria-label={`${gameState.avatar.name}'s avatar`}
            >
              <AvatarSprite avatar={gameState.avatar} size={60} className="avatar-map-scale" />
              <span className="avatar-name-tag">{gameState.avatar.name}</span>
            </div>

            {nearbyEnterable && (() => {
              const bounds = getBuildingBounds(nearbyEnterable.item, nearbyEnterable.building)
              return (
              <button
                type="button"
                className={`enter-building-btn${placementTip ? ' enter-building-btn--highlight' : ''}`}
                style={{
                  left: `${mapToPercentX(bounds.centerX)}%`,
                  top: `${mapToPercentY(bounds.top - 12)}%`,
                }}
                onClick={() => enterBuilding(nearbyEnterable.item.id)}
              >
                🚪 Enter {nearbyEnterable.building.name}
              </button>
              )
            })()}
          </div>
        </div>

        <SidePanel
          avatar={gameState.avatar}
          items={gameState.items}
          completedQuests={gameState.completedQuests}
          lastSavedAt={lastSavedAt}
          saveFlash={saveFlash}
          onNameChange={(name) => onUpdate((prev) => ({ ...prev, avatar: { ...prev.avatar, name } }))}
          onEditAvatar={onEditAvatar}
          onSaveNow={onSaveNow}
          onExportSave={onExportSave}
          onImportSave={onImportSave}
        />
      </div>

      {mobileDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <SidePanel
              avatar={gameState.avatar}
              items={gameState.items}
              completedQuests={gameState.completedQuests}
              lastSavedAt={lastSavedAt}
              saveFlash={saveFlash}
              initialTab={mobilePanel === 'you' ? 'you' : 'adventures'}
              onNameChange={(name) => onUpdate((prev) => ({ ...prev, avatar: { ...prev.avatar, name } }))}
              onEditAvatar={onEditAvatar}
              onSaveNow={onSaveNow}
              onExportSave={onExportSave}
              onImportSave={onImportSave}
              onClose={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      <MobileWorldNav
        activePanel={mobilePanel}
        onSelect={handleMobileSelect}
        questBadge={activeQuestCount}
      />
    </div>
  )
}
