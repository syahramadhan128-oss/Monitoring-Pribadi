const CACHE_NAME = "keuangan-v3";

const urlsToCache = [
  "/Monitoring-Pribadi/",
  "/Monitoring-Pribadi/index.html",
  "/Monitoring-Pribadi/transaksi.html",
  "/Monitoring-Pribadi/laporan.html",
  "/Monitoring-Pribadi/manifest.json",
  "/Monitoring-Pribadi/icon-192.png",
  "/Monitoring-Pribadi/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
