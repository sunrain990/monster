/**
 * Created by kevin on 16/5/7.
 */
var Router = require('koa-router');
var logger = require('koa-logger');

function register (app) {
    var router = new Router({
        prefix: '/api'
    });
    router.get('/', function(){
        this.body = 'foo';
    }); // responds to "/api"
    router.get('/messages/:id', function(){
        this.body = this.params.id;
    }); // responds to "/api/messages"
    app.use(router.routes());
    app.use(router.allowedMethods());
}

module.exports = register;