import mysql from "mysql";
import dayjs from "dayjs";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //用户 本地默认为root
  password: "15070301734wrc", //密码
  port: "3306", //端口号
  database: "forbesSql", //数据库名称
});
connection.connect();

const execSql = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

export const getExchangeData = () =>
  new Promise((resolve) => {
    const querySql = "select * from exchangeRate";
    execSql(querySql).then((res) => {
      resolve(res);
    });
  });

const getSqlFormLen = async () => {
  const sql = "SELECT COUNT(*) FROM exchangeRate";
  return await execSql(sql);
};

const getSqlFormData = async (name) => {
  const sql = `SELECT * FROM ${name}`;
  return await execSql(sql);
};

const querySqlDateCol = async () => {
  const date = dayjs().format("YYYY-MM-DD");
  const sql = `SELECT * FROM exchangeRate WHERE date='${date}'`;
  return await execSql(sql);
};

export const addExchangeData = async (data) => {
  const result = await querySqlDateCol();
  let d = dayjs().format("YYYY-MM-DD");
  return new Promise((resolve) => {
    if (!result.length) {
      const sql = `INSERT INTO exchangeRate (date, realUS,realPound,realEuro,realHKD) VALUES (${d},${data[2]["num"]},${data[0]["num"]},${data[1]["num"]},${data[4]["num"]})`;
      execSql(sql).then((res) => {
        resolve(res);
      });
    } else {
      resolve({ code: "200" });
    }
  });
};
