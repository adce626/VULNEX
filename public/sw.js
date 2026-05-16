self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()))

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      const url = new URL(e.request.url)
      if (url.pathname.startsWith('/search')) {
        return caches.match('/offline')
      }
      return new Response('Offline', { status: 503 })
    }),
  )
})
