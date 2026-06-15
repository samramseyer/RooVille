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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  const updateGameState = useCallback((updater: (prev: GameState) => GameState) => {
    setGameState(updater)
  }, [])

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const hasSave = loadState() !== null

  return { gameState, updateGameState, resetGame, hasSave }
}
