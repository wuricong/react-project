import mysql from "mysql";
import express from "express";
import cors from "cors";
import { getForbesReportList, getHostInfo } from "./weibo-reptile.js";
import { exec } from "child_process";

const app = express();
const port = "9090";

app.use(cors());

app.listen(port, () => {
  console.log("服务启动成功,端口号为：" + port);
  exec("node ./node_modules/vite/bin/vite.js");
});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //用户 本地默认为root
  password: "15070301734wrc", //密码
  port: "3306", //端口号
  database: "forbesSql", //数据库名称
});
connection.connect();

let createSqlTable =
  "CREATE TABLE posts(id int AUTO_INCREMENT,ranking VARCHAR(255),name VARCHAR(255),englishName VARCHAR(255),wealth VARCHAR(255),source VARCHAR(255),PRIMARY KEY(id))";

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
    console.log("data", data);
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
    // data.forEach((item, index) => {
    //   console.log(index, item, "index");
    //   const insert = `INSERT INTO posts (id, ranking, name,englishName,wealth,source) VALUES (${index},${item[0]},'${item[1]}','${item[2]}',${item[3]},'${item[4]}')`;
    //   connection.query(insert, (err, result) => {
    //     if (err) {
    //       console.log("err", err);
    //     } else {
    //       res.send(result);
    //       console.log("result", result);
    //     }
    //   });
    // });
  });
});

app.get("/calendar", (req, res) => {
  const sql = "SELECT * FROM calendar";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("err", err);
    } else {
      res.send(result);
      console.log("result", result);
    }
  });
});
