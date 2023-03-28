const Operational = require("../service/operational");

class OperationalController {
  async queryTables(ctx, next) {
    const { host, port, user, password, database } = ctx.request.body
    const tables = await Operational.queryTables(host, port, user, password, database)
    if (tables) {
      ctx.body = {
        code: 200,
        msg: '获取成功',
        props: tables,
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '获取失败',
      }
    }
    console.log(tables);
    
  }
}

module.exports = new OperationalController();