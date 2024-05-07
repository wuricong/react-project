import { Input } from "antd";
import { useRef, useState } from "react";
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
  const [searchList, setSearchList] = useState<string[]>([]);
  const inputRef = useRef(null);
  let timer = 0;
  const handleSearch = (e: any) => {
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
      <Input
        ref={inputRef}
        onInput={handleSearch}
        placeholder="请输入搜索字段"
      />
      {searchList.map((item) => (
        <div>{item}</div>
      ))}
    </>
  );
}

export default Throttle;
