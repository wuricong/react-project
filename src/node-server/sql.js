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
  new Promise((resolve, reject) => {
    const querySql = "select * from exchangeRate";

    connection.query(querySql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });

const getSqlFormLen = async () => {
  const sql = "SELECT COUNT(*) FROM exchangeRate";
  return await execSql(sql);
};

const querySqlDateCol = async () => {
  const date = dayjs().format("YYYY-MM-DD");
  const sql = `SELECT * FROM exchangeRate WHERE date=${date} `;
  return await execSql(sql);
};

export const addExchangeData = async (data) => {
  const res = await getSqlFormLen();
  const index = res[0]["COUNT(*)"];
  const result = querySqlDateCol();
  console.log("result", result);
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO exchangeRate (id,date, realUS,realPound,realEuro,realHKD) VALUES (${index + 1},'2024-12-10',${data[2]},${data[0]},${data[1]},${data[4]})`;
    execSql(sql).then((res) => {
      resolve(res);
    });
  });
};
