import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboat: resolve(__dirname, "src/skämtsida/aboat.html"),
        farkostprincipen: resolve(
          __dirname,
          "src/skämtsida/farkostprincipen.html"
        ),
      },
    },
  },
});