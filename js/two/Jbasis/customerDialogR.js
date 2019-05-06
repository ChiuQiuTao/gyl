(function(){
    layui.use(['form'], function() {
        // 新增个人供应商/客户
        function addBasPerson(){
            var personcard = document.querySelector('#personcard').value;
            var personname = document.querySelector('#personname').value;
            var address = document.querySelector('#address').value;
            var phone = document.querySelector('#phone').value;
            // var persontype = document.querySelector('#persontype').value;
            var remark = document.querySelector('#remark').value;

            handleAjax('basic/addBasPerson', { 
                personcard: personcard,
                personname: personname, 
                address: address, 
                phone: phone, 
                persontype: '2', 
                remark: remark, 
            }, "POST").done(function(resp) {
                console.log(resp)
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = "../customer.html";
                },1500)
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
                getBasPersonById(res.id);
                document.querySelector('#inputone').style.display='none';
                document.querySelector('#addBasPerson').style.display='none';
                document.querySelector('#updateBasPerson').style.display='block';
                /*更新*/
                document.querySelector('#updateBasPerson').addEventListener('click',function(){
                    updateBasPerson(res.id);
                })
            }else{
                
            }
            
        }

        // 通过主键查看个人供应商，个人客户
        function getBasPersonById(id){
            handleAjax('basic/getBasPersonById', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                document.querySelector('#personcard').value=resp.list[0].personcard;
                document.querySelector('#personname').value=resp.list[0].personname;
                document.querySelector('#address').value=resp.list[0].address;
                document.querySelector('#phone').value=resp.list[0].phone;
                document.querySelector('#remark').value=resp.list[0].remark;
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function updateBasPerson(id){
            handleAjax('basic/updateBasPerson', 
            {
                id: id,
                personcard: document.querySelector('#personcard').value,
                personname:document.querySelector('#personname').value,
                address:document.querySelector('#address').value,
                phone:document.querySelector('#phone').value,
                remark:document.querySelector('#remark').value,
                persontype:'2'
            },
             "POST").done(function(resp) {
                console.log(resp)
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../supplier.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
        var addBasPersonBtn = document.querySelector('#addBasPerson');
        addBasPersonBtn.addEventListener('click',function(){
            addBasPerson();
        })
    })
        
    /*取消*/
    document.querySelector('.cancels').addEventListener('click',function(){
        window.location.href = "../customer.html";
    })
    
})()