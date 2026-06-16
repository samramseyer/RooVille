import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'rooville-install-dismissed'

export function isStandaloneApp(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  )
}

export function isIosDevice(): boolean {
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) return true
  // iPadOS 13+ often reports as Mac; treat touch Mac as mobile for install hints.
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
}

export function isAndroidDevice(): boolean {
  return /android/i.test(navigator.userAgent)
}

export function isMobileDevice(): boolean {
  if (isIosDevice() || isAndroidDevice()) return true
  return window.matchMedia('(max-width: 900px)').matches
}

function isNativeCapacitorApp(): boolean {
  if (typeof window === 'undefined') return false
  const cap = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
  return cap?.isNativePlatform?.() ?? false
}

export function getPlayUrl(): string {
  const { origin, pathname } = window.location
  const path = pathname.replace(/\/$/, '')
  return path ? `${origin}${path}` : origin
}

export interface InstallAppContextValue {
  showMobileBanner: boolean
  install: () => Promise<boolean>
  dismissBanner: () => void
  isIos: boolean
  isAndroid: boolean
  isMobile: boolean
  hasNativeInstall: boolean
  canOfferInstall: boolean
  installed: boolean
  nativeApp: boolean
  playUrl: string
}

const InstallAppContext = createContext<InstallAppContextValue | null>(null)

export function InstallAppProvider({ children }: { children: ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === '1',
  )
  const [mobileDevice, setMobileDevice] = useState(false)
  const [installed, setInstalled] = useState(() => isStandaloneApp())
  const [nativeApp, setNativeApp] = useState(() => isNativeCapacitorApp())

  useEffect(() => {
    setMobileDevice(isMobileDevice())
    setInstalled(isStandaloneApp())
    setNativeApp(isNativeCapacitorApp())

    if (isNativeCapacitorApp() || isStandaloneApp()) return

    const installHandler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const installedHandler = () => setInstalled(true)

    window.addEventListener('beforeinstallprompt', installHandler)
    window.addEventListener('appinstalled', installedHandler)
    return () => {
      window.removeEventListener('beforeinstallprompt', installHandler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const install = useCallback(async () => {
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    if (outcome === 'accepted') {
      localStorage.setItem(DISMISS_KEY, '1')
      setBannerDismissed(true)
      setInstalled(true)
    }
    return outcome === 'accepted'
  }, [deferredPrompt])

  const dismissBanner = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, '1')
    setBannerDismissed(true)
  }, [])

  const canOfferInstall = !nativeApp && !installed
  const showMobileBanner =
    canOfferInstall && !bannerDismissed && (mobileDevice || !!deferredPrompt)

  const value = useMemo<InstallAppContextValue>(
    () => ({
      showMobileBanner,
      install,
      dismissBanner,
      isIos: isIosDevice(),
      isAndroid: isAndroidDevice(),
      isMobile: mobileDevice,
      hasNativeInstall: !!deferredPrompt,
      canOfferInstall,
      installed,
      nativeApp,
      playUrl: getPlayUrl(),
    }),
    [
      showMobileBanner,
      install,
      dismissBanner,
      mobileDevice,
      deferredPrompt,
      canOfferInstall,
      installed,
      nativeApp,
    ],
  )

  return <InstallAppContext.Provider value={value}>{children}</InstallAppContext.Provider>
}

export function useInstallApp(): InstallAppContextValue {
  const ctx = useContext(InstallAppContext)
  if (!ctx) {
    throw new Error('useInstallApp must be used within InstallAppProvider')
  }
  return ctx
}
