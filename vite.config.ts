import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// @ts-ignore
import { fileURLToPath } from "url";
// @ts-ignore
import path from "path";
import { visualizer } from "rollup-plugin-visualizer"; //打包分析工具

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // esModule 获取文件绝对路径
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isGithub = mode === "github";
  console.log("env", env);
  // const viteEnv = handleEnv(env);
  // const { VITE_SERVER_PORT, VITE_PROXY } = viteEnv;
  return {
    base: isGithub ? " /react-project/" : "/",
    resolve: {
      alias: { "@": "/src" },
    },
    plugins: [react(), visualizer()],
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
  };
});
