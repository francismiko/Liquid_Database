const { createUser, checkAccount, checkUser } = require('../service/user')

class UserController {
  async register(ctx, next) {
    const { account, passwd } = ctx.request.body
    const user = await checkAccount(account)
    if (user === null) {
      await createUser(account, passwd)
      ctx.body = {
        code: 200,
        msg: '注册成功',
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '注册失败',
      }
    }
  }

  async login(ctx, next) {
    const { account, passwd } = ctx.request.body
    const user = await checkUser(account, passwd)
    if (user !== null) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '登录失败',
      }
    }
  }
}

module.exports = new UserController()