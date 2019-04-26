(function() {
    layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
        var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;


        //时间
        laydate.render({
            elem: '#date1' //指定元素 
        });
        laydate.render({
            elem: '#date2' //指定元素
        });
        getProvince();
        //选择框列表加载
        function getProvince(e) {
            handleAjax('enterprise/getProvincecity', { parentid: e }, "GET").done(function(resp) {


                $.each(resp.list, function(index, item) {
                    $('.province').append(new Option(item.fullName, item.code)); // 下拉菜单里添加元素
                });
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function getCity(e) {
            handleAjax('enterprise/getProvincecity', { parentid: e }, "GET").done(function(resp) {


                $.each(resp.list, function(index, item) {
                    $('.city').append(new Option(item.fullName, item.code)); // 下拉菜单里添加元素
                });
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function getArea(e) {
            handleAjax('enterprise/getProvincecity', { parentid: e }, "GET").done(function(resp) {


                $.each(resp.list, function(index, item) {
                    $('.area').append(new Option(item.fullName, item.code)); // 下拉菜单里添加元素
                });
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }


        form.on('select(province)', function(data) {
            console.log(data.value); //得到被选中的值
            document.querySelector('.city').innerHTML = '<option value="">市</option>';
            document.querySelector('.area').innerHTML = '<option value="">区</option>';

            getCity(data.value);
        });
        form.on('select(city)', function(data) {
            console.log(data.value); //得到被选中的值
            document.querySelector('.area').innerHTML = '<option value="">区</option>';
            getArea(data.value);
        });


        // var license = document.querySelector('#license');
        // var enterprisename = document.querySelector('#enterprisename');
        // var state = document.querySelector('#state');
        // var province = document.querySelector('#province');
        // var city = document.querySelector('#city');
        // var district = document.querySelector('#district');
        // var address = document.querySelector('#address');
        // var corporation = document.querySelector('#corporation');
        // var linkman = document.querySelector('#linkman');
        // var phone = document.querySelector('#phone');
        // var remark = document.querySelector('#remark');
        // var enterpriseclass = document.querySelector('#enterpriseclass');
        // license.addEventListener('click',function)

        var uploadInst = upload.render({
            elem: '#selectImg' //绑定元素
                ,
            url: base + "basic/addBasEnterprise" //上传接口
                ,
            auto: false,
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
                    return '3';
                },
            },
            bindAction: '#uploadImg',
            done: function(res) {
                //上传完毕回调
                console.log(res);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = "../customer.html";
                },1500)
            },
            error: function() {
                //请求异常回调
                alert('信息填写不全')
            }
        });


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../customer.html";
        })
    })


})()