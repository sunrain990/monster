/**
 * Created by kevin on 16/6/21.
 */
function co(fn) {
    return function(done1) {
        var ctx = this;
        var gen = fn.call(ctx);
        console.log(ctx, ' - - - - -- !', gen);
        var it = null;
        function _next(err, res) {
            if(err) res = err;

            // console.log(res, 'this is res')
            it = gen.next(res);
            //{value:function(){},done:false}
            console.log(it.value.toString(), 'this is it!');
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}

// var fs = require('fs');
// //一个 thunk 函数
// function read(file) {
//     return function(fn){
//         fs.readFile(file, 'utf8', fn);
//     }
// }
// co(function *(){
//     var c = 2;
//     console.log(c);
//     var a = yield read('app.js');
//     console.log(a.length);
//
//     var b = yield read('../package.json');
//     console.log(b.length);
// })();

module.exports = co;