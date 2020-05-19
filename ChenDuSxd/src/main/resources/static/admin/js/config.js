var host = "http://127.0.0.1:81";
var eu = [
    {
        index : '1',
        title : '日志',
        icon: 'el-icon-tickets',
        menu : [
            {index : '1-1',title : '登录日志',herf : 'loginlog.html'},
            {index : '1-2',title : '操作日志',herf : 'operlog.html'},
            {index : '1-3',title : '运行日志',herf : 'runlog.html'}
        ]
    },
    {
        index : '2',
        title : '管理',
        icon: 'el-icon-menu',
        menu : [
            {index : '2-1',title : '用户管理',herf : 'user.html'},
            {index : '2-2',title : '提交管理',herf : 'submit.html'},
            {index : '2-3',title : '信息管理',herf : 'message.html'},
            {index : '2-4',title : '资源管理',herf : 'file.html'},
            {index : '2-5',title : '权限管理',herf : 'menu.html'}
        ]
    },
    {
        index : '3',
        title : '设置',
        icon: 'el-icon-setting',
        menu : [
            {index : '3-1',title : '网站设置',herf : 'setting.html'},
        ]
    }
];



var app = new Vue({
    el: '#app',
    data: {
        LF : returnCitySN,
        menu : eu,
        dialogVisible :false,
        dialogVisible2 :false,
        dialogVisible3 :false,
        currentPage1 : 0,
        maxN1 : 10,
        user : {id:'',_username:'',_enabled:'',roles:'',_locked:'',password:''},
        juser: {username:'sang',tel:'41412551',name:'xxx',state:0},
        search : '',
        info : {},
        logins : [
        ],
        opes :[
        ],
        sizes : 10,
        users : [],
        articles : [
            {id:1,date:'2020-5-2 12:41',info:'',username:'sang',title:'云骑士',state:1},
            {id:2,date:'2020-5-2 12:41',info:'',username:'zsl',title:'华达呢',state:0}
        ],
        activeNames : ["1"],
        actives : [
            {id:'1',name:'XXX活动',number:'27',address:'XXXXXX',start_time:'2020-5-1 12:00',end_time:'2020-5-2 12:00',date:'2020-5-3 12:00'},
            {id:'2',name:'XXX活动',number:'57',address:'XXXXXX',start_time:'2020-5-1 12:00',end_time:'2020-5-2 12:00',date:'2020-5-3 12:00'}
        ],
        people : [
            {username:'sang',tel:'41412551',name:'xxx',state:0},
            {username:'sang',tel:'41412551',name:'xxx',state:1},
            {username:'sang',tel:'41412551',name:'xxx',state:2},
        ],
        webM : [
            {id:1,title : 'XXXXXXXXXXXXXXXXXXXXXXX',content:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',date:'2020-5-1',object:'休息休息',source:'xaxada'},
            {id:2,title : 'XXXXXXXXXXXXXXXXXXXXXXX',content:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',date:'2020-5-1',object:'休息休息',source:'xaxada'},
        ],
        hrefs : [
            {id:1,title:"xxx",herf:"xxxx"}
        ],
        href:   {id:1,title:"xxx",herf:"xxxx"},
        notice:{id:1,title : '',content:'',date:'',object:'',source:''},
        article : {
            content : '',
            imgurl : ''
        },
        act : {id:999,name:'活动名称',number:'0',address:'成都市',start_time:'2020-1-1 12:00',end_time:'2020-1-1 12:00',date:'2020-1-1 12:00',state:1,info:'',uid:0},
        isAdd : false,
        messages : [],
        message : {
            id :999,
            date : dateFormat(new Date(),1),
            source : "管理员",
            content : "",
            object : "",
            uid : "admin",
            state : 0
        },
        runs : [],
        files : [],
        menuRoles : [{
            id : 100,
            pattern : "2",
            rname : "42",
            rnameZh : "242",
            rid : ''
        }],
        menuRole:{
            id : 100,
            pattern : "",
            rname : "",
            rnameZh : ""
        }
    },
    methods: {
        updateUser(user){
            this.user = user;
            this.dialogVisible = true;
        },
        handleEdit(m){
            m.state = 1;
            axios.put(host+'/messages/'+m.id, m)
                .then(function (response) {
                    app.$message({
                        message: '确认成功！',
                        type: 'success'
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        updateUserPassword(user){
            axios.post(host+'/admin/set',{
                username : user._username,
                password:user.password
            })
                .then(function (response) {

                    app.$message(response.data.message);

                    operationPost("修改用户密码","修改了账户ID为："+user._username+" 的密码")
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });

            this.dialogVisible = false;
        },
        reherf(url){
            window.location.href = url;
        },
        getPeopleInfo(a){
            window.localStorage.setItem('_ac',JSON.stringify(a));
            this.reherf('people.html');
        },
        onSubmitMessage(message){
            axios.post(host+'/messages',message)
                .then(function (response) {

                    app.$message("发送成功！");

                    operationPost("发送消息",  message.uid +" 向 "+ message.object +"  发送了一条信息");
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });

            this.dialogVisible = false;
        },
        updateActiveInfo(a){
            this.act = a;
            this.isAdd = false;
            this.dialogVisible3 = true;
        },
        addActive(){
            this.act.uid = JSON.parse(window.localStorage.getItem("_user")).id;
            this.dialogVisible3 = true;
            this.isAdd = true;
        },
        upAct(act){
         if(!this.isAdd){
             act.start_time = dateFormat(new Date(act.start_time),1);
             act.end_time = dateFormat(new Date(act.end_time ),1);
             act.date = dateFormat(new Date( act.date ),1);

             axios.put(host+'/actives/'+act.id,act)
                 .then(function (response) {

                     app.$message({
                         message: '修改成功！',
                         type: 'success'
                     });

                     operationPost("修改活动！","修改了ID为："+act.id+" 的活动")
                 })
                 .catch(function (error) {
                     app.$message("操作失败！");
                     console.log(error);
                 });
         }
         else{
             act.start_time = dateFormat(new Date(act.start_time),1);
             act.end_time = dateFormat(new Date(act.end_time ),1);
             act.date = dateFormat(new Date( act.date ),1);

             axios.post(host+'/actives/',act)
                 .then(function (response) {

                     app.$message({
                         message: '添加成功！',
                         type: 'success'
                     });

                     operationPost("添加活动！","用户ID为："+act.uid+" 添加了名称为："+act.name+" 的活动")
                 })
                 .catch(function (error) {
                     app.$message("操作失败！");
                     console.log(error);
                 });
         }


          this.dialogVisible3 = false;
        },
        updateMenu1(m){
            this.dialogVisible = true;
            this.menuRole = m;
        },
        updateMenu2(m){
            axios.post(host+'/admin/updateMenu',{
                id : m.id,
                pattern : m.pattern
            })
                .then(function (response) {
                    app.$message({
                        message: response.data.message
                    });
                    operationPost("修改url拦截格式","修改了ID为："+m.id+"的路由 格式为："+m.pattern)
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible = false;
        },
        deleteMenu(m){
            axios.delete(host+'/admin/deleteMenu/'+m.id)
                .then(function (response) {

                    axios.delete(host+'/admin/deleteMenuRole/'+m.id)
                        .then(function (response) {

                            app.$message({
                                message: response.data.message
                            });

                            operationPost("删除url拦截格式","删除ID为："+m.id+"的路由 格式为："+m.pattern);

                            setTimeout(()=>{
                                window.location.reload();
                            },2000);

                        })
                        .catch(function (error) {
                            app.$message("操作失败！");
                            console.log(error);
                        });

                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
        },
        insertMenu(m){

            axios.post(host+'/admin/insertMenu',{
                id : m.id,
                pattern : m.pattern
            })
                .then(function (response) {

                    axios.post(host+'/admin/addMenuRole',{
                        mid : m.id,
                        rid : m.rid
                    })
                        .then(function (response) {
                            app.$message({
                                message: response.data.message
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    operationPost("添加url拦截格式","添加了ID为："+m.id+"的路由 格式为："+m.pattern);

                    setTimeout(()=>{
                        window.location.reload();
                    },2000);

                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible2 = false;
        },
        dealUser(user){
            this.juser = user;
            this.dialogVisible = true;
        },
        updateInfo(i){
            this.info = i;
            this.dialogVisible = true;
        },
        updateNotice(notice){
            this.notice = notice;
            this.dialogVisible = true;
        },
        updateHref(href){
            this.href =   href;
            this.dialogVisible2 = true;
        },
        noticePost(notice){
            notice.id =  notice._links.notice.href.split('/').pop();

            axios.put(host+'/notices/'+notice.id,notice)
                .then(function (response) {

                    app.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    operationPost("修改通告！","修改了ID为："+notice.id+"的通告")
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible = false;
        },
        hrefPost(href){
            href.id =  href._links.herf.href.split('/').pop();
            axios.put(host+'/hrefs/'+href.id,href)
                .then(function (response) {
                    app.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    operationPost("修改网站链接","修改了ID为"+href.id+"网站链接")
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible2 = false;
        },
        handleSizeChange(val) {
          app.sizes = val;
        },
        handleCurrentChange(val) {
            axios.get(host+'/lls/',{
                params:{
                    page : val-1,
                    size: app.sizes
                }
            })
                .then(function (response) {
                    app.maxN1 = response.data.page.totalElements;
                    app.logins = response.data._embedded.loginLogs;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange2(val) {
            axios.get(host+'/ols/',{
                params:{
                    page : val-1,
                    size: app.sizes
                }
            })
                .then(function (response) {
                    app.maxN1 = response.data.page.totalElements;
                    app.opes = response.data._embedded.operationLogs;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange3(val) {
            axios.get(host+'/articles/',{
                params:{
                    page : val-1,
                    size: app.sizes
                }
            })
                .then(function (response) {
                    app.maxN1 = response.data.page.totalElements;
                    app.articles = response.data._embedded.articles;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange4(val) {
            axios.get(host+'/rls/',{
                params:{
                    page : val-1,
                    size: app.sizes
                }
            })
                .then(function (response) {
                    app.maxN1 = response.data.page.totalElements;
                    app.runs = response.data._embedded.runLogs;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        lookArt(art){
            this.dialogVisible = true;
            this.article = art;
        },
        checkArt(art){
            this.dialogVisible2 = true;
            this.article = art;
        },
        shArt(article){
            article.id =  article._links.article.href.split('/').pop();
            article.publishtime = dateFormat(new Date(),1);
            axios.put(host+'/articles/'+article.id,article)
                .then(function (response) {
                    app.$message("修改成功！");
                    operationPost("修改文章","文章ID号:"+article.id+"被修改！")
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible2 = false;
        },
        peopleAc(juser){
            axios.post(host+'/ac',{
                s : juser.state,
                aid : JSON.parse(window.localStorage.getItem("_ac")).id,
                uid : juser.uid
            })
                .then(function (response) {
                    app.$message("修改成功！");
                    operationPost("审核活动人员","用户ID:"+juser.uid+" 活动ID:"+JSON.parse(window.localStorage.getItem("_ac")).id+" 状态："+juser.state)
                })
                .catch(function (error) {
                    app.$message("操作失败！");
                    console.log(error);
                });
            this.dialogVisible = false;
        },
        handleDeleteFile(file){
            axios.delete(host+'/admin/delete/'+file.name)
            .then(function (response) {
                app.$message(response.data.message);
                operationPost("删除文件","用户 admin 删除了文件,文件url: "+file.url)
            })
            .catch(function (error) {
                app.$message("操作失败！");
                console.log(error);
            });
        },
        lockedUser(user){


            if(user._locked==0){
                user._locked = 1;
            }
            else{
                user._locked = 0;
            }

            app.$confirm('确定锁定或者解除锁定账户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                    }).then(() => {
                        axios.post(host+'/admin/locked/',{
                            name : user._username,
                            s : user._locked
                        })
                            .then(function (response) {
                                app.$message(response.data.message);
                                operationPost("账户锁定/解锁操作","被操作用户ID:"+user._username);
                                setTimeout(()=>{
                                    window.location.reload();
                                },2000)
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }).catch(() => {
                        app.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                });
        },
        deleteUser(user){


            app.$confirm('此操作将会导致用户不可用，并且无法修改，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post(host+'/admin/del/'+user._username)
                    .then(function (response) {
                        app.$message(response.data.message);
                        operationPost("禁用账户","禁用ID:"+user._username);
                        setTimeout(()=>{
                            window.location.reload();
                    },2000)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                    });
        }
    },
})



function dateFormat(date, type) {
    if (type == 1) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
    }
    else if(type == 2){

    }
    else {
        return (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ":" + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
    }
}


function operationPost(op,info) {
    let o = {
        id : 9999,
        date : dateFormat(new Date(),1),
        user : JSON.parse(window.localStorage.getItem("_user")).username,
        operation : op,
        info : info
    }
    axios.post(host+'/ols', o)
        .then(function (response) {
            console.log("POST YES");
        })
        .catch(function (error) {
            console.log(error);
        });
}

