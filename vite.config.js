import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pages = process.env.GITHUB_PAGES === "1"

export default defineConfig({
  base: pages ? "/dating-a-developer/" : "/",
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
})
