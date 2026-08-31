import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'icons';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 5177,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'https://shopmodern-backend.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://shopmodern-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
});