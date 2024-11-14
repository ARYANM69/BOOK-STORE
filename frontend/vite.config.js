import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/books': 'http://localhost:5555', // Backend API base URL
    },
  },
});

