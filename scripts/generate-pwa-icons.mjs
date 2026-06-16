import sharp from 'sharp'
import { mkdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const svg = readFileSync(join(root, 'public/icon.svg'))

mkdirSync(join(root, 'public/icons'), { recursive: true })
mkdirSync(join(root, 'resources'), { recursive: true })

for (const size of [192, 512]) {
  await sharp(svg).resize(size, size).png().toFile(join(root, 'public/icons', `icon-${size}.png`))
}

await sharp(svg).resize(1024, 1024).png().toFile(join(root, 'resources/icon.png'))

await sharp({
  create: {
    width: 2732,
    height: 2732,
    channels: 4,
    background: { r: 135, g: 206, b: 235, alpha: 1 },
  },
})
  .png()
  .toFile(join(root, 'resources/splash.png'))

console.log('Generated PWA icons and Capacitor resources')
