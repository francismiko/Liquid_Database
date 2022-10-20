const Router = require('koa-router');

const { register, login } = require('../controller/user')

const userRouter = new Router({ prefix: '/user' });

// 注册user中间件
userRouter.post('/register', register);
userRouter.post('/login', login);

module.exports = userRouter;