/**
 * Created by kevin on 16/5/7.
 */
var Router = require('koa-router');
var logger = require('koa-logger');

function register (app) {
    var router = new Router();
    router.get('/', function(){
        logger('heheheihei');
        this.body = 'Home Page';
    }); // responds to "/"
    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register