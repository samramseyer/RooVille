import type { GameState } from '../types'
import { getBuilding } from '../data/buildings'
import { QUESTS } from '../data/quests'

interface ImportSaveModalProps {
  incoming: GameState
  currentPlayerName: string
  onConfirm: () => void
  onCancel: () => void
}

function formatSavedAt(iso: string | undefined): string {
  if (!iso) return 'Unknown date'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Unknown date'
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function ImportSaveModal({
  incoming,
  currentPlayerName,
  onConfirm,
  onCancel,
}: ImportSaveModalProps) {
  const buildingCount = incoming.items.length
  const questCount = incoming.completedQuests.length
  const namedBuildings = incoming.items
    .map((item) => getBuilding(item.buildingId)?.name)
    .filter(Boolean)
    .slice(0, 4)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="import-save-title">
      <div className="modal-card import-save-modal">
        <h2 id="import-save-title">Import this save?</h2>
        <p>
          This will replace <strong>{currentPlayerName}&apos;s</strong> current town on this device with the
          imported save.
        </p>

        <dl className="import-save-summary">
          <div>
            <dt>Player</dt>
            <dd>{incoming.avatar.name || 'Explorer'}</dd>
          </div>
          <div>
            <dt>Buildings</dt>
            <dd>{buildingCount}</dd>
          </div>
          <div>
            <dt>Quests done</dt>
            <dd>
              {questCount} / {QUESTS.length}
            </dd>
          </div>
          <div>
            <dt>Last saved</dt>
            <dd>{formatSavedAt(incoming.savedAt)}</dd>
          </div>
        </dl>

        {namedBuildings.length > 0 && (
          <p className="import-save-preview-list">
            Includes: {namedBuildings.join(', ')}
            {buildingCount > namedBuildings.length ? ` and ${buildingCount - namedBuildings.length} more` : ''}
          </p>
        )}

        <p className="modal-warning">Your current town will be overwritten. Export first if you want a backup.</p>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Replace my town
          </button>
        </div>
      </div>
    </div>
  )
}
