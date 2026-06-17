import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://samramseyer.github.io/RooVille/
export default defineConfig({
  base: "/RooVille/",
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "app.html"),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
});
