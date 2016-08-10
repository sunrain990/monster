/**
 * Created by kevin on 16/6/21.
 */
var koa = require('koa');
var app = koa();

var onerror = require('koa-onerror');
onerror(app);

// app.use(function *() {
//     var path = this.path;
//     this.body = path;
// });


// var _ = require('underscore');
// //本地/开发环境配置
// var local = require('./local');
// if(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'){
//     //使用local.js中的配置覆盖config.js中的配置
//     config = _.extend(config,local);
// }


var config = require('./config/config');
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

app.get('/config',function *(){
    var config = this.config;
    this.body = config.env;
});


var router = require('koa-router');
app.use(router(app));

app.param('id',function *(id,next){
    this.id = Number(id);
    if ( typeof this.id != 'number') return this.status = 404;
    yield next;
}).get('/detail/:id', function *(next) {
    //我是详情页面
    var id = this.id; //123
    this.body = id;

});

app.listen(3000)

