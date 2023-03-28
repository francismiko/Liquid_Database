const Router = require('koa-router');

const Operational = require('../controller/operational');

const operationalRouter = new Router({ prefix: '/operational' });

// 注册operational中间件
operationalRouter.post('/mysql/query-tables',Operational.queryTables);

module.exports = operationalRouter;