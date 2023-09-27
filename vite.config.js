import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        "my-element": "src/my-element.ts",
      },
      formats: ["es"],
    },
  },
});
