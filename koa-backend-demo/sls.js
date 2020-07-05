const Koa = require('koa');
const router = require('koa-router')();
const controller = require('./controller');
const app = new Koa();

// x-response-time 响应时间
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// 配置路由
app.use(controller());

module.exports = app;