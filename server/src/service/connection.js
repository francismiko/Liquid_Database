const mysql = require('mysql2');
const Sequelize = require('sequelize');
const mysqlConfig = require('../model/mysqlConfig');

class ConnectionService {
  // 新建mysql实例
  async newMysqlInstance(host, port, user, password, database) {
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
    // 测试连接
    try {
      await sequelize.authenticate();
      console.log('---MySQL连接成功---');
    } catch (error) {
      console.error('---MySQL连接失败---', error);
    }
  }

  // 断开mysql连接池
  async releaseMysqlInstance(host, port, user, password, database) {
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
    // 断开连接
    try {
      await sequelize.close();
      console.log('----MySQL连接池已断开----');
    }
    catch (error) {
      console.error('----MySQL连接池断开失败----', error);
    }
  }

  // 保存mysql配置
  async saveMysqlConfig(id, host, port, user, password, database) {
    // 查询id，有则更新，没有则新建
    mysqlConfig.findOneAndUpdate({
      uid: id
    }, {
      uid: id,
      mysql_host: host,
      mysql_port: port,
      mysql_user: user,
      mysql_password: password,
      mysql_database: database,
    }, { new: true }, (err, data) => {
      if (err) {
        console.log(err);
        return false;
      } else if (data) {
        console.log('mysql配置更新成功');
        // console.log(data);
        return true;
      } else if (data === null) {
        mysqlConfig.create({
          uid: id,
          mysql_host: host,
          mysql_port: port,
          mysql_user: user,
          mysql_password: password,
          mysql_database: database,
        }, (err, data) => {
          if (err) {
            console.log(err);
            return false;
          } else {
            console.log('mysql配置新建成功');
            console.log(data);
            return true;
          }
        });
      }
    });
  }

  // 获取mysql配置
  async getMysqlConfig(uid) {
    return mysqlConfig.findOne({
      uid: uid
    }).exec();
  }
}
module.exports = new ConnectionService();