import React, { useEffect, useMemo, useState } from "react";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Modal, Breadcrumb, Tabs } from "antd";
import { useNavigate, Outlet, useLocation, useOutlet } from "react-router-dom";
import imgUrl from "@/assets/picture.jpeg";
import "./index.less";
import { MenuItems } from "./menu";
import { SettingDropdown } from "./components/dropdown";
import { Pifu } from "@/assets/svg";
import Dark from "@/assets/svg/Dark";
import White from "@/assets/svg/White";
import { useDispatch, useSelector } from "react-redux";
import { changeModel } from "@/store/viewModel";
import { changeActive } from "@/store/tabs.ts";
import { changeSelectMenu, changeTags } from "@/store/userInfo.ts";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";

const Layer: React.FC = () => {
  const { pathname, search } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const { Header, Sider, Content } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentSelectItem, setCurrentSelectItem] = useState<any>({});
  const model = useSelector((state: any) => state.viewModel.status);
  const { selectMenu = [], tags } = useSelector((state: any) => state.userInfo); //面包屑
  const { activeKey } = useSelector((state: any) => state.tabs);
  const aliveRef = useKeepAliveRef();
  const outlet = useOutlet();
  useEffect(() => {
    const token = sessionStorage.getItem("password");
    if (!token) {
      navigate("login");
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /**
   * 用于区分不同页面以进行缓存
   */
  const cacheKey = useMemo(() => {
    console.log("pathname + search", pathname + search);
    return pathname + search;
  }, [pathname, search]);

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
    console.log("historyItem", currentItem, historyItem);
    // 添加新tab
    if (!result) {
      dispatch(changeTags([...tags, currentItem]));
    }
    // 防止点击相同标签时重复刷新
    if (currentSelectItem && currentSelectItem.key !== currentItem.key) {
      dispatch(changeSelectMenu(historyItem));
      dispatch(changeActive(currentItem.key));
      navigate(currentItem.path);
      setCurrentSelectItem(currentItem);
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
    return selectMenu.map((menu: any, index: any) => {
      if (index + 1 === selectMenu.length && selectMenu.length > 1) {
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

  const handleTagClick = (key: string) => {
    const { historyItem } = getCurrentPath(MenuItems, key);
    const path = tags.find((tag: any) => tag.key === key)?.path;
    dispatch(changeSelectMenu(historyItem));
    dispatch(changeActive(key));
    if (path) {
      navigate(path);
    }
  };

  const handleRemove = (key: any) => {
    if (activeKey === key) {
      const index = tags.findIndex((tag: any) => tag.key === key) - 1;
      dispatch(changeActive(tags[index]?.key || "1"));
      const { historyItem } = getCurrentPath(MenuItems, tags[index]?.key);
      dispatch(changeSelectMenu(historyItem));
      navigate(tags[index]?.path);
    }
    dispatch(changeTags(tags.filter((tag: any) => tag.key !== key)));
  };

  const headerStyle: React.CSSProperties = {
    padding: 0,
    transition: "all .3s",
    backgroundColor: `${model === "dark" ? "#0d1729" : "white"}`,
    height: 46,
  };

  //深色模式切换
  const handleChangeModel = () => {
    const str = model === "dark" ? "white" : "dark";
    dispatch(changeModel(str));
    if (model === "dark") {
      document.body.className = "theme-light";
    } else {
      document.body.className = "theme-dark";
    }
  };
  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        className="h-full overflow-y-scroll relative"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <img className="demo-logo-vertical" src={imgUrl} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={activeKey}
          onClick={handleMenuCLick}
          items={MenuItems}
        />
        <DoubleLeftOutlined
          style={{
            transform: collapsed
              ? "translateY(-50%) rotateY(180deg)"
              : "translateY(-50%) rotateY(0deg)",
          }}
          className="btn-size absolute"
          onClick={() => setCollapsed(!collapsed)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            ...headerStyle,
          }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center ml-2">
            <Breadcrumb style={{ color: "black" }} items={handleBreadcrumb()} />
          </div>
          <div className="flex">
            <div onClick={handleChangeModel} className="mr-6 relative">
              <Dark model={model} />
              <White model={model} />
            </div>
            <Pifu />
            <SettingDropdown handleCloseLogin={handleCloseLogin} />
          </div>
        </Header>
        <Tabs
          size={"small"}
          hideAdd
          type="editable-card"
          onTabClick={handleTagClick}
          onEdit={handleRemove}
          className="mx-1 cursor-pointer"
          items={tags}
          activeKey={activeKey}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <KeepAlive
            transition
            aliveRef={aliveRef}
            activeCacheKey={cacheKey}
            max={18}
          >
            {outlet}
          </KeepAlive>
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
