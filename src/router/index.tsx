// 导入创建路由的函数
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
  },
]);

export default router;
