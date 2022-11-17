const Router = require('koa-router');

const Connection = require('../controller/connection');

const connectionRouter = new Router({ prefix: '/connection' });

// 注册connection中间件
connectionRouter.post('/mysql', Connection.saveMysqlConfig);

module.exports = connectionRouter;