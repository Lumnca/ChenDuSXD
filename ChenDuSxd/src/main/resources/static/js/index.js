var host = "http://127.0.0.1:81"; 


var checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('电话不能为空'));
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
        } else {
                callback();
            }
    }, 1000);
};
var validateID = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入账号'));
    } else {
        if (app.loginForm.username.indexOf("'") != -1 || app.loginForm.username.indexOf("(") != -1 || app.loginForm.username.indexOf(")") != -1) {
            callback(new Error('非法字符'));
        }
        else if(app.loginForm.username.length<3&&app.loginForm.username.length>20){
            callback(new Error('长度只能在3~20'));
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
    } else if (value !== app.loginForm.password) {
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
        nameZ : "",
        islogin: false,
        centerDialogVisible: false,
        loginForm: {
            password: '',
            checkPass: '',
            tel: '',
            username: '',
            result: -1,
            email : '',
            auth:''
        },
        rules: {
            password: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            tel: [
                { validator: checkAge, trigger: 'blur' }
            ],
            username: [
                { validator: validateID, trigger: 'blur' }
            ],
            email: [
                { validator: validateID, trigger: 'blur' }
            ],
            auth: [
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
        disabled : false,
        disabledTest : '',
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
        form2: {
            title: '',
            type: '',
            imgurl: 'lb.png',
            content: ''
        },
        jactive: false,
        jactive2: false,
        articles: [],
        article: JSON.parse(gets('_mst')) || {},
        userdata: {},
        fileList: [
            { name: 'lb.png', url: host+ '/public/lb.png' },
        ],
        filter: {
            key: '',
            place: ''
        },
        sh_articles: [],
        tg_articles: [],
        er_articles: [],
        actives: [  {id:'1',name:'XXX活动',number:'27',address:'XXXXXX',start_time:'2020-5-1 12:00',end_time:'2020-5-2 12:00',date:'2020-5-3 12:00'},
            {id:'2',name:'XXX活动',number:'57',address:'XXXXXX',start_time:'2020-5-1 12:00',end_time:'2020-5-2 12:00',date:'2020-5-3 12:00'}],
        active: {
            name: '',
            start_time: '',
            end_time: '',
            date: '',
            state: 0,
            number: 0,
            address: '',
            pname: '',
            telphone: ''
        },
        active1: [],
        active2: [],
        currentPage: 1,
        pages: 4,
        maxIndex: 0,
        ui : 0,
        x : {
            title:"",date:"",source : "",object:"",content:""
        },
        tg : [],
        xx : [],
        hr : [],
        messages : [],
        dialogVisible : false,
        message : {
            id :999,
            date : dateFormat(new Date(),1),
            source : "用户",
            content : "",
            object : "admin",
            uid : "",
            state : 0
        }
    },
    methods: {
        reload(url) {
            window.location.href = url;
        },
        onSubmitMessage(message){
            message.uid =  JSON.parse(window.localStorage.getItem("_user")).id;
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
        showXX(p){
            sets("_xx",JSON.stringify(p));
            this.reload('info.html');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {

                if (valid) {
                    let yu = {
                        _id : 999,
                        _username : app.loginForm.username,
                        _password : app.loginForm.password,
                        _enabled : 1,
                        _locked : 0

                    }
                    axios.post(host+ '/adduser',yu)
                        .then(function (response) {
                            app.$message({
                                message: response.data.message,
                                type: 'info'
                            });
                            operationPost("注册用户",yu._username+"用户被注册了")
                            window.location.href = "index.html";
                        })
                        .catch(function (error) {
                            app.$message.error('检查错误');
                        });

                } else {
                    this.$message.error('验证错误！检查输入');
                    return false;
                }
            });
        },
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.post(host+ '/reuser',{
                        username : app.loginForm.username,
                        auth : app.loginForm.auth,
                        password : app.loginForm.password
                    })
                        .then(function (response) {
                            app.$message({
                                message: response.data.message,
                                type: 'info'
                            });

                            operationPost("密码重置！",app.loginForm.username+" 用户密码被重置！");

                            setTimeout(()=>{
                                window.location.href = "index.html";
                            },3000);
                        })
                        .catch(function (error) {
                            app.$message.error('检查错误');
                        });
                }
                else{
                     app.$message.error('验证错误！检查输入');
                     return false;
                }
        });
        },
        getAuthCode(email){
            axios.post(host+ '/sendMail',{
                to : email
            })
                .then(function (response) {
                    app.$message({
                        message: response.data,
                        type: 'info'
                    });
                    operationPost("发送验证码",app.loginForm.username + " 用户接收了验证码");
                })
                .catch(function (error) {
                    app.$message.error('检查错误');
                });

             this.disabled = true;
        },
        out() {
            this.user = { id: '' }
            window.localStorage.clear('_user');
            this.islogin = false;
            window.location.href = "/logout";
        },
        onSubmit() {
            let data = this.form;
            data.uid = JSON.parse(gets('_user')).id;
            axios.put(host+ '/users/' + data.uid, data)
                .then(function (response) {
                    app.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    operationPost("修改信息","用户ID："+data.id + " 修改了自己的用户信息");
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
            if(new Date().getTime()>new Date(act.start_time).getTime()&&new Date().getTime()<new Date(act.end_time).getTime()){
                this.active = act;
                this.jactive2 = true;
            }
            else{
                app.$message("报名时间不符合！");
            }
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
        enroll(active) {
            let e = {
                aid: active.id,
                uid: app.user.id,
                state: 2,
                date: dateFormat(new Date(), 1),
                name: active.pname,
                telphone: active.telphone,
                aname: active.name
            }

            axios.post(host+'/enrollA', e)
                .then(function (response) {
                    app.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                })
                .catch(function (error) {
                    alert("已报名！或者网络错误。")
                    console.log(error);
                });
            let o = {
                id : 9999,
                date : dateFormat(new Date(),1),
                user : app.user.username,
                operation : '活动报名',
                info :'用户报名了'+e.aname
            }
            axios.post(host+'/ols', o)
                .then(function (response) {
                  console.log("LOG YES");
                })
                .catch(function (error) {
                    console.log(error);
                });


            this.jactive2 = false;
        },
        handleCurrentChange(val) {
            console.log(val);
        },
        mst(a) {
            sets('_mst', JSON.stringify(a));
            this.reload('show.html');
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        uploadFileSuccess(response, file, fileList) {
            this.form2.imgurl = file.name;
            app.$message({
                message: '文件上传成功！',
                type: 'success'
            });
        },
        createArticle(data) {

            let article = {
                aid: app.maxIndex,
                sortid: 0,
                title: data.title,
                source: app.nameZ || app.username,
                createtime: dateFormat(new Date(), 1),
                publishtime: '',
                state: 0,
                content: data.content,
                uid: app.user.username,
                imgurl: data.imgurl
            };
            axios.post(host+'/articles', article)
                .then(function (response) {
                    app.$message({
                        message: '上传成功，请等待审核！',
                        type: 'success'
                    });
                    let o = {
                        id : 9999,
                        date : dateFormat(new Date(),1),
                        user : app.user.username,
                        operation : '提交文章',
                        info :'用户提交了文章！主题为'+article.title
                    }
                    axios.post(host+'/ols', o)
                        .then(function (response) {
                            console.log("LOG YES");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(function (error) {
                    app.$message.error('操作出错！');
                    console.log(error);
                });

        },
        backArt(a) {
            a.state = -1;
            a.content = '用户个人操作';
            axios.put(host+'/articles/' + a.aid, a)
                .then(function (response) {
                    app.$message({
                        message: '撤回成功！',
                        type: 'success'
                    });
                    let o = {
                        id : 9999,
                        date : dateFormat(new Date(),1),
                        user : app.user.username,
                        operation : '撤销操作',
                        info :'用户撤销了文章申请！主题为'+a.title
                    }
                    axios.post(host+'/ols', o)
                        .then(function (response) {
                            console.log("LOG YES");
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(function (error) {
                    app.$message.error('操作出错！');
                    console.log(error);
                });
        },
        changeImg(){
            drawPic();
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


function dateFormat(date, type) {
    if (type == 1) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
    }
    else {
        return (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ":" + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
    }
}

function operationPost(op,info) {
    let user = "";
    if (window.localStorage.getItem("_user")==null||window.localStorage.getItem("_user")==""){
        user = "guest";
    }
    else{
        user = JSON.parse(window.localStorage.getItem("_user")).username;
    }
    let o = {
        id : 9999,
        date : dateFormat(new Date(),1),
        user : user,
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




/**生成一个随机数**/
function randomNum(min,max){
    return Math.floor( Math.random()*(max-min)+min);
}
/**生成一个随机色**/
function randomColor(min,max){
    var r = randomNum(min,max);
    var g = randomNum(min,max);
    var b = randomNum(min,max);
    return "rgb("+r+","+g+","+b+")";
}

/**绘制验证码图片**/
function drawPic(){
    var canvas=document.getElementById("canvas");
    var width=canvas.width;
    var height=canvas.height;
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';

    /**绘制背景色**/
    ctx.fillStyle = randomColor(180,240); //颜色若太深可能导致看不清
    ctx.fillRect(0,0,width,height);
    /**绘制文字**/
    var str = 'ABCEFGHJKLMNPQRSTWXYabcdefghijklimnopqrstuvwxyz1234567890';
    var v = "";
    for(var i=0; i<4; i++){
        var txt = str[randomNum(0,str.length)];
        v += txt;
        ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
        ctx.font = randomNum(15,40)+'px SimHei'; //随机生成字体大小
        var x = 10+i*25;
        var y = randomNum(25,45);
        var deg = randomNum(-45, 45);
        //修改坐标原点和旋转角度
        ctx.translate(x,y);
        ctx.rotate(deg*Math.PI/180);
        ctx.fillText(txt, 0,0);
        //恢复坐标原点和旋转角度
        ctx.rotate(-deg*Math.PI/180);
        ctx.translate(-x,-y);
    }




    /**绘制干扰线**/
    for(var i=0; i<8; i++){
        ctx.strokeStyle = randomColor(40,180);
        ctx.beginPath();
        ctx.moveTo( randomNum(0,width), randomNum(0,height) );
        ctx.lineTo( randomNum(0,width), randomNum(0,height) );
        ctx.stroke();
    }
    /**绘制干扰点**/
    for(var i=0; i<100; i++){
        ctx.fillStyle = randomColor(0,255);
        ctx.beginPath();
        ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
        ctx.fill();
    }

    axios.post(host+'/write',{
        key : "code",
        value : v
    })
        .then(function (response) {
            console.log(response.data.message);
        })
        .catch(function (error) {
            console.log(error);
        });
}