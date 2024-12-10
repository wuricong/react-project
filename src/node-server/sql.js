import mysql from "mysql";

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

const addExchangeData = () => {
  const querySql = "select date from exchangeRate";

  const sql =
    "INSERT INTO exchangeRate (id,date, realUS,realPound,realEuro,realHKD) VALUES (?,?,?)";

  connection.query(sql, (err, res) => {
    console.log("res", res);
  });
};

addExchangeData();
