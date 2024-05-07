import { useState } from "react";
import { Button } from "antd";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Dialog from "./components/dialog";
import MyComponent from "./components/class";
import Throttle from "./throttle/index.tsx";
function App() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  console.log("dialog", Dialog);
  const handleCount = () => {
    setCount((count) => count + 1);
  };

  const handleDialogOpen = () => {
    setVisible(true);
    console.log(1);
  };

  const handleDialogClose = () => {
    setVisible(false);
  };

  const handleThrottle = () => {
    console.log(11);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card title">
        <button onClick={handleCount}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
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
      <Throttle />
      <MyComponent />
    </>
  );
}

export default App;
