const Connection = require('../service/connection');

class ConnectionController {
  // 保存mysql配置
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

  // 获取mysql配置
  async getMysqlConfig(ctx, next) {
    const uid = ctx.params.uid
    const config = await Connection.getMysqlConfig(uid)
    if (config) {
      ctx.body = {
        code: 200,
        msg: '获取成功',
        data: config
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '获取失败'
      }
    }
  }
}

module.exports = new ConnectionController()