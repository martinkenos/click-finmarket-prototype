import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Base path is the repo name so that asset URLs work under
// https://<user>.github.io/<repo>/ when deployed to GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: '/click-finmarket-prototype/',
})
