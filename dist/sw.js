'use strict';

/* global registration */

var CACHE_VERSION = 'v1';
var CACHE_NAME = registration.scope + '!' + CACHE_VERSION;

// キャッシュするファイルをセットする
var urlsToCache = ['.', 'css/main.css', 'img/sprite.png', 'js/jquery.min.js', 'js/main.js'];

self.addEventListener('install', function (event) {
  event.waitUntil(
  // キャッシュを開く
  caches.open(CACHE_NAME).then(function (cache) {
    // 指定されたファイルをキャッシュに追加する
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (cacheNames) {
    return cacheNames.filter(function (cacheName) {
      // このスコープに所属していて且つCACHE_NAMEではないキャッシュを探す
      return cacheName.startsWith(registration.scope + '!') && cacheName !== CACHE_NAME;
    });
  }).then(function (cachesToDelete) {
    return Promise.all(cachesToDelete.map(function (cacheName) {
      // いらないキャッシュを削除する
      return caches.delete(cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    // キャッシュ内に該当レスポンスがあれば、それを返す
    if (response) {
      return response;
    }

    // 重要：リクエストを clone する。リクエストは Stream なので
    // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
    // 必要なので、リクエストは clone しないといけない
    var fetchRequest = event.request.clone();

    return fetch(fetchRequest).then(function (response) {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        // キャッシュする必要のないタイプのレスポンスならそのまま返す
        return response;
      }

      // 重要：レスポンスを clone する。レスポンスは Stream で
      // ブラウザ用とキャッシュ用の2回必要。なので clone して
      // 2つの Stream があるようにする
      var responseToCache = response.clone();

      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, responseToCache);
      });

      return response;
    });
  }));
});