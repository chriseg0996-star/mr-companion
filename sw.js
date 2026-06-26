importScripts('./js/version.js');
const CACHE = `mr-companion-v${APP_VERSION}`;
const PRECACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/version.js',
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
  './data/mobSprites.js',
  './data/priceData.js',
  './data/scrollPrices.js',
  './data/leechingData.js',
  './data/forumGuides.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Cross-origin assets (e.g. maplestory.io mob sprites) — browser handles directly.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
