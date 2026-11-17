import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    open: '/Exemplo01/',
  },
  build: {
    rollupOptions: {
      input: [
        fileURLToPath(new URL('./Exemplo01/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo02/index.html', import.meta.url)),
      ],
    },
  },
});
