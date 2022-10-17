const Router = require('koa-router');
const user = require('./user');

const router = new Router({ prefix: '/api' });

// 注册api中间件
router.use(user.routes());

// api可用性测试
router.get('/', async (ctx) => {
  ctx.body = "GET IS OK";
})

router.post('/', async (ctx) => {
  ctx.body = 'POST IS OK';
});

router.put('/', async (ctx) => {
  ctx.body = 'PUT IS OK';
});

router.delete('/', async (ctx) => {
  ctx.body = 'DELETE IS OK';
});

router.patch('/', async (ctx) => {
  ctx.body = 'PATCH IS OK';
});

module.exports = router;