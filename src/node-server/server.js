import express from "express";
import cors from "cors";
import {
  getCNForbesReportList,
  getExchange,
  getForbesReportList,
  getHostInfo,
} from "./network-request.js";
import "./sql.js";
import { exec } from "child_process";
import { addExchangeData, getExchangeData } from "./sql.js";

const app = express();
const port = "9090";

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("test请求成功");
});

app.get("/getInfoHost", async (req, res) => {
  const info = await getHostInfo();
  res.send(info);
});

app.get("/moneyList", (req, res) => {
  const sql = "select * from posts";
  connection.query(sql, (err, data) => {
    if (err) {
      res.send("读取错误");
    }
    res.send(data);
  });
});

app.get("/updateMoneyList", (req, res) => {
  getForbesReportList().then((data) => {
    const arr = [];
    data.forEach((item) => {
      arr.push({
        ranking: item[0],
        name: item[1],
        englishName: item[2],
        wealth: item[3],
        source: item[4],
      });
    });
    res.send(arr);
  });
});

app.get("/updateCNMoneyList", (req, res) => {
  getCNForbesReportList().then((data) => {
    const arr = [];
    data.forEach((item) => {
      arr.push({
        ranking: item[0],
        name: item[1],
        wealth: item[2],
        industry: item[3],
        source: item[4],
      });
    });
    res.send(arr);
  });
});

app.get("/calendar", (req, res) => {
  const sql = "SELECT * FROM calendar";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    } else {
      res.send(result);
    }
  });
});

//汇率相关
app.get("/exchange", (req, res) => {
  getExchange().then((r) => {
    const arr = r.map((item) => ({
      type: item[0],
      num: Number(item[1]),
      range: Number(item[2]),
    }));
    res.send(arr);
  });
});

app.get("/history-exchange", (req, res) => {
  getExchangeData().then((r) => {
    res.send(r);
  });
});

app.post("/insert-exchange", (req, res) => {
  addExchangeData(req.body).then((r) => {
    res.send(r);
  });
});

app.listen(port, () => {
  console.log("服务启动成功,端口号为：" + port);
  // exec("npm start");
});
