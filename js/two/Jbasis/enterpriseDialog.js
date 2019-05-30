(function() {
    layui.use(['table', "laydate"], function() {
        var laydate = layui.laydate;

        //执行一个laydate实例
        laydate.render({
            elem: '#implementdate' //指定元素
        });
        laydate.render({
            elem: '#auditdate' //指定元素
        });
        document.querySelector('#addBasStandard').addEventListener('click', function() {
            addBasStandard();
        })
        getHrefId();

        function getHrefId() {
            var loc = location.href;
            var url = loc.split("?")[1];
            if (url && url != '') {
                // document.querySelector('#uploadImg').style.display='none';
                // document.querySelector('#update').style.display='block';
                var para = url.split("&");
                var len = para.length;
                var res = {};
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
                console.log(res.id);
                getBasStandardById(res.id);
                document.querySelector('#addBasStandard').style.display = 'none';
                document.querySelector('#updateBasStandard').style.display = 'block';
                /*更新*/
                document.querySelector('#updateBasStandard').addEventListener('click', function() {
                    updateBasStandard(res.id);
                })
            } else {

            }

        }

        function updateBasStandard(id) {
            var standardcode = document.querySelector('#standardcode').value;
            var standardname = document.querySelector('#standardname').value;
            var standardtype = document.querySelector('#standardtype').value;
            var standardlevel = document.querySelector('#standardlevel').value;
            var implementdate = document.querySelector('#implementdate').value + " " + "00:00:00";
            var auditdate = document.querySelector('#auditdate').value + " " + "00:00:00";
            var content = document.querySelector('#content').value;
            handleAjax('basic/updateBasStandard', {
                id: id,
                standardcode: standardcode,
                standardname: standardname,
                standardtype: standardtype,
                standardlevel: standardlevel,
                implementdate: implementdate,
                auditdate: auditdate,
                content: content,
            }, "POST").done(function(resp) {
                console.log(resp)

                layer.msg('新增成功');
                setTimeout(function() {
                    window.location.href = '../enterprise.html'
                }, 1500)
                return
            }).fail(function(err) {
                console.log(err)
                alert('新增失败');
            });
        }

        function toStringDate(str) {
            var d = new Date(str);
            var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            return times;
        }

        function getBasStandardById(id) {
            handleAjax('basic/getBasStandardById', { id: id },
                "GET").done(function(resp) {

                setTimeout(function() {
                    document.querySelector('#standardcode').value = resp.list[0].standardcode;
                    document.querySelector('#standardname').value = resp.list[0].standardname;
                    document.querySelector('#standardtype').value = resp.list[0].standardtype;
                    document.querySelector('#standardlevel').value = resp.list[0].standardlevel;
                    document.querySelector('#implementdate').value = toStringDate(resp.list[0].implementdate);
                    document.querySelector('#auditdate').value = toStringDate(resp.list[0].auditdate);
                    document.querySelector('#content').value = resp.list[0].content;
                    layui.form.render();

                }, 500)
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

        function addBasStandard() {
            var standardcode = document.querySelector('#standardcode').value;
            var standardname = document.querySelector('#standardname').value;
            var standardtype = document.querySelector('#standardtype').value;
            var standardlevel = document.querySelector('#standardlevel').value;
            var implementdate = document.querySelector('#implementdate').value + " " + "00:00:00";
            var auditdate = document.querySelector('#auditdate').value + " " + "00:00:00";
            var content = document.querySelector('#content').value;
            handleAjax('basic/addBasStandard', {
                standardcode: standardcode,
                standardname: standardname,
                standardtype: standardtype,
                standardlevel: standardlevel,
                implementdate: implementdate,
                auditdate: auditdate,
                content: content,
            }, "POST").done(function(resp) {
                console.log(resp)

                layer.msg('新增成功');
                setTimeout(function() {
                    window.location.href = '../enterprise.html'
                }, 1500)
                return
            }).fail(function(err) {
                console.log(err)
                alert('新增失败');
            });
        }
    })

})()