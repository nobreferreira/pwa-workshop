/* eslint no-restricted-globals: 0 */

const GET = 'GET';
const CACHE_NAME = 'pwa-workshop';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', () => self.clients.claim());

// const cacheFirst = async event => {
//     const { request } = event;
//     const cache = await caches.open(CACHE_NAME);
//     const cachedResponse = await cache.match(request.url);
//
//     if (cachedResponse) {
//         return cachedResponse;
//     }
//
//     try {
//         const response = await fetch(request.clone());
//         await cache.put(event.request.url, response.clone());
//         return response;
//     } catch (error) {
//         return error;
//     }
// };

const fetchFirst = async event => {
    const { request } = event;
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request.url);

    try {
        const response = await fetch(request.clone());
        await cache.put(event.request.url, response.clone());
        return response;
    } catch (error) {
        return cachedResponse;
    }
};

self.addEventListener('fetch', event => {
    if (event.request.method === GET) {
        // event.respondWith(cacheFirst(event));
        event.respondWith(fetchFirst(event));
    }
});

self.addEventListener('push', event => {
    // TODO - add 'push' event listener and show notifications
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    // TODO - add 'notificationclick' event listener and navigate to client
    //        Look to see if there is already an open window and
    //        navigate if there is else open new window
});
