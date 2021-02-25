const mysql = require("mysql");
const dbConfig = require("./db-config.js");

var connection = mysql.createPool({
  host: process.env.MYSQL_HOST || '172.18.0.2' || dbConfig.HOST,
  user: process.env.MYSQL_USER || dbConfig.USER,
  password: process.env.MYSQL_PASSWORD || dbConfig.PASSWORD,
  database: process.env.MYSQL_DATABASE || dbConfig.DB,
});

module.exports = connection;