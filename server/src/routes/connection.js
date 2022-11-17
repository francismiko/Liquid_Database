const Router = require('koa-router');

const { saveMysqlConfig } = require('../controller/connection');

const connectionRouter = new Router({ prefix: '/connection' });

// 注册connection中间件
connectionRouter.post('/mysql', saveMysqlConfig);

module.exports = connectionRouter;