// キャッシュの名前
var CACHE_NAME = 'pwa-memo-v1';
var urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
];

// 1. インストール時にファイルをキャッシュする
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ページを開く時、ネットに行く前にキャッシュを見る
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュにあればそれを返す。なければネットに取りに行く
        return response || fetch(event.request);
      })
  );
});