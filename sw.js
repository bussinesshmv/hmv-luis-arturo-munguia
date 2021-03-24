console.log('[Service Worker] Hello world!');

var CACHE_NAME = 'dibiz-v2'

function onInstall(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function prefill(cache) {
      return cache.addAll([
      ]);
    })
  );
}

function onActivate(event) {
  console.log('[Serviceworker]', "Activating!", event);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
           return cacheName.indexOf('v1') !== 0;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
}

function onFetch(event) {
  // Fetch from network, fallback to cached content, then offline.html for same-origin GET requests
  var request = event.request;

  if (!request.url.match(/^https?:\/\/example.com/) ) { return; }
  if (request.method !== 'GET') { return; }

  event.respondWith(
    fetch(request)                                        // first, the network
      .catch(function fallback() {
         caches.match(request).then(function(response) {  // then, the cache
           response || caches.match("/offline.html");     // then, /offline cache
         })
       })
  );

  // See https://jakearchibald.com/2014/offline-cookbook/#on-network-response for more examples
}

self.addEventListener('install', onInstall)
// self.addEventListener('activate', onActivate)
self.addEventListener('fetch', onFetch);


self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
});


















// console.log('[Service Worker] Hello world!');

// const CACHE_NAME = 'dibiz-cache-v2';
// const urlsToCache = [
//   './',
//   '<%= asset_path "application.js" %>',
//   '<%= asset_path "application.css" %>',
// ];

// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim())
//   console.log('Cache activated');
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     fetch(event.request).catch(function(){
//       return caches.match(event.request);
//     }) 
//   );
//   console.log('Network then cache');
// });

// self.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI notify the user they can add to home screen
//   btnAdd.style.display = 'block';
// });
