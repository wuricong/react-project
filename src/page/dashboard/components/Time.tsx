import type { Dayjs } from "dayjs";
import { DateType } from "@/types/public.ts";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import ShowTime from "@/page/dashboard/components/ShowTime";
import { getDaysMonth, getPrevMonthEndDay } from "@/utils";

function Backlog() {
  const [state, setState] = useState<any>();
  const [curDate, setCurDate] = useState(dayjs().format("YYYY-MM-DD"));

  const handleDateFormat = (date: string = "") => {
    const _curDate = date ? date : curDate;
    const startData = dayjs(_curDate).startOf("month").format("YYYY-MM-DD"); //获取每月的一号
    const endData = dayjs(_curDate).endOf("month").format("YYYY-MM-DD"); //获取每月的月末号
    const weekStartDay = dayjs(startData).day(); // 获取星期几
    const weekEndDay = dayjs(endData).day();
    const prevMonthDays = dayjs(endData).add(-1, "month").daysInMonth(); // 获取上一个月的总天数
    return {
      startData,
      endData,
      weekEndDay,
      weekStartDay,
      prevMonthDays,
    };
  };

  const loadMonth = (d: any = null) => {
    const days: any = [];
    const date: any = handleDateFormat(d);
    let count = Number(date.endData?.split("-").at(-1));
    do {
      days.unshift(count);
      count--;
    } while (count);
    const prevMonthList = getDaysMonth(date.weekStartDay);
    const nextMonthList = getDaysMonth(date.weekEndDay);

    if (prevMonthList.length) {
      prevMonthList.forEach((item) => days.unshift(date.prevMonthDays - item));
    }

    if (nextMonthList.length) {
      for (let i = 1; i <= 7 - nextMonthList.length; i++) {
        days.push(i);
      }
    }
    setState(() => {
      const list = [];
      let i = 0;
      while (i + 7 < days.length) {
        list.push(days?.slice(i, i + 7));
        i = i + 7;
      }
      return list;
    });
  };

  useEffect(() => {
    loadMonth();
  }, []);

  const handleMouseEnter = (e: any) => {
    console.log("e", e);
  };

  const handleNextMonth = () => {
    const d = dayjs(curDate).add(1, "month").format("YYYY-MM-DD");
    setCurDate(d);
    loadMonth(d);
  };

  const handlePrevMonth = () => {
    const d = dayjs(curDate).add(-1, "month").format("YYYY-MM-DD");
    setCurDate(d);
    loadMonth(d);
  };
  return (
    <div className="backlog flex-1">
      <div>待办事项</div>
      <div className="flex items-center justify-between px-2 my-2">
        <Button type="primary" onClick={handlePrevMonth}>
          上一月
        </Button>
        <div>{curDate}</div>
        <Button type="primary" onClick={handleNextMonth}>
          下一月
        </Button>
      </div>
      <div>
        {state?.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            {item.map((itemA: any, i: number) => (
              <Popover key={i} content={<ShowTime text={itemA} />}>
                <div
                  onMouseEnter={handleMouseEnter}
                  className="m-1 h-12 flex-1 flex items-center justify-center rounded"
                  style={{ backgroundColor: "#9694FF" }}
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
