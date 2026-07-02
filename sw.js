// Service worker mínimo: necesario para que Chrome/Android
// considere que la app es instalable (criterio de "installability").
// No hace caché ni trabaja offline, solo deja pasar los pedidos normales.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
