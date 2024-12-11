// Grabs all used assets

const assets = [
  "/",
  "css/aboutstyle.css",
  "css/fieldstyle.css",
  "css/indexstyle.css",
  "js/app.js",
  "images/background.png",
  "images/Community Center.png",
  "images/Farm.png",
  "images/GBDK.png",
  "images/Hamburger Bar.png",
  "images/Logo.png",
  "images/Magnifying_Glass.png",
  "images/Reset.png",
  "images/Settings.png",
  "images/Topbar.png",
];

const CATALOGUE_ASSETS = "catalogue-assets";

self.addEventListener("install", (installEvt) => {
  installEvt.waitUntil(
    caches
      .open(CATALOGUE_ASSETS)
      .then((cache) => {
        console.log(cache);
        cache.addAll(assets);
      })
      .then(self.skipWaiting())
      .catch((e) => {
        console.log(e);
      })
  );
});

self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key === CATALOGUE_ASSETS) {
              console.log("Removed old cache from", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", function (evt) {
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CATALOGUE_ASSETS).then((cache) => {
        return cache.match(evt.request);
      });
    })
  );
});
