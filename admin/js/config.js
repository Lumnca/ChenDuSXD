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
            {index : '2-2',title : '提交管理',herf : 'loginlog.html'}
        ]
    },
    {
        index : '3',
        title : '设置',
        icon: 'el-icon-setting',
        menu : [
            {index : '3-1',title : '网站设置',herf : 'loginlog.html'},
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
        ]
    },
    methods: {
        updateUser(user){
            this.user = user;
            this.dialogVisible = true;

        }
    },
})
