module.exports = async (cxt, next) => {
    try{
        // 如果没有错误则往下执行
        await next();
    } catch(err) {
        // 如果错误,则把错误信息和状态码返回到页面
        cxt.status = err.statusCode || err.status || 500;
        cxt.body = err.message;

        console.log('err',err);

        //错误返回到服务器上 第一个参数:订阅的事件   第二参数:传入的参数(报的错误)
        //要执行发布的事件必须进行订阅,如果有错就会执行error事件,将错误返回之前的回调
        cxt.app.emit('error',err);

   }
}