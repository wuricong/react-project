// 导入创建路由的函数
// import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/index";
import Home from "../page/home/index";
import Throttle from "../page/throttle";
import Redux from "../page/redux";
import Canvas from "../page/canvas";
import SortList from "../page/sort-list";
import Login from "../page/login";
//暂时不用
// const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Layout,
//   },
//   {
//     path: "/home",
//     Component: Home,
//   },
//   {
//     path: '/throttle',
//     Component: Throttle,
//   },
//   {
//     path: '/redux',
//     Component: Redux
//   }
// ]);

export const routes = [
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/throttle",
    element: <Throttle />,
  },
  {
    path: "/redux",
    element: <Redux />,
  },
  {
    path: "/canvas",
    element: <Canvas />,
  },
  {
    path: "/SortList",
    element: <SortList />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
];

// export default router;
