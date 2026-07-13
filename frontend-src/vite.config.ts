import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir: resolve(root, "../custom_components/benni_media/frontend/app"),
    emptyOutDir: true,
    lib: {
      entry: resolve(root, "src/main.tsx"),
      formats: ["es"],
      fileName: () => "main.js"
    },
    cssCodeSplit: false,
    rollupOptions: { output: { assetFileNames: "[name][extname]" } }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [resolve(root, "src/test-setup.ts")]
  }
});
