import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    selfDestroying: true,
    includeAssets: ['favicon.svg', 'icons.svg', 'icon-192x192.png', 'icon-512x512.png'],
    manifest: false,
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,json,webmanifest}'],
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'external-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
          },
        },
      ],
    },
  })],
  server: {
    port: 5173,
    strictPort: true,
  },
})
