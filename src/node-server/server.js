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
import dayjs from "dayjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from "jsonwebtoken";

export const EXCHANGE = ["美元", "欧元", "日元", "英镑", "港元"];

const app = express();
const port = "9090";

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true, // 允许发送 Cookies
  }),
);
app.use(express.json());
// 使用body-parser对request内的数据进行一个format，使得我们易于获取数据
app.use(bodyParser.json());
// 这个cookie-parser库，方便操作客户端中的cookie值
app.use(cookieParser());
// urlencoded用来解析request中body的urlencoded字符，只支持utf-8的编码的字符
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * session配置
 **/
app.use(
  session({
    secret: "sessionKey", // 可以随便写。String类型的字符串，作为服务器端生成 session 的签名
    name: "token", // 这个会作为给cookie设置值的key
    saveUninitialized: true, // 强制将未初始化的 session 存储。默认值是true，建议设置成true
    resave: false, // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
    cookie: {
      httpOnly: true,
      sameSite: "Lax", // 允许跨站点请求携带 cookie
      // maxAge: 1000 * 60 * 60 * 24, //设置过期时间是一天 或者 expires 设置过期时间，同时存在 max-age 优先级更高
      maxAge: 1000 * 60 * 5, //设置过期时间
    },
    rolling: true, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认：false
  }),
);

const users = {
  admin: { username: "admin", password: "123456" },
};

app.use(function (req, res, next) {
  const { userInfo } = req?.session;
  if (req.url !== "/login") {
    if (!userInfo) {
      res.send({ flag: false, status: 403, msg: "登录已过期,请重新登录" });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Expose-Headers", "test"); // 允许前端获取的自定义头部
  next();
});

function isWeekend(date) {
  const day = dayjs(date).day();
  return [0, 6].includes(day);
}

// 只在当天 9 点半之后请求数据
function isUpdate() {
  const time = dayjs().format("YYYY-MM-DD 09:30");
  const cur_time = dayjs().format("YYYY-MM-DD HH:mm");
  return dayjs(time).isBefore(dayjs(cur_time));
}

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

//获取当日汇率
app.get("/exchange", async (req, res) => {
  let date = dayjs().format("YYYY-MM-DD");
  const r = await getExchange();
  const arr = r.map((item) => ({
    type: item[0],
    num: Number(item[1]),
    range: Number(item[2]),
  }));
  if (!isWeekend(date) && isUpdate()) {
    const list = arr.filter((item) =>
      EXCHANGE.find((itemA) => item.type?.includes(itemA)),
    );
    await addExchangeData({ list, date });
  }
  res.send(arr);
});

app.get("/history-exchange", (req, res) => {
  getExchangeData().then((r) => {
    res.send(r);
  });
});

//添加汇率
app.post("/insert-exchange", (req, res) => {
  addExchangeData(req.body).then((r) => {
    res.send(r);
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const secret = "tsuki";
  const token = jwt.sign({ username, password }, secret);
  console.log("token", token);
  req.session.userInfo = { username, password };
  // 暴露自定义响应头
  // res.set("Access-Control-Expose-Headers", "*");
  // res.header("DIY-response", "111"); //自定义响应头
  if (users[username] && users[username] === password) {
    res.send({ code: 200, msg: "登录成功" });
  } else {
    res.send({ code: 400, msg: "登录失败，密码或账号错误" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "登出失败" });
    } else {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "登出成功" });
    }
  });
  // const { username, password } = req.body;
  // const secret = "tsuki";
  // const token = jwt.sign({ username, password }, secret);
  // console.log("token", token);
  // req.session.userInfo = { username, password };
  // res.send({ code: 200, msg: "登录成功" });
});

app.listen(port, () => {
  console.log("服务启动成功,端口号为：" + port);
  // exec("npm start");
});
