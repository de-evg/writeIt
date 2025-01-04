import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3005",
    },
  },
  build: {
    outDir: "build",
    sourcemap: true,
    copyPublicDir: true,
    minify: true,
  },
});
