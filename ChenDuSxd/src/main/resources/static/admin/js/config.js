var host = "http://127.0.0.1:81";
var eu = [
    {
        index : '1',
        title : '日志',
        icon: 'el-icon-tickets',
        menu : [
            {index : '1-1',title : '登录日志',herf : 'loginlog.html'},
            {index : '1-2',title : '操作日志',herf : 'operlog.html'}
        ]
    },
    {
        index : '2',
        title : '管理',
        icon: 'el-icon-menu',
        menu : [
            {index : '2-1',title : '用户管理',herf : 'user.html'},
            {index : '2-2',title : '提交管理',herf : 'submit.html'}
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
        currentPage1 : 0,
        maxN1 : 100,
        user : {id:'',_username:'',_enabled:'',roles:'',_locked:''},
        juser: {username:'sang',tel:'41412551',name:'xxx',state:0},
        search : '',
        info : {},
        logins : [
        ],
        opes :[
        ],
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
            {id:1,title : 'XXXXXXXXXXXXXXXXXXXXXXX',info:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {id:2,title : 'XXXXXXXXXXXXXXXXXXXXXXX',info:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {id:3,title : 'XXXXXXXXXXXXXXXXXXXXXXX',info:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {id:4,title : 'XXXXXXXXXXXXXXXXXXXXXXX',info:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
            {id:5,title : 'XXXXXXXXXXXXXXXXXXXXXXX',info:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
        ]
    },
    methods: {
        updateUser(user){
            this.user = user;
            this.dialogVisible = true;
        },
        reherf(url){
            window.location.href = url;
        },
        getPeopleInfo(a){
            window.localStorage.setItem('_ac',JSON.stringify(a));
            this.reherf('people.html');
        },
        dealUser(user){
            this.juser = user;
            this.dialogVisible = true;
        },
        updateInfo(i){
            this.info = i;
            this.dialogVisible = true;
        },
        handleCurrentChange(val) {
            axios.get(host+'/lls/',{
                params:{
                    page : val-1,
                    size:10
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
                    size:10
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
