<<<<<<< HEAD
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        results: resolve(__dirname, "results.html"),
      },
    },
  },
});
=======
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        results: resolve(__dirname, "results.html"),
      },
    },
  },
});
>>>>>>> 7814d0eb5a4ec241b17d574d5178c413d1e93077
