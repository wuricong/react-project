import type { Dayjs } from "dayjs";
import { DateType } from "@/types/public.ts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import fillZero, { getDaysMonth } from "@/utils";
import Nail from "@/assets/svg/nail.tsx";
import { SPRING_LIST } from "@/utils/enum.ts";
import Spring from "@/assets/svg/Spring.tsx";
import { Button, Popover } from "antd";
import ShowTime from "@/page/dashboard/components/show-time.tsx";

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
    const _date = dayjs(date.startData).format("YYYY-MM");
    let count = Number(date.endData?.split("-").at(-1));
    do {
      days.unshift({ date: fillZero(count), _date: `${_date}-${count}` });
      count--;
    } while (count);
    const prevMonthList = getDaysMonth(date.weekStartDay);
    const nextMonthList = getDaysMonth(date.weekEndDay);

    if (prevMonthList.length) {
      const prevMonthDate = dayjs(date.startData)
        .add(-1, "month")
        .format("YYYY-MM");
      prevMonthList.forEach((item) =>
        days.unshift({
          date: fillZero(date.prevMonthDays - item),
          _date: `${prevMonthDate}-${date.prevMonthDays - item}`,
          out: true,
        }),
      );
    }

    if (nextMonthList.length) {
      const nextMonthDate = dayjs(date.startData)
        .add(1, "month")
        .format("YYYY-MM");
      for (let i = 1; i <= 7 - nextMonthList.length; i++) {
        days.push({
          date: fillZero(i),
          _date: `${nextMonthDate}-${i}`,
          out: true,
        });
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
    // console.log("e", e);
  };

  const switchMonth = (mark: any) => {
    const d = dayjs(curDate).add(mark, "month").format("YYYY-MM-DD");
    setCurDate(d);
    loadMonth(d);
  };

  const handleFestival = (val: any) => {
    const { out, _date } = val;
    return (
      <div className="absolute top-1 right-1">
        {dayjs().format("YYYY-MM-DD") === dayjs(_date).format("YYYY-MM-DD") &&
          !out && <Nail />}
        {SPRING_LIST.includes(_date) && <Spring />}
      </div>
    );
  };

  return (
    <div className="backlog flex-1">
      <div>待办事项</div>
      <div className="flex items-center justify-between px-2 my-2">
        <Button type="primary" onClick={() => switchMonth(-1)}>
          上一月
        </Button>
        <div>{curDate}</div>
        <Button type="primary" onClick={() => switchMonth(1)}>
          下一月
        </Button>
      </div>
      <div>
        {state?.map((item: any, index: number) => (
          <div key={index} className="flex justify-between">
            {item.map((itemA: any, i: number) => (
              <Popover key={i} content={<ShowTime content={itemA._date} />}>
                <div
                  onMouseEnter={handleMouseEnter}
                  className="m-1 h-12 flex-1 flex items-center justify-center rounded relative"
                  style={{ backgroundColor: itemA.out ? "#dadce3" : "#9694FF" }}
                >
                  {handleFestival(itemA)}
                  <div>{itemA.date}</div>
                </div>
              </Popover>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Backlog;
