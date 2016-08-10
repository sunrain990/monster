/**
 * Created by kevin on 16/7/4.
 */
var koa = require('koa');
var app = koa();
app.listen(3000);

var http = require('http');
var app = koa();
http.createServer(app.callback()).listen(4000);

app.listen = function() {
    debug('listen');
    var server = http.createServer(this.callback());
    return server.listen.apply(server, arguments);
}

app.callback = function() {
    return function(req, res) {
        res.statusCode = 404;
        var ctx = self.createContext(req, res);
    }
}