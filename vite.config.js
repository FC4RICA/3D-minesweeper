import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,      // expose to 0.0.0.0
    port: 5173,
  },
})