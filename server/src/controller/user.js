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
    /** 
     * @TODO 需要对异步结果进行校验 
     */
    await User.recordAction(account, action_type, action_content, action_date)
    ctx.body = {
      code: 200,
      msg: '记录成功'
    }
  }

  async recordException(ctx, next) {
    const { account, exception_type, exception_code, exception_content, exception_date } = ctx.request.body
    /**
     * @TODO 需要对异步结果进行校验
     */
    await User.recordException(account, exception_type, exception_code, exception_content, exception_date)
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
    } else {
      ctx.body = {
        code: 400,
        msg: '获取失败',
      }
    }
  }

  async getExceptions(ctx, next) {
    const exceptions = await User.getExceptions()
    if (exceptions) {
      ctx.body = {
        code: 200,
        msg: '获取成功',
        exceptions: exceptions,
      }
    } else {
      ctx.body = {
        code: 400,
        msg: '获取失败',
      }
    }
  }
}

module.exports = new UserController()