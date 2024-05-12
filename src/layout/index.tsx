import { useState } from "react";
import { Button } from "antd";

const Layout = () => {
  let [layer, setLayer] = useState({ value: 1, type: "title" });
  const handleChangeState = () => {
    setTimeout(() => {
      setLayer(() => ({ ...layer, type: "name" }));
    });
  };
  return (
    <>
      <div>{layer.type}</div>
      <Button onClick={handleChangeState}>异步改变状态</Button>
      <div style={{ color: "white" }}>Count:{layer.type}</div>
    </>
  );
};

export default Layout;
