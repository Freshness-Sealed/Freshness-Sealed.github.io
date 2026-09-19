import path from 'node:path'
import { copyFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

// GitHub Pages serves 404.html for unknown paths. Copying index.html there lets
// react-router handle deep links like /publications on a hard refresh.
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      copyFileSync(
        path.resolve(import.meta.dirname, 'dist/index.html'),
        path.resolve(import.meta.dirname, 'dist/404.html'),
      )
    },
  }
}

// Set BASE_PATH in CI to "/<repo-name>/" for a project site; leave unset for
// a user site (username.github.io) or local dev.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
