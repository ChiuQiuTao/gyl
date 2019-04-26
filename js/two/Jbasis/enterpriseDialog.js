(function(){
    layui.use(['table', "laydate"], function() {
        var laydate = layui.laydate;
  
        //执行一个laydate实例
        laydate.render({
          elem: '#implementdate' //指定元素
        });
        laydate.render({
            elem: '#auditdate' //指定元素
        });
        document.querySelector('#addBasStandard').addEventListener('click',function(){
            addBasStandard();
        })
        function addBasStandard(){
            var standardcode = document.querySelector('#standardcode').value;
            var standardname = document.querySelector('#standardname').value;
            var standardtype = document.querySelector('#standardtype').value;
            var standardlevel = document.querySelector('#standardlevel').value;
            var implementdate = document.querySelector('#implementdate').value;
            var auditdate = document.querySelector('#auditdate').value;
            var content = document.querySelector('#content').value;
            handleAjax('basic/addBasStandard', { 
                standardcode:standardcode,
                standardname: standardname,
                standardtype: standardtype,
                standardlevel: standardlevel,
                implementdate: implementdate,
                auditdate: auditdate,
                content: content,
            }, "POST").done(function(resp) {
                console.log(resp)
                
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../enterprise.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
                alert('新增失败');
            });
        }

    })

})()