import { useState, useCallback } from "react";
import React from "react";

let Button: any = ({ count, onClickButton, children }: any) => {
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
      <div>{count}</div>
    </>
  );
};

Button = React.memo(Button);

function Component2() {
  console.log("组件渲染");
  return <div>我是测试渲染的组件</div>;
}

//useCallback的使用
function Component1() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const handleClickButton1 = () => {
    setCount1(count1 + 1);
  };

  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1);
  }, [count2]);

  return (
    <div>
      <div>
        <Button onClickButton={handleClickButton1}>Button1</Button>
      </div>
      <div>
        <Button count={count2} onClickButton={handleClickButton2}>
          Button2
        </Button>
      </div>
      <div>
        <Button
          onClickButton={() => {
            setCount3(count3 + 1);
          }}
        >
          Button3
        </Button>
      </div>
    </div>
  );
}

export default function Canvas() {
  return (
    <div>
      <Component2 />
      <Component1 />
    </div>
  );
}
