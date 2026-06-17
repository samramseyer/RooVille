export function isStandaloneApp(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  )
}

export function isNativeCapacitorApp(): boolean {
  if (typeof window === 'undefined') return false
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return cap?.isNativePlatform?.() ?? false
}

/** Home-screen PWA or Capacitor APK — should track the live web deploy. */
export function isInstalledApp(): boolean {
  return isStandaloneApp() || isNativeCapacitorApp()
}
