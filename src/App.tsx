import { useState } from 'react'
import type { Screen } from './types'
import { Welcome } from './components/Welcome'
import { AvatarCreator } from './components/AvatarCreator'
import { CoastalWorld } from './components/CoastalWorld'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useGameSave } from './hooks/useGameSave'
import { useSoundToggle } from './hooks/useSoundToggle'
import './App.css'

function App() {
  const { gameState, updateGameState, resetGame, hasSave, lastSavedAt, saveNow, saveFlash } = useGameSave()
  const { soundEnabled, toggleSound } = useSoundToggle(gameState, updateGameState)
  const [screen, setScreen] = useState<Screen>(() =>
    hasSave ? 'play' : 'welcome',
  )

  return (
    <ErrorBoundary onResetSave={resetGame}>
      <div className="app">
      {screen === 'welcome' && (
        <Welcome
          onStart={() => setScreen('avatar')}
          onContinue={() => setScreen('play')}
          hasSave={hasSave}
          savedPlayerName={hasSave ? gameState.avatar.name : undefined}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      )}

      {screen === 'avatar' && (
        <AvatarCreator
          avatar={gameState.avatar}
          onChange={(avatar) => updateGameState((prev) => ({ ...prev, avatar }))}
          onDone={() => setScreen('play')}
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'play' && (
        <CoastalWorld
          gameState={gameState}
          onUpdate={updateGameState}
          onEditAvatar={() => setScreen('avatar')}
          onReset={() => {
            resetGame()
            setScreen('avatar')
          }}
          lastSavedAt={lastSavedAt}
          saveFlash={saveFlash}
          onSaveNow={saveNow}
          toggleSound={toggleSound}
        />
      )}
      </div>
    </ErrorBoundary>
  )
}

export default App
