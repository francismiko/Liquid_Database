const Router = require('koa-router');

// const Connection = require('../controller/connection');

const operationalRouter = new Router({ prefix: '/operational' });

// 注册operational中间件
operationalRouter.post('/mysql/post',);

module.exports = operationalRouter;