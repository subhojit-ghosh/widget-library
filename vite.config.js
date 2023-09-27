import { defineConfig } from "vite";

export default defineConfig({
  base: "https://subhojit-ghosh.github.io/widget-library",
  build: {
    lib: {
      entry: {
        "my-element": "src/my-element.ts",
      },
      formats: ["es"],
    },
  },
});
