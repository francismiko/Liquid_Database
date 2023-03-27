// 单元测试模块
const Router = require('koa-router');
const testRouter = new Router({ prefix: '/test' });
const UnitTest = require('./controller');

// testRouter.get('/get', UnitTest.get);
// testRouter.post('/post', UnitTest.post);
// testRouter.put('/put', UnitTest.put);
// testRouter.delete('/delete', UnitTest.delete);

module.exports = testRouter;