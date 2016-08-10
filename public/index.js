/**
 * Created by kevin on 16/6/23.
 */
var chat_Utils = {},
    chat_UI={},
    chat_Socket={};
var
    $nameIpt = $('#usernameInput'),
    $msgBox = $('#msgBox'),
    $msgIpt = $('#msgIpt'),
    $loginPage = $('#loginPage'),
    $chatPage = $('#chatPage'),
    $userList = $('#userList'),
    $userNum = $('#userNum'),
    $currUser = $('#currUser'),
    $currIpt = $nameIpt,
    socket = io();
currName = null;
chat_Utils = {
    xssClean:function(str){
        return $('<div/>').text(str).text();
    },
    getTime:function(){
        var t = new Date(), time=[];
        time.push(t.getHours(),t.getMinutes(),t.getSeconds());
        time.map(function(v, i){
            return (v < 10 ? '0' + v : v);
        });
        return time.join(':');
    },
    getColor:function(){
        var c1 = Math.ceil(Math.random()*(250-80+1)+80).toString(16);
        var c2 = Math.ceil(Math.random()*(240-190+1)+190).toString(16);
        var c3 = Math.ceil(Math.random()*(240-190+1)+190).toString(16);
        return '#'+c1+''+c2+''+c3;
    }
}
chat_UI = {
    init:function(){
        this.iptChangeEv();
        this.keyDownEv();
    },
    iptChangeEv:function(){
        $('.usernameInput').on('keyup change', function (e) {
            var input = $(e.currentTarget);
            if ($.trim(input.val()) !== '') {
                input.addClass('dirty');
            } else {
                input.removeClass('dirty');
            }
        });
    },
    keyDownEv:function(){
        var self = this;
        $(window).keydown(function(e){
            if(!(e.ctrlKey || e.metaKey || e.altKey)){}
            if(e.which === 13){
                if(currName){
                    self.sendMsg();
                }else{
                    self.setUsername();
                }
            }
        });
    },
    setUsername:function(){
        currName = chat_Utils.xssClean($nameIpt.val().trim());
        if(currName){
            $loginPage.fadeOut(function(){ $(this).remove();});
            $chatPage.show();
            $currIpt = $msgIpt.focus();
            $currUser.val(currName);
            socket.emit('add_user', currName, chat_Utils.getColor());
        }
    },
    addMsg:function(_time, _msg, _name, _clr){
        var msgHtml = [];
        var msgAlignCls = _name == $currUser.val() ? 'msg-right' : 'msg-left';
        if(_name){ //用户消息
            msgHtml.push('<li class="msg-item '+msgAlignCls+'">\
                            <dl class="box" style="color:'+_clr+';">\
                              <dt class="name">'+_name+'</dt>\
                              <dd class="con">'+_msg+'</dd>\
                            </dl>\
                        </li>');
        }else{	//系统消息
            msgHtml.push('<li class="msg-sys"><p class="con">'+_msg+'&emsp;<time>'+_time+'</time></p></li>');
        }
        $(msgHtml.join('')).hide().appendTo($msgBox).fadeIn();
        $msgBox[0].scrollTop = $msgBox[0].scrollHeight;
    },
    showUsers:function(userList){
        var listStr = [];
        userList = userList.map(function(v ,i){
            return '<li>'+v+'<li>';
        });
        $userList.html(userList.join(''));
        $userNum.text(userList.length);
    },
    sendMsg:function(){
        var msg = chat_Utils.xssClean($msgIpt.val());
        if(msg){
            socket.emit('new_msg', msg);
            $msgIpt.val('');
        }
    }
}
chat_Socket = {
    init:function(){
        this.welcomeEv(); 	 //监听回调 欢迎
        this.addUserErrEv(); //监听回调 用户名重复
        this.userJoinEv(); 	 //监听广播 新用户加入
        this.userLeftEv(); 	 //监听广播 用户退出
        this.userSayEv(); 	 //监听广播 展示其它用户消息和当前用户消息
        this.showUsersEv();	 //监听回调 展示在线用户
    },
    addUserErrEv:function(){
        socket.on('add_user_err',function(err){
            alert(err);
        })
    },
    userJoinEv:function(){
        socket.on('user_join',function(uName, userList, color){
            chat_UI.addMsg(chat_Utils.getTime(),'新用户 <b>'+uName+'</b> 加入');
            chat_UI.showUsers(userList);
            console.log(userList);
        })
    },
    userLeftEv:function(){
        socket.on('user_left', function(uName, userList){
            chat_UI.addMsg(chat_Utils.getTime(), '用户 <b>'+uName+'</b> 退出');
            chat_UI.showUsers(userList);
            console.log(userList);
        })
    },
    userSayEv:function(){
        // 接收其它用户广播的回调
        socket.on('user_say', function(msg, uName, color){
            chat_UI.addMsg(chat_Utils.getTime(), msg, uName, color);
        });
        // 接收当前用户新消息的回调
        socket.on('say_done', function(msg, uName, color){
            chat_UI.addMsg(chat_Utils.getTime(), msg, uName, color);
        });
    },
    welcomeEv:function(){
        socket.on('welcome', function(msg){
            console.log('u r welcome');
            chat_UI.addMsg(chat_Utils.getTime(), msg);
        })
    },
    showUsersEv:function(){
        socket.on('show_users', function(userList){
            chat_UI.showUsers(userList);
        })
    }
}
chat_UI.init();
chat_Socket.init();