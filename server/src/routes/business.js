const Router = require('koa-router');

const Business = require('../controller/business');

const businessRouter = new Router({ prefix: '/business' });

// 注册operational中间件
businessRouter.post('/mysql/query-tables', Business.queryTables);

module.exports = businessRouter;