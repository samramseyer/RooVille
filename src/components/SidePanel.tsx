import { useEffect, useState } from 'react'
import type { Avatar, PlacedItem } from '../types'
import { QUESTS } from '../data/quests'
import { PersonalizationPanel } from './PersonalizationPanel'
import { QuestPanel } from './QuestPanel'

type SideTab = 'you' | 'adventures'

interface SidePanelProps {
  avatar: Avatar
  items: PlacedItem[]
  completedQuests: string[]
  lastSavedAt: Date | null
  saveFlash: boolean
  initialTab?: SideTab
  onNameChange: (name: string) => void
  onEditAvatar: () => void
  onSaveNow: () => void
  onExportSave?: () => void
  onImportSave?: (file: File, onDone: (ok: boolean) => void) => void
  onClose?: () => void
}

export function SidePanel({
  avatar,
  items,
  completedQuests,
  lastSavedAt,
  saveFlash,
  initialTab = 'adventures',
  onNameChange,
  onEditAvatar,
  onSaveNow,
  onExportSave,
  onImportSave,
  onClose,
}: SidePanelProps) {
  const [tab, setTab] = useState<SideTab>(initialTab)

  useEffect(() => {
    setTab(initialTab)
  }, [initialTab])

  return (
    <aside className={`sidebar-right${onClose ? ' sidebar-right--drawer' : ''}`}>
      {onClose && (
        <div className="mobile-drawer-header">
          <h3>{tab === 'you' ? 'You' : 'Adventures'}</h3>
          <button type="button" className="btn btn-ghost btn-small" onClick={onClose}>
            ✕
          </button>
        </div>
      )}
      {!onClose && (
        <nav className="sidebar-right-tabs" aria-label="Town sidebar">
          <button
            type="button"
            className={`sidebar-right-tab${tab === 'you' ? ' active' : ''}`}
            onClick={() => setTab('you')}
          >
            👤 You
          </button>
          <button
            type="button"
            className={`sidebar-right-tab${tab === 'adventures' ? ' active' : ''}`}
            onClick={() => setTab('adventures')}
          >
            🗺️ Adventures
          </button>
        </nav>
      )}
      {tab === 'you' ? (
        <PersonalizationPanel
          avatar={avatar}
          buildingCount={items.length}
          completedQuests={completedQuests.length}
          totalQuests={QUESTS.length}
          lastSavedAt={lastSavedAt}
          saveFlash={saveFlash}
          onNameChange={onNameChange}
          onEditAvatar={onEditAvatar}
          onSaveNow={onSaveNow}
          onExportSave={onExportSave}
          onImportSave={onImportSave}
        />
      ) : (
        <QuestPanel items={items} completedQuests={completedQuests} />
      )}
    </aside>
  )
}

export type { SideTab }
