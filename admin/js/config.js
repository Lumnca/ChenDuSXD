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
        user : {id:'',username:'',auth:'',role:''},
        juser: {username:'sang',tel:'41412551',name:'xxx',state:0},
        search : '',
        info : {},
        logins : [
            {id:1,date:'2020-5-8 14:12:35',username:'admin',ip:'127.0.0.1',address:'四川成都'},
            {id:2,date:'2020-5-8 17:21:21',username:'admin',ip:'127.0.0.1',address:'四川成都'},
            {id:3,date:'2020-5-9 19:08:12',username:'admin',ip:'127.0.0.1',address:'四川成都'},
        ],
        opes :[
            {id:1,date:'2020-5-9 19:08:12',username:'admin',method:'添加数据',info:'添加了一条用户指令！'},
            {id:2,date:'2020-5-9 19:08:12',username:'admin',method:'添加数据',info:'添加了一条用户指令！'},
        ],
        users : [
            {id:1,username:'admin',auth :['后台操作'],role:'管理员'},
            {id:2,username:'sang',auth :['一般用户'],role:'用户'},
            {id:3,username:'lmc',auth :['一般用户'],role:'用户'}
        ],
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
        }
    },
})
