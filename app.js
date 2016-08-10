/**
 * Created by kevin on 16/6/22.
 */
let fs = require('fs');
let path = require('path');
let http = require('http');
let koa  = require('koa');

let app = koa(koa);
let port = process.env.PORT || 3000;

//注册全局变量
let glob = require('./config/glob');

//注入koa
require('./config/koa')(app);
//注入路由
require('./routes')(app);

console.log('app location: ' + __filename);
console.log('started on port: ' + port);
console.log('at ' + moment().format('YYYY-MM-DD HH:mm:ss'));

app.listen(port);
module.exports = app;
