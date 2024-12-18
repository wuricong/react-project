import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import {
  getExchange,
  getHistoryExchange,
  setFetchExchangeList,
} from "@/api/table.ts";
import { EXCHANGE } from "@/utils/enum.ts";
import { LoadingOutlined } from "@ant-design/icons";
import Backlog from "@/page/dashboard/components/Backlog.tsx";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { changeExchangeHistoryList } from "@/store/userInfo.ts";
import { Area } from "@ant-design/charts";
import { isWeekend } from "@/utils";

export default function Time() {
  const [config, setConfig] = useState({
    height: 220,
    xField: "date",
    yField: "value",
    axis: { x: { label: false, tick: false } },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
    scale: {
      y: {
        type: "linear",
        domain: [0, 100],
        nice: true,
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

  useEffect(() => {
    handleGetExchange();
    getHistoryExchange().then((res: any) => {
      const arr = res.data.map((item: any) => {
        return { date: item.date, value: item.realUS * 10000 - 71800 };
      });
      setConfig((e) => {
        return { ...e, data: arr };
      });
    });
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
      let date = dayjs().format("YYYY-MM-DD");
      if (isWeekend(date)) return;
      let params = {
        list,
        date,
      };
      setFetchExchangeList(params).then(({ data }: any) => {
        if (data?.code !== "200") {
          dispatch(changeExchangeHistoryList(list));
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mb-4">
      <div className="flex-1">
        <Spin
          indicator={<LoadingOutlined spin />}
          spinning={loading}
          size="small"
        >
          <div className="mb-2">汇率表</div>
          <div className="flex">
            <div>
              {exchangeList.map((item: any, index) => (
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
      </div>
      <Backlog></Backlog>
    </div>
  );
}
