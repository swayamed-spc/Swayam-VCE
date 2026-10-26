import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In development the site calls the API through this proxy (/api → the backend on port 4000), so the browser treats
// them as one origin and the httpOnly login cookie just works. In production set VITE_API_URL, or serve both from
// one domain.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api': { target: process.env.API_PROXY_TARGET || 'http://localhost:4000', changeOrigin: false } },
  },
})
