import { isInstalledApp, isNativeCapacitorApp } from './appInstall'

const SW_VERSION = 'rooville-sw-v9'
const BUILD_ID = import.meta.env.VITE_BUILD_ID as string | undefined
const UPDATE_CHECK_MS = 5 * 60 * 1000
const INSTALLED_UPDATE_CHECK_MS = 60 * 1000

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

/** Reload when the server has a newer build than this bundle. */
async function checkRemoteBuildVersion(refreshing: { value: boolean }): Promise<void> {
  if (!BUILD_ID || refreshing.value) return

  try {
    const res = await fetch(`./version.json?_=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return
    const data = (await res.json()) as { version?: string }
    if (data.version && data.version !== BUILD_ID) {
      refreshing.value = true
      window.location.reload()
    }
  } catch {
    /* offline — keep playing with the current bundle */
  }
}

/** Keep installed PWAs on the latest deploy without user action. */
export function registerAppUpdate(): void {
  if (import.meta.env.DEV || isNativeCapacitorApp()) return

  const refreshing = { value: false }
  const installed = isInstalledApp()
  const updateIntervalMs = installed ? INSTALLED_UPDATE_CHECK_MS : UPDATE_CHECK_MS

  const runUpdateChecks = (registration?: ServiceWorkerRegistration) => {
    void checkRemoteBuildVersion(refreshing)
    if (registration) {
      void registration.update().catch(() => {
        /* offline or blocked — try again later */
      })
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing.value) return
      refreshing.value = true
      window.location.reload()
    })

    void migrateServiceWorkerVersion()

    window.addEventListener('load', () => {
      void navigator.serviceWorker
        .register('./sw.js')
        .then((registration) => {
          runUpdateChecks(registration)

          window.setInterval(() => runUpdateChecks(registration), updateIntervalMs)

          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') runUpdateChecks(registration)
          })
          window.addEventListener('focus', () => runUpdateChecks(registration))
          window.addEventListener('pageshow', (event) => {
            if (event.persisted) runUpdateChecks(registration)
          })

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
  } else if (import.meta.env.PROD) {
    runUpdateChecks()
    window.setInterval(() => runUpdateChecks(), updateIntervalMs)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') runUpdateChecks()
    })
    window.addEventListener('focus', () => runUpdateChecks())
  }
}
