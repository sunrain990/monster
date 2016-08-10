/**
 * Created by kevin on 16/6/21.
 */
var co = require('co');
var fs = require('fs');

// function read(file) {
//     return function(fn){
//         fs.readFile(file, 'utf8', function(err,result){
//             if (err) {
//                 console.log(err)
//                 return fn(err);
//             }
//             fn(null, result);
//             console.log('here')
//         });
//     }
// }

var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);


// function read(file) {
//     return function(fn){
//         fs.readFile(file, 'utf8', fn);
//     }
// }


co(function *(){
    console.log('here1')
    var a = yield read('./app.js');
    console.log(a.length);

    var b = yield read('../package.json');
    console.log(b.length);
});