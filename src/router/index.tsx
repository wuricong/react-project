// 导入创建路由的函数
// import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index";
import Home from "../page/home/index";
import Throttle from "../page/throttle";
import Redux from "../page/redux";
import Canvas from "../page/canvas";
import SortList from "../page/upload-list";
import Login from "../page/login";
import NotFound from "../page/404";
import ResumeTemplate from "../page/resume";
import Dashboard from "../page/dashboard";
import Table from "../page/components/table";
import Dialog from "../page/components/dialog";
import Form from "@/page/components/form";
import List from "@/page/components/list";
import Rich from "@/page/components/rich";

function handleRouterPath() {
  const pages = import.meta.glob([
    ".././page/**/*.tsx",
    "!.././page/**/components/**",
    ".././page/components/*.tsx",
  ]);
  console.log("pages", pages);
}

handleRouterPath();

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
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
        path: "/upload-file",
        element: <SortList />,
      },
      {
        path: "/components",
        children: [
          { path: "list", element: <List /> },
          { path: "dialog", element: <Dialog /> },
          { path: "rich", element: <Rich /> },
          { path: "form", element: <Form /> },
          { path: "table", element: <Table /> },
        ],
      },
    ],
  },
  {
    path: "/resume",
    element: <ResumeTemplate />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
