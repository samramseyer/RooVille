import { useCallback, useEffect, useState } from 'react'
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

export { INITIAL_GAME_STATE }

export function useGameSave() {
  const [gameState, setGameState] = useState<GameState>(() => loadState() ?? INITIAL_GAME_STATE)
  const [hasSave, setHasSave] = useState(() => loadState() !== null)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(() => (loadState() ? new Date() : null))
  const [saveFlash, setSaveFlash] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    setLastSavedAt(new Date())
    setHasSave(true)
  }, [gameState])

  const updateGameState = useCallback((updater: (prev: GameState) => GameState) => {
    setGameState(updater)
  }, [])

  const saveNow = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    setLastSavedAt(new Date())
    setHasSave(true)
    setSaveFlash(true)
    window.setTimeout(() => setSaveFlash(false), 2000)
  }, [gameState])

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE)
    localStorage.removeItem(STORAGE_KEY)
    setHasSave(false)
    setLastSavedAt(null)
  }, [])

  return { gameState, updateGameState, resetGame, hasSave, lastSavedAt, saveNow, saveFlash }
}
