import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    icon: <UploadOutlined />,
    label: "nav 1",
    path: "/page/throttle",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "nav 2",
    path: "/page/home",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "nav 3",
    path: "/page/redux",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "nav 4",
    path: "/page/canvas",
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: "上传相关",
    path: "/page/SortList",
  },
  {
    key: "6",
    icon: <UploadOutlined />,
    label: "组件",
    path: "",
    children: [
      {
        key: "6-1",
        label: "列表",
        path: "/page/list",
      },
      {
        key: "6-2",
        label: "弹窗",
        path: "/page/dialog",
      },
      {
        key: "6-3",
        label: "表格",
        path: "/page/table",
      },
      {
        key: "6-4",
        label: "富文本",
        path: "/page/rich",
      },
    ],
  },
];
