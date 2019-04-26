(function(){
    layui.use(['form','element','table', "layer", "util"], function() {
        var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        element = layui.element,
        util = layui.util,
        form=layui.form;
        document.querySelector('#addNewProduct').addEventListener('click',function(){
            addNewProduct();
        })
        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../product.html'
        })
        function addNewProduct(){
            var ingredientids=[];
            $("input:checkbox[name='ingredientids']:checked").each(function() { // 遍历name=standard的多选框
                // ingredientids += ',' + $(this).val();
                ingredientids.push($(this).val());
              });
              console.log('ingredientids:',ingredientids);

            var productname = document.querySelector('#productname').value;
            var barcode = document.querySelector('#barcode').value;
            var producttype = document.querySelector('#producttype').value;
            var specifications = document.querySelector('#specifications').value;
            var unit = document.querySelector('#unit').value;
            var weight = document.querySelector('#weight').value;
            var packagematerial = document.querySelector('#packagematerial').value;
            var packagemethod = document.querySelector('#packagemethod').value;
            var sellingprice = document.querySelector('#sellingprice').value;
            var lifedate = document.querySelector('#lifedate').value;
            var lifedateunit = document.querySelector('#lifedateunit').value;
            var standardcode = document.querySelector('#standardcode').value;
            var standardname = document.querySelector('#standardname').value;
            var remarks = document.querySelector('#remarks').value;
            // var ingredientids = document.querySelector('#ingredientids').value;
            var option = {
                "productname":productname,
                "barcode":barcode,
                "producttype":producttype,
                "specifications":specifications,
                "unit":unit,
                "weight":weight,
                "packagematerial":packagematerial,
                "packagemethod":packagemethod,
                "sellingprice":sellingprice,
                "lifedate":lifedate,
                "lifedateunit":lifedateunit,
                "standardcode":standardcode,
                "standardname":standardname,
                "remarks":remarks,
                "ingredientids":ingredientids
            }
            console.log(option);
            option = JSON.stringify(option);
             
            handleAjax('basic/addNewProduct',option, "post",'utf-8').done(function(resp) {
             console.log(resp);
             
             layer.msg('新增成功');
             setTimeout(function(){
                window.location.href = '../product.html'
             },1500)
                return
            }).fail(function(err) {
                console.log(err)

            })

            
        }
        // var standardcode = document.querySelector('#standardcode');
        getBasStandard();
        getProductVo();

        function getBasStandard(){
            var standardcode= document.querySelector('#standardcode');
            console.log(standardcode);
            handleAjax('basic/getBasStandard', { 
                
            }, "GET").done(function(resp) {
                console.log(resp)
                console.log(resp.pageBean.lists)
                for(var i=0;i<resp.pageBean.lists.length;i++){
                    standardcode.innerHTML=standardcode.innerHTML+'<option value="'+resp.pageBean.lists[i].standardcode+'">'+resp.pageBean.lists[i].standardcode+'</option>'
                }
                layui.form.render("select");
                
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function getProductVo(){
            var ingredientids = document.querySelector('#ingredientids');
            handleAjax('basic/getProductVo', { 
                
            }, "GET").done(function(resp) {
                console.log(resp)
                for(var i=0;i<resp.list.length;i++){
                    ingredientids.innerHTML = ingredientids.innerHTML+ '<input type="checkbox" name="ingredientids" value="'+resp.list[i].id+'" lay-skin="primary" title="'+resp.list[i].productname+'">'
                }
                layui.form.render("");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
    })
})()