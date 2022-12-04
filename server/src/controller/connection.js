const Connection = require('../service/connection');

class ConnectionController {
  async saveMysqlConfig(ctx, next) {
    const { id, host, port, user, password, database } = ctx.request.body
    /** 
     *  @TODO 需要对异步结果进行校验
     */
    await Connection.saveMysqlConfig(id, host, port, user, password, database)
    ctx.body = {
      code: 200,
      msg: '保存成功'
    }
  }
}

module.exports = new ConnectionController()