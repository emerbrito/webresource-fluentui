import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Disable code splitting to prevent chunks
        entryFileNames: 'app.js', // Set the main JavaScript file name
        assetFileNames: '[name].[ext]', // Ensure predictable CSS and asset file names
      },
    },
  },    
})
