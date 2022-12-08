const Router = require('koa-router');

const Connection = require('../controller/connection');

const connectionRouter = new Router({ prefix: '/connection' });

// 注册connection中间件
connectionRouter.post('/mysql/config', Connection.saveMysqlConfig);
connectionRouter.get('/mysql/config/:uid', Connection.getMysqlConfig);

module.exports = connectionRouter;