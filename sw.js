// Keeps the app opening without internet. Your own files: fresh copy when online, saved copy when offline.
const CACHE = 'wahid-pos-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icon-192.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const save = res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; };
  if (u.origin === location.origin) {
    e.respondWith(fetch(r).then(save).catch(() => caches.match(r).then(m => m || caches.match('./index.html'))));
  } else if (/gstatic\.com\/firebasejs\/|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(u.href)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(save)));
  }
});
