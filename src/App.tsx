import "./App.css";
import React, {useState} from 'react';
import {routes} from "./router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import {useRoutes, useNavigate} from "react-router-dom";

const App: React.FC = () => {
  // let {slot} = prop
  // return (
  //     <>
  //         <div className="box">{slot}</div>
  //     </>)
  const [collapsed, setCollapsed] = useState(false);
  const {Header, Sider, Content} = Layout;
  const element = useRoutes(routes)
  const navigate = useNavigate()
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  const items = [
    {
      key: '1',
      icon: <UserOutlined/>,
      label: 'nav 1',
      path: '/throttle'
    },
    {
      key: '2',
      icon: <VideoCameraOutlined/>,
      label: 'nav 2',
      path: '/home'
    },
    {
      key: '3',
      icon: <UploadOutlined/>,
      label: 'nav 3',
      path: '/home'
    },
  ]
  const handleMenuCLick = () => {
    navigate('/home')
  }
  return (
    <Layout style={{height: '100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical"/>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleMenuCLick}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {element}
          {/*<RouterProvider router={router}/>*/}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
