const koa = require('koa');
const cors = require("koa2-cors");// 解决跨域
const { koaBody } = require('koa-body');// 解析post请求
const static = require("koa-static");// 静态资源
const logger = require('koa-logger');// 日志
const routes = require("./routes/index");// 路由
const mongoose = require("./lib/mongoose");// 数据库模块

const app = new koa();
mongoose.connect();

// 挂载中间件
app.use(cors({ // 指定一个或多个可以跨域的域名
    origin: function (ctx) { return '*'; },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true,  // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],  // 设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}));
app.use(logger());
app.use(koaBody());
app.use(routes.routes()).
    use(routes.allowedMethods());

module.exports = app