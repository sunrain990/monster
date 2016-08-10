/**
 * Created by kevin on 16/5/8.
 */
var Router = require('koa-router');
var logger = require('koa-logger');
var debug = require('debug')('book');

function register (app) {
    var router = new Router({
        prefix: '/config'
    });
    router.get('/', function(){
        var config = this.config;
        debug('env:%s',config.env);
        this.body = config;
    }); // responds to "/api"
    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register;