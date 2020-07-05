'use strict'

const mysql = require('mysql2');

const MYSQL_CONFIG = {
  HOST: 'xxxxxxxxxxxx.gz.tencentcdb.com', // 腾讯云数据库
  PORT: '3306',
  DATABASE: 'mydata',
  USERNAME: 'root',
  PASSWORD: 'xxxxxxxx'
};

// init mysql connection
const initMysqlPool = () => {

  const promisePool = mysql
    .createPool({
      host: MYSQL_CONFIG.HOST,
      user: MYSQL_CONFIG.USERNAME,
      port: MYSQL_CONFIG.PORT,
      password: MYSQL_CONFIG.PASSWORD,
      database: MYSQL_CONFIG.DATABASE,
      connectionLimit: 1,
    })
    .promise();

  return promisePool;
}

module.exports = {
  MYSQL_CONFIG,
  initMysqlPool,
}
