import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: projectRoot,
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: '/login'
  },
  preview: { host: '0.0.0.0' },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
