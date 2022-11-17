const { mysqlConnection } = require('../service/connection');

class ConnectionController {
  async saveMysqlConfig(ctx, next) {
    const { _id, host, port, user, password, database } = ctx.request.body
    await mysqlConnection(_id, host, port, user, password, database);
    ctx.body = {
      code: 200,
      msg: '保存成功',
    }
  }
}

module.exports = new ConnectionController()