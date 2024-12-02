import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { getMoneyTable, updateMoneyList, updateCNMoneyList } from "@/api/table";
import type { TableColumnsType } from "antd";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

export default function MoneyTable() {
  const [list, setList] = useState([]);
  const [CNList, setCNList] = useState([]);

  useEffect(() => {
    updateMoneyList().then((res: any) => {
      setList(res.data);
      const num = getMedianNum(res.data);
      console.log("num", num);
    });
    load();
  }, []);

  const load = () => {
    updateCNMoneyList().then((res: any) => {
      setCNList(res.data);
    });
  };

  //求中位数
  function getMedianNum(list = []) {
    let nums = list.map((item: any) => Number(item.wealth));
    nums.sort((a, b) => a - b);

    if (nums.length % 2 === 0) {
      return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
    } else {
      return nums[Math.floor(nums.length / 2)];
    }
  }

  const handleUpdateCN = () => {
    console.log(111);
  };

  const columns = [
    { title: "序号", dataIndex: "ranking", key: "raking" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "英文名", dataIndex: "englishName", key: "englishName" },
    { title: "产值", dataIndex: "wealth", key: "wealth" },
    { title: "来源", dataIndex: "source", key: "source" },
  ];

  const handleUpdate = () => {
    updateMoneyList().then(({ data }: any) => {
      setList(data);
    });
  };

  const handleAnalyse = () => {
    console.log(11);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold">福布斯香港排行榜</div>
        <div>
          <Button
            style={{ marginRight: "8px" }}
            color="primary"
            variant="outlined"
            onClick={handleUpdate}
          >
            刷新
          </Button>
          <Button color="primary" variant="outlined" onClick={handleUpdateCN}>
            分析
          </Button>
        </div>
      </div>
      <Table
        locale={{ emptyText: "暂无数据" }}
        rowKey="ranking"
        dataSource={list}
        columns={columns}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold">福布斯内地排行榜</div>
        <div>
          <Button
            style={{ marginRight: "8px" }}
            color="primary"
            variant="outlined"
            onClick={handleUpdateCN}
          >
            刷新
          </Button>
          <Button color="primary" variant="outlined" onClick={handleAnalyse}>
            分析
          </Button>
        </div>
      </div>
      <Table
        locale={{ emptyText: "暂无数据" }}
        rowKey="ranking"
        dataSource={CNList}
        columns={columns}
      />
    </ConfigProvider>
  );
}
