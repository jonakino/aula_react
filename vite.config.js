import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { apiPostagem } from './Exemplo07/api-servidor.js';

export default defineConfig({
  plugins: [apiPostagem()],
  esbuild: {
    jsx: 'automatic',
  },
  server: {
    open: '/Exemplo01/',
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/aula-instagram.sqlite*'],
    },
  },
  build: {
    rollupOptions: {
      input: [
        fileURLToPath(new URL('./Exemplo00/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo01/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo02/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo03/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo04/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo05/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo06Reducer/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo07/index.html', import.meta.url)),
        fileURLToPath(new URL('./Exemplo01History/index.html', import.meta.url)),
      ],
    },
  },
});
