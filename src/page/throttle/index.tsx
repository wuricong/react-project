import { Input } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import Counter from "../../features/counter/Counter";

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

function Throttle() {
  useLayoutEffect(() => {
    console.log(111);
  }, []);
  const [searchList, setSearchList] = useState<string[]>([]);
  const inputRef = useRef(null);
  const [count, setCount] = useState(1);
  let timer = 0;
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
    </>
  );
}

export default Throttle;
