(function(){
    (function(){
        layui.use(['table', "laydate"], function() {
            var laydate = layui.laydate;
           
            document.querySelector('#addBasStandard').addEventListener('click',function(){
                addBasStandard();
            })
            getckrzr();
            function getckrzr(){
                Theoldcuiway(
                    "plant/getckrzr", {
                    },
                    "GET"
                )
                .done(function(resp) {
                    console.log(resp);
                    var selectInner='';
                    var chargeperson = document.querySelector('#chargeperson');
                    for(var i=0;i<resp.data.length;i++){
                        chargeperson.innerHTML = chargeperson.innerHTML+'<option value="'+resp.data[i].personname+'" class="persontypeitem">'+resp.data[i].personname+'</option>'
                    }
                    layui.form.render();
                    return;
                })
                .fail(function(err) {
                    console.log(err);
                });
            }
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
                var landname = document.querySelector('#landname').value;
                var chargeperson = document.querySelector('#chargeperson').value;
                var phone = document.querySelector('#phone').value;
                var address = document.querySelector('#address').value;
                var floorarea = document.querySelector('#floorarea').value;
                var coveredarea = document.querySelector('#coveredarea').value;
                var environment = document.querySelector('#environment').value;
                var remarks = document.querySelector('#remarks').value;
                Theoldcuiway('plant/saveJdxx', { 
                    id:id,
                    systype: 1,
                    landname:landname,
                    chargeperson: chargeperson,
                    phone: phone,
                    address: address,
                    floorarea: floorarea,
                    coveredarea: coveredarea,
                    environment: environment,
                    remarks: remarks,
                }, "POST").done(function(resp) {
                    console.log(resp)
                    
                    layer.msg('修改成功');
                    setTimeout(function(){
                        window.location.href = '../base.html'
                    },1500)
                    return
                }).fail(function(err) {
                    console.log(err)
                    alert('修改失败');
                });
            }
            // function toStringDate(str){
            //     var d = new Date(str);
            //     var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            //     return times;
            // }
            function getdetail(id){
                Theoldcuiway('plant/getJdxx', 
                { jdxxId: id },
                 "GET").done(function(resp) {
                    console.log(resp);
                    document.querySelector('#landname').value=resp.data.landname;
                    document.querySelector('#chargeperson').value=resp.data.chargeperson;
                    document.querySelector('#phone').value=resp.data.phone;
                    document.querySelector('#address').value=resp.data.address;
                    document.querySelector('#floorarea').value=resp.data.floorarea;
                    document.querySelector('#coveredarea').value=resp.data.coveredarea;
                    document.querySelector('#environment').value=resp.data.environment;
                    document.querySelector('#remarks').value=resp.data.remarks;
                    layui.form.render();
                    return
                }).fail(function(err) {
                    console.log(err)
    
                });
            }
            function addBasStandard(){
                var landname = document.querySelector('#landname').value;
                var chargeperson = document.querySelector('#chargeperson').value;
                var phone = document.querySelector('#phone').value;
                var address = document.querySelector('#address').value;
                var floorarea = document.querySelector('#floorarea').value;
                var coveredarea = document.querySelector('#coveredarea').value;
                var environment = document.querySelector('#environment').value;
                var remarks = document.querySelector('#remarks').value;
                Theoldcuiway(
                    "plant/saveJdxx", {
                        // id:'1',
                        systype: 1,
                        landname:landname,
                        chargeperson:chargeperson,
                        phone:phone,
                        address:address,
                        floorarea:floorarea,
                        coveredarea:coveredarea,
                        environment:environment,
                        remarks:remarks,
                        landlevel:'1',

                    },
                    "POST"
                )
                .done(function(resp) {
                    console.log(resp);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../base.html'
                    },1500)
                    return;
                })
                .fail(function(err) {
                    console.log(err);
                });
            }
    

            document.querySelector('.cancels').addEventListener('click',function(){
                window.location.href = '../base.html'
            })
        })
    
    })()
})()