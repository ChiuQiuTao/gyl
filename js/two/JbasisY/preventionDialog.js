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


        //时间
        laydate.render({
            elem: '#antiepidemicdate' //指定元素 
        });
      
        getHrefId();
        function getHrefId(){
            var loc = location.href;
            var url = loc.split("?")[1];
            if(url && url!=''){
                document.querySelector('#uploadImg').style.display='none';
                document.querySelector('#update').style.display='block';
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
                document.querySelector('#update').addEventListener('click',function(){
                    updateInfo(res.id);
                })
            }else{
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('breed/getFyxx', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                document.querySelector('#antiepidemicname').value = resp.data.antiepidemicname;
                document.querySelector('#animalname').value = resp.data.animalname;
                document.querySelector('#diseasename').value = resp.data.diseasename;
                document.querySelector('#antiepidemicdays').value = resp.data.antiepidemicdays;
                var antiepidemicdate = new Date(resp.data.antiepidemicdate);
                var antiepidemicdate=antiepidemicdate.getFullYear() + '-' + (antiepidemicdate.getMonth() + 1) + '-' + antiepidemicdate.getDate() ;
                document.querySelector('#antiepidemicdate').value = antiepidemicdate;
                document.querySelector('#notice').value = resp.data.notice;
                
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
        //新增
        function uploadImg(){
            var antiepidemicdate=new Date($('#antiepidemicdate').val());
            Theoldcuiway(
                "breed/saveFyxx", {
                    systype:2,
                    antiepidemicname:$('#antiepidemicname').val(),
                    animalname:$('#animalname').val(),
                    diseasename:$('#diseasename').val(),
                    antiepidemicdays:$('#antiepidemicdays').val(),
                    antiepidemicdate:antiepidemicdate,
                    notice:$('#notice').val(),
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../prevention.html'
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
            Theoldcuiway('breed/updateFyxx', { 
                id:id,
                systype:2,
                antiepidemicname:$('#antiepidemicname').val(),
                animalname:$('#animalname').val(),
                diseasename:$('#diseasename').val(),
                antiepidemicdays:$('#antiepidemicdays').val(),
                antiepidemicdate:antiepidemicdate,
                notice:$('#notice').val(),

            }, "POST").done(function(resp) {
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../prevention.html'
                },1500)
                return;
            }).fail(function(err) {
                console.log(err)
               
            });
        }


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../prevention.html";
        })
    })


})()