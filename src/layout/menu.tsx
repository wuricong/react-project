import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    icon: <UploadOutlined />,
    label: "首页",
    path: "/dashboard",
  },
  {
    key: "2",
    icon: <UploadOutlined />,
    label: "nav 1",
    path: "/throttle",
  },
  {
    key: "3",
    icon: <VideoCameraOutlined />,
    label: "nav 2",
    path: "/home",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "nav 3",
    path: "/redux",
  },
  {
    key: "5",
    icon: <UploadOutlined />,
    label: "nav 4",
    path: "/canvas",
  },
  {
    key: "6",
    icon: <UploadOutlined />,
    label: "上传相关",
    path: "/SortList",
  },
  {
    key: "7",
    icon: <UploadOutlined />,
    label: "组件",
    path: "",
    children: [
      {
        key: "7-1",
        label: "列表",
        path: "/components/list",
      },
      {
        key: "7-2",
        label: "弹窗",
        path: "/components/dialog",
      },
      {
        key: "7-3",
        label: "表格",
        path: "/components/table",
      },
      {
        key: "7-4",
        label: "富文本",
        path: "/components/rich",
      },
    ],
  },
];
