const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const koaViews = require('koa-views'); // 配置模版引擎
const koaStatic = require('koa-static');// 静态资源部署
const koaBodyParser = require('koa-bodyparser'); // 处理post请求参数

const app = new Koa();
const router = new Router();

// 配置模版引擎 模版引擎是编译城字符串 放在服务端渲染的
// 第一次参数： 模版引擎存放的路径 第二个参数： 使用的是哪种模版引擎
console.log(path.join(__dirname, '../', 'public/ejs'))
app.use(koaViews(path.join(__dirname, '../', 'public/ejs')),{extension: 'ejs'});
// 静态资源部署
app.use(koaStatic(path.join(__dirname ,'../public')));
console.log(path.join(__dirname ,'../public'));
app.use(koaBodyParser());

// 注册路由
router.get('/', async (cxt) => {
    await (cxt.render('index.ejs', {
        // 传入ejs 文件的参数
        name: '马冬梅',
        html: '<h3>马冬梅</h3>',
        num: 21,
        obj: [{a:1,b:2},{a:3,b:4},{a:5,b:6}]
    }))
})

// 注册路由 处理post请求
router.get('/post',async (cxt) => {
    await (cxt.render("post.ejs"));
});

// 注册路由 处理post请求
router.get('/zbj',async (cxt) => {
    await (cxt.body = '我是你二哥');
})

//获取前端请求的信息
router.post('/user',(cxt)=>{
    cxt.body = cxt.request.body;
    //请求的信息
    console.log(cxt.request.body);//{ userName: '123', password: '123' }
})

//第三方模块在koa 中使用,必须要用app.use
//注册路由,让路由生效
app
    .use(router.routes())
    .use(router.allowedMethods());//根据当前状态进行编译(content-type)

// 开启服务
app.listen(3000, _=> {
    console.log('server running at http://127.0.0.1:3000');
})