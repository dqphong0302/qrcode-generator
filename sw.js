/**
 * QR Studio Service Worker
 * Fast offline edge caching for Cloudflare Pages (qr.phongdang.io.vn)
 */

const CACHE_NAME = 'qr-studio-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './css/components.css',
  './css/animations.css',
  './js/vendor/qr-code-styling.js',
  './js/vendor/jspdf.umd.min.js',
  './js/presets.js',
  './js/content-builders.js',
  './js/storage.js',
  './js/qr-engine.js',
  './js/exporter.js',
  './js/ui-handlers.js',
  './js/app.js',
  './assets/favicon.svg',
  './assets/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
