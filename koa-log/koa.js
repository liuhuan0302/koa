/**
 * koa 
 *  洋葱圈模型
 *  async + await
 *
 * 
*/

const Koa = require('Koa');

const app = new Koa();

// 应用中间件(先进后出)  use中间件优先级最高
app.use((ctx, next) =>{
  ctx.body = '1';
  next();
  ctx.body += '4'
})

app.use((ctx, next) =>{
  ctx.body += '2';
  next();
  ctx.body += '5'
})

app.use((ctx, next) =>{
  ctx.body += '3';
  next();
  ctx.body += '6';
})

app.listen(3000,_=>{
  console.log('running')
})

