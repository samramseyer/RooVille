import { useCallback, useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'

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
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

export function isAndroidDevice(): boolean {
  return /android/i.test(navigator.userAgent)
}

export function isMobileDevice(): boolean {
  return isIosDevice() || isAndroidDevice()
}

export function getPlayUrl(): string {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`.replace(/\/$/, '') || origin
}

export function useInstallApp() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === '1',
  )
  const [mobileDevice, setMobileDevice] = useState(false)
  const [installed, setInstalled] = useState(isStandaloneApp)
  const [nativeApp, setNativeApp] = useState(Capacitor.isNativePlatform())

  useEffect(() => {
    setMobileDevice(isMobileDevice())
    setInstalled(isStandaloneApp())
    setNativeApp(Capacitor.isNativePlatform())

    if (Capacitor.isNativePlatform() || isStandaloneApp()) return

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

  return {
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
  }
}
