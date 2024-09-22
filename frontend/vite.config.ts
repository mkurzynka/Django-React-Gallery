import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: resolve("src/utils"),
      features: resolve("src/features"),
      assets: resolve("src/assets"),
    },
  },
});
