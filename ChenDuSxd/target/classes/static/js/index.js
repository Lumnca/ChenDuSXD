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
        jactive: false,
        articles: [],
        article: JSON.parse(gets('_mst')) || {},
        userdata: {},
        fileList: [
            { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        ],
        filter: {
            key: '',
            place: ''
        },
        actives: [
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都龙泉驿区XXX号'
            },
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都锦江区XXX号'
            },
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都武侯区XXX号'
            },
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都青羊区XXX号'
            }
            ,
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都温江区XXX号'
            }
        ],
        active: {
            name: '',
            start_time: '',
            end_time: '',
            date: '',
            state: 0,
            number: 0,
            address: ''
        },
        active1: [
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都温江区XXX号'
            }
        ],
        active2: [
            {
                name: '活动XXXXX',
                start_time: '2017-09-12 14:00',
                end_time: '2017-09-15 12:00',
                date: '2017-09-20 10:00',
                state: 1,
                number: 37,
                address: '成都青羊区XXX号'
            }
        ],
        currentPage: 1,
        pages: 4
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
                    sets("_user", JSON.stringify(app.user))
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
        onSubmit() {
            let data = this.form;
            data.uid = JSON.parse(gets('_user')).id;
            axios.put('http://127.0.0.1:81/users/' + data.uid,data)
                .then(function (response) {
                    app.form = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onSubmitActive(filter) {
            this.actives.forEach(e => {

                e.state = 1;

            });
            if (filter.key != '' && filter.place == '') {
                this.actives.forEach(e => {
                    if (e.name.indexOf(filter.key) == -1 && e.address.indexOf(filter.key) == -1) {
                        e.state = 0;
                    }
                });
            }
            else if (filter.key == '' && filter.place != '') {
                this.actives.forEach(e => {
                    if (e.address.indexOf(filter.place) == -1) {
                        e.state = 0;
                    }
                });
            }
            else if (filter.key != '' && filter.place != '') {
                this.actives.forEach(e => {
                    if (e.name.indexOf(filter.key) == -1 && e.address.indexOf(filter.place) == -1) {
                        e.state = 0;
                    }
                });
            }
            else {
                this.actives.forEach(e => {
                    e.state = 1;
                });
            }
        },
        joinActive(act) {
            this.active = act;
            this.jactive = true;
        },
        enroll(active) {
            this.$message({
                message: '报名成功！',
                type: 'success'
            });
            this.jactive = false;
        },
        handleCurrentChange(val) {
            console.log(val);
        },
        mst(a) {
            sets('_mst', JSON.stringify(a));
            this.reload('show.html');
        }
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

function gets(key) {
    return window.localStorage.getItem(key);
}

function sets(key, value) {
    window.localStorage.setItem(key, value);
}