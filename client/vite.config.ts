import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./src"),
      "@map": path.resolve(__dirname, "../packages/map-library/src"),
      "@ui": path.resolve(__dirname, "../packages/ui/src"),
    },
  },
});
