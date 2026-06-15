import { useCallback, useEffect } from 'react'
import type { GameState } from '../types'
import { resumeAudio, setSoundEnabled, startWaveAmbience, stopWaveAmbience } from '../audio/sounds'

type GameUpdater = (updater: (prev: GameState) => GameState) => void

export function useSoundToggle(gameState: GameState, onUpdate: GameUpdater) {
  const enabled = gameState.soundEnabled

  useEffect(() => {
    setSoundEnabled(enabled)
    if (enabled) {
      resumeAudio()
      startWaveAmbience()
    } else {
      stopWaveAmbience()
    }
  }, [enabled])

  const toggleSound = useCallback(() => {
    onUpdate((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
  }, [onUpdate])

  return { soundEnabled: enabled, toggleSound }
}
