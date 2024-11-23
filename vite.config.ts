import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import path from "path";

console.log(11111, process.env, process.env.NODE_ENV);
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // esModule 获取文件绝对路径
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "development" ? "./" : " /react-project/",
  resolve: {
    alias: { "@": "/src" },
  },
  plugins: [react()],
  server: {
    open: true,
    host: "0.0.0.0",
  },
  css: {
    preprocessorOptions: {
      math: "always",
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, "src/styles/mixin.less")}";`,
      },
    },
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    // outDir: "react-project",
    // assetsDir: "react-project/assets",
    sourcemap: true,
  },
});
