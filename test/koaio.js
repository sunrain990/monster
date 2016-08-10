/**
 * Created by kevin on 16/6/23.
 */
var koa = require('koa.io');
var staticCache = require('koa-static-cache');
var path = require('path');
var fs = require('fs');

var app = koa();
var port = process.env.PORT || 3000;

var userList = [];
var userModel = {
    hasUser:function(uName){
        return userList.indexOf(uName)>0;
    },
    delUser:function(uName){
        var i = userList.indexOf(uName);
        if(i>0) userList.splice(i,1);
        return userList;
    },
    addUser:function(uName){
        userList.push(uName);
    }
}



// set staict path
app.use(staticCache(path.join(__dirname, '../public')));

// 输出主页面
app.use(function *(){
    this.body = fs.createReadStream(path.join(__dirname, '../public/index.html'));
    this.type = 'html';
});

// 启动服务端口，并打印日志
app.listen(port, function(){
    console.log('Server start at port %d', port);
})

// 监听用户连接和断开
app.io.use(function* (next){
    console.log('新用户已连接!',app.io);
    this.emit('welcome', '欢迎来到 Koa.io 聊天室！');
    yield* next;

    if(this.uName){
        userModel.delUser(this.uName);
        console.log('用户 '+this.uName+' 退出');
        this.broadcast.emit('user_left', this.uName, userList);
    }
});

// 监听add_user动作 并处理请求
app.io.route('add_user', function* (next, uName, color){

    if(userModel.hasUser(uName)){
        console.log('用户名重复！');
        return this.emit('add_user_err', '昵称已被占用了')
    }
    console.log('新用户 '+uName+' 加入');

    this.uName = uName;
    this.color = color;
    userModel.addUser(uName);
    // 触发前端的展示用户的回调
    this.emit('show_users', userList);
    // 广播 新用户加入
    this.broadcast.emit('user_join', uName, userList);
})

// 监听新消息，并广播出去
app.io.route('new_msg', function* (next, msg){
    console.log(this.uName + '发送消息：'+ msg);
    // 广播 用户消息
    this.broadcast.emit('user_say', msg, this.uName, this.color);
    // 触发当前用户展示消息的回调
    this.emit('say_done', msg, this.uName, this.color);
});