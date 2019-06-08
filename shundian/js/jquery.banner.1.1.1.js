;(function(){
    "use strict"

    $.fn.banner=function(options){
        var {items,left,right,list,autoMatic,delayTime,moveTime,index}=options;
        // 可选参数的处理
        list = list===false ? false : true;
        autoMatic = autoMatic===false ? false : true;
        delayTime = delayTime ? delayTime : 2000;
        moveTime = moveTime ? moveTime :200;
        index= index ? index : 0;

        let move=function(direct){
            items.eq(iprev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width()*direct
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width()*direct
            }).stop().animate({
                left:0
            },moveTime)
            $(".list").children("li").eq(iprev).css({background:""}).end().eq(index).css({background:"yellow"})
        }

        let iprev=items.length-1;

        function leftEvent(){
            if(index==0){
                index=items.length-1;
                iprev=0
            }else{
                index--;
                iprev=index+1;
            }
            move(1)
        }

        function rightEvent(){
            if(index==items.length-1){
                index=0;
                iprev=items.length-1;
            }else{
                index++;
                iprev=index-1;
            }
            move(-1)
        }
        // 如果没有选中left按钮，是undefined，如果选错了，按钮的length为0.以此判断按钮的选中
        if(left != undefined && left.length>0 && right != undefined && right.length>0){
            console.log("有左右按钮")
            left.click(leftEvent)
            right.click(rightEvent)
        }

        if(list){
            // 创建list按钮
            var str="";
            for(var i=0;i<items.length;i++){
                str+=`<li>${i+1}</li>`;
            }
            this.append($("<ul class='list'>").html(str));
            // 设置list样式
            $(".list").css({
                
                height:20,
                position:"absolute",
                left:"50%",bottom:"20px",
                margin:0,
                display:"flex",
                padding:0,listStyle:"none"
                
            }).children().css({
                margin:"5px",
                borderRadius:"50%",
                flex:1,
                width:20,
                height:20,
                background:"#666",
                lineHeight:"20px",
                textAlign:"center"
            }).eq(index).css({
                background:"yellow"
            })
            // list的移动
            let move=function(direct,iprev,index){
                items.eq(iprev).css({
                    left:0
                }).stop().animate({
                    left:-items.eq(0).width()*direct
                },moveTime).end().eq(index).css({
                    left:items.eq(0).width()*direct
                }).stop().animate({
                    left:0
                },moveTime)
            }
            // list绑定事件
            $(".list").children("li").click(function(){
                if($(this).index()>index){
                    move(1,index,$(this).index())
                }
                if($(this).index()<index){
                    move(-1,index,$(this).index())
                }
                $(".list").children("li").eq(index).css({background:""}).end().eq($(this).index()).css({background:"yellow"})
                index=$(this).index();
            })
        }
        if(autoMatic){
            let times;
            times=setInterval(()=>{
                // right.trigger("click")
                rightEvent()
            },delayTime)
            
            this.hover(function(){
                clearInterval(times)
            },function(){
                times=setInterval(()=>{
                    // right.trigger("click")
                    rightEvent();
                },delayTime)
            })

        }
        
    }

})(jQuery);