(function(){
    layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
        var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;
        var producttypeid=null;//种类
        var earlywarning=false;//是否预警

        // 获取id
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
                    console.log(arr);
                }
                console.log(res.id);
                getBasProduct(res.id);
                document.querySelector('#uploadImg').style.display='none';
                document.querySelector('#updateImg').style.display='block';
                /*更新*/
                // document.querySelector('#updateImg').addEventListener('click',function(){
                    modifyBasProduct(res.id);
                // })
            }else{
                // uploadImg();
                saveBasProduct();
            }
        }

        function getBasProduct(id){
            handleAjax('PlantBasProduct/getBasProduct', {
                id:id,
                // enterpriseid:sessionStorage.getItem("enterpriseId")
            }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#productname').value=resp.list[0].productname
                document.querySelector('#producttypeid').value=resp.list[0].producttypeid
                document.querySelector('#producttype').value=resp.list[0].producttype
                document.querySelector('#cycle').value=resp.list[0].cycle
                document.querySelector('#cycleunit').value=resp.list[0].cycleunit
                document.querySelector('#lifedate').value=resp.list[0].lifedate
                document.querySelector('#lifedateunit').value=resp.list[0].lifedateunit
                document.querySelector('#sellingprice').value=resp.list[0].sellingprice
                document.querySelector('#unit').value=resp.list[0].unit
                document.querySelector('#earlywarning').value=resp.list[0].earlywarning
                document.querySelector('#remarks').value=resp.list[0].remarks
                // $('#showimg').attr('src', resp.list[0].remarks); 
                if(resp.list[0].earlywarning==1){
                    console.log(123123)
                    $('#earlywarning').attr('checked', true);
                    layui.form.render();
                }
                // earlywarning
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        }

        // 选择框选择显示
        function showSelect(){
            form.on('select(producttypeid)', function(data){
                console.log(data);
                var index = data.elem.selectedIndex;
                index = index-1;
                var ctypelist = document.querySelectorAll('.inline-ctype');
                for(var i=0;i<ctypelist.length;i++){
                    ctypelist[i].style.display='none';
                }
                ctypelist[index].style.display='block';
            });    
        }
        // 选择种子名称
        form.on('select(ctype)', function(data){
            console.log(data);
            producttypeid=data.value;
            getBasPutseedCategory(producttypeid);
        });    
        // 是否预警
        form.on('checkbox(earlywarning)', function(data){
            earlywarning=data.elem.checked;
            var stock = document.querySelectorAll('.stock');
            if(data.elem.checked){
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='block'
                }
            }else{
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='none'
                }
            }
            
        }); 


        // 种子名称
        function getBasPutseedCategory(producttypeid){
            handleAjax('PlantBasProduct/getBasPutseedCategory', {
                enterpriseid:localStorage.getItem("enterpriseId"),
                producttypeid:producttypeid
            }, "GET").done(function(resp) {
                console.log(resp);
                for(var i=0;i<resp.list.length;i++){
                    document.querySelector('#producttype').innerHTML=document.querySelector('#producttype').innerHTML+'<option value="'+resp.list[i].pid+'" data-id="'+i+'">'+resp.list[i].pname+'</option>'
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        };

        // 种类
        getBasProducttype();
        function getBasProducttype(){
            handleAjax('PlantBasProduct/getBasProducttypeCategory', {
                parentid:'0000000000003'
            }, "GET").done(function(resp) {
                console.log(resp);
    
                for(var i=0;i<resp.list.length;i++){
                    document.querySelector('#producttypeid').innerHTML=document.querySelector('#producttypeid').innerHTML+'<option value="'+resp.list[i].pid+'" data-id="'+i+'">'+resp.list[i].pname+'</option>'
                    document.querySelector('#inline-type').innerHTML=document.querySelector('#inline-type').innerHTML
                    +'<div class="layui-input-inline inline-ctype" style="display:none;"><select name="ctype" lay-filter="ctype" class="ctype"><option value="">请选择</option></select></div>'
                    var ctypelist = document.querySelectorAll('.ctype');
                    for(var j=0;j<resp.list[i].viList.length;j++){
                        ctypelist[i].innerHTML=ctypelist[i].innerHTML+'<option value="'+resp.list[i].viList[j].pid+'">'+resp.list[i].viList[j].pname+'</option>'
                    }
                }
                layui.form.render("select");
                showSelect();
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        }

        function modifyBasProduct(){
            var uploadInst = upload.render({
                elem: '.selectImg' //绑定元素
                    ,
                url: base + "PlantBasProduct/saveBasProduct" //上传接口
                    ,
            
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                
                bindAction: '#updateImg',
                choose: function(obj){
                    //预读本地文件示例，不支持ie8
                    console.log(obj)
                    obj.preview(function(index, file, result){
                        console.log(result);
                        console.log(index);
                        $('#showimg').attr('src', result); //图片链接（base64）
                    });
                }    ,
                data: {
                    // putseed:function(){
                    //     var putseed ={
                    //         'productname':$('#productname').val(),
                    //         'recordenterpriseid':localStorage.getItem("enterpriseId"),
                    //         // 'enterprisename':localStorage.getItem("enterprisename"),
                    //         'producttype': $('#producttype').val(),
                    //         'producttypeid':producttypeid,
                    //         'cycle':$('#cycle').val(),
                    //         'cycleunit': $('#cycleunit').val(),
                    //         'sellingprice':$('#sellingprice').val(),
                    //         'lifedate':$('#lifedate').val(),
                    //         'lifedateunit':$('#lifedateunit').val(),
                    //         'unit':$('#unit').val(),
                    //         'remarks':$('#remarks').val(),
                    //         'earlywarning':earlywarning
                    //     }
                    //     putseed = JSON.stringify(putseed);
                    //     return putseed;
                    // }
                    productname: function() {
                        return $('#productname').val();
                    },
                    recordenterpriseid: function() {
                        return localStorage.getItem("enterpriseId");
                    },
                    producttype: function() {
                        return $('#producttype').val();
                    },
                    producttypeid: function() {
                        return producttypeid;
                    },
                    cycle: function() {
                        return $('#cycle').val();
                    },
                    cycleunit: function() {
                        return $('#cycleunit').val();
                    },
                    sellingprice: function() {
                        return $('#sellingprice').val();
                    },
                    lifedate: function() {
                        return $('#lifedate').val();
                    },
                    lifedateunit: function() {
                        return $('#lifedateunit').val();
                    },
                    unit: function() {
                        return $('#unit').val();
                    },
                    remarks: function() {
                        return $('#remarks').val();
                    },
                    earlywarning: function() {
                        return earlywarning;
                    },
                    minstock: function() {
                        return $('#minstock').val();
                    },
                    maxstock: function() {
                        return $('#maxstock').val();
                    },
                    // 'productname':$('#productname').val(),
                    // 'recordenterpriseid':localStorage.getItem("enterpriseId"),
                    // 'producttype': $('#producttype').val(),
                    // 'producttypeid':producttypeid,
                    // 'cycle':$('#cycle').val(),
                    // 'cycleunit': $('#cycleunit').val(),
                    // 'sellingprice':$('#sellingprice').val(),
                    // 'lifedate':$('#lifedate').val(),
                    // 'lifedateunit':$('#lifedateunit').val(),
                    // 'unit':$('#unit').val(),
                    // 'remarks':$('#remarks').val(),
                    // 'earlywarning':earlywarning
                },
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('更新成功');
                    // setTimeout(function(){
                    //     window.location.href = '../nonpro.html'
                    // },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }

        function saveBasProduct(){
            var uploadInst = upload.render({
                elem: '.selectImg' //绑定元素
                    ,
                url: base + "PlantBasProduct/saveBasProduct" //上传接口
                    ,
            
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                
                bindAction: '#uploadImg',
                choose: function(obj){
                    //预读本地文件示例，不支持ie8
                    console.log(obj)
                    obj.preview(function(index, file, result){
                        console.log(result);
                        console.log(index);
                        $('#showimg').attr('src', result); //图片链接（base64）
                    });
                }    ,
                data: {
                    // putseed:function(){
                    //     var putseed ={
                    //         'productname':$('#productname').val(),
                    //         'recordenterpriseid':localStorage.getItem("enterpriseId"),
                    //         // 'enterprisename':localStorage.getItem("enterprisename"),
                    //         'producttype': $('#producttype').val(),
                    //         'producttypeid':producttypeid,
                    //         'cycle':$('#cycle').val(),
                    //         'cycleunit': $('#cycleunit').val(),
                    //         'sellingprice':$('#sellingprice').val(),
                    //         'lifedate':$('#lifedate').val(),
                    //         'lifedateunit':$('#lifedateunit').val(),
                    //         'unit':$('#unit').val(),
                    //         'remarks':$('#remarks').val(),
                    //         'earlywarning':earlywarning
                    //     }
                    //     putseed = JSON.stringify(putseed);
                    //     return putseed;
                    // }
                    productname: function() {
                        return $('#productname').val();
                    },
                    recordenterpriseid: function() {
                        return localStorage.getItem("enterpriseId");
                    },
                    producttype: function() {
                        return $('#producttype').val();
                    },
                    producttypeid: function() {
                        return producttypeid;
                    },
                    cycle: function() {
                        return $('#cycle').val();
                    },
                    cycleunit: function() {
                        return $('#cycleunit').val();
                    },
                    sellingprice: function() {
                        return $('#sellingprice').val();
                    },
                    lifedate: function() {
                        return $('#lifedate').val();
                    },
                    lifedateunit: function() {
                        return $('#lifedateunit').val();
                    },
                    unit: function() {
                        return $('#unit').val();
                    },
                    remarks: function() {
                        return $('#remarks').val();
                    },
                    earlywarning: function() {
                        return earlywarning;
                    },
                    minstock: function() {
                        return $('#minstock').val();
                    },
                    maxstock: function() {
                        return $('#maxstock').val();
                    },
                    // 'productname':$('#productname').val(),
                    // 'recordenterpriseid':localStorage.getItem("enterpriseId"),
                    // 'producttype': $('#producttype').val(),
                    // 'producttypeid':producttypeid,
                    // 'cycle':$('#cycle').val(),
                    // 'cycleunit': $('#cycleunit').val(),
                    // 'sellingprice':$('#sellingprice').val(),
                    // 'lifedate':$('#lifedate').val(),
                    // 'lifedateunit':$('#lifedateunit').val(),
                    // 'unit':$('#unit').val(),
                    // 'remarks':$('#remarks').val(),
                    // 'earlywarning':earlywarning
                },
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('新增成功');
                    // setTimeout(function(){
                    //     window.location.href = '../nonpro.html'
                    // },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }
    })
    
})()