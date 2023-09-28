import { defineConfig } from "vite";

export default defineConfig({
  base: "https://subhojit-ghosh.github.io/widget-library",
  build: {
    lib: {
      entry: {
        "carousel-element": "src/widgets/carousel-element.ts",
      },
      name: "[name]",
      fileName: (fmt, name) => name + ".js",
      formats: ["umd"],
    },
  },
});
