// キャッシュの名前
const CACHE_NAME = 'pwa-memo-v2'; // ← 更新時はここを v2, v3... に変える
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png',
  './apple-touch-icon.png',
];

// インストール時にファイルをキャッシュする
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 新しいSWが起動したとき、古いキャッシュを削除する
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // 現在のキャッシュ名と違うものは全て削除
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ページを開く時、ネットに行く前にキャッシュを見る
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュにあればそれを返す。なければネットに取りに行く
        return response || fetch(event.request);
      })
  );
});