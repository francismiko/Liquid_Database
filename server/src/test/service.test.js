// 单元测试模块
const mysql = require('mysql2');
const Sequelize = require('sequelize');

class UnitTestService {
  async testFunc(host, port, user, password, database) {
    // 初始化sequelize连接池
    const sequelize = new Sequelize(database, user, password, {
      host: host,    //数据库地址,默认本机
      port: port,
      dialect: 'mysql',
      pool: {   //连接池设置
        max: 10, //最大连接数
        min: 0, //最小连接数
        idle: 10000
      },
    });

    console.log(sequelize);
  }
}

module.exports = new UnitTestService();