
```javascript
const CACHE_NAME = 'mediquiz-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // យកចេញពី Cache បើមាន
        }
        return fetch(event.request); // ទាញចេញពីអ៊ីនធឺណិតបើមិនទាន់មាន
      })
  );
});

