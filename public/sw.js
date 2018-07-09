/* eslint no-restricted-globals: 0 */

const GET = 'GET';
const CACHE_NAME = 'pwa-workshop';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => self.clients.claim());

// TODO: Example https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const cacheFirst = async event => {
    const { request } = event;
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request.url);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const response = await fetch(request.clone());
        await cache.put(event.request.url, response.clone());
        return response;
    } catch (error) {
        return error;
    }
};

// TODO: Create a fetch first approach

self.addEventListener('fetch', event => {
    if (event.request.method === GET) {
        event.respondWith(cacheFirst(event));
    }
});

