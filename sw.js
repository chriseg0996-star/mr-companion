const CACHE = 'mr-companion-v40';
const PRECACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.webmanifest',
  './data/gameData.js',
  './data/itemDbExtras.js',
  './data/jobData.js',
  './data/prequestData.js',
  './data/classGuides.js',
  './data/classSkillTables.js',
  './data/classForumLinks.js',
  './data/classGear.js',
  './data/bossDrops.js',
  './data/partyData.js',
  './data/externalLinks.js',
  './data/mobGlossary.js',
  './data/priceData.js',
  './data/scrollPrices.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(res => {
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
