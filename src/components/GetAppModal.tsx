import { useCallback, useState } from 'react'
import { useInstallApp } from '../context/InstallAppContext'

interface GetAppModalProps {
  onClose: () => void
}

export function GetAppModal({ onClose }: GetAppModalProps) {
  const {
    install,
    isIos,
    isAndroid,
    isMobile,
    hasNativeInstall,
    canOfferInstall,
    installed,
    nativeApp,
    playUrl,
  } = useInstallApp()
  const [copied, setCopied] = useState(false)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(playUrl)}`

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(playUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      window.prompt('Copy this link and open it on your phone:', playUrl)
    }
  }, [playUrl])

  return (
    <div className="get-app-overlay" onClick={onClose} role="presentation">
      <div
        className="get-app-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="get-app-title"
        aria-modal="true"
      >
        <button type="button" className="get-app-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="get-app-header">
          <img src="./icons/icon-192.png" alt="" className="get-app-icon" width={72} height={72} />
          <div>
            <h2 id="get-app-title">Play RooVille anywhere</h2>
            <p className="get-app-subtitle">
              Play in your browser, or install on a phone like a regular app — free, no app store needed.
            </p>
          </div>
        </div>

        <div className="get-app-sections">
          <section className="get-app-section">
            <h3>🌐 Play on the web</h3>
            <p>
              Open this site in <strong>Chrome</strong>, <strong>Safari</strong>, or <strong>Edge</strong> on
              any computer, tablet, or phone. Your town saves automatically on each device.
            </p>
            <div className="get-app-url-row">
              <code className="get-app-url">{playUrl}</code>
              <button type="button" className="btn btn-small" onClick={() => void copyLink()}>
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>
          </section>

          {canOfferInstall && (
            <section className="get-app-section">
              <h3>📱 Install on a smartphone</h3>
              {installed ? (
                <p className="get-app-success">✓ RooVille is installed on this device. Open it from your home screen anytime.</p>
              ) : nativeApp ? (
                <p className="get-app-success">✓ You&apos;re using the RooVille app.</p>
              ) : hasNativeInstall ? (
                <>
                  <p>Tap below to install RooVille from this website. It stays in sync with the web version automatically.</p>
                  <button type="button" className="btn btn-primary get-app-install-btn" onClick={() => void install()}>
                    Install RooVille
                  </button>
                </>
              ) : isIos ? (
                <ol className="get-app-steps">
                  <li>Open this page in <strong>Safari</strong> (required for install).</li>
                  <li>Tap the <strong>Share</strong> button <span aria-hidden="true">⎙</span>.</li>
                  <li>Choose <strong>Add to Home Screen</strong>, then tap Add.</li>
                </ol>
              ) : isAndroid ? (
                <ol className="get-app-steps">
                  <li>Open this page in <strong>Chrome</strong>.</li>
                  <li>Tap the menu <span aria-hidden="true">⋮</span> in the top corner.</li>
                  <li>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
                </ol>
              ) : (
                <>
                  <p>On a phone, open the link above — then follow the install steps for iPhone or Android.</p>
                  <div className="get-app-qr">
                    <img src={qrUrl} alt="QR code — scan to open RooVille on your phone" width={180} height={180} />
                    <p>Scan with your phone camera to open RooVille</p>
                  </div>
                </>
              )}
            </section>
          )}

          {!isMobile && canOfferInstall && !hasNativeInstall && (isIos || isAndroid) === false && (
            <section className="get-app-section get-app-section--tip">
              <p>
                <strong>Tip:</strong> Send the link (or scan the QR code) to your phone, then install from there for
                the best touch controls and full-screen play.
              </p>
            </section>
          )}
        </div>

        <button type="button" className="btn btn-secondary get-app-done" onClick={onClose}>
          {installed || nativeApp ? 'Got it' : 'Play in browser for now'}
        </button>
      </div>
    </div>
  )
}

interface GetAppButtonProps {
  onClick: () => void
  compact?: boolean
}

export function GetAppButton({ onClick, compact }: GetAppButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-ghost btn-small get-app-btn${compact ? ' get-app-btn--compact' : ''}`}
      onClick={onClick}
      aria-label="Get RooVille on your phone"
    >
      📱 {compact ? 'Get app' : 'Get on phone'}
    </button>
  )
}
