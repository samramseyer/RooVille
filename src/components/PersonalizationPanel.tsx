import { useRef, useState } from 'react'
import type { GameState } from '../types'
import type { Avatar } from '../types'
import { sanitizeAvatarName } from '../data/avatarOptions'
import { ImportSaveModal } from './ImportSaveModal'
import { AvatarSprite } from './AvatarSprite'

interface PersonalizationPanelProps {
  avatar: Avatar
  currentPlayerName: string
  buildingCount: number
  completedQuests: number
  totalQuests: number
  lastSavedAt: Date | null
  saveFlash: boolean
  onNameChange: (name: string) => void
  onEditAvatar: () => void
  onSaveNow: () => void
  onExportSave?: () => void
  onParseSaveFile?: (file: File, onDone: (result: GameState | null) => void) => void
  onApplyImportedSave?: (state: GameState) => void
}

function formatSavedTime(date: Date): string {
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function PersonalizationPanel({
  avatar,
  currentPlayerName,
  buildingCount,
  completedQuests,
  totalQuests,
  lastSavedAt,
  saveFlash,
  onNameChange,
  onEditAvatar,
  onSaveNow,
  onExportSave,
  onParseSaveFile,
  onApplyImportedSave,
}: PersonalizationPanelProps) {
  const importRef = useRef<HTMLInputElement>(null)
  const [importMessage, setImportMessage] = useState<string | null>(null)
  const [pendingImport, setPendingImport] = useState<GameState | null>(null)

  const handleImportPick = (file: File | undefined) => {
    if (!file || !onParseSaveFile) return
    onParseSaveFile(file, (parsed) => {
      if (!parsed) {
        setImportMessage('Could not read that file.')
        window.setTimeout(() => setImportMessage(null), 3000)
        return
      }
      setPendingImport(parsed)
    })
  }

  const confirmImport = () => {
    if (!pendingImport || !onApplyImportedSave) return
    onApplyImportedSave(pendingImport)
    setPendingImport(null)
    setImportMessage('Save imported!')
    window.setTimeout(() => setImportMessage(null), 3000)
  }

  return (
    <div className="personalization-panel">
      <div className="personalization-preview">
        <div className="avatar-preview-bg avatar-preview-bg-sm">
          <AvatarSprite avatar={avatar} size={100} />
        </div>
        <button type="button" className="btn btn-small" onClick={onEditAvatar}>
          Customize look
        </button>
      </div>

      <section className="personalization-section">
        <h4 className="personalization-heading">Your name</h4>
        <p className="personalization-note">Shown on your avatar and around town.</p>
        <label className="name-input-label">
          <span className="sr-only">Your name</span>
          <input
            type="text"
            className="name-input"
            value={avatar.name}
            maxLength={20}
            autoComplete="name"
            onChange={(e) => onNameChange(sanitizeAvatarName(e.target.value))}
            placeholder="Enter your name"
          />
        </label>
      </section>

      <section className="personalization-section">
        <h4 className="personalization-heading">Save progress</h4>
        <p className="personalization-note">
          Your town saves automatically on this device. Come back anytime and tap Continue on the welcome
          screen.
        </p>
        <div className={`save-status${saveFlash ? ' save-status-flash' : ''}`}>
          {saveFlash ? (
            <span>✓ Progress saved!</span>
          ) : lastSavedAt ? (
            <span>Last saved {formatSavedTime(lastSavedAt)}</span>
          ) : (
            <span>Not saved yet</span>
          )}
        </div>
        <button type="button" className="btn btn-secondary btn-small personalization-save-btn" onClick={onSaveNow}>
          Save now
        </button>
        {(onExportSave || onParseSaveFile) && (
          <div className="save-backup-row">
            {onExportSave && (
              <button type="button" className="btn btn-ghost btn-small" onClick={onExportSave}>
                Export save
              </button>
            )}
            {onParseSaveFile && onApplyImportedSave && (
              <>
                <input
                  ref={importRef}
                  type="file"
                  accept="application/json,.json"
                  className="sr-only"
                  onChange={(e) => {
                    handleImportPick(e.target.files?.[0])
                    e.target.value = ''
                  }}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => importRef.current?.click()}
                >
                  Import save
                </button>
              </>
            )}
          </div>
        )}
        {importMessage && <p className="import-message">{importMessage}</p>}
      </section>

      <section className="personalization-section">
        <h4 className="personalization-heading">Your town</h4>
        <dl className="personalization-stats">
          <div>
            <dt>Buildings placed</dt>
            <dd>{buildingCount}</dd>
          </div>
          <div>
            <dt>Adventures done</dt>
            <dd>
              {completedQuests} / {totalQuests}
            </dd>
          </div>
        </dl>
      </section>

      {pendingImport && (
        <ImportSaveModal
          incoming={pendingImport}
          currentPlayerName={currentPlayerName}
          onConfirm={confirmImport}
          onCancel={() => setPendingImport(null)}
        />
      )}
    </div>
  )
}
