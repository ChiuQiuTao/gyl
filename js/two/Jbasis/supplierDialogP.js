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
                persontype: '1', 
                remark: remark, 
            }, "POST").done(function(resp) {
                console.log(resp)
                layer.msg('新增成功');
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
        window.location.href = "../supplier.html";
    })
    
})()