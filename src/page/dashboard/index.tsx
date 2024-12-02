import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import DemoBar from "./components/Bar";
import { HostInfo } from "./components/HostInfo";
import { requestApi } from "@/service";
import Time from "./components/Time";
import DragSort from "@/page/dashboard/components/drag-sort.tsx";
import "./index.less";

const Page: React.FC = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // requestApi("/getInfoHost").then((res) => {
    //   console.log("res", res);
    // });
    setList([]);
  }, []);
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    colorField: "#9694FF",
  };

  return (
    <>
      <Time />
      <HostInfo list={list} />
      <div className="flex">
        <Line {...config} />
        <DemoBar />
      </div>
      <DragSort />
    </>
  );
};

export default Page;
