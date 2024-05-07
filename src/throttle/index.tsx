import { Input } from "antd";
import { useState } from "react";
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
  const handleSearch = (e: any) => {
    console.log(e);
    setSearchList(() => list.filter((item) => item === "title1"));
  };
  return (
    <>
      <Input onInput={handleSearch} placeholder="请输入搜索字段" />
      {searchList.map((item) => (
        <div>{item}</div>
      ))}
    </>
  );
}

export default Throttle;
