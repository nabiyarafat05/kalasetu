import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kala Setu',
        short_name: 'KalaSetu',
        description: 'AI-Powered Digital Platform & Two-Sided Marketplace for Indian Artisans',
        start_url: '/',
        display: 'standalone',
        background_color: '#FAF6F0',
        theme_color: '#C85A32',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});