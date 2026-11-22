import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'offline.html',
        'icons/icon.svg',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png',
        'icons/icon-maskable-512x512.png',
        'icons/apple-touch-icon.png',
      ],
      manifest: {
        name: 'HomeFit 30',
        short_name: 'HomeFit',
        description:
          'Personal home fitness Progressive Web App for structured 30-minute full-body strength workouts.',
        theme_color: '#E53935',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        categories: ['fitness', 'health', 'sports'],
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache all built JS, CSS, HTML, SVG, PNG assets so all 7 app views work 100% offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // Cache-First strategy for static application assets (icons, local images, scripts, styles)
            urlPattern: ({ request, sameOrigin }) =>
              sameOrigin &&
              ['style', 'script', 'worker', 'image', 'font'].includes(
                request.destination
              ),
            handler: 'CacheFirst',
            options: {
              cacheName: 'homefit30-static-assets-v1',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
            },
          },
          {
            // Network-First for document navigations with offline app shell fallback
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'homefit30-pages-v1',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 25,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            // Cache-First for Google Fonts stylesheets & font files if loaded
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'homefit30-fonts-v1',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: 'module',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
  },
});
