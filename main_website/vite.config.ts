import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/activity-tracker': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
      '/timesheet-app': {
        target: 'http://localhost:5175',
        changeOrigin: true,
      },
    },
  },
})
