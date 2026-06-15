import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')

function showBootError(message: string) {
  if (!rootEl) return
  rootEl.innerHTML = `
    <div style="padding:2rem;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
      <h1 style="color:#e74c3c">RooVille could not start</h1>
      <p>${message}</p>
      <p style="margin-top:1rem;color:#5d6d7e;font-size:0.9rem">
        Try a hard refresh (Ctrl+Shift+R). If that fails, clear site data for this page in browser settings.
      </p>
      <button type="button" onclick="localStorage.removeItem('rooville-save');location.reload()"
        style="margin-top:1rem;padding:0.5rem 1rem;border-radius:8px;border:none;background:#20b2aa;color:white;font-weight:700;cursor:pointer">
        Reset save &amp; reload
      </button>
    </div>
  `
}

if (!rootEl) {
  showBootError('Page root element is missing.')
} else {
  try {
    rootEl.dataset.booted = '1'
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown startup error'
    showBootError(message)
    console.error(err)
  }
}

window.addEventListener('error', (event) => {
  if (rootEl && !rootEl.querySelector('.coastal-world, .welcome, .avatar-creator, .error-boundary')) {
    showBootError(event.message || 'A script failed to load.')
  }
})

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason instanceof Error ? event.reason.message : String(event.reason)
  if (rootEl && !rootEl.querySelector('.coastal-world, .welcome, .avatar-creator, .error-boundary')) {
    showBootError(reason)
  }
})
