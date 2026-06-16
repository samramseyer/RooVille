import { useState } from 'react'
import { CoastalTownBackground } from './CoastalTownBackground'
import { GetAppModal } from './GetAppModal'
import { PlayAnywherePanel } from './PlayAnywherePanel'
import { SoundToggle } from './SoundToggle'

interface WelcomeProps {
  onStart: () => void
  onContinue: () => void
  hasSave: boolean
  savedPlayerName?: string
  soundEnabled: boolean
  onToggleSound: () => void
}

export function Welcome({
  onStart,
  onContinue,
  hasSave,
  savedPlayerName,
  soundEnabled,
  onToggleSound,
}: WelcomeProps) {
  const [showGetApp, setShowGetApp] = useState(false)

  return (
    <div className="welcome">
      <CoastalTownBackground />
      <div className="welcome-sound">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} compact />
      </div>
      <div className="welcome-card">
        <div className="welcome-mascot" aria-hidden="true">
          🦘
        </div>
        <h1>RooVille</h1>
        <p className="welcome-tagline">Build your dream coastal town on the Australian shore!</p>
        <p className="welcome-safe">
          Play online in your browser, or install on a phone — your town saves on each device you use.
        </p>
        <div className="welcome-features">
          <span>🏖️ Beaches</span>
          <span>🏠 Houses</span>
          <span>⛵ Boats</span>
          <span>🦘 Zoos</span>
        </div>
        <div className="welcome-actions">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            Create Your Avatar
          </button>
          {hasSave && (
            <>
              <button type="button" className="btn btn-secondary" onClick={onContinue}>
                Continue as {savedPlayerName ?? 'Explorer'}
              </button>
              <p className="welcome-save-note">Your town is saved on this device — pick up where you left off.</p>
            </>
          )}
        </div>
        <PlayAnywherePanel onGetApp={() => setShowGetApp(true)} />
      </div>
      <GetAppModal open={showGetApp} onClose={() => setShowGetApp(false)} />
    </div>
  )
}
