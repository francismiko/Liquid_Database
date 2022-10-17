const { createUser } = require('../service/user')

class UserController {
  async register(ctx, next) {
    const { account, passwd } = ctx.request.body
    const res = await createUser(account, passwd)
    ctx.body = ctx.request.body
    console.log(res);
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()