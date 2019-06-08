$(function(){
    
    $("li").attr("i",0)
    // console.log($(".list").children("li"))
    $(".shangpin").children("li").on("mouseenter",function(){
        
            if($(this).attr("i") == 0){            
                $(this).children(".box").stop().show().parent().siblings().attr("i",0).children(".box").stop().hide();
                $(this).attr("i",1);
            }
            else{
                $(this).children(".box").stop().hide();
                $(this).attr("i",0);
            }
            
    })
    $(".shangpin").children("li").on("mouseleave",function(){
        $(this).children(".box").stop().hide();
        $(this).attr("i",0)
       
    })
})