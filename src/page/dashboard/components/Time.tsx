import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Popover } from "antd";
import ShowTime from "@/page/dashboard/components/ShowTime";
import { getPrevMonthEndDay } from "@/utils";

function getSteps(step: any, direction: string) {
  let arr: [] = [];
  console.log(1, step, direction);
  return arr;
}

function Backlog() {
  const [state, setState] = useState<any>();

  const handleDateFormat = () => {
    const prevMonthDay = Number(getPrevMonthEndDay());
    const curDate = dayjs().format("YYYY-MM-DD");
    const startData = dayjs(curDate).startOf("month").format("YYYY-MM-DD");
    const endData = dayjs(curDate).endOf("month").format("YYYY-MM-DD");
    const weekStartDay = dayjs(startData).day();
    const weekEndDay = dayjs(endData).day();
    getSteps(weekStartDay, "pos");
    console.log("weekStartDay", weekStartDay, weekEndDay);
    return {
      startData,
      endData,
      weekEndDay,
      weekStartDay,
      prevMonthDay,
    };
  };

  useEffect(() => {
    const days = [];
    const date = handleDateFormat();
    let count = Number(date.endData.split("-").at(-1));
    do {
      days.push(count);
      count--;
    } while (count);
    console.log(days);
    setState([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
    ]);
  }, []);

  const handleMouseEnter = (e: any) => {
    console.log("e", e);
  };
  return (
    <div className="backlog flex-1">
      <div>待办事项</div>
      <div>
        {state?.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            {item.map((itemA: any, i: number) => (
              <Popover key={i} content={<ShowTime text={itemA} />}>
                <div
                  onMouseEnter={handleMouseEnter}
                  className="m-1 h-12 flex-1 flex items-center justify-center bg-sky-500 rounded"
                >
                  <div>{itemA}</div>
                </div>
              </Popover>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Time() {
  return (
    <div className="flex mb-4">
      <div className="flex-1">今天是{dayjs().format("YYYY-MM-DD")}号</div>
      <Backlog></Backlog>
    </div>
  );
}
