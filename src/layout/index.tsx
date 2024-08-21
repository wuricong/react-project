import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Modal, Breadcrumb, Tag } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import imgUrl from "@/assets/picture.jpeg";
import "./index.less";
import { MenuItems } from "./menu";
import { headerStyle, tagStyle } from "./style";

const Layer: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const { Header, Sider, Content } = Layout;
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState([{ label: "首页" }]);
  const [tags, setTags]: any = useState([MenuItems[0]]);
  useEffect(() => {
    const token = sessionStorage.getItem("password");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // @ts-ignore
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

  function getCurrentPath(menus: any, kl: string) {
    const len = kl.split("-");
    const historyItem: any = [];

    //利用递归进行深度寻找菜单
    function deepFind(menus: any, i: number = 0): any {
      if (len.length - 1 === i) {
        const currentItem = menus.find((menu: any) => menu.key === kl);
        historyItem.push(currentItem);
        return { currentItem, historyItem };
      }
      const parent = menus.find((menu: any) => menu.key === len[i]);
      historyItem.push(parent);
      if (parent.children) {
        return deepFind(parent.children, ++i);
      }
    }

    return deepFind(menus);
  }

  const handleMenuCLick = (val: any) => {
    const { currentItem, historyItem } = getCurrentPath(MenuItems, val.key);
    const result = tags.find((tag: any) => tag.key === currentItem.key);
    if (result) return;
    console.log("historyItem", historyItem, currentItem);
    setTags([...tags, currentItem]);
    setMenuName(historyItem);
    if (currentItem) {
      navigate(currentItem.path);
    }
  };

  const handleCloseLogin = () => {
    setIsModelOpen(true);
  };

  const handleModelClose = () => {
    navigate("/login");
    sessionStorage.setItem("password", "");
    setIsModelOpen(false);
  };

  const handleBreadcrumb = () => {
    return menuName.map((menu: any, index) => {
      if (index + 1 === menuName.length && menuName.length > 1) {
        return {
          title: (
            <a onClick={() => navigate(menu.path)} href="">
              {menu.label}
            </a>
          ),
        };
      }
      return { title: menu.label };
    });
  };

  const preventDefault = (e: any, key: any) => {
    e.preventDefault();
    setTags(tags.filter((tag: any) => tag.key !== key));
  };

  const handleTagClick = (path: string) => {
    navigate(path);
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img className="demo-logo-vertical" src={imgUrl} alt="" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuCLick}
          items={MenuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer, ...headerStyle }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center">
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
            <Breadcrumb items={handleBreadcrumb()} />
          </div>
          <Button className="mr-4" type="primary" onClick={handleCloseLogin}>
            退出登录
          </Button>
        </Header>
        {tags.length ? (
          <div style={tagStyle}>
            {tags.map((tag: any) => (
              <Tag
                onClick={() => handleTagClick(tag.path)}
                className="mx-1 cursor-pointer"
                key={tag.key}
                closeIcon
                onClose={(e) => preventDefault(e, tag.key)}
              >
                {tag?.label}
              </Tag>
            ))}
          </div>
        ) : null}
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
      <Modal
        title="退出登录"
        open={isModelOpen}
        onOk={handleModelClose}
        onCancel={() => setIsModelOpen(false)}
      >
        确定要退出登录吗？
      </Modal>
    </Layout>
  );
};

export default Layer;
