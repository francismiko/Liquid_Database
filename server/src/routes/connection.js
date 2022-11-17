const Router = require('koa-router');

const { connect } = require('../controller/connection');

const connectionRouter = new Router({ prefix: '/connection' });

// 注册connection中间件
connectionRouter.post('/mysql', connect);

module.exports = connectionRouter;