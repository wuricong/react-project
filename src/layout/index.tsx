import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const Layer: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;
  const pages = import.meta.glob("./page/**/*.tsx");
  console.log("pages", pages);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("password");
    if (!token) {
      navigate("/");
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
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
      label: "nav 5",
      path: "/page/SortList",
    },
  ];

  function handleDebugger() {
    let startTime = performance.now();
    // 设置断点
    // debugger;
    let endTime = performance.now();
    // 设置一个阈值，例如100毫秒
    if (endTime - startTime > 100) {
      window.location.href = "about:blank";
    }
  }

  const handleMenuCLick = (val: any) => {
    handleDebugger();
    const result = items.find((item) => item.key === val.key);
    if (result) {
      navigate(result.path);
    }
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuCLick}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layer;
