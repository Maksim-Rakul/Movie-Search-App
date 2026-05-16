import { defineConfig } from "vite";
import path from "path";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  publicDir: path.resolve(__dirname, "public"),
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        "moviePage/moviePage": path.resolve(
          __dirname,
          "src/pages/moviePage/moviePage.html",
        ),
        "serialPage/serialPage": path.resolve(
          __dirname,
          "src/pages/serialPage/serialPage.html",
        ),
        "actor/actor": path.resolve(__dirname, "src/pages/actor/actor.html"),
        "movies/movies": path.resolve(
          __dirname,
          "src/pages/movies/movies.html",
        ),
        "serial/serials": path.resolve(
          __dirname,
          "src/pages/serial/serials.html",
        ),
        "trends/trends": path.resolve(
          __dirname,
          "src/pages/trends/trends.html",
        ),
      },
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  plugins: [
    injectHTML({
      basePath: path.resolve(__dirname, "src"),
      debug: { logPath: true },
    }),
  ],
  server: {
    historyApiFallback: true,
  },
});
