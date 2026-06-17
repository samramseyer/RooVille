const CACHE_NAME = 'rooville-d2d163ffca2d'

function isAppShellRequest(request, url) {
  if (request.mode === 'navigate') return true
  if (request.destination === 'document') return true
  if (url.pathname.endsWith('.html')) return true
  if (url.pathname.endsWith('/')) return true
  const leaf = url.pathname.split('/').pop() ?? ''
  return leaf !== '' && !leaf.includes('.')
}

function networkOnly(request) {
  return fetch(new Request(request, { cache: 'no-store' }))
}

/** Network-first — avoids stale JS/CSS trapping users on old mobile UI. */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  const url = new URL(event.request.url)
  if (url.origin !== self.location.origin) return

  if (url.pathname.endsWith('/version.json') || isAppShellRequest(event.request, url)) {
    event.respondWith(
      networkOnly(event.request).catch(() => caches.match(event.request)),
    )
    return
  }

  event.respondWith(
    networkOnly(event.request).catch(() => caches.match(event.request)),
  )
})
