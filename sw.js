const CACHE = 'MyShout-v4.0';
const ASSETS = ['/MyShout/', '/MyShout/index.html', '/MyShout/manifest.json', '/MyShout/icons/icon-192.png', '/MyShout/icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;

  // Network-first for navigation (HTML) requests so updates show up immediately.
  // Falls back to cache when offline.
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for static assets (icons, manifest, etc.), with network fallback
  // and silent re-caching so they stay fresh without needing a version bump.
  e.respondWith(
    caches.match(req).then(cached => {
      const networkFetch = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});