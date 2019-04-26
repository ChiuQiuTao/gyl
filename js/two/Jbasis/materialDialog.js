(function(){
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form;
        
        getBasProduct();
        function getBasProduct(){
            var standardcode = document.querySelector('#standardcode');
            handleAjax('basic/getBasProduct', { 
            }, "GET").done(function(resp) {
                console.log('getBasProduct');
                console.log(resp.pageBean.lists);
                for(var i=0;i<resp.pageBean.lists.length;i++){
                    standardcode.innerHTML = standardcode.innerHTML
                    +'<option value="'+resp.pageBean.lists[i].standardcode+'">'+resp.pageBean.lists[i].standardcode+'</option>'
                }
                layui.form.render("select");
                return;
            }).fail(function(err) {
                console.log(err)
               
            });
        }
        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../material.html'
        })
        document.querySelector('.addinfo').addEventListener('click',function(){
            addBasProduct();
        })
        function addBasProduct(){
            var productname = document.querySelector('#productname').value;
            var producttype = document.querySelector('#producttype').value;
            var specifications = document.querySelector('#specifications').value;
            var weight = document.querySelector('#weight').value;
            var lifedate = document.querySelector('#lifedate').value;
            var lifedateunit = document.querySelector('#lifedateunit').value;
            var standardname = document.querySelector('#standardname').value;
            var standardcode = document.querySelector('#standardcode').value;
            var purchaseprice = document.querySelector('#purchaseprice').value;

            handleAjax('basic/addBasProduct', { 
                productname:productname,
                producttype:producttype,
                specifications:specifications,
                weight:weight,
                lifedate:lifedate,
                lifedateunit:lifedateunit,
                productclass:'1',
                standardname:standardname,
                standardcode:standardcode,
                purchaseprice:purchaseprice
            }, "POST").done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../material.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
               
            });
        }
    })
})()