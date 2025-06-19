import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { getExchange, getHistoryExchange } from "@/api/table.ts";
import { EXCHANGE } from "@/utils/enum.ts";
import { LoadingOutlined } from "@ant-design/icons";
import Diary from "@/page/dashboard/components/Diary.tsx";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { changeExchangeHistoryList } from "@/store/userInfo.ts";
import { Area } from "@ant-design/charts";
import { isWeekend } from "@/utils";

export default function Time() {
  const [config, setConfig] = useState({
    height: 220,
    data: [],
    xField: "date",
    yField: "value",
    axis: { x: { label: false, tick: false } },
    //提示相关的配置
    tooltip: (d: any) => {
      return { value: d.orgValue, name: "汇率" };
    },
    line: {
      style: {
        stroke: "#782fcc", // 线条颜色
        strokeWidth: 2,
        strokeColor: "red",
      },
    },
    style: {
      fill: "linear-gradient(-90deg, white 0%, #9694FF 100%)",
    },
  });
  const dispatch = useDispatch();
  const { exchange } = useSelector((state: any) => {
    return state.userInfo;
  });

  const [exchangeList, setExchangeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const time = dayjs().format("YYYY-MM-DD 09:30");
    const cur_time = dayjs().format("YYYY-MM-DD HH:mm");
    console.log(dayjs(time).isBefore(dayjs(cur_time)));

    await handleGetExchange();
    getHistoryExchange().then((res: any) => {
      const arr = res.data.map((item: any) => {
        return {
          date: item.date,
          value: item.realUS * 10000 - 71800,
          orgValue: item.realUS,
        };
      });
      setConfig((e) => {
        return { ...e, data: arr };
      });
    });
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    console.log("exchange", exchange);
  }, [exchange]);

  useEffect(() => {}, [exchangeList]);

  const handleGetExchange = async () => {
    setLoading(true);
    try {
      const res: any = await getExchange();
      const list = res.data.filter((item: any) =>
        EXCHANGE.find((itemA) => item.type?.includes(itemA)),
      );
      list.sort((a: any, b: any) => b.num - a.num);
      setExchangeList(list);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mb-4">
      <Spin
        className="flex-1"
        indicator={<LoadingOutlined spin />}
        spinning={loading}
        size="small"
      >
        <div className="mb-2">汇率表</div>
        <div className="flex">
          <div>
            {exchangeList?.map((item: any, index) => (
              <div key={index} className="flex gap-1 mb-1">
                <div style={{ width: "120px" }}>{item.type}</div>
                <div className="font-bold" style={{ color: "red" }}>
                  {item?.num}
                </div>
                <div>元</div>
              </div>
            ))}
          </div>
          <Area className="flex-1" {...config} />
        </div>
        <div className="mt-2">
          <Button size="small" type="primary" onClick={handleGetExchange}>
            刷新
          </Button>
        </div>
      </Spin>
      <Diary></Diary>
    </div>
  );
}
