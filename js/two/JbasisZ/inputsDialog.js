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
        form.on('select(ctype)', function(data){
            console.log(data);
            producttypeid=data.value;
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
                getBasPutseed(res.id);
                document.querySelector('#uploadImg').style.display='none';
                document.querySelector('#updateImg').style.display='block';
                /*更新*/
                // document.querySelector('#updateImg').addEventListener('click',function(){
                    updateBasPutseed(res.id);
                // })
            }else{
                uploadImg();
            }
        }
        // 更新
        function updateBasPutseed(id){
            var uploadInst = upload.render({
                elem: '.selectImg' //绑定元素
                    ,
                url: base + "PlantBasPutseed/updateBasPutseed" //上传接口
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
                    putseed:function(){
                        var putseed ={
                            'id':id,
                            'putseedname': $('#putseedname').val(),
                            'producttypeid':producttypeid,
                            'specifications':$('#specifications').val(),
                            'unit': $('#unit').val(),
                            'registrationmark':$('#registrationmark').val(),
                            'lifedate':$('#lifedate').val(),
                            'lifedateunit':$('#lifedateunit').val(),
                            'standardno':$('#standardno').val(),
                            'enterprisename':$('#enterprisename').val(),
                            'brand':$('#brand').val(),
                            'suitablearea':$('#suitablearea').val(),
                            'purchaseprice':$('#purchaseprice').val(),
                            'remarks':$('#remarks').val(),
                            'minstock':$('#minstock').val(),
                            'maxstock':$('#maxstock').val(),

                            'earlywarning':earlywarning
                        }
                        putseed = JSON.stringify(putseed);
                        return putseed;
                    }
                },
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('更新成功');
                    setTimeout(function(){
                        window.location.href = '../inputs.html'
                    },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }
        // 查询投入品详情
        function getBasPutseed(id){
            handleAjax('PlantBasPutseed/getBasPutseed', {
                id:id,
                enterpriseid:sessionStorage.getItem("enterpriseId")
            }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#putseedname').value=resp.list[0].putseedname
                document.querySelector('#specifications').value=resp.list[0].specifications
                document.querySelector('#unit').value=resp.list[0].unit
                document.querySelector('#registrationmark').value=resp.list[0].registrationmark
                document.querySelector('#lifedate').value=resp.list[0].lifedate
                document.querySelector('#lifedateunit').value=resp.list[0].lifedateunit
                document.querySelector('#standardno').value=resp.list[0].standardno
                document.querySelector('#enterprisename').value=resp.list[0].enterprisename
                document.querySelector('#brand').value=resp.list[0].brand
                document.querySelector('#suitablearea').value=resp.list[0].suitablearea
                document.querySelector('#purchaseprice').value=resp.list[0].purchaseprice
                document.querySelector('#remarks').value=resp.list[0].remarks
                document.querySelector('#minstock').value=resp.list[0].minstock
                document.querySelector('#maxstock').value=resp.list[0].maxstock

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
        // 种类
        getBasProducttype();
        function getBasProducttype(){
            handleAjax('PlantBasPutseed/getBasProducttype', {
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
        //新增
        function uploadImg(){
            var uploadInst = upload.render({
                elem: '.selectImg' //绑定元素
                    ,
                url: base + "PlantBasPutseed/saveBasPutseed" //上传接口
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
                    putseed:function(){
                        var putseed ={
                            'putseedclass':'1',
                            'enterpriseid':localStorage.getItem("enterpriseId"),
                            'enterprisename':localStorage.getItem("enterprisename"),
                            'putseedname': $('#putseedname').val(),
                            'producttypeid':producttypeid,
                            'specifications':$('#specifications').val(),
                            'unit': $('#unit').val(),
                            'registrationmark':$('#registrationmark').val(),
                            'lifedate':$('#lifedate').val(),
                            'lifedateunit':$('#lifedateunit').val(),
                            'standardno':$('#standardno').val(),
                            'enterprisename':$('#enterprisename').val(),
                            'brand':$('#brand').val(),
                            'suitablearea':$('#suitablearea').val(),
                            'purchaseprice':$('#purchaseprice').val(),
                            'remarks':$('#remarks').val(),
                            'earlywarning':earlywarning
                        }
                        putseed = JSON.stringify(putseed);
                        return putseed;
                    }
                },
                auto:false,
                done: function(res) {
                    //上传完毕回调
                    console.log(res);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../inputs.html'
                    },1500)
                },
                error: function() {
                    //请求异常回调
                    alert('信息填写不全')
                }
            });
        }
    })
})()