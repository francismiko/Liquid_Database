// 单元测试模块
const UnitTest = require('./service');

class UnitTestController {
  async post(ctx) {
    const { host, port, user, password, database } = ctx.request.body;
    await UnitTest.testFunc(host, port, user, password, database)
    ctx.body = {
      code: 200,
      msg: 'success',
      data: null
    }
  }
}

module.exports = new UnitTestController();