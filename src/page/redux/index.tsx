import { Select, Button } from "antd";
import { useState } from "react";
import RemoteSearchSelect from "../../components/remote-search-select";
import "./index.less";
import Card from "@/page/redux/components/card.tsx";

function Redux() {
  return (
    <>
      <Count />
      <Card />
    </>
  );
}

function Count() {
  const [sum, setSum] = useState<number>(0);
  const [value, setValue] = useState(1);
  const options = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];
  const handleChange = (val: number) => {
    setValue(val);
  };

  const handleAdd = (val: string) => {
    switch (val) {
      case "加":
        setSum((c) => {
          console.log("c", c);
          return value + sum;
        });
        break;
      case "减":
        setSum(() => value - sum);
        break;
      case "乘":
        setSum(() => value * sum);
        break;
      case "除":
        setSum(() => value / sum);
    }
  };
  return (
    <div className="redux-operation">
      <span>当前值：</span>
      <span className="mx-2">{sum}</span>
      <Select
        defaultValue={value}
        style={{ width: 120 }}
        onChange={handleChange}
        options={options}
      />
      <Button onClick={() => handleAdd("加")}>加</Button>
      <Button onClick={() => handleAdd("减")}>减</Button>
      <Button onClick={() => handleAdd("乘")}>乘</Button>
      <Button onClick={() => handleAdd("除")}>除</Button>
      <RemoteSearchSelect />
    </div>
  );
}

export default Redux;
