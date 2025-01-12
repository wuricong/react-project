import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import path from "path";

// console.log(11111, process.env, process.env.NODE_ENV);
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // esModule 获取文件绝对路径
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log("mode", mode, import.meta);
  return {
    resolve: {
      alias: { "@": "/src" },
    },
    plugins: [react()],
    server: {
      open: true,
      host: "0.0.0.0", // 监听所有地址 （局域网和公网地址）
      port: 5175, //端口号
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
  };
});
