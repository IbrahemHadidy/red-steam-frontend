import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';
import path from 'path';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'pwa-ico.png'],
  manifest: {
    name: 'Red Steam',
    short_name: 'Red Steam',
    description: 'A steam clone website clone built for educational purposes.',
    icons: [
      {
        src: 'images/pwa-ico.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'images/pwa-ico.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'images/pwa-ico.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: 'images/pwa-ico.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171a21',
    background_color: '#0b141b',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  server: {
    port: 3000,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'private.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt')),
    // },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      pages: '/src/pages',
      services: '/src/services',
      tools: '/src/tools',
      hooks: '/src/hooks',
      contexts: '/src/contexts',
      utils: '/src/utils',
      types: '/src/types',
      styles: '/src/styles',
    },
  },
});