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
                // updateImg(res.id);
                document.querySelector('#update').addEventListener('click',function(){
                    updateInfo(res.id);
                })
            }else{
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/getQykhxx', 
            { qykhxxId: id },
             "GET").done(function(resp) {
                console.log(resp)
                getProvince();
                getCity(resp.data.province);
                getArea(resp.data.city);
                document.querySelector('#license').value = resp.data.license;
                document.querySelector('#enterprisename').value = resp.data.enterprisename;
                document.querySelector('#state').value = resp.data.state;
                document.querySelector('#address').value = resp.data.address;
                document.querySelector('#corporation').value = resp.data.corporation;
                setTimeout(function(){
                    document.querySelector('#province').value = resp.data.province;
                    document.querySelector('#city').value = resp.data.city;
                    document.querySelector('#district').value = resp.data.district;
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

        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
        //新增
        function uploadImg(){
            Theoldcuiway(
                "plant/saveQykhxx", {
                    systype:1,
                    license:$('#license').val(),
                    enterprisename:$('#enterprisename').val(),
                    state:$('#state').val(),
                    province:$('#province').val(),
                    city:$('#city').val(),
                    district:$('#district').val(),
                    address:$('#address').val(),
                    corporation:$('#corporation').val(),
                    enterpriseclass:'企业客户信息',
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../customer.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        //更新
        function updateInfo(id){
            Theoldcuiway('plant/updateQykhxx', { 
                id:id,
                systype:1,
                license:$('#license').val(),
                enterprisename:$('#enterprisename').val(),
                state:$('#state').val(),
                province:$('#province').val(),
                city:$('#city').val(),
                district:$('#district').val(),
                address:$('#address').val(),
                corporation:$('#corporation').val(),
                // enterpriseclass:'企业客户信息',

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