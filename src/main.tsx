// import React from "react";
import { ConfigProvider } from "antd";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import "./styles/font.css"; //引入字体文件
import "./index.css";
import "./assets/iconfont/iconfont.css";
import "./styles/theme.less";

console.log("当前环境", import.meta.env.MODE);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter
    basename={import.meta.env.MODE === "development" ? "" : "/react-project"}
  >
    {/*<React.StrictMode>*/}
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#722ed1",
          borderRadius: 6,
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
    {/*</React.StrictMode>*/}
  </BrowserRouter>,
);
