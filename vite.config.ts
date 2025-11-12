import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@modules': path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Dev proxy to avoid CORS issues when calling the gym backend in development.
    // Routes starting with /api will be forwarded to the target host used in Postman.
    proxy: {
      '/api': {
        target: 'https://forkgymnasiumservice-e5g7f5fscqbgb0ff.canadacentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  }
});
