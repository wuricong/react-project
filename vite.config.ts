import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: { "@": "/src" },
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  css: {
    preprocessorOptions: {
      math: "always",
    },
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
