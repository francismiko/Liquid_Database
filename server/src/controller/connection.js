const Connection = require('../service/connection');

class ConnectionController {
  async saveMysqlConfig(ctx, next) {
    const { id, host, port, user, password, database } = ctx.request.body
    await Connection.saveMysqlConfig(id, host, port, user, password, database).then((data) => {
      if (data) {
        ctx.body = {
          code: 200,
          msg: '保存成功',
        }
      } else {
        ctx.body = {
          code: 400,
          msg: '保存失败',
        }
      }
    }).catch((err) => {
      console.log(err);
      ctx.body = {
        code: 400,
        msg: '保存失败',
      }
    });
  }
}

module.exports = new ConnectionController()