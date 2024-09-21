import { Space, Table, Button } from "antd";
import Dialog from "@/page/components/table/Dialog";
import { requestApi } from "@/service";
import React from "react";
import MoneyTable from "./components/money-table";

export default function () {
  let dialogRef: any = React.createRef();
  const handleRow = (val: any) => {
    console.log("val", val);
    dialogRef.current.handleModalOpen();
    requestApi("/test").then((res) => {
      console.log("res2222", res);
    });
  };
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => handleRow(record)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="font-bold mb-4">基础表格</div>
      <Table dataSource={dataSource} columns={columns} />
      <Dialog onRef={dialogRef} />
      <MoneyTable />
    </>
  );
}
