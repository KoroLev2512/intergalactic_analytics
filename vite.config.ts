import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/report': 'http://localhost:3000',
      '/aggregate': 'http://localhost:3000',
    }
  }
});
