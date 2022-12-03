const User = require('../service/user')

class UserController {
  async register(ctx, next) {
    const { account, password } = ctx.request.body
    const user = await User.checkAccount(account)
    if (!user) {
      await User.createUser(account, password)
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
    const { account, password, isAdmin } = ctx.request.body
    const user = await User.checkUser(account, password, isAdmin)
    if (user) {
      ctx.body = {
        code: 200,
        msg: '登录成功',
        uid: user.uid,
        isAdmin: user.isAdmin,
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '登录失败',
      }
    }
  }

  async recordAction(ctx, next) {
    const { account, action_type, action_content, action_date } = ctx.request.body
    await User.recordAction(account, action_type, action_content, action_date)
    ctx.body = {
      code: 200,
      msg: '记录成功'
    }
  }

  async getActions(ctx, next) {
    const actions = await User.getActions()
    if (actions) {
      ctx.body = {
        code: 200,
        msg: '获取成功',
        actions: actions,
      }
    }
  }
}

module.exports = new UserController()