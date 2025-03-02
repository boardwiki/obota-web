// service-worker.js

// 캐시 이름 정의
const CACHE_NAME = 'obota-v-0.0.1';

// 캐싱할 파일 경로 정의
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  // 캐싱할 추가적인 파일들의 경로
];

// 서비스 워커 설치 시
self.addEventListener('install', (event:any) => {
  // 캐시 생성 및 파일 캐싱
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 서비스 워커 활성화 시
self.addEventListener('activate', (event:any) => {
  // 이전 버전의 캐시 정리
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event:any) => {
  event.respondWith(
    // 캐시에서 요청 리소스 찾기
    caches.match(event.request)
      .then(response => {
        // 캐시에 리소스가 존재하면 해당 리소스 반환
        if (response) {
          return response;
        }
        // 캐시에 리소스가 존재하지 않으면 네트워크에서 요청
        return fetch(event.request);
      })
  );
});