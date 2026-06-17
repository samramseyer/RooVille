import { copyFileSync, existsSync } from 'node:fs'

if (!existsSync('dist/app.html')) {
  console.error('dist/app.html missing — run vite build first')
  process.exit(1)
}

copyFileSync('dist/app.html', 'dist/index.html')
console.log('Copied dist/app.html → dist/index.html for Capacitor')
