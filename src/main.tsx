import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { getMobileLayout } from './hooks/useIsMobile'

if (typeof window !== 'undefined' && getMobileLayout()) {
  document.documentElement.classList.add('layout-mobile')
}

const rootEl = document.getElementById('root')

async function clearSiteCaches() {
  localStorage.removeItem('rooville-save')
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((r) => r.unregister()))
  }
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k)))
  }
}

function showBootError(message: string) {
  if (!rootEl) return
  rootEl.innerHTML = `
    <div style="padding:2rem;font-family:system-ui,sans-serif;max-width:480px;margin:0 auto">
      <h1 style="color:#e74c3c">RooVille could not start</h1>
      <p>${message}</p>
      <p style="margin-top:1rem;color:#5d6d7e;font-size:0.9rem">
        Try a hard refresh (Ctrl+Shift+R). If that fails, clear cached site data below.
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:1rem">
        <button type="button" id="rooville-clear-cache"
          style="padding:0.5rem 1rem;border-radius:8px;border:none;background:#20b2aa;color:white;font-weight:700;cursor:pointer">
          Clear cache &amp; reload
        </button>
        <button type="button" id="rooville-reset-save"
          style="padding:0.5rem 1rem;border-radius:8px;border:2px solid #cbd5e0;background:white;color:#2c3e50;font-weight:700;cursor:pointer">
          Reset save only
        </button>
      </div>
    </div>
  `
  document.getElementById('rooville-clear-cache')?.addEventListener('click', () => {
    void clearSiteCaches().then(() => location.reload())
  })
  document.getElementById('rooville-reset-save')?.addEventListener('click', () => {
    localStorage.removeItem('rooville-save')
    location.reload()
  })
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

function isNativeCapacitorApp(): boolean {
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return cap?.isNativePlatform?.() ?? false
}

if ('serviceWorker' in navigator && import.meta.env.PROD && !isNativeCapacitorApp()) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* optional — game works without offline cache */
    })
  })
}
