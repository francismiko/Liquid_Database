const Connection = require('../service/connection');

class ConnectionController {
  async saveMysqlConfig(ctx, next) {
    const { id, host, port, user, password, database } = ctx.request.body
    await Connection.saveMysqlConfig(id, host, port, user, password, database);
    ctx.body = {
      code: 200,
      msg: '保存成功',
    }
    
  }
}

module.exports = new ConnectionController()