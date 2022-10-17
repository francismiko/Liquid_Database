const Router = require('koa-router');

const { register, login } = require('../controller/user')

const userRouter = new Router({ prefix: '/user' });

// 注册user中间件
userRouter.post('/login', login)
userRouter.post('/register', register);

module.exports = userRouter;