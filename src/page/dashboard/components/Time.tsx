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
    const prevMonthDay = Number(getPrevMonthEndDay());
    const startData = dayjs(_curDate).startOf("month").format("YYYY-MM-DD");
    const endData = dayjs(_curDate).endOf("month").format("YYYY-MM-DD");
    const weekStartDay = dayjs(startData).day();
    const weekEndDay = dayjs(endData).day();
    const prevMonthDays = dayjs().add(-1, "month").daysInMonth();
    return {
      startData,
      endData,
      weekEndDay,
      weekStartDay,
      prevMonthDay,
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
    const prevMonthList = getDaysMonth(date.weekStartDay, 1);
    const nextMonthList = getDaysMonth(date.weekEndDay, 1);

    if (prevMonthList.length) {
      prevMonthList.forEach((item) => {
        days.unshift(date.prevMonthDays - item);
      });
    }
    if (nextMonthList.length) {
      nextMonthList.forEach((item) => {
        days.push(item);
      });
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
        <Button type="primary" onClick={handleNextMonth}>
          下一月
        </Button>
        <div>{curDate}</div>
        <Button type="primary" onClick={handlePrevMonth}>
          上一月
        </Button>
      </div>
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
