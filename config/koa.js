/**
 * Created by kevin on 16/6/22.
 */
//静态页面
let serve = require('koa-static');
//路由
let router = require('koa-router');
// //视图模版
// let views = require('co-views');
// //session
// let session = require('koa-session');
//时间花费记录
let responseTime = require('../app/middlewares/x-response-time');
// //静态缓存文件
// let staticCache = require('koa-static-cache');
// //压缩服务
// let compress = require('koa-compress');
// let onerror = require('koa-onerror');


module.exports = function(app) {

    // app.use(function *(next){
    //     //config 注入中间件，方便调用配置信息
    //     if(!this.glob){
    //         this.glob = glob;
    //     }
    //     yield next;
    // });

    // responseTime
    app.use(responseTime());
    // app.use(compress());
    // app.keys = ['session'];
    // app.use(session(app));
    // onerror(app);

    app.use(serve(path.join(__dirname,'../public')));
}