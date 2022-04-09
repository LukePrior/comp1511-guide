importScripts('static/js/md5.js');
importScripts('static/js/idb-keyval-iife.min.js');

// Establish cache
const cacheName = 'main_cache';

//Database for graphql argh
const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

// Assets to precache but reload
const precachedAssets = [
    '/',
    '/static/css/main.css',
    '/static/js/index.js',
    '/static/js/md5.js',
    '/static/js/idb-keyval-iife.min.js',
    '/manifest.json',
    '/static/img/favicon.ico',
    '/static/img/android-chrome-192x192.png',
    '/static/img/android-chrome-512x512.png',
    '/static/img/apple-touch-icon.png',
];

// Assets to permenantly precache
const permenantCachedAssets = [
    'https://registry-cdn.wapm.io/packages/taybenlor/runno-clang/runno-clang-0.1.2.tar.gz',
    'https://registry-cdn.wapm.io/packages/richard/clear/clear-0.0.4.tar.gz'
];

// Precache assets on install
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
        fillServiceWorkerCache();
    }));
  });

const fillServiceWorkerCache = function () {
    const cacheList = precachedAssets.concat(permenantCachedAssets);
    return caches.open(cacheName).then(function (cache) {
        return Promise.all(
            cacheList.map(function (url) {
                return cache.add(url)
            })
        );
    });
};

// https://medium.com/@jono/cache-graphql-post-requests-with-service-worker-100a822a388a
async function staleWhileRevalidate(event) {
    let cachedResponse = await getCache(event.request.clone());
    let fetchPromise = fetch(event.request.clone())
      .then((response) => {
        setCache(event.request.clone(), response.clone());
        return response;
      })
    return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
    let serializedHeaders = {};
    for (var entry of response.headers.entries()) {
      serializedHeaders[entry[0]] = entry[1];
    }
    let serialized = {
      headers: serializedHeaders,
      status: response.status,
      statusText: response.statusText
    };
    serialized.body = await response.json();
    return serialized;
}
  
async function setCache(request, response) {
    let body = await request.json();
    let id = CryptoJS.MD5(body.query).toString();
  
    var entry = {
      query: body.query,
      response: await serializeResponse(response),
      timestamp: Date.now()
    };
    idbKeyval.set(id, entry, store);
}
  
async function getCache(request) {
    let data;
    try {
      let body = await request.json();
      let id = CryptoJS.MD5(body.query).toString();
      data = await idbKeyval.get(id, store);
      if (!data) return null;
  
      return new Response(JSON.stringify(data.response.body), data.response);
    } catch (err) {
      return null;
    }
}

self.addEventListener('fetch', function (event) {
    const isPermenantPrecachedRequest = permenantCachedAssets.includes(event.request.url);
    if (isPermenantPrecachedRequest) {
        event.respondWith(caches.open(cacheName).then((cache) => {
            return cache.match(event.request.url);
        }));
    } else if (event.request.method === 'POST') { //GraphQL
        event.respondWith(staleWhileRevalidate(event));
    }  else {
        event.respondWith(caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                const fetchedResponse = fetch(event.request).then((networkResponse) => {
                    cache.put(event.request, networkResponse.clone());

                    return networkResponse;
                });
      
                return cachedResponse || fetchedResponse;
            });
        }));
    }
});