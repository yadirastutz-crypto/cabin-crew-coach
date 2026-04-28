const CACHE_NAME = 'cabin-crew-coach-v1';

function getBase() {
  return self.registration.scope;
}

// Install: pre-cache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const base = getBase();
      const cache = await caches.open(CACHE_NAME);
      try {
        await cache.addAll([
          base,
          base + 'manifest.json',
          base + 'icons/icon-192.png',
          base + 'icons/icon-512.png',
        ]);
      } catch (err) {
        console.warn('[SW] Pre-cache failed for some files:', err);
      }
      await self.skipWaiting();
    })()
  );
});

// Activate: remove old caches and claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch: navigation → network-first; assets → cache-first with background update
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only intercept GET requests from the same origin
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation requests (HTML pages) — network first, offline fallback to root
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(self.registration.scope).then(
          (cached) => cached || Response.error()
        );
      })
    );
    return;
  }

  // Static assets — cache first, update in background (stale-while-revalidate)
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached ?? networkFetch;
    })
  );
});
