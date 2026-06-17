import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const buildId =
  process.env.GITHUB_SHA?.slice(0, 12) ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function appVersionPlugin(version: string): Plugin {
  return {
    name: "rooville-app-version",
    config() {
      return {
        define: {
          "import.meta.env.VITE_BUILD_ID": JSON.stringify(version),
        },
      };
    },
    closeBundle() {
      writeFileSync(
        resolve(__dirname, "dist/version.json"),
        `${JSON.stringify({ version })}\n`,
      );
    },
  };
}

// GitHub Pages: /RooVille/ — local dev: /
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    base: process.env.VITE_BASE || (isBuild ? "/RooVille/" : "/"),
    plugins: [react(), ...(isBuild ? [appVersionPlugin(buildId)] : [])],
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
