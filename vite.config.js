import { defineConfig } from "vite";
import path from "path";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        // Додайте явно ваш moviePage.html
        "pages/moviePage/moviePage": path.resolve(
          __dirname,
          "src/pages/moviePage/moviePage.html",
        ),
      },
    },
  },
  plugins: [
    injectHTML({
      basePath: path.resolve(__dirname, "src"),
      debug: { logPath: true },
    }),
  ],
});
