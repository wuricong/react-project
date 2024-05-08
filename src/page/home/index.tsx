import { Button } from "antd";
import Dialog from "../../components/dialog";
import MyComponent from "../../components/class";
import { useState } from "react";

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
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button type="primary" onClick={handleDialogOpen}>
        打开弹窗
      </Button>
      <Button type="primary" onClick={handleDialogClose}>
        关闭弹窗
      </Button>
      <Button type="primary" onClick={handleThrottle}>
        节流模式
      </Button>
      <Dialog handleDialogClose={handleDialogClose} visible={visible} />
      <MyComponent />
    </>
  );
}
