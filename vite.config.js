import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': isProd
          ? 'https://store.neverlandstudio.my.id'
          : 'http://localhost:6000',
      },
    },
    preview: {
      proxy: {
        '/api': 'https://store.neverlandstudio.my.id',
      },
    },
  };
});
