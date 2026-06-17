import type { CapacitorConfig } from '@capacitor/cli'

const liveUrl = process.env.ROOVILLE_LIVE_URL

const config: CapacitorConfig = {
  appId: 'com.rooville.game',
  appName: 'RooVille',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  server: liveUrl
    ? { url: liveUrl, cleartext: false }
    : { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#87CEEB',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
}

export default config
