
    class Reg{
        constructor(){
           this.ouser=document.getElementById("user");
           this.opass=document.getElementById("pass");
           this.opass2=document.getElementById("pass2");
           this.obtn=document.getElementById("btn3");
           this.ospan1=document.getElementById("span1");
           this.ospan2=document.getElementById("span2");
           this.ospan3=document.getElementById("span3");

           this.Verification();
           this.init();
        }
        Verification(){
            var that=this;
            this.ouseronOff=this.opassonOff=this.opass2onOff=false;
            //		用户名仅支持中文、字母、数字、“-”“_”的组合，4-20个字符
            this.ouser.onblur=function(){
                var reg=/^[\u2E80-\u9FFF\w-]{4,20}$/;
                if(reg.test(this.value)){
                    that.ospan1.innerHTML="用户名符合";
                    that.ouseronOff=true;
                }else{
                    that.ospan1.innerHTML="用户名不符合";	
                    that.ouseronOff=false;
                }
            }
    //		 数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强
            this.a=this.b=this.c=0;
            this.opass.onblur=function(){
                var lengthReg=/^.{6,18}$/;
                if(!lengthReg.test(this.value)){
                    that.ospan2.innerHTML="密码长度不符合";
                    that.opassonOff=false;
                    return ;
                }
                var numReg=/\d/;
                if(numReg.test(this.value)){
                    that.a=1;
                }
                var azReg=/[a-zA-Z]/;
                if(azReg.test(this.value)){
                    that.b=1;
                }
                var tsReg=/[\W_]/;
                if(tsReg.test(this.value)){
                    that.c=1;
                }
                switch(that.a+that.b+that.c){
                    case 1:that.ospan2.innerHTML="密码强度弱";break;
                    case 2:that.ospan2.innerHTML="密码强度一般";break;
                    case 3:that.ospan2.innerHTML="密码强度强";break;								
                }
                that.opassonOff=true;
                if(that.opass2.value!=""){
                    if(this.value==that.opass2.value){
                        that.ospan3.innerHTML="密码一致";
                        that.opass2onOff=true;
                    }else{
                        that.ospan3.innerHTML="密码不一致";
                        that.opass2onOff=false;
                    }
                }
            }
            this.opass2.onblur=function(){
                if(this.value==that.opass.value){
                    that.ospan3.innerHTML="密码一致";
                    that.opass2onOff=true;
                }else{
                    that.ospan3.innerHTML="密码不一致";
                    that.opass2onOff=false;
                }
            }
            this.obtn.onclick=function(){
                if(that.ouseronOff && that.opassonOff && that.opass2onOff){
                    alert("注册成功");
                }else if(!that.ouseronOff){
                    alert("用户名不符合，注册失败");
                }else if(!that.opassonOff){
                    alert("密码不符合，注册失败");
                }else if(that.opass.value!=that.opass2.value){
                    alert("密码不一致，注册失败");
                }
            }
        }
        init(){
            var that=this;
            this.obtn.onclick=function(){
                that.getUserMsg()
            }
        }
        getUserMsg(){
            this.usermsg=localStorage.getItem("usermsg");
            console.log(this.usermsg);
            this.setUserMsg();
        }
        setUserMsg(){
            // 判断是否第一次
            if(this.usermsg==null){
                this.usermsg=[{
                    user:this.ouser.value,
                    pass:this.opass.value,
                    onoff:0
                }]
            }else{
                this.usermsg=JSON.parse(localStorage.getItem("usermsg"));
                for(var i=0;i<this.usermsg.length;i++){
                    if(this.usermsg[i].user==this.ouser.value){
                        alert("用户名已被使用，请重新注册");
                        return ;
                    }
                }
                this.usermsg.push({
                    user:this.ouser.value,
                    pass:this.opass.value,
                    onoff:0
                })
            }
            localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
        }
    }

    new Reg();