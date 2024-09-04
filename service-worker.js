
const CACHE_NAME = 'botai';
const urlsToCache = [
  '/botai/',
  '/botai/index.html',
  '/botai/style.css',
  '/botai/service-worker.js',
  '/botai/icon-192x192.png',
  '/botai/icon-512x512.png',
  '/botai/script.js',
  '/botai/model.json',
  '/botai/group1-shard1of2.bin',
  '/botai/group1-shard2of2.bin',
  '/botai/images/icon-72x72.png',
  '/botai/images/icon-128x128.png',
  '/botai/images/icon-144x144.png',
  '/botai/images/icon-152x152.png',
  '/botai/images/icon-192x192.png',
  '/botai/images/icon-384x384.png',
  '/botai/images/icon-512x512.png',
  '/botai/favicon.ico',
  '/botai/README.md',
  '/botai/manifest.json',
  '/botai/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
