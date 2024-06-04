// 导入创建路由的函数
import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/index";
import Home from "../page/home/index";
import Throttle from "../page/throttle";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
    },
    {
        path: "/home",
        Component: Home,
    },
    {
        path: '/throttle',
        Component: Throttle,
    }
]);

export default router;
