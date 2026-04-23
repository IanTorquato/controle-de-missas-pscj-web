import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: false
    },
    preview: {
      open: false
    },
    build: {
      outDir: 'build'
    },
    define: {
      'process.env': JSON.stringify(env)
    }
  }
})
