import { Button, Input } from "antd";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Counter from "../../features/counter/Counter";
import RegVerify from "@/page/throttle/component/reg-verify.tsx";

const list = [
  "title1",
  "title2",
  "title3",
  "title4",
  "title5",
  "title6",
  "title6",
  "title7",
];

function TimeCount(props: any) {
  console.log("props", props);
  const { timeCount = 60, title = "开始计时" } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const [second, setSecond] = useState(timeCount);

  const handleTimeing = () => {
    setIsDisabled(true);
    const timer = setInterval(() => {
      setSecond((val: any) => {
        if (val <= 1) {
          setIsDisabled(false);
          setSecond(timeCount);
          clearInterval(timer);
        }
        return val - 1;
      });
    }, 1000);
  };
  return (
    <>
      <Button disabled={isDisabled} type="primary" onClick={handleTimeing}>
        {isDisabled ? second : title}
      </Button>
    </>
  );
}

function Throttle() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [second, setSecond] = useState(60);
  useEffect(() => {
    return () => {
      console.log("页面离开");
    };
  }, []);
  // useLayoutEffect(() => {
  //   console.log(111);
  // }, []);
  const [searchList, setSearchList] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [count, setCount] = useState(1);
  let timer: any = 0;
  const handleSearch = (e: any) => {
    setCount(count + 1);
    const { value } = e.target;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSearchList(() => list.filter((item) => item.includes(value)));
      timer = 0;
    }, 500);
  };

  useEffect(() => {
    if (second < 0) {
      setIsDisabled(false);
      setSecond(60);
    }
  }, [second]);

  const handleTimeing = () => {
    setIsDisabled(true);
    const timer = setInterval(() => {
      setSecond((val) => {
        if (val === 0) {
          clearInterval(timer);
        }
        return val - 1;
      });
    }, 1000);
  };
  return (
    <>
      <div>{count}</div>
      <Counter />
      <Input
        ref={inputRef}
        onInput={handleSearch}
        placeholder="请输入搜索字段"
      />
      {searchList.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <div className="mt-2">
        <div>倒计时</div>
        <Button
          className="mr-2"
          disabled={isDisabled}
          type="primary"
          onClick={handleTimeing}
        >
          {isDisabled ? second : "开始记时"}
        </Button>
        <TimeCount timeCount={5} />
        <RegVerify />
      </div>
    </>
  );
}

export default Throttle;
