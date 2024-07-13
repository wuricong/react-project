// 导入创建路由的函数
// import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/index";
import Home from "../page/home/index";
import Throttle from "../page/throttle";
import Redux from "../page/redux";
import Canvas from "../page/canvas";
import SortList from "../page/sort-list";
import Login from "../page/login";
import NotFound from "../page/404";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/page",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "throttle",
        element: <Throttle />,
      },
      {
        path: "redux",
        element: <Redux />,
      },
      {
        path: "canvas",
        element: <Canvas />,
      },
      {
        path: "SortList",
        element: <SortList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
