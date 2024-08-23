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
import ResumeTemplate from "../page/resume";
import Dashboard from "../page/dashboard/index";
import Table from "../page/components/table/index";

console.log("L", Login);

// function handleRouterPath() {
//   const pages = import.meta.glob([
//     ".././page/**/*.tsx",
//     "!.././page/**/components/**",
//     ".././page/components/*.tsx",
//   ]);
//   console.log("pages222", pages);
// }
//
// handleRouterPath();

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
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
      {
        path: "components",
        children: [{ path: "list", element: <Table /> }],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "resume",
    element: <ResumeTemplate />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
