import { Space, Table, Button } from "antd";
import Dialog from "@/page/components/table/Dialog";
import { requestApi } from "@/service";
import React from "react";
import MoneyTable from "./components/money-table";

export default function () {
  let dialogRef: any = React.createRef();
  // const handleRow = (val: any) => {
  //   console.log("val", val);
  //   dialogRef.current.handleModalOpen();
  //   requestApi("/test").then((res) => {
  //     console.log("res2222", res);
  //   });
  // };
  return (
    <>
      <Dialog onRef={dialogRef} />
      <MoneyTable />
    </>
  );
}
