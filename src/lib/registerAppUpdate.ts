import { isInstalledApp, isNativeCapacitorApp } from './appInstall'

export const BUILD_VERSION_KEY = 'rooville-build-version'
const RELOAD_KEY = 'rooville-update-reloads'
const BUILD_ID = import.meta.env.VITE_BUILD_ID as string | undefined
const UPDATE_CHECK_MS = 5 * 60 * 1000
const INSTALLED_UPDATE_CHECK_MS = 30 * 1000

export interface RemoteBuildInfo {
  version?: string
  entry?: string
}

function versionJsonUrl(): URL {
  const url = new URL('version.json', location.href)
  url.search = `_=${Date.now()}`
  return url
}

function entryName(path: string | undefined | null): string {
  if (!path) return ''
  return path.split('/').pop()?.split('?')[0] ?? ''
}

function currentBundleEntry(): string {
  return entryName(import.meta.url)
}

function htmlBuildId(): string {
  const fromWindow = (window as Window & { __ROOVILLE_BUILD__?: string }).__ROOVILLE_BUILD__
  if (fromWindow) return fromWindow
  const bootstrap = document.querySelector('script[data-build-id]')
  return bootstrap?.getAttribute('data-build-id') ?? ''
}

export function isRemoteBuildStale(data: RemoteBuildInfo, stored: string | null): boolean {
  if (!data.version) return false

  const serverEntry = entryName(data.entry)
  const bundleEntry = currentBundleEntry()
  const pageBuildId = htmlBuildId()

  if (pageBuildId && data.version !== pageBuildId) return true
  if (BUILD_ID && BUILD_ID !== data.version) return true
  if (serverEntry && bundleEntry && serverEntry !== bundleEntry) return true
  if (stored && stored !== data.version) return true

  return false
}

async function clearAppCaches(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const regs = await navigator.serviceWorker.getRegistrations()
    await Promise.all(regs.map((r) => r.unregister()))
  }
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((k) => caches.delete(k)))
  }
}

async function hardReload(version: string, refreshing: { value: boolean }): Promise<boolean> {
  if (refreshing.value) return true

  const reloads = Number(sessionStorage.getItem(RELOAD_KEY) || '0')
  if (reloads >= 2) {
    sessionStorage.removeItem(RELOAD_KEY)
    return false
  }

  sessionStorage.setItem(RELOAD_KEY, String(reloads + 1))
  refreshing.value = true
  await clearAppCaches()
  localStorage.setItem(BUILD_VERSION_KEY, version)
  const next = new URL(location.href)
  next.searchParams.set('_rv', version)
  location.replace(next.toString())
  return true
}

function skipWaitingWorker(registration: ServiceWorkerRegistration): void {
  registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
}

/** Reload when the server has a newer build than this install. */
export async function checkRemoteBuildVersion(refreshing: { value: boolean }): Promise<void> {
  if (refreshing.value) return

  try {
    const res = await fetch(versionJsonUrl(), { cache: 'no-store' })
    if (!res.ok) return

    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('json')) return

    const data = (await res.json()) as RemoteBuildInfo
    if (!data.version) return

    const stored = localStorage.getItem(BUILD_VERSION_KEY)

    if (isRemoteBuildStale(data, stored)) {
      const reloaded = await hardReload(data.version, refreshing)
      if (reloaded) return
    }

    sessionStorage.removeItem(RELOAD_KEY)

    if (!stored) {
      localStorage.setItem(BUILD_VERSION_KEY, data.version)
    }
  } catch {
    /* offline — keep playing with the current bundle */
  }
}

function onDocumentReady(run: () => void): void {
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
}

/** Keep installed PWAs on the latest deploy without user action. */
export function registerAppUpdate(): void {
  if (isNativeCapacitorApp()) return

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

  runUpdateChecks()

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing.value) return
      refreshing.value = true
      window.location.reload()
    })

    onDocumentReady(() => {
      void navigator.serviceWorker
        .register(new URL('sw.js', location.href))
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
  } else {
    window.setInterval(() => runUpdateChecks(), updateIntervalMs)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') runUpdateChecks()
    })
    window.addEventListener('focus', () => runUpdateChecks())
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) runUpdateChecks()
    })
  }
}
