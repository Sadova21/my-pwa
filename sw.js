const CACHE_NAME = 'pwa-cache-v1';

const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('📦 Кеш відкрито');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // повертаємо з кешу
            }
            return fetch(event.request); // або тягнемо з мережі
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('🗑 Видаляємо старий кеш:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
