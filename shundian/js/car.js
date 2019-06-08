
    class Car{
        constructor(){
            this.tbody=document.querySelector("tbody");
            this.url="http://localhost/shundian/data/goods.json";

            this.init();
            this.addEvent();
        }
        init(){
            var that=this;
            ajax({
                url:this.url,
                success:function(res){
                    // console.log(res);
                    that.res=JSON.parse(res);
                    that.getCookie();
                }
            })
        }
        getCookie(){
            this.shopping=JSON.parse(getCookie("goods"));
            this.display();
        }
        display(){
            // console.log(this.res);
            // console.log(this.goods);
            var str="";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.shopping.length;j++){
                    if(this.res[i].goodsId==this.shopping[j].id){
                        str+=`<tr index="${this.shopping[j].id}">
                                <td class="te"><input type="checkbox"></td>
                                <td><img src="${this.res[i].src}" /></td>
                                <td>${this.res[i].name}</td>
                                <td>${this.res[i].price}</td>
                                <td><input type="number" value="${this.shopping[j].num}" min=1 /></td>
                                <td><span class="delete">删除</span></td>
                            </tr>`
                    }
                }
            }
            this.tbody.innerHTML=str;
        }
        addEvent(){
            var that=this;
            this.tbody.addEventListener("click",function(eve){
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                if(target.className=="delete"){
                    target.parentNode.parentNode.remove();
                    that.id=target.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.shopping.splice(i,1)
                    });
                }
            })
            this.tbody.addEventListener("input",function(eve){
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                if(target.type=="number"){
                    that.id=target.parentNode.parentNode.getAttribute("index");
                    
                    that.changeCookie(function(i){
                        that.shopping[i].num=target.value;
                    });
                }
            })
        }
        changeCookie(callback){
            for(var i=0;i<this.shopping.length;i++){
                if(this.shopping[i].id==this.id){
                    callback(i);
                }
            }
            setCookie("goods",JSON.stringify(this.shopping));
        }
    }
    new Car;