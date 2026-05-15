import { defineConfig } from "vite";
import path from "path";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [
    injectHTML({
      basePath: path.resolve(__dirname, "src"),
      debug: { logPath: true },
    }),
  ],
});
