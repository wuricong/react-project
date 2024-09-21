import { Button, Modal, Divider } from "antd";
import { useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Dialog from "../../components/dialog";
import MyComponent from "../../components/class";
import "./index.less";
import Context from "@/page/home/components/Context";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

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
    // http.get("/test").then((res) => {
    //   console.log("res", res);
    // });
  };

  const handleConfirm = () => {
    modal.confirm({
      title: "confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Bla bla ...",
      okText: "确认",
      cancelText: "取消",
    });
  };
  return (
    <>
      {contextHolder}
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

        <Button type="primary" onClick={handleConfirm}>
          函数式弹窗
        </Button>
        <Divider />
        <MyComponent />

        <div className="text-violet-600 mt-4">useContext example</div>
        <Context />
        <div className="text-violet-600 mt-4">useCallback example</div>
      </div>
    </>
  );
}
