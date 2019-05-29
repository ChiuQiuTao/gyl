(function(){
    (function(){
        layui.use(['table', "laydate"], function() {
            var $ = layui.jquery,
            laydate = layui.laydate;
           
            document.querySelector('#addBasStandard').addEventListener('click',function(){
                addBasStandard();
            })
           /*取消*/
           $(".cancels").click(function() {
            window.location.href = "../housing.html";
        })
            getHrefId();
            function getHrefId(){
                var loc = location.href;
                var url = loc.split("?")[1];
                if(url && url!=''){
                    // document.querySelector('#uploadImg').style.display='none';
                    // document.querySelector('#update').style.display='block';
                    var para = url.split("&");
                    var len = para.length;
                    var res = {};
                    var arr = [];
                    for(var i=0;i<len;i++){
                        arr = para[i].split("=");
                        res[arr[0]] = arr[1];
                    }
                    console.log(res.id);
                    
                    getdetail(res.id);
                    document.querySelector('#addBasStandard').style.display='none';
                    document.querySelector('#updateBasStandard').style.display='block';
                    /*更新*/
                    document.querySelector('#updateBasStandard').addEventListener('click',function(){
                        updateId(res.id);
                    })
                }else{
                    
                }
                
            }
            function updateId(id){
                var personname = document.querySelector('#personname').value;
                var personsex = document.querySelector('#personsex').value;
                var personcard = document.querySelector('#personcard').value;
                var tel = document.querySelector('#tel').value;
                var remark = document.querySelector('#remark').value;

                Theoldcuiway(
                    "breed/saveZcsyxx", {
                        id:id,
                        systype: 2,
                        personname:personname,
                        personsex:personsex,
                        personcard:personcard,
                        tel:tel,
                        remark:remark,
                        tel:tel
                }, "POST").done(function(resp) {
                    console.log(resp)
                    layer.msg('修改成功');
                    setTimeout(function(){
                        window.location.href = '../veterinarians.html'
                    },1500)
                    return
                }).fail(function(err) {
                    console.log(err)
                    alert('修改失败');
                });
            }
           
            function getdetail(id){
                Theoldcuiway('breed/getZcsyxx', 
                { id: id },
                 "GET").done(function(resp) {
                    console.log(resp);
                    document.querySelector('#personname').value=resp.data.personname;
                    
                    document.querySelector('#personsex').value=resp.data.personsex;
                    document.querySelector('#personcard').value=resp.data.personcard;
                    document.querySelector('#tel').value=resp.data.tel;
                    document.querySelector('#remark').value=resp.data.remark;
                    layui.form.render();

                    return
                }).fail(function(err) {
                    console.log(err)
    
                });
            }
            function addBasStandard(){
                var personname = document.querySelector('#personname').value;
                var personsex = document.querySelector('#personsex').value;
                var personcard = document.querySelector('#personcard').value;
                var tel = document.querySelector('#tel').value;
                var remark = document.querySelector('#remark').value;

                Theoldcuiway(
                    "breed/saveZcsyxx", {
                        systype: 2,
                        personname:personname,
                        personsex:personsex,
                        personcard:personcard,
                        tel:tel,
                        remark:remark,
                        tel:tel
                    },
                    "POST"
                )
                .done(function(resp) {
                    console.log(resp);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../veterinarians.html'
                    },1500)
                    return;
                })
                .fail(function(err) {
                    console.log(err);
                });
            }
    
        })
    
    })()
})()