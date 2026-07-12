const CACHE_NAME = 'vulnex-v3'

const PAGE_ROUTES = ['/', '/search', '/bookmarks', '/collections', '/all', '/tools', '/payloads',
  '/vulnerabilities', '/methods', '/recon', '/tech-specific', '/cloud',
  '/waf-bypass', '/advanced', '/auth-session', '/browser-extensions',
  '/changelog', '/toolkit']

self.addEventListener('install', () => {
  self.skipWaiting()
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

  const path = url.pathname

  if (path.startsWith('/icons/') || path === '/favicon.svg' || path === '/manifest.json') {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)))
    return
  }

  if (path.startsWith('/images/') || path.endsWith('.webp') || path.endsWith('.svg') || path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')) {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(e.request).then((cached) => cached || fetch(e.request).then((res) => { cache.put(e.request, res.clone()); return res }))
      )
    )
    return
  }

  if (path.startsWith('/_next/static/')) {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(e.request).then((cached) => {
          const fetched = fetch(e.request).then((res) => {
            cache.put(e.request, res.clone())
            return res
          })
          return cached || fetched
        })
      )
    )
    return
  }

  if (path.startsWith('/interactive/') || path.startsWith('/tools/') || path.startsWith('/payloads/')) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const clone = res.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        return res
      }).catch(() => caches.match(e.request).then((cached) => cached))
    )
    return
  }

  e.respondWith(
    fetch(e.request).then((res) => {
      const clone = res.clone()
      caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
      return res
    }).catch(() =>
      caches.match(e.request).then((cached) =>
        cached || caches.match('/').then((home) => home || new Response('Offline', { status: 503 }))
      )
    )
  )
})