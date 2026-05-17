const CACHE_NAME = 'vulnex-v1'
const STATIC_ASSETS = [
  '/',
  '/search',
  '/bookmarks',
  '/all',
  '/tools',
  '/vulnerabilities',
]

self.addEventListener('install', (e) => {
  self.skipWaiting()
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (url.origin !== self.location.origin) return

  if (url.pathname.startsWith('/icons/') || url.pathname === '/favicon.svg') {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request))
    )
    return
  }

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        return res
      })
      .catch(() => caches.match(e.request).then((cached) => cached || new Response('Offline', { status: 503 })))
  )
})
