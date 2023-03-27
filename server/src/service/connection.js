const mysql = require('mysql2');
const sequelize_init_ = require('../lib/sequelize');
const mysqlConfig = require('../model/mysqlConfig');

class ConnectionService {
  // 新建mysql实例
  async newMysqlInstance(host, port, user, password, database) {
    const sequelize_init_ = require('../lib/sequelize');
    // 初始化sequelize连接池
    const sequelize = await sequelize_init_(host, port, user, password, database);
    // 测试连接
    try {
      await sequelize.authenticate();
      setTimeout(() => {
        console.log('----MySQL连接成功----');
      }, 100);
    } catch (error) {
      setTimeout(() => {
        console.error('----MySQL连接失败----', error);
      }, 100);
    }
  }
  // 断开mysql连接池
  async releaseMysqlInstance(host, port, user, password, database) {
    // 初始化sequelize连接池
    const sequelize = await sequelize_init_(host, port, user, password, database);
    // 断开连接
    try {
      await sequelize.close();
      setTimeout(() => {
        console.log('----MySQL连接池已断开----');
      }, 100);
    } catch (error) {
      setTimeout(() => {
        console.error('----MySQL连接池断开失败----', error);
      }, 100);
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