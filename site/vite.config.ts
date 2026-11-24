import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the root of aurenix.pages.dev (Cloudflare Pages), so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
