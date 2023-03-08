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

    var test = sequelize.define('test', {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true
      },
      name: Sequelize.STRING(100),
    }, {
      timestamps: false
    });

    var now = Date.now();
    test.create({
      id: 'g-' + now,
      name: 'Gaffey',
    }).then(function (p) {
      console.log('created.' + JSON.stringify(p));
    }).catch(function (err) {
      console.log('failed: ' + err);
    });
  }
}

module.exports = new UnitTestService();