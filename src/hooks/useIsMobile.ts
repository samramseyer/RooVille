import { useEffect, useState } from 'react'

const MOBILE_WIDTH = 900

/** Match CSS mobile layout — viewport width plus common phone UA edge cases. */
export function getMobileLayout(): boolean {
  if (typeof window === 'undefined') return false
  const width = window.visualViewport?.width ?? window.innerWidth
  if (width <= MOBILE_WIDTH) return true
  if (/android|iphone|ipad|ipod|mobile|webos|blackberry|iemobile|opera mini/i.test(navigator.userAgent)) {
    return width <= 1024
  }
  return false
}

function syncMobileLayoutClass(mobile: boolean) {
  document.documentElement.classList.toggle('layout-mobile', mobile)
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => getMobileLayout())

  useEffect(() => {
    const update = () => {
      const mobile = getMobileLayout()
      setIsMobile(mobile)
      syncMobileLayoutClass(mobile)
    }
    update()
    const mq = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`)
    mq.addEventListener('change', update)
    window.visualViewport?.addEventListener('resize', update)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      mq.removeEventListener('change', update)
      window.visualViewport?.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      document.documentElement.classList.remove('layout-mobile')
    }
  }, [])

  return isMobile
}
