const { createConnection } = require('../service/connection');

class ConnectionController {
  async connect(ctx, next) {
    const { _id, host, port, user, password } = ctx.request.body
    await createConnection(_id, host, port, user, password);
    ctx.body = {
      code: 200,
      msg: '保存成功',
    }
  }
}

module.exports = new ConnectionController()