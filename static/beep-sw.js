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
  
workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "5eee26a807700a69793ffcfa5813a630"
  },
  {
    "url": "static/bg20.png",
    "revision": "d2e36d41e93691003861f9ef13c60071"
  },
  {
    "url": "static/bg60.png",
    "revision": "dc4feb2ca2ce6ff1c5acc710d9cf4a43"
  },
  {
    "url": "static/cat_brush.png",
    "revision": "ceb9bee80d9912b8cefcdf1541047444"
  },
  {
    "url": "static/css/app.56dca4575f3fcbe7df7e.css",
    "revision": "718392498515fa088efb332621fdcc67"
  },
  {
    "url": "static/css/vendor.d31bf1a930c2684e4888.css",
    "revision": "20093bbb80125ce9823b4cac44ea8c4d"
  },
  {
    "url": "static/favicon/android-chrome-192x192.png",
    "revision": "f72a56990ac882945b8f2e3d7ec8befc"
  },
  {
    "url": "static/favicon/android-chrome-256x256.png",
    "revision": "d00027cbbf02f20a347c21ebe47a4420"
  },
  {
    "url": "static/favicon/apple-touch-icon.png",
    "revision": "6389dc381c19aecf6aea27fcfdf1d525"
  },
  {
    "url": "static/favicon/browserconfig.xml",
    "revision": "dcf9a90300350e2ddc58513940c8ae28"
  },
  {
    "url": "static/favicon/favicon-16x16.png",
    "revision": "5aae3b1d904f62a5bd9912604ca1b06c"
  },
  {
    "url": "static/favicon/favicon-32x32.png",
    "revision": "461baed5ac9f60c342cd70e1e7438da3"
  },
  {
    "url": "static/favicon/favicon.ico",
    "revision": "825fe5444ede0cd604a6bbf468773037"
  },
  {
    "url": "static/favicon/mstile-150x150.png",
    "revision": "4292e371a9f122f260e69760c5e4cf84"
  },
  {
    "url": "static/favicon/safari-pinned-tab.svg",
    "revision": "fd4faa4c259d1d65e33235caff2550a9"
  },
  {
    "url": "static/js/2.35b48ca741150af93c8b.js",
    "revision": "c18bec788dfd4d7596f1dcd2f0c2d8d8"
  },
  {
    "url": "static/js/runtime.0542bdc08681726dd3e1.js",
    "revision": "8e55df9f8998b40c7a6f28785df8bc8b"
  },
  {
    "url": "static/manifest.json",
    "revision": "0f1b6b33c9c385d90d47e86437fd7004"
  },
  {
    "url": "static/vowels/nikud_0.svg",
    "revision": "29a394b8397b05c0e11c474cf82b7341"
  },
  {
    "url": "static/vowels/nikud_3.svg",
    "revision": "2828c7535d3107aa2147dfb60e3f9cbe"
  },
  {
    "url": "static/vowels/nikud_4.svg",
    "revision": "2b0996234541f0d9404147dba5117b2a"
  },
  {
    "url": "static/vowels/nikud_5.svg",
    "revision": "31bf32e136e00009670a0f85ab01cba3"
  },
  {
    "url": "static/vowels/nikud_6.svg",
    "revision": "7f8032c9ba0a4dd9b8faa8a9e9add6c3"
  },
  {
    "url": "static/vowels/nikud_7.svg",
    "revision": "c3b11fe6212927917a7c95515b9346a9"
  },
  {
    "url": "static/vowels/nikud_8.svg",
    "revision": "d79040d7cc0c432a6173d5f9e5a50722"
  },
  {
    "url": "static/vowels/nikud_9.svg",
    "revision": "593f00b3e1b2ae5395026cdce2232687"
  },
  {
    "url": "static/vowels/nikud_B.svg",
    "revision": "8a1c0cbb89770d916d91fe54e4df8c57"
  },
  {
    "url": "static/vowels/nikud_C.svg",
    "revision": "6e6864bc05607587800956f853d704a6"
  },
  {
    "url": "static/vowels/nikud_D.svg",
    "revision": "3313c68adaa44bf352904c151ffa38bd"
  },
  {
    "url": "static/vowels/nikud_E.svg",
    "revision": "6364346ed0649de5671b3979e7d15a39"
  },
  {
    "url": "static/vowels/nikud_F.svg",
    "revision": "af5303938e7b0734abf980175d7ad53c"
  }
]);