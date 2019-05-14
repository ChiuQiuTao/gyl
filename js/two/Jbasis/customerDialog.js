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
        getHrefId();
        function getHrefId(){
            var loc = location.href;
            var url = loc.split("?")[1];
            if(url && url!=''){
                document.querySelector('#uploadImg').style.display='none';
                document.querySelector('#update').style.display='block';
                var para = url.split("&");
                var len = para.length;
                var res = {};
                var arr = [];
                for(var i=0;i<len;i++){
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
                getEnterpriseById(res.id);
                updateImg(res.id);
                document.querySelector('#update').addEventListener('click',function(){
                    updateInfo(res.id);
                })
            }else{
                uploadImg();
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            handleAjax('basic/getEnterpriseById', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                getProvince();
                getCity(resp.list[0].province);
                getArea(resp.list[0].city);
                document.querySelector('#license').value = resp.list[0].license;
                document.querySelector('#enterprisename').value = resp.list[0].enterprisename;
                document.querySelector('#state').value = resp.list[0].state;
                document.querySelector('#address').value = resp.list[0].address;
                document.querySelector('#corporation').value = resp.list[0].corporation;
                document.querySelector('#linkman').value = resp.list[0].linkman;
                document.querySelector('#phone').value = resp.list[0].phone;
                document.querySelector('#remark').value = resp.list[0].remark;
                document.querySelector('#showimg').src = resp.list[0].picturepath;
                setTimeout(function(){
                    document.querySelector('#province').value = resp.list[0].province;
                    document.querySelector('#city').value = resp.list[0].city;
                    document.querySelector('#district').value = resp.list[0].district;
                    layui.form.render();

                },500)
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
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

        //新增
        function uploadImg(){
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
                choose: function(obj){
                    //预读本地文件示例，不支持ie8
                    console.log(obj)
                    obj.preview(function(index, file, result){
                        console.log(result);
                        
                        $('#showimg').attr('src', result); //图片链接（base64）
                    });
                }    ,
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
        }

        // 更新图片
        function updateImg(id){
            var uploadInst = upload.render({
                elem: '#selectImg' //绑定元素
                    ,
                url: base + "basic/updateBasEnterpriseById" //上传接口
                    ,
               
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                data: {
                    id:id,
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
                bindAction: '#updateImg',
                choose: function(obj){
                    //预读本地文件示例，不支持ie8
                    console.log(obj)
                    obj.preview(function(index, file, result){
                        document.querySelector('#update').style.display = 'none';
                        document.querySelector('#updateImg').style.display = 'block';
                        $('#showimg').attr('src', result); //图片链接（base64）
                    });
                }    ,
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('更新成功');
                    setTimeout(function(){
                        window.location.href = '../customer.html'
                    },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }

        //没有更新图片的更新
        function updateInfo(id){
            handleAjax('basic/updateBasEnterpriseById', { 
                id:id,
                license:$('#license').val(),
                enterprisename:$('#enterprisename').val(),
                state:$('#state').val(),
                province:$('#province').val(),
                city:$('#city').val(),
                district:$('#district').val(),
                address:$('#address').val(),
                corporation:$('#corporation').val(),
                linkman:$('#linkman').val(),
                phone:$('#phone').val(),
                enterpriseclass:'3',
                remark:$('#remark').val(),

            }, "POST").done(function(resp) {
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../customer.html'
                },1500)
                return;
            }).fail(function(err) {
                console.log(err)
               
            });
        }


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../customer.html";
        })
    })


})()