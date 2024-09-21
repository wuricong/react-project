import { useEffect, useState } from "react";
import { Table } from "antd";
import { getMoneyTable } from "@/api/table";

export default function MoneyTable() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMoneyTable().then((res: any) => {
      setList(res.data);
      const num = getMedianNum(res.data);
      console.log("num", num);
    });
  }, []);

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

  const columns = [
    { title: "序号", dataIndex: "ranking", key: "raking" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "英文名", dataIndex: "englishName", key: "englishName" },
    { title: "产值", dataIndex: "wealth", key: "wealth" },
    { title: "来源", dataIndex: "source", key: "source" },
  ];
  return (
    <>
      <div className="font-bold mb-4">福布斯排行榜</div>
      <Table
        locale={{ emptyText: "暂无数据" }}
        rowKey="ranking"
        dataSource={list}
        columns={columns}
      />
    </>
  );
}
