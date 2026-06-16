import { useEffect, useRef, useState } from 'react'

interface MobileHeaderMenuProps {
  onEditAvatar: () => void
  onNewTown: () => void
  onHelp: () => void
}

export function MobileHeaderMenu({ onEditAvatar, onNewTown, onHelp }: MobileHeaderMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div className="mobile-header-menu" ref={menuRef}>
      <button
        type="button"
        className="btn btn-ghost btn-small mobile-header-menu-btn"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        ⋯ More
      </button>
      {open && (
        <div className="mobile-header-menu-dropdown" role="menu">
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onHelp() }}>
            ❓ Help
          </button>
          <button type="button" role="menuitem" onClick={() => { setOpen(false); onEditAvatar() }}>
            👤 Edit avatar
          </button>
          <button type="button" role="menuitem" className="mobile-menu-danger" onClick={() => { setOpen(false); onNewTown() }}>
            🔄 New town
          </button>
        </div>
      )}
    </div>
  )
}
