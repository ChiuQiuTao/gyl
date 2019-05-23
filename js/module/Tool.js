layui.define(function (exports) {
    $ = layui.jquery
    var Tool = {
        init:function(){
            $("[class$='cancels']").unbind("click").on("click" , function () {
                window.history.back();
            })
        }
    }
    exports('Tool', Tool);
});


