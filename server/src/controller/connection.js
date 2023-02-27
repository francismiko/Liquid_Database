const Connection = require('../service/connection');

class ConnectionController {
  // 新建mysql实例
  async newMysqlInstance(ctx, next) {
    const { host, port, user, password, database } = ctx.request.body
    await Connection.newMysqlInstance(host, port, user, password, database)
    ctx.body = {
      code: 200,
      msg: '新建成功'
    }
  }

  // 释放mysql连接池
  async releaseMysqlInstance(ctx, next) {
    await Connection.releaseMysqlInstance()
    ctx.body = {
      code: 200,
      msg: '释放成功'
    }
  }

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
        props: config
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