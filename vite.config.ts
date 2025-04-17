import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/stratum/', // Needed for GitHub Pages to serve from subdirectory
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
