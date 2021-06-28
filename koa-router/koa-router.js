const Koa = require('koa');
const Router = require('koa-router');
const koaViews = require('koa-views');

const app = new Koa();
const router = new Router();

// 第三方模块在koa中使用，必须要用app.use
//路由注册，让路由生效
console.log('router', router);
app 
    .use(router.routes())
    .use(router.allowedMethods());// 根据当前的状态进行编译

// 设置没有找到路由， 则返回404
// 这个中间的优先级要比其他的路由中间要高
app.use(async (cxt, next) => {
    await next();
    if (cxt.status === 404){
        cxt.body = '404 NOT FOUND';
    }
})

//注册路由
router.get('/', async (cxt) => {
    console.log('cxt',cxt);
    cxt.body = '我是根路由';
})

router.get('/zbj',(cxt) => {
    cxt.body = '我是你二哥';
})

// 动态路由
router.get('/zbj/:hhh',(cxt) => {
    console.log('ctx', cxt.url);
    if (cxt.request.url === '/zbj/aaaa'){
        cxt.body = 'AAAAA';
    } else if( cxt.request.url === '/zbj/bbbb'){
        cxt.body = 'BBBBB'
    }
}) 

// 开启服务
app.listen(3000, _=> {
    console.log('server running at http://127.0.0.1:3000');
})
