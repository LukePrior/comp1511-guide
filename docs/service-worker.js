// Establish cache
const cacheName = 'main_cache';

// Assets to precache but reload
const precachedAssets = [
    '/static/css/main.css',
    '/static/js/index.js',
    '/manifest.json',
    '/static/img/favicon.ico',
    '/static/img/android-chrome-192x192.png',
    '/static/img/android-chrome-512x512.png',
    '/static/img/apple-touch-icon.png',
];

// Assets to permenantly precache
const permenantCachedAssets = [
    'https://registry.wapm.io/graphql',
    'https://registry-cdn.wapm.io/packages/taybenlor/runno-clang/runno-clang-0.1.2.tar.gz'
];

// Precache assets on install
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        //const cacheList = precachedAssets.concat(permenantCachedAssets);
        //console.log(cacheList);
        return cache.addAll(precachedAssets);
    }));
  });
  

self.addEventListener('fetch', function (event) {
    const url = new URL(event.request.url);
    const isPrecachedRequest = precachedAssets.includes(url.pathname);
    //const isPermenantPrecachedRequest = permenantCachedAssets.includes(url.pathname);
    // ToDo refesh isPrecachedRequest
    if (isPrecachedRequest) {
        event.respondWith(caches.open(cacheName).then((cache) => {
            return cache.match(event.request.url);
        }));
    }
    console.log(event.request.url);
  });