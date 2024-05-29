// 导入创建路由的函数
import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/index";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
    },
    {
        path: "/home",
        Component: App,
    },
]);

export default router;
