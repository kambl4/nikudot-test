importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

// cache name
workbox.core.setCacheNameDetails({
	prefix: 'beep',
	precache: 'precache',
	runtime: 'runtime',
});
  
// runtime cache
// 0. fonts
workbox.routing.registerRoute(
	new RegExp('.*(?:googleapis|gstatic)\.com'),
  workbox.strategies.cacheFirst({
		cacheName: 'beep-fonts-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 7,
				maxEntries: 20,
				purgeOnQuotaError: true
			})
		]
	})
);
// 1. stylesheet
workbox.routing.registerRoute(
	new RegExp('\.css$'),
	workbox.strategies.cacheFirst({
		cacheName: 'beep-css-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 7,
				maxEntries: 20,
				purgeOnQuotaError: true
			})
		]
	})
);
// 2. images
workbox.routing.registerRoute(
	new RegExp('\.(png|svg|jpg|jpeg|gif)$'),
	workbox.strategies.cacheFirst({
		cacheName: 'beep-images-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxAgeSeconds: 60 * 60 * 24 * 7,
				maxEntries: 50,
				purgeOnQuotaError: true
			})
		]
	})
);
  
workbox.precaching.precacheAndRoute([]);