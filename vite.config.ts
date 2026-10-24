import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'three-stdlib'],
          'react-three-vendor': ['@react-three/fiber', '@react-three/drei'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
});
