(function(){
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form;
        

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
                getProductById(res.id);
                document.querySelector('.addinfo').style.display='none';
                document.querySelector('.updateinfo').style.display='block';
                /*更新*/
                document.querySelector('.updateinfo').addEventListener('click',function(){
                    updateBasProduct(res.id);
                })
            }else{
                
            }
        }
        function updateBasProduct(id){
            var productname = document.querySelector('#productname').value;
            var producttype = document.querySelector('#producttype').value;
            var specifications = document.querySelector('#specifications').value;
            var weight = document.querySelector('#weight').value;
            var lifedate = document.querySelector('#lifedate').value;
            var lifedateunit = document.querySelector('#lifedateunit').value;
            var standardname = document.querySelector('#standardname').value;
            var standardcode = document.querySelector('#standardcode').value;
            var purchaseprice = document.querySelector('#purchaseprice').value;

            handleAjax('basic/updateBasProduct', { 
                id:id,
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
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../material.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
               
            });
        }
        function getProductById(id){
            handleAjax('basic/getProductById', 
            { id: id },
             "GET").done(function(resp) {
                document.querySelector('#productname').value=resp.list[0].productname;
                document.querySelector('#producttype').value=resp.list[0].producttype;
                document.querySelector('#specifications').value=resp.list[0].specifications;
                document.querySelector('#weight').value=resp.list[0].weight;
                document.querySelector('#lifedate').value=resp.list[0].lifedate;
                document.querySelector('#lifedateunit').value=resp.list[0].lifedateunit;
                document.querySelector('#standardname').value=resp.list[0].standardname;
                document.querySelector('#purchaseprice').value=resp.list[0].purchaseprice;
                layui.form.render("select");
                setTimeout(function(){
                    document.querySelector('#standardcode').value=resp.list[0].standardcode;
                    layui.form.render("select");

                },500)
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
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
                // setTimeout(function(){
                //     window.location.href = '../material.html'
                // },1500)
                return
            }).fail(function(err) {
                console.log(err)
               
            });
        }
    })
})()