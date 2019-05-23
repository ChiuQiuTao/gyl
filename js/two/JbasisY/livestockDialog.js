(function() {
    layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
        var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;


        var earlywarning=2;//是否预警
        // 是否预警
        form.on('checkbox(earlywarning)', function(data){
            earlywarning=data.elem.checked;
            var stock = document.querySelectorAll('.stock');
            if(data.elem.checked){
                earlywarning=1;
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='block'
                }
            }else{
                earlywarning=2;
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='none'
                }
            }
            
        }); 
        getHrefId();
        function getHrefId(){
            var loc = location.href;
            var url = loc.split("?")[1];
            if(url && url!=''){
                document.querySelector('#addNewProduct').style.display='none';
                document.querySelector('#updateProduct').style.display='block';
                var para = url.split("&");
                var len = para.length;
                var res = {};
                var arr = [];
                for(var i=0;i<len;i++){
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
                getEnterpriseById(res.id);
                // updateImg(res.id);
                document.querySelector('#updateProduct').addEventListener('click',function(){
                    updateInfo(res.id);
                })
            }else{
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/getNcpxx', 
            { ncpxxId: id },
             "GET").done(function(resp) {
                console.log(resp)
                var stock = document.querySelectorAll('.stock');
                document.querySelector('#productname').value = resp.data.productname;
                document.querySelector('#specifications').value = resp.data.specifications;
                document.querySelector('#sellingprice').value = resp.data.sellingprice;

                document.querySelector('#unit').value = resp.data.unit;
                document.querySelector('#cycle').value = resp.data.cycle;
                document.querySelector('#cycleunit').value = resp.data.cycleunit;
                document.querySelector('#remarks').value = resp.data.remarks;
                document.querySelector('#earlywarning').value = earlywarning;
                document.querySelector('#minstock').value = resp.data.minstock;
                document.querySelector('#maxstock').value = resp.data.maxstock;
                if(resp.data.earlywarning==1){
                    console.log(123123)
                    $('#earlywarning').attr('checked', true);
                    for(var i=0;i<stock.length;i++){
                        stock[i].style.display='block'
                    }
                        
                }
                layui.form.render();
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        document.querySelector('#addNewProduct').addEventListener('click',function(){
            uploadImg();
        })
        //新增
        function uploadImg(){
            // var antiepidemicdate=new Date($('#antiepidemicdate').val());
            Theoldcuiway(
                "plant/saveNcpxx", {
                    systype:2,
                    productclass:2,
                    productname:$('#productname').val(),
                    specifications:$('#specifications').val(),
                    unit:$('#unit').val(),
                    cycle:$('#cycle').val(),
                    cycleunit:$('#cycleunit').val(),
                    remarks:$('#remarks').val(),
                    earlywarning:earlywarning,
                    minstock:$('#minstock').val(),
                    maxstock:$('#maxstock').val(),
                sellingprice:$('#sellingprice').val(),
                    barcode:''
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../livestock.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        //更新
        function updateInfo(id){
            var antiepidemicdate=new Date($('#antiepidemicdate').val());
            Theoldcuiway('plant/updateNcpxx', { 
                id:id,
                systype:2,
                productclass:2,
                productname:$('#productname').val(),
                specifications:$('#specifications').val(),
                unit:$('#unit').val(),
                cycle:$('#cycle').val(),
                cycleunit:$('#cycleunit').val(),
                remarks:$('#remarks').val(),
                earlywarning:earlywarning,
                minstock:$('#minstock').val(),
                maxstock:$('#maxstock').val(),
                sellingprice:$('#sellingprice').val(),
                barcode:''
            }, "POST").done(function(resp) {
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../livestock.html'
                },1500)
                return;
            }).fail(function(err) {
                console.log(err)
               
            });
        }


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../livestock.html";
        })
    })


})()