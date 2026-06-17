import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState } from '../types'
import { INITIAL_GAME_STATE, migrateSave } from '../data/gameDefaults'

const STORAGE_KEY = 'rooville-save'

function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return migrateSave(JSON.parse(raw) as Partial<GameState>)
  } catch {
    return null
  }
}

function readSavedAt(state: GameState | null): Date | null {
  if (!state?.savedAt) return null
  const date = new Date(state.savedAt)
  return Number.isNaN(date.getTime()) ? null : date
}

export { INITIAL_GAME_STATE }

export function useGameSave() {
  const initial = loadState()
  const [gameState, setGameState] = useState<GameState>(() => initial ?? INITIAL_GAME_STATE)
  const [hasSave, setHasSave] = useState(() => initial !== null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(() => readSavedAt(initial))
  const [saveFlash, setSaveFlash] = useState(false)
  const skipPersistRef = useRef(true)

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false
      return
    }
    const savedAt = new Date().toISOString()
    const payload: GameState = { ...gameState, savedAt }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setLastSavedAt(new Date(savedAt))
    setHasSave(true)
  }, [gameState])

  const updateGameState = useCallback((updater: (prev: GameState) => GameState) => {
    setGameState(updater)
  }, [])

  const saveNow = useCallback(() => {
    const savedAt = new Date().toISOString()
    const payload: GameState = { ...gameState, savedAt }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setLastSavedAt(new Date(savedAt))
    setHasSave(true)
    setSaveFlash(true)
    window.setTimeout(() => setSaveFlash(false), 2000)
  }, [gameState])

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE)
    localStorage.removeItem(STORAGE_KEY)
    setHasSave(false)
    setLastSavedAt(null)
    skipPersistRef.current = true
  }, [])

  const exportSave = useCallback(() => {
    const savedAt = gameState.savedAt ?? new Date().toISOString()
    const payload: GameState = { ...gameState, savedAt }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rooville-save-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [gameState])

  const applyImportedSave = useCallback((parsed: GameState) => {
    setGameState(parsed)
    setHasSave(true)
    setLastSavedAt(readSavedAt(parsed) ?? new Date())
    skipPersistRef.current = false
  }, [])

  const parseSaveFile = useCallback((file: File, onDone: (result: GameState | null) => void) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        onDone(migrateSave(JSON.parse(String(reader.result)) as Partial<GameState>))
      } catch {
        onDone(null)
      }
    }
    reader.onerror = () => onDone(null)
    reader.readAsText(file)
  }, [])

  return {
    gameState,
    updateGameState,
    resetGame,
    hasSave,
    lastSavedAt,
    saveNow,
    saveFlash,
    exportSave,
    applyImportedSave,
    parseSaveFile,
  }
}
