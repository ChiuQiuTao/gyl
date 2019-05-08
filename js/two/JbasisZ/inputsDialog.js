(function(){
    layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
        var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;



        uploadImg();
        //新增
        function uploadImg(){
            var uploadInst = upload.render({
                elem: '.selectImg' //绑定元素
                    ,
                url: base + "basic/addBasEnterprise" //上传接口
                    ,
            
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                data: {
                    license: function() {
                        return $('#license').val();
                    },
                    enterprisename: function() {
                        return $('#enterprisename').val();
                    },
                    state: function() {
                        return $('#state').val();
                    },
                    province: function() {
                        return $('#province').val();
                    },
                    city: function() {
                        return $('#city').val();
                    },
                    district: function() {
                        return $('#district').val();
                    },
                    address: function() {
                        return $('#address').val();
                    },
                    corporation: function() {
                        return $('#corporation').val();
                    },
                    linkman: function() {
                        return $('#linkman').val();
                    },
                    phone: function() {
                        return $('#phone').val();
                    },
                    remark: function() {
                        return $('#remark').val();
                    },
                    enterpriseclass: function() {
                        return '2';
                    },
                },
                bindAction: '#uploadImg',
                choose: function(obj){
                    //预读本地文件示例，不支持ie8
                    console.log(obj)
                    obj.preview(function(index, file, result){
                        console.log(result);
                        
                        $('#showimg').attr('src', result); //图片链接（base64）
                    });
                }    ,
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../supplier.html'
                    },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }
    })
})()