var checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('年龄不能为空'));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
        } else {
            if (value < 18) {
                callback(new Error('必须年满18岁'));
            } else {
                callback();
            }
        }
    }, 1000);
};
var validateID = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'));
    } else {
        if (app.loginForm.id.indexOf("'") != -1 || app.loginForm.id.indexOf("(") != -1 || app.loginForm.id.indexOf(")") != -1) {
            console.log(app.loginForm.id);
            callback(new Error('非法字符'));
        }
        else {
            callback();
        }

    }
};
var validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        callback();
    }
};
var validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== this.loginForm.pass) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};
var app = new Vue({
    el: '#app',
    data: {
        search: '',
        activeName: 'style',
        ac: 'info',
        circleUrl: "",
        islogin: false,
        centerDialogVisible: false,
        loginForm: {
            pass: '',
            checkPass: '',
            age: '',
            id: '',
            number: 0,
            result: -1
        },
        rules: {
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
                { validator: checkAge, trigger: 'blur' }
            ],
            id: [
                { validator: validateID, trigger: 'blur' }
            ]
        },
        user: JSON.parse(gets("_user")) || { id: '', name: 'Lumnca' },
        form1: {
            isCost: '全部',
            type: []
        },
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        currentPage: 1,
        pages: 5,
        activeName: 'first',
        form: {
            name: '周士林',
            region: '是',
            date1: '1999-02-12',
            tel: '13280010211',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
            familyName: ''
        },
        articles : [
            {
                title : '好时光',
                state : 0,
                date : '2019-06-24',
                er_info : '指定了人员信息'
            },
            {
                title : '好时光',
                state : 0,
                date : '2019-06-24',
                er_info : '主题不符合'
            },
        ],
        article : {
            title : '',
            type : '',
            content : ''
        },
        fileList: [
            {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        ]
    },
    methods: {
        reload(url) {
            window.location.href = url;
        },
        submitForm(formName) {

            this.$refs[formName].validate((valid) => {

                if (valid) {
                    app.$message({
                        message: '登录成功!',
                        type: 'success'
                    });
                    app.user.id = app.loginForm.id;
                    app.user.name = app.loginForm.id;
                    app.islogin = true;
                    app.centerDialogVisible = false;
                    sets("_user",JSON.stringify(app.user))
                } else {
                    this.$message.error('验证错误！检查输入');
                    return false;
                }
            });
        },
        out() {
            this.user = { id: '' }
            window.localStorage.clear('_user');
            this.islogin = false;
            window.location.href = "index.html";
        },
        onSubmit(){

        },

    },
    computed: {
        isLoginCheck() {
            if (this.user.id == '') {
                this.islogin = false;
                return '未登录'
            }
            else {
                this.islogin = true;
                return ''
            }
        },
    },
});

function gets(key){
    return window.localStorage.getItem(key);
}

function sets(key,value){
    window.localStorage.setItem(key,value);
}