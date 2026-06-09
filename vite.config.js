import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true,
    port: 3001
  },
  build: {
    outDir: 'dist'
  }
})
