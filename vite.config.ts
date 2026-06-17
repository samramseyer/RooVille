import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const buildId =
  process.env.GITHUB_SHA?.slice(0, 12) ??
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function appVersionPlugin(version: string): Plugin {
  const base = process.env.VITE_BASE || "/RooVille/";

  return {
    name: "rooville-app-version",
    config() {
      return {
        define: {
          "import.meta.env.VITE_BUILD_ID": JSON.stringify(version),
        },
      };
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const js = Object.keys(ctx.bundle).find((key) =>
          /^assets\/main-.*\.js$/.test(key),
        );
        if (!js) return html;

        const css = Object.keys(ctx.bundle).find((key) =>
          /^assets\/main-.*\.css$/.test(key),
        );
        const basePrefix = base.endsWith("/") ? base : `${base}/`;
        const styleAttr = css ? ` data-style="${basePrefix}${css}"` : "";

        let output = html.replace(/<script type="module"[^>]*><\/script>\s*/i, "");
        output = output.replace(/<link rel="stylesheet"[^>]*>\s*/i, "");

        const inlineBuild = `    <script>window.__ROOVILLE_BUILD__=${JSON.stringify(version)};</script>\n`;
        const bootstrap = `    <script src="${basePrefix}update-check.js?v=${encodeURIComponent(version)}" data-build-id="${version}" data-entry="${basePrefix}${js}"${styleAttr}></script>\n`;
        return output.replace("</head>", `${inlineBuild}${bootstrap}  </head>`);
      },
    },
    closeBundle() {
      const distDir = resolve(__dirname, "dist");
      const js = readdirSync(resolve(distDir, "assets"))
        .find((file) => /^main-.*\.js$/.test(file));

      writeFileSync(
        resolve(distDir, "version.json"),
        `${JSON.stringify({ version, entry: js ?? null })}\n`,
      );

      const swTemplate = readFileSync(resolve(__dirname, "public/sw.js"), "utf8");
      const swSource = swTemplate.replace(
        /const CACHE_NAME = '[^']+'/,
        `const CACHE_NAME = 'rooville-${version}'`,
      );
      writeFileSync(resolve(distDir, "sw.js"), swSource);
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
