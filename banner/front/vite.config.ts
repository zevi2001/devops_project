
/// <reference types="vitest" />
import { defineConfig,loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({command,mode})=>{
  // const env = loadEnv(mode, process.cwd(), "");
  return{
    plugins: [react()],
    base: '/banner/',
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
      setupFiles: "./src/tests/setup.ts",
    },
  }
});
