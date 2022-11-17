const Connection = require('../model/connection');

class ConnectionService {
  // 创建新连接配置
  async createConnection(_id, host, port, user, password) {
    Connection.create({
      _id: _id,
      mysql_host: host,
      mysql_port: port,
      mysql_user: user,
      mysql_password: password,
    });
  }
}
module.exports = new ConnectionService();