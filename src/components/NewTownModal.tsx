import { useState } from 'react'

interface NewTownModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function NewTownModal({ onConfirm, onCancel }: NewTownModalProps) {
  const [typed, setTyped] = useState('')
  const canConfirm = typed.trim().toUpperCase() === 'RESET'

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="new-town-title">
      <div className="modal-card">
        <h2 id="new-town-title">Start a new town?</h2>
        <p>
          This clears your current town, buildings, and interior decorations on this device. Your avatar will
          stay, but everything on the map will be gone.
        </p>
        <p className="modal-warning">This cannot be undone. Export your save first if you want a backup.</p>
        <label className="name-input-label">
          Type <strong>RESET</strong> to confirm
          <input
            type="text"
            className="name-input"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" disabled={!canConfirm} onClick={onConfirm}>
            Clear town
          </button>
        </div>
      </div>
    </div>
  )
}
