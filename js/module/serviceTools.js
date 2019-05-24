layui.define(function (exports) {
    var $ = layui.jquery;
    var serviceTools = {
        uuid : function(){
            return 'Cxxxxxxxx-Uxxxx-Ixxx-Sxxxx-Mxxxx-Bxxxx-Lyxxx-Oyxxx-Gxxxxxxxxxxxx'.replace(/[xy]/g,function(c){
                var r = Math.random()*16|0,
                    v = c =='x'?r:(r&0x3|0x8);
                return v.toString(16)
            }).toUpperCase()
        },
        currentDate : function () {
            return new Date().format("yyyy-MM-dd hh:mm:ss");
        },
        format : function(date){
          return new Date(date).format("yyyy-MM-dd")
        },
        isNotNUll : function(data) {
            return  data === undefined || data === null || data.replace(/\s/g, "") === "" || data === "" || data === "null";
        },
        getAjaxData : function (parameter) {
            var Result;
            $.ajax({
                async:parameter.async === undefined ? true : parameter.async ,
                type: parameter.type === undefined ? "POST" : parameter.type,
                url: parameter.url,
                data:parameter.data === undefined ? {} : parameter.data,
                dataType: parameter.dataType === undefined ? "JSON" : parameter.dataType,
                async: false,
                beforeSend:function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
                },
                success:parameter.success === undefined ? function (data) {
                    Result = data;
                }:parameter.success,
                complete:parameter.complete === undefined ? function () {
                }:parameter.complete,
                error:function (error) {
                    console.error("403.2系统异常请稍后重试");
                }
            });
            if((parameter.async !== undefined && !parameter.async)){
                return Result;
            }
        },
        EditOrSaveOrDelete : function (parameter) {
            serviceTools.getAjaxData({
                type: 'POST',
                data: parameter.parame,
                url: parameter.url,
                dataType: "JSON",
                success:function (data) {
                    if (data.success && data.code === 200){
                        layer.msg(data.msg,{time : 2000,end:function () {
                                typeof parameter.callback === "function" ? parameter.callback() : ""
                        }});

                    }else{
                        layer.msg(data.msg,{time : 2000});
                    }
                }
            });
        }
    }
    exports('serviceTools', serviceTools);
});
