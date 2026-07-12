// ===== Service Worker de Playa Hermosa =====
// Este archivo reemplaza tu sw.js actual. Hace dos cosas:
// 1) Deja que la app sea instalable (PWA) como ya lo era.
// 2) Recibe y muestra las notificaciones push cuando la app está cerrada o en segundo plano.

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// OJO: estos valores tienen que ser EXACTAMENTE los mismos que el firebaseConfig
// que ya tenés en index.html.
firebase.initializeApp({
  apiKey: "AIzaSyCXtVS17m4R7zJprRv3epsWmLvXwShy6-A",
  authDomain: "playa-hermosa-av-app.firebaseapp.com",
  projectId: "playa-hermosa-av-app",
  storageBucket: "playa-hermosa-av-app.firebasestorage.app",
  messagingSenderId: "303821411639",
  appId: "1:303821411639:web:6e97d2a422cde1e002b6b2"
});

const messaging = firebase.messaging();

// Notificación recibida con la app cerrada o en segundo plano
messaging.onBackgroundMessage((payload) => {
  const titulo = (payload.notification && payload.notification.title) || 'Playa Hermosa';
  const opciones = {
    body: (payload.notification && payload.notification.body) || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };
  self.registration.showNotification(titulo, opciones);
});

// Al tocar la notificación, abre (o enfoca) la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});

// Passthrough básico para que la app funcione como PWA instalable
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
