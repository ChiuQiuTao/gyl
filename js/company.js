(function() {
    layui.use(['upload', 'form'], function() {
        var $ = layui.jquery,
            layer = layui.layer,
            form = layui.form,
            upload = layui.upload;



        getProvince();
        //选择框列表加载
        function getProvince(e) {
            handleAjax('enterprise/getProvincecity', { parentid: e }, "GET").done(function(resp) {
                // console.log(resp)

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
                    return '1';
                },
            },
            bindAction: '#uploadImg',
            done: function(res) {
                //上传完毕回调
                console.log(res);
                layer.msg('新增成功');

            },
            error: function(res) {
                //请求异常回调
                console.log(res)
            }
        });
    })

})()