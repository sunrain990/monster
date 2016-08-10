/**
 * Created by kevin on 16/5/7.
 */
// const fs = require('co-fs');
const fs1 = require('fs');

function register(app){
    var dirname = 'api';
    fs1.readdir(path.join(__dirname,dirname),function(err,files){
        if(err){
            console.log('read dir error');
        }else{
            files.forEach(function(item){
                // require('./'+dirname+'/'+item)(app);
                require(path.join(__dirname,dirname,item))(app);
            });
        }
    });

    //var files = paths.map(function(path){
    //    return fs.readFile('routes/api/' + path, 'utf8');
    //});
    //
    //this.type = 'markdown';
    //this.body = files.join('');
    //require('./api/foo')(app);
    //require('./api/bar')(app);

}

module.exports = register;