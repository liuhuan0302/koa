const Koa = require('koa');
const collectError = require('../common/error'); 
const app = new Koa();

// function delay(data) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             resolve(data);
//         },2000)
//     })
// }

// 收集错误信息(收集错误信息需要放在所有中间件最上面，可以监控到所有的中间件)
app.use(collectError);

// 中间件1
app.use(async (ctx,next) => {
    const d = await delay('你好!');
    ctx.body = d;
    await next();
})

// 中间件2
app.use(async (ctx, next) => {
    ctx.body += '嘿嘿';
})

// 发布事件
app.on('error', (err) => {
    console.log('err', err.message);
})
// 开启服务
app.listen(3000, _=> {
    console.log('server running at http://127.0.0.1:3000');
})
