const Connection = require('../service/connection');

class ConnectionController {
  async saveMysqlConfig(ctx, next) {
    const { id, host, port, user, password, database } = ctx.request.body
    // ！！！有问题，if里还会多一次操作
    await Connection.saveMysqlConfig(id, host, port, user, password, database)
    if (Connection.saveMysqlConfig(id, host, port, user, password, database)) {
      ctx.body = {
        code: 200,
        msg: '保存成功'
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '保存失败'
      }
    }
  }
}

module.exports = new ConnectionController()