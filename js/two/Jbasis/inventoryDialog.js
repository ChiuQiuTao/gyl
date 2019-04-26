(function(){
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form;
        var one = document.querySelector('#one');
        var two = document.querySelector('#two');
        var select = 1;
        // 选择仓库等级
        form.on('select(storagelevel)', function(data) {
            if(data.value==1){
                one.style.display = 'block';
                two.style.display = 'none';
                select=1;
            }else if(data.value==2){
                one.style.display = 'none';
                two.style.display = 'block';
                select=2;
            }
        });
        // 新增按钮
        document.querySelector('#addBasStorage').addEventListener('click',function(){
            addBasStorage();
        })

        // 查询企业仓库
        getBasStorage();
        function getBasStorage(){
            handleAjax('basic/getBasStorage', { 
                storagelevel: 1,
            }, "GET").done(function(resp) {
                console.log(resp)
                var selectList='';
                for(var i=0;i<resp.list.length;i++){
                    selectList = selectList + '<option value="'+resp.list[i].id+'">'+resp.list[i].storagename+'</option>';
                }
                document.querySelector('#parentid').innerHTML=selectList;
                // $.each(resp.list, function(index, item) {
                //     $('.area').append(new Option(item.fullName, item.code)); // 下拉菜单里添加元素
                // });
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)
                
            });
        }

        // 获取用户信息
        getUser();
        function getUser(){
            var chargeperson = document.querySelector('#chargeperson');
            handleAjax('user/getUser', { 
            }, "GET").done(function(resp) {
                console.log(resp);
                chargeperson.innerHTML = '<option value="'+err.realName+'">'+resp.realName+'</option>';
                console.log(resp);
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)
                chargeperson.innerHTML = '<option value="'+err.realName+'">'+err.realName+'</option>';
                layui.form.render("select");

            });
        }
        function addBasStorage(){
            var parentid = document.querySelector('#parentid').value;
            var storagelevel = document.querySelector('#storagelevel').value;
            var storagename;
            if(select ==1){
                storagename = document.querySelector('#storagename1').value;
            }else{
                storagename = document.querySelector('#storagename2').value;
            }
            var chargeperson = document.querySelector('#chargeperson').value;
            var remarks = document.querySelector('#remarks').value;
    
            handleAjax('basic/addBasStorage', { 
                parentid:parentid,
                storagelevel: storagelevel,
                storagename: storagename,
                chargeperson: chargeperson,
                remarks: remarks,
            }, "POST").done(function(resp) {
                console.log(resp)
                
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../inventory.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
                alert('新增失败');
            });
        }

        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../inventory.html'
        })
    })
    

})()