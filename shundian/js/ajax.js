function ajax(options){
    // 1处理可选参数
    var type=options.type ? options.type : "get";
    var data=options.data ? options.data : {};
    // 2.解析data
    var str="";
    for(var i in options.data){
        str+=`${i}=${options.data[i]}&`
    }

    if(type=="jsonp"){
  
        options.url=options.url+"?"+str.slice(0,str.length-1);

        var script=document.createElement("script");
        script.src=options.url;
        document.body.appendChild(script);
        
        window[data[data.cloumnName]]=function(res){
            options.success(res)
        }
        return;
    }
    var d=new Date();
    // 3.开启ajax
    var ajax=new XMLHttpRequest();
    options.url=options.url+"?"+str+"_zjh="+d.getTime();
    if(type=="get"){
        ajax.open(type,options.url,true);
        str=null;
    }else if(type=="post"){
        ajax.open(type,options.url,true);
        str=str.slice(0,str.length-1);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status==200){
            options.success(ajax.responseText)
        }
    }
    ajax.send(str)
}