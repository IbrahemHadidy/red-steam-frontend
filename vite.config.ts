import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  resolve: {
    alias: {
      src: '/src',
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
