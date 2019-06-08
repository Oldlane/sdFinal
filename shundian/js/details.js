
    class Magnifier{
        constructor(){
            this.lPic=document.querySelector(".l-pic");
            this.span=document.querySelector(".l-pic span");
            this.rPic=document.querySelector(".r-pic");
            this.lImg=document.querySelector(".l-pic img")
            this.rImg=document.querySelector(".r-pic img");
            this.url="http://localhost/shundian/data/goods.json";
            
            this.Ajax();
            this.init();
        }
        init(){
            var that=this;
            this.lPic.onmouseover=function(){
                that.show();
            }
            this.lPic.onmouseout=function(){
                that.hide();
            }
            this.lPic.onmousemove=function(eve){
                var e=eve || window.event;
                that.move(e);
            }
        }
        move(e){
            
            
            var l=e.pageX-this.lPic.offsetLeft-20-50-this.span.offsetWidth/2;
            var t=e.pageY-this.lPic.offsetTop-148-50-this.span.offsetHeight/2;
            // console.log(l,t)
            if(l<0) l=0;
            if(t<0) t=0;
            if(l>this.lPic.offsetWidth-this.span.offsetWidth){
                l=this.lPic.offsetWidth-this.span.offsetWidth;
            }
            if(t>this.lPic.offsetHeight-this.span.offsetHeight){
                t=this.lPic.offsetHeight-this.span.offsetHeight;
            }
            this.span.style.left=l+"px";
            this.span.style.top=t+"px";
            var x=l/(this.lPic.offsetWidth-this.span.offsetWidth);
            var y=t/(this.lPic.offsetHeight-this.span.offsetHeight);
            this.rImg.style.left=x*(this.rPic.offsetWidth-this.rImg.offsetWidth)+"px";
            this.rImg.style.top=y*(this.rPic.offsetHeight-this.rImg.offsetHeight)+"px";

           
        }
        show(){
            this.span.style.display="block";
            this.rPic.style.display="block";
        }
        hide(){
            this.span.style.display="none";
            this.rPic.style.display="none";            
        }
        Ajax(){
            var that=this;
            ajax({
                url:this.url,
                success:function(res){
                    that.res=JSON.parse(res);
                    that.getLocal();
                }
            })
        }
        getLocal(){
            this.goods=localStorage.getItem("goods");

            this.display();
        }
        display(){
           
            for(var i=0;i<this.res.length;i++){
                console.log(this.goods);
                if(this.res[i].goodsId==this.goods){
                    this.src=this.res[i].src
                }
            }
            // console.log(this.src);
            this.lImg.src=this.src;
            this.rImg.src=this.src;
        }
    }

    new Magnifier();

