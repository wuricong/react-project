// import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import Page from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import { App } from "antd";
import "./styles/font.css"; //引入字体文件
import "./index.css";
import "./assets/iconfont/iconfont.css";
import "./styles/theme.less";
import zhCN from "antd/locale/zh_CN";
// for date-picker i18n
import "dayjs/locale/zh-cn";

setTimeout(() => {
  console.log(
    "import.meta.env.VITE_BASIC_ROUTER_PATH",
    import.meta.env.VITE_BASIC_ROUTER_PATH,
  );
}, 1000);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/react-project">
    {/*<React.StrictMode>*/}
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#722ed1",
          borderRadius: 6,
        },
      }}
    >
      <App style={{ width: "100%", height: "100%" }}>
        <Provider store={store}>
          <Page />
        </Provider>
      </App>
    </ConfigProvider>
    {/*</React.StrictMode>*/}
  </BrowserRouter>,
);
