/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [react()],
  base: '/oms/',
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 80,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
    },
}});
