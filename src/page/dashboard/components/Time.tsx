import { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { getExchange } from "@/api/table.ts";
import { EXCHANGE } from "@/utils/enum.ts";
import { LoadingOutlined } from "@ant-design/icons";
import Backlog from "@/page/dashboard/components/Backlog.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setExchange } from "@/store/userInfo.ts";
import dayjs from "dayjs";

export default function Time() {
  const dispatch = useDispatch();
  const { exchange } = useSelector((state: any) => {
    console.log(state.userInfo, "state");
    return state.userInfo;
  });

  const [exchangeList, setExchangeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetExchange();
  }, []);

  useEffect(() => {}, [exchangeList]);

  const handleGetExchange = () => {
    setLoading(true);
    getExchange()
      .then((res: any) => {
        const list = res.data.filter((item: any) =>
          EXCHANGE.find((itemA) => item.type?.includes(itemA)),
        );
        list.sort((a: any, b: any) => b.num - a.num);
        console.log("exchange", exchange);
        if (!exchange || exchange !== dayjs().format("YYYY-MM-DD")) {
          dispatch(setExchange());
        }
        setExchangeList(list);
      })
      .finally(() => {
        setLoading(false);
      });
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
            <div>折线图</div>
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
