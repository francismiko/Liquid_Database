const mysqlConnection = require('../model/mysql');

class ConnectionService {
  // 创建新连接配置
  async mysqlConnection(_id, host, port, user, password, database) {
    mysqlConnection.create({
      _id: _id,
      mysql_host: host,
      mysql_port: port,
      mysql_user: user,
      mysql_password: password,
      mysql_database: database,
    });
  }
}
module.exports = new ConnectionService();