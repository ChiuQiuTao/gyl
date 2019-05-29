(function(){
    (function(){
        layui.use(['table', "laydate"], function() {
            var laydate = layui.laydate;
           
            document.querySelector('#addBasStandard').addEventListener('click',function(){
                addBasStandard();
            })
            getjdxxs();
            function getjdxxs(){
                Theoldcuiway('plant/jdxxs', 
                { sysType: '1',
                landName:'' },
                 "GET").done(function(resp) {
                    console.log(resp);
                    var landnameP = document.querySelector('#landnameP');
                    for(var i=0;i<resp.data.content.length;i++){
                        landnameP.innerHTML = landnameP.innerHTML+'<option value="'+resp.data.content[i].landname+'" class="persontypeitem">'+resp.data.content[i].landname+'</option>'
                    }
                    layui.form.render();
                    return
                }).fail(function(err) {
                    console.log(err)
    
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
                var landnameP = document.querySelector('#landnameP').value;
                var floorarea = document.querySelector('#floorarea').value;
                var remarks = document.querySelector('#remarks').value;
                Theoldcuiway('plant/saveJdxx', { 
                    id:id,
                    systype: 1,
                    landname:landname,
                    parentid:landnameP,
                    floorarea:floorarea,
                    remarks:remarks,
                    landlevel:'2'
                }, "POST").done(function(resp) {
                    console.log(resp)
                    layer.msg('修改成功');
                    setTimeout(function(){
                        window.location.href = '../plot.html'
                    },1500)
                    return
                }).fail(function(err) {
                    console.log(err)
                    alert('修改失败');
                });
            }
           
            function getdetail(id){
                Theoldcuiway('plant/getDkxx', 
                { jdxxId: id },
                 "GET").done(function(resp) {
                    console.log(resp);
                    document.querySelector('#landname').value=resp.data.landname;
                    document.querySelector('#landnameP').value=resp.data.parentid;
                    document.querySelector('#floorarea').value=resp.data.floorarea;
                    document.querySelector('#remarks').value=resp.data.remarks;
                    layui.form.render();
                    return
                }).fail(function(err) {
                    console.log(err)
    
                });
            }
            function addBasStandard(){
                var landname = document.querySelector('#landname').value;
                var landnameP = document.querySelector('#landnameP').value;
                var floorarea = document.querySelector('#floorarea').value;
                var remarks = document.querySelector('#remarks').value;
                Theoldcuiway(
                    "plant/saveDkxx", {
                        systype: 1,
                        landname:landname,
                        parentid:landnameP,
                        floorarea:floorarea,
                        remarks:remarks,
                        landlevel:'2'
                    },
                    "POST"
                )
                .done(function(resp) {
                    console.log(resp);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../plot.html'
                    },1500)
                    return;
                })
                .fail(function(err) {
                    console.log(err);
                });
            }
            document.querySelector('.cancels').addEventListener('click',function(){
                window.location.href = '../plot.html'
            })
        })
    
    })()
})()