const CACHE_NAME = "keuangan-v8";

const urlsToCache = [
  "/Monitoring-Pribadi/",
  "/Monitoring-Pribadi/index.html",
  "/Monitoring-Pribadi/transaksi.html",
  "/Monitoring-Pribadi/laporan.html",
  "/Monitoring-Pribadi/profil.html",
  "/Monitoring-Pribadi/manifest.json",
  "/Monitoring-Pribadi/icon-192.png",
  "/Monitoring-Pribadi/icon-512.png"
];

// Install Service Worker
self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache berhasil dibuat");
        return cache.addAll(urlsToCache);
      })
  );

  self.skipWaiting();

});

// Aktivasi Service Worker
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(cacheNames => {

      return Promise.all(

        cacheNames.map(cache => {

          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }

        })

      );

    })

  );

  self.clients.claim();

});

// Fetch Request
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {

            if (
              !networkResponse ||
            
