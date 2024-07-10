import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your API server URL
        secure: false,
        changeOrigin: true, // Set this to true
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["@react-pdf/renderer"],
  },
  build: {
    outDir: "dist",
  },
  rollupOptions: {
    input: "client/src/main.js",
  },
});
