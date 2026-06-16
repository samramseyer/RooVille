import { useState } from 'react'
import type { Screen } from './types'
import { Welcome } from './components/Welcome'
import { AvatarCreator } from './components/AvatarCreator'
import { CoastalWorld } from './components/CoastalWorld'
import { ErrorBoundary } from './components/ErrorBoundary'
import { InstallAppProvider } from './context/InstallAppContext'
import { useGameSave } from './hooks/useGameSave'
import { useSoundToggle } from './hooks/useSoundToggle'
import { sanitizeAvatar } from './data/avatarOptions'
import './App.css'

function App() {
  const { gameState, updateGameState, resetGame, hasSave, lastSavedAt, saveNow, saveFlash, exportSave, importSave } = useGameSave()
  const { soundEnabled, toggleSound } = useSoundToggle(gameState, updateGameState)
  const [screen, setScreen] = useState<Screen>(() =>
    hasSave ? 'play' : 'welcome',
  )

  return (
    <ErrorBoundary onResetSave={resetGame}>
      <InstallAppProvider>
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
          key="avatar-creator"
          avatar={gameState.avatar}
          onChange={(avatar) =>
            updateGameState((prev) => ({ ...prev, avatar: sanitizeAvatar(avatar) }))
          }
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
          onExportSave={exportSave}
          onImportSave={importSave}
          toggleSound={toggleSound}
        />
      )}
      </div>
      </InstallAppProvider>
    </ErrorBoundary>
  )
}

export default App
