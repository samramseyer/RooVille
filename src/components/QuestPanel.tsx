import { QUESTS, checkQuest, getQuestProgress } from '../data/quests'
import type { PlacedItem } from '../types'

interface QuestPanelProps {
  items: PlacedItem[]
  completedQuests: string[]
}

export function QuestPanel({ items, completedQuests }: QuestPanelProps) {
  const activeQuests = QUESTS.filter((q) => !completedQuests.includes(q.id))

  return (
    <aside className="quest-panel">
      <h3 className="quest-title">Adventures</h3>
      <p className="quest-subtitle">Complete quests to grow your town!</p>

      <div className="quest-list">
        {QUESTS.map((quest) => {
          const done = completedQuests.includes(quest.id)
          const progress = getQuestProgress(quest.id, items)
          const pct = Math.round((progress.current / progress.target) * 100)

          if (done) {
            return (
              <div key={quest.id} className="quest-card quest-done">
                <span className="quest-badge">✓ Done!</span>
                <strong>{quest.title}</strong>
                <p>{quest.description}</p>
              </div>
            )
          }

          return (
            <div key={quest.id} className="quest-card">
              <strong>{quest.title}</strong>
              <p>{quest.description}</p>
              <div className="quest-progress-bar">
                <div className="quest-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="quest-progress-text">
                {progress.current} / {progress.target}
              </span>
              <p className="quest-hint">{quest.hint}</p>
            </div>
          )
        })}
      </div>

      {activeQuests.length === 0 && completedQuests.length === QUESTS.length && (
        <div className="quest-all-done">
          <span>🎉</span>
          <p>All adventures complete! You&apos;re a coastal champion!</p>
        </div>
      )}
    </aside>
  )
}

export { checkQuest }
