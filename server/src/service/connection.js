const mysql = require('mysql2');
const mysqlConfig = require('../model/mysqlConfig');

class ConnectionService {
  // 新建mysql实例
  async newMysqlInstance(host, port, user, password, database) {
    // 创建连接池
    const db = mysql.createPool({
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
      connectionLimit: 100,
    });
    // 连接
    db.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('---MySQL连接池已创建---');
        return true;
      }
    });
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
        console.log(data);
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