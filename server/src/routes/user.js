const Router = require('koa-router');

const User = require('../controller/user')

const userRouter = new Router({ prefix: '/user' });

// 注册user中间件
userRouter.post('/register', User.register);
userRouter.post('/login', User.login);
userRouter.post('/actions', User.recordAction);

module.exports = userRouter;