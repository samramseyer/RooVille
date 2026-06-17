import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: /RooVille/ — local dev: /
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    base: process.env.VITE_BASE || (isBuild ? "/RooVille/" : "/"),
    plugins: [react()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    ...(isBuild
      ? {
          build: {
            rollupOptions: {
              input: {
                main: resolve(__dirname, "app.html"),
              },
            },
          },
        }
      : {}),
    server: {
      port: 5173,
      strictPort: false,
      open: true,
    },
  };
});
