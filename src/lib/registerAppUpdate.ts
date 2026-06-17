const SW_VERSION = 'rooville-sw-v8'
const UPDATE_CHECK_MS = 60 * 60 * 1000

function isNativeCapacitorApp(): boolean {
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return cap?.isNativePlatform?.() ?? false
}

async function migrateServiceWorkerVersion(): Promise<void> {
  if (localStorage.getItem('rooville-sw-version') === SW_VERSION) return

  const regs = await navigator.serviceWorker.getRegistrations()
  await Promise.all(regs.map((r) => r.unregister()))
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k)))
  }
  localStorage.setItem('rooville-sw-version', SW_VERSION)
}

function skipWaitingWorker(registration: ServiceWorkerRegistration): void {
  registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
}

/** Keep installed PWAs on the latest deploy without user action. */
export function registerAppUpdate(): void {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV || isNativeCapacitorApp()) return

  let refreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    refreshing = true
    window.location.reload()
  })

  void migrateServiceWorkerVersion()

  window.addEventListener('load', () => {
    void navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        const checkForUpdates = () => {
          void registration.update().catch(() => {
            /* offline or blocked — try again later */
          })
        }

        checkForUpdates()
        window.setInterval(checkForUpdates, UPDATE_CHECK_MS)

        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') checkForUpdates()
        })
        window.addEventListener('focus', checkForUpdates)

        registration.addEventListener('updatefound', () => {
          const worker = registration.installing
          if (!worker) return

          worker.addEventListener('statechange', () => {
            if (worker.state !== 'installed') return
            if (!navigator.serviceWorker.controller) return
            skipWaitingWorker(registration)
          })
        })

        if (registration.waiting && navigator.serviceWorker.controller) {
          skipWaitingWorker(registration)
        }
      })
      .catch(() => {
        /* game works without offline cache */
      })
  })
}
