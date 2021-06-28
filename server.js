/**
 * koa开启服务
 * app.use 是koa的应用级中间件（执行的优先级高于其他的中间件）
 * content 完整的上下文
*/
const Koa = require('koa');

const app = new Koa();
console.log(app);

app.use((content, next)=>{
  console.log(content.request);
 
  content.type = 'text/plain';
  content.body = '<h1>阿哈哈哈哈</h1>';
  content.body += '2222';
  console.log(content);
  console.log(content.response);
})

app.listen(3000,_=>{
  console.log('server running at http://127.0.0.1:3000')
})