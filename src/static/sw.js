var appCacheName = "app-cache-v4";
var preCacheFiles = [
  "/",
  "/bundle.js",
  "/app.css",
  "/manifest.json",
  "/favicon.ico",
  // Object images
  "/images/hero/hero.png",
  "/images/void/void.png",
  "/images/coin/coin.png",
  "/images/gremlak/ship.png",
  "/images/plank-900-250.png",
  "/images/plank-1800x250.png",
  // Logo images
  "/logo/logo-16x16.png",
  "/logo/logo-24x24.png",
  "/logo/logo-32x32.png",
  "/logo/logo-64x64.png",
  "/logo/logo-128x128.png",
  "/logo/logo-256x256.png",
  "/logo/logo-512x512.png",
  "/logo/logo-original.png",
];

console.debug("[ServiceWorker] Loaded");

self.addEventListener("install", function (e) {
  self.skipWaiting();
  console.debug("[ServiceWorker] Installing");
  e.waitUntil(
    caches.open(appCacheName).then(function (cache) {
      console.debug("[ServiceWorker] Caching");
      return cache.addAll(preCacheFiles);
    }),
  );
});

self.addEventListener("fetch", function (e) {
  console.debug("[ServiceWorker] Fetch", e.request.url);
  e.respondWith(
    caches.open(appCacheName).then(function (cache) {
      return cache.match(e.request).then(function (cachedResponse) {
        console.debug("[ServiceWorker] Cache lookup", e.request.url);
        if (cachedResponse) {
          console.debug("[ServiceWorker] Serving from cache", e.request.url);
          return cachedResponse;
        } else {
          console.debug("[ServiceWorker] Fetching from network", e.request.url);
          return fetch(e.request).then(function (response) {
            console.debug("[ServiceWorker] Updating cache", e.request.url);
            cache.put(e.request.url, response.clone());
            return response;
          });
        }
      });
    }),
  );
});
