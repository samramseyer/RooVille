import { isInstalledApp, isNativeCapacitorApp } from './appInstall'

export const BUILD_VERSION_KEY = 'rooville-build-version'
const BUILD_ID = import.meta.env.VITE_BUILD_ID as string | undefined
const UPDATE_CHECK_MS = 5 * 60 * 1000
const INSTALLED_UPDATE_CHECK_MS = 15 * 1000

export interface RemoteBuildInfo {
  version?: string
  entry?: string
  style?: string
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

export function isRemoteBuildStale(data: RemoteBuildInfo): boolean {
  if (!data.version) return false

  const serverEntry = entryName(data.entry)
  const bundleEntry = currentBundleEntry()

  if (BUILD_ID && BUILD_ID !== data.version) return true
  if (serverEntry && bundleEntry && serverEntry !== bundleEntry) return true

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

async function hardReload(version: string, refreshing: { value: boolean }): Promise<void> {
  if (refreshing.value) return
  refreshing.value = true
  await clearAppCaches()
  localStorage.setItem(BUILD_VERSION_KEY, version)
  const next = new URL(location.href)
  next.searchParams.set('_rv', version)
  next.searchParams.set('_', String(Date.now()))
  location.replace(next.toString())
}

/** Reload when the server has a newer build than this bundle. */
export async function checkRemoteBuildVersion(refreshing: { value: boolean }): Promise<void> {
  if (refreshing.value) return

  try {
    const res = await fetch(versionJsonUrl(), { cache: 'no-store' })
    if (!res.ok) return

    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('json')) return

    const data = (await res.json()) as RemoteBuildInfo
    if (!data.version) return

    if (isRemoteBuildStale(data)) {
      await hardReload(data.version, refreshing)
      return
    }

    localStorage.setItem(BUILD_VERSION_KEY, data.version)
  } catch {
    /* offline — keep playing with the current bundle */
  }
}

/** Keep installed PWAs on the latest deploy without user action. */
export function registerAppUpdate(): void {
  if (isNativeCapacitorApp()) return

  const refreshing = { value: false }
  const installed = isInstalledApp()
  const updateIntervalMs = installed ? INSTALLED_UPDATE_CHECK_MS : UPDATE_CHECK_MS

  const runUpdateChecks = () => {
    void checkRemoteBuildVersion(refreshing)
  }

  runUpdateChecks()
  window.setInterval(runUpdateChecks, updateIntervalMs)

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') runUpdateChecks()
  })
  window.addEventListener('focus', runUpdateChecks)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) runUpdateChecks()
  })
}
