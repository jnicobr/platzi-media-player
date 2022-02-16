// Version of the service worker
const VERSION = 'v1';

// Calls the install event when the browser installs the service worker
self.addEventListener('install', event => {
  event.waitUntil(precache());
});

// Add the list of resources wanted to be stored on chace
const precache = async () => {
  const cache = await caches.open(VERSION);
  return cache.addAll([
    // '/',
    // '/index.html',
    // '/assets/index.js',
    // '/assets/MediaPlayer.js',
    // '/plugins/AutoPlay.js',
    // '/plugins/AutoPause.js',
    // '/assets/index.css',
    // '/assets/BigBuckBunny.mp4',
  ]);
}

// When a request is made, check if the resource is in the cache and fetch it from there
self.addEventListener('fetch', event => {
  const request = event.request;
  // Only intercept get requests
  if (request.method !== 'GET') {
    return;
  }

  // Search for the resource in cache
  event.respondWith(cachedResponse(request));

  // Update cache after serving the cached resource 
  event.waitUntil(updateCache(request));
});

const cachedResponse = async request => {
  const cache = await caches.open(VERSION);
  // Check if the cache has the requested resource
  const response = await cache.match(request)
  // Return the cached resource or the source fetched from network
  return response || fetch(request);
}

const updateCache = async request => {
  const cache = await caches.open(VERSION);
  // Get the resource from network
  const response = await fetch(request);
  // Store fresh version of resource in cache
  return cache.put(request, response);
}