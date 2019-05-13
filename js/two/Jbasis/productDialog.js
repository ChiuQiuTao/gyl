(function(){
    layui.use(['form','element','table', "layer", "util"], function() {
        var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        element = layui.element,
        util = layui.util,
        form=layui.form;

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
                getProductVo(res.id);
                // getProductOneById(res.id);
                document.querySelector('#addNewProduct').style.display='none';
                document.querySelector('#updateProduct').style.display='block';
                /*更新*/
                document.querySelector('#updateProduct').addEventListener('click',function(){
                    updateNewProduct(res.id);
                })
            }else{
                getProductVo();
                
            }
        }

        
        document.querySelector('#addNewProduct').addEventListener('click',function(){
            addNewProduct();
        })
        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../product.html'
        })
        function addNewProduct(){
            var ingredientids=[];
            $("input:checkbox[name='ingredientids']:checked").each(function() { // 遍历name=standard的多选框
                // ingredientids += ',' + $(tbarcodehis).val();
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

        function getBasStandard(){
            var standardcode= document.querySelector('#standardcode');
            console.log(standardcode);

            handleAjax('basic/getBasStandard', { 
                
            }, "GET").done(function(resp) {
            console.log("standardcode");
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

        function getProductVo(id){
            var ingredientids = document.querySelector('#ingredientids');
            handleAjax('basic/getProductVo', { 
                
            }, "GET").done(function(resp) {
                console.log(resp)
                for(var i=0;i<resp.list.length;i++){
                    ingredientids.innerHTML = ingredientids.innerHTML+ '<input type="checkbox" class="ingredientids" name="ingredientids" value="'+resp.list[i].id+'" lay-skin="primary" title="'+resp.list[i].productname+'">'
                }
                layui.form.render("");
                if(id&&id!==''){
                    getProductOneById(id);
                }
                return
            }).fail(function(err) {
                console.log(err)

            });
        }


        function getProductOneById(id){
            
            handleAjax('basic/getProductOneById', { 
                id:id
            }, "GET").done(function(resp) {
                console.log(resp)
                document.querySelector('#productname').value=resp.list[0].productname;
                document.querySelector('#barcode').value=resp.list[0].productcode;
                document.querySelector('#producttype').value=resp.list[0].producttype;
                document.querySelector('#specifications').value=resp.list[0].specifications;
                document.querySelector('#unit').value=resp.list[0].unit;
                document.querySelector('#weight').value=resp.list[0].weight;
                document.querySelector('#packagematerial').value=resp.list[0].packagematerial;
                document.querySelector('#packagemethod').value=resp.list[0].packagemethod;
                document.querySelector('#sellingprice').value=resp.list[0].sellingprice;
                document.querySelector('#lifedate').value=resp.list[0].lifedate;
                document.querySelector('#lifedateunit').value=resp.list[0].lifedateunit;
                document.querySelector('#standardcode').value=resp.list[0].standardcode;
                document.querySelector('#standardname').value=resp.list[0].standardname;
                document.querySelector('#remarks').value=resp.list[0].remarks;
                var ingredientids = document.querySelectorAll('.ingredientids');
                for(var i=0;i<ingredientids.length;i++){
                    for(var j=0;j<resp.list[0].productVos.length;j++){
                        if(ingredientids[i].value==resp.list[0].productVos[j].id){
                            console.log(ingredientids[i].value);
                            ingredientids[i].checked=true
                        }
                    }
                    // console.log(ingredientids[i].value);
                }
                layui.form.render("");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function updateNewProduct(id){
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
                "id":id,
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
            option = JSON.stringify(option);
            console.log(option);
            handleAjax('basic/updateNewProduct',option, "post",'utf-8').done(function(resp) {
             console.log(resp);
             
             layer.msg('更新成功');
             setTimeout(function(){
                window.location.href = '../product.html'
             },1500)
                return
            }).fail(function(err) {
                console.log(err)

            })
        }
    })
})()