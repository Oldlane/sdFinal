
  class Wupin{
      constructor(){
          this.cont=document.querySelectorAll(".cont");
          this.url="http://localhost/shundian/data/goods.json";

          this.init();
          this.addEvent();
      }
      init(){
          var that=this;
          ajax({
              url:this.url,
              success:function(res){
                  // console.log(res)
                  that.res=JSON.parse(res);
                  that.display();
              }
          })
      }
      display(){
          // console.log(this.res)
          var str="";
          for(var i=0;i<8;i++){
              str+=`<li class="box" index="${this.res[i].goodsId}">
                      <img src="${this.res[i].src}">
                      <div class="mcd">
                          <p>${this.res[i].name}</p>
                          <u>如因区域原因无法下单，详情请咨询客服</u>
                          <span>${this.res[i].price}</span>
                      </div>
                      <div class="wares">
                              <i>${this.res[i].price}</i>
                              <b class="shopcar">加入购物车</b>
                      </div>
                      
                  </li>`
          }
          for(var i=0;i<this.cont.length;i++){
              this.cont[i].innerHTML=str;
          }
      }
      addEvent(){
          var that=this;
          for(var i=0;i<this.cont.length;i++){
              this.cont[i].addEventListener("click",function(eve){
                  var e=eve || window.event;
                  var target=e.target || e.srcElement;
                  if(target.className=="shopcar"){
                      that.id=target.parentNode.parentNode.getAttribute("index");
                      that.setCookie();
                  }
              })
          }
      }
      setCookie(){
          this.shopping=getCookie("goods");
          // console.log(this.shopping)
          if(this.shopping){
              var onoff=true;
              this.shopping=JSON.parse(this.shopping);
              // console.log(this.shopping)
              for(var i=0;i<this.shopping.length;i++){
                  if(this.shopping[i].id==this.id){
                      this.shopping[i].num ++;
                      onoff=false;
                  }
              }
              if(onoff){
                  this.shopping.push({
                      id:this.id,
                      num:1
                  })
              }
          }else{
              this.shopping=[{
                  id:this.id,
                  num:1
              }]
          }
          setCookie("goods",JSON.stringify(this.shopping))
      }
  }

  new Wupin();