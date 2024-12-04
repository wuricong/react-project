import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import { updateMoneyList, updateCNMoneyList } from "@/api/table";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import PieChart from "@/page/components/table/components/pie-chart.tsx";

export default function MoneyTable() {
  const [list, setList] = useState([]);
  const [CNList, setCNList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const cnColumns = [
    { title: "序号", dataIndex: "ranking", key: "raking" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "产值", dataIndex: "wealth", key: "wealth" },
    { title: "行业", dataIndex: "industry", key: "industry" },
    { title: "来源", dataIndex: "source", key: "source" },
  ];

  const handleUpdate = () => {
    updateMoneyList().then(({ data }: any) => {
      setList(data);
    });
  };

  const handleAnalyseHK = () => {
    const arr: any = [];
    list.forEach((item: any) => {
      const result = arr.find((itemA: any) => itemA?.title === item.industry);
      if (!result) {
        arr.push({ title: item.industry, num: 1, children: [item] });
      } else {
        result.num++;
        result.children.push(item);
      }
    });
    return arr;
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
          <Button color="primary" variant="outlined" onClick={handleAnalyseHK}>
            分析
          </Button>
        </div>
      </div>
      <Table
        locale={{ emptyText: "暂无数据" }}
        rowKey="ranking"
        dataSource={list}
        columns={columns}
        className="mb-2"
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
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsShowModal(true)}
          >
            分析
          </Button>
        </div>
      </div>
      <Table
        locale={{ emptyText: "暂无数据" }}
        rowKey="ranking"
        dataSource={CNList}
        columns={cnColumns}
      />

      <Modal
        title="数据分析"
        open={isShowModal}
        onCancel={() => setIsShowModal(false)}
      >
        <PieChart list={CNList} />
      </Modal>
    </ConfigProvider>
  );
}
