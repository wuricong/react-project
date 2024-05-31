// 导入创建路由的函数
import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/index";
import Home from "../page/home/index";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
    },
    {
        path: "/home",
        Component: Home,
    },
]);

export default router;
