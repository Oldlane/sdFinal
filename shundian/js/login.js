class Login{
    constructor(){
        this.user=document.getElementById("loginuser");
        this.pass=document.getElementById("loginpass");
        this.btn=document.getElementById("loginbtn");

        this.init();
    }
    init(){
        var that=this;
        this.btn.onclick=function(){
            that.getUserMsg();
        }
    }
    getUserMsg(){
        this.usermsg=localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
        this.check();
    }
    check(){
        for(var i=0;i<this.usermsg.length;i++){
            if(this.usermsg[i].user==this.user.value && this.usermsg[i].pass==this.pass.value){
                this.usermsg[i].onoff=1;
                localStorage.setItem("usermsg",JSON.stringify(this.usermsg));
                alert("登录成功，系统即将跳转到登录前页面");
                setTimeout(()=>{
                    location.href="http://localhost/shundian/index.html"
                },2000);
                return;
            }
        }
        alert("用户名与密码不符，请重新登录或去注册")
    }
}

new Login();