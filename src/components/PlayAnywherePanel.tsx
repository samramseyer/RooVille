import { useInstallApp } from '../hooks/useInstallApp'

interface PlayAnywherePanelProps {
  onGetApp: () => void
}

export function PlayAnywherePanel({ onGetApp }: PlayAnywherePanelProps) {
  const { showMobileBanner, install, dismissBanner, hasNativeInstall, canOfferInstall, installed } =
    useInstallApp()

  return (
    <div className="play-anywhere-panel" role="region" aria-label="Play on web or phone">
      <div className="play-anywhere-row">
        <span className="play-anywhere-badge">🌐 Online</span>
        <p>Play free in your browser — phone, tablet, or computer.</p>
      </div>

      {canOfferInstall && !installed && (
        <div className={`play-anywhere-row play-anywhere-row--install${showMobileBanner ? ' play-anywhere-row--highlight' : ''}`}>
          <span className="play-anywhere-badge">📱 Phone</span>
          <div className="play-anywhere-install">
            {showMobileBanner && hasNativeInstall ? (
              <>
                <p>Install from this website — works offline after your first visit.</p>
                <div className="play-anywhere-actions">
                  <button type="button" className="btn btn-primary btn-small" onClick={() => void install()}>
                    Install app
                  </button>
                  <button type="button" className="btn btn-small" onClick={onGetApp}>
                    How to install
                  </button>
                  <button type="button" className="btn btn-small install-app-dismiss" onClick={dismissBanner}>
                    Not now
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Download to your home screen and play like a real app.</p>
                <button type="button" className="btn btn-secondary btn-small" onClick={onGetApp}>
                  Get on your phone
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {installed && (
        <p className="play-anywhere-installed">✓ Installed on this device — open from your home screen anytime.</p>
      )}
    </div>
  )
}
