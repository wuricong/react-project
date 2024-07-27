import { Button } from "antd";
import Dialog from "../../components/dialog";
import MyComponent from "../../components/class";
import { useState } from "react";
import "./index.less";
import http from "@/service";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const handleDialogOpen = () => {
    setVisible(true);
  };

  const handleDialogClose = () => {
    setVisible(false);
  };

  const handleThrottle = () => {
    console.log(11);
  };

  const handleRequest = () => {
    http.get("/test").then((res) => {
      console.log("res", res);
    });
  };
  return (
    <div className="home">
      <Button type="primary" onClick={handleDialogOpen}>
        打开弹窗
      </Button>
      <Button type="primary" onClick={handleDialogClose}>
        关闭弹窗
      </Button>
      <Button type="primary" onClick={handleThrottle}>
        节流模式
      </Button>
      <Button type="primary" onClick={handleRequest}>
        测试请求
      </Button>
      <Dialog handleDialogClose={handleDialogClose} visible={visible} />
      <MyComponent />
    </div>
  );
}
