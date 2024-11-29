import type { Dayjs } from "dayjs";
import { DateType } from "@/types/public.ts";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Button, Popover } from "antd";
import ShowTime from "@/page/dashboard/components/ShowTime";
import fillZero, { getDaysMonth } from "@/utils";
import Nail from "@/assets/svg/nail.tsx";

// import { WebSocket } from "vite";

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
      days.unshift({ date: count, _date: `${_date}-${count}` });
      count--;
    } while (count);
    const prevMonthList = getDaysMonth(date.weekStartDay);
    const nextMonthList = getDaysMonth(date.weekEndDay);

    if (prevMonthList.length) {
      prevMonthList.forEach((item) =>
        days.unshift({
          date: date.prevMonthDays - item,
          _date: `${_date}-${date.prevMonthDays - item}`,
          out: true,
        }),
      );
    }

    if (nextMonthList.length) {
      for (let i = 1; i <= 7 - nextMonthList.length; i++) {
        days.push({
          date: fillZero(i),
          _date: `${_date}-${_date}-${i}`,
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
              <Popover key={i} content={<ShowTime text={itemA._date} />}>
                <div
                  onMouseEnter={handleMouseEnter}
                  className="m-1 h-12 flex-1 flex items-center justify-center rounded relative"
                  style={{ backgroundColor: "#9694FF" }}
                >
                  {dayjs().format("YYYY-MM-DD") === itemA._date &&
                    !itemA.out && (
                      <div className="absolute top-1 right-1">
                        <Nail />
                      </div>
                    )}
                  <div></div>
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

export default function Time() {
  const [socketState, setWebSocket] = useState("测试websocket");
  const aWebsocket: any = new WebSocket("http://localhost:8080");

  aWebsocket.addEventListener("message", (res: any) => {
    console.log("res", res);
    setWebSocket(res.data);
  });

  aWebsocket.addEventListener("open", () => {
    aWebsocket.send("hello");
  });

  return (
    <div className="flex mb-4">
      <div className="flex-1">
        <div>{socketState}</div>
        <svg>
          <rect width="100" height="100" fill="gold" />
          <svg height="100" width="100" viewBox="0 0 100 100">
            <line
              className="beat"
              x1="15"
              y1="40"
              x2="15"
              y2="100"
              stroke="blue"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              className="beat"
              x1="50"
              y1="20"
              x2="50"
              y2="100"
              stroke="black"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              className="beat"
              x1="85"
              y1="40"
              x2="85"
              y2="100"
              stroke="red"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </svg>
      </div>
      <Backlog></Backlog>
    </div>
  );
}
