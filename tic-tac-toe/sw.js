const PRECACHE = 'TicTacToeGame-v1';
const RUNTIME = 'TicTacToeGame-runtime';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/icon.png',
  '/pwa-logo.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        cacheNames.filter((cacheName) => !currentCaches.includes(cacheName)))
      .then((cachesToDelete) =>
        Promise.all(cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) =>
          fetch(event.request).then((response) =>
            cache.put(event.request, response.clone()).then(() => response)));
      }),
    );
  }
});
