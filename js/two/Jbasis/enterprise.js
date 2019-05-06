(function(){
    layui.use(['table', "laydate"], function() {
        var $ = layui.jquery,
            table = layui.table,
            laydate = layui.laydate;

        laydate.render({
            elem: '#date1' //指定元素 
        });
        laydate.render({
            elem: '#date2' //指定元素
        });

         //监听头部监听 ||新增
        table.on('toolbar(testdome)', function(obj) {
            var checkStatus = table.checkStatus(obj.config.id),
                data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'add':
                    window.location.href = "./dialog/enterpriseDialog.html";
                    break;
                case 'update':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else if(data.length > 1){
                      layer.msg('只能同时编辑一个');
                    } else {
                        window.location.href = "./dialog/enterpriseDialog.html?id="+data[0].id;
                    }
                    break;
                case 'delete':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else {
                        console.log(data);
                        for(var i=0;i<data.length;i++){
                            delBasStandard(data[i].id);
                        }
                        // layer.msg('删除成功');
                        setTimeout(function(){
                            getBasStandard();
    
                        },1500)
                    }
                    break;
            };
        });
        document.querySelector('#getBasStandard').addEventListener('click',function(e){
            getBasStandard();
        })
       /*重置*/
        $(".agains").click(function() {
            window.location.reload();
        })
        function delBasStandard(delid){
            handleAjax('basic/delBasStandard',
            {
                id:delid
            }, "post").done(function(resp) {
                console.log(resp);
                
                layer.msg('删除成功');
                
                return
            }).fail(function(err) {
                console.log(err)

            })
        }
        getBasStandard();
        function getBasStandard(){
            var standardcode = document.querySelector('#standardcode').value;
            var standardname = document.querySelector('#standardname').value;
            var standardtype = document.querySelector('#standardtype').value;
            var standardlevel = document.querySelector('#standardcode').value;


            //获取列表
            table.render({
                elem: '#test',
                url: base + "basic/getBasStandard",
                method: "GET",
                where: {standardcode:standardcode,standardname:standardname,standardtype:standardtype,standardlevel:standardlevel},
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                toolbar: '#toolbarinter',
                done: function(res, curr, count) {
                    console.log(res)
                },
                request: {
                    pageName: 'currentPage' //页码的参数名称，默认：page
                        ,
                    limitName: 'pageSize' //每页数据量的参数名，默认：limit
                },
                parseData: function(res) { //res 即为原始返回的数据
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "totalNum": res.pageBean.totalNum, //解析数据长度
                        "lists": res.pageBean.lists //解析数据列表
                    };
                },
                response: {
                    statusName: 'code', //数据状态的字段名称，默认：code
                    statusCode: 10000, //成功的状态码，默认：0
                    msgName: "message", //状态信息的字段名称，默认：msg
                    countName: 'totalNum', //数据总数的字段名称，默认：count
                    dataName: 'lists', //数据列表的字段名称，默认：data
                },
                cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    ,
                page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                    layout: ['prev', 'page', 'next', 'skip', 'count'] //自定义分页布局
                        //,curr: 5 //设定初始在第 5 页
                        ,
                    groups: 5 //只显示 1 个连续页码
                        ,
                    first: false //不显示首页
                        ,
                    last: false //不显示尾页
                        ,
                    prev: '上一页',
                    next: "下一页",
                    theme: "#c81623",
                },
                // height: 'full-20',//满高
                cols: [
                    [{
                        type: 'checkbox', 
                        fixed: 'left'
                    },{
                        title: '编号',
                        type: 'numbers'
                    }, {
                        field: 'createname',
                        title: '创建人名称',
                        align: "center",
                        minWidth: 150
                    }, {
                        field: 'createon',
                        title: '创建人时间',
                        align: "center",
                        minWidth: 150,
                        templet: "<div>{{layui.util.toDateString(d.createon, 'yyyy-MM-dd')}}</div>"
                    }, {
                        field: 'standardname',
                        title: '标准名称',
                        align: "center",
                        minWidth: 100
                    }, {
                        field: 'standardcode',
                        title: '标准编号',
                        align: "center",
                        minWidth: 120
                    }, {
                        field: 'standardtype',
                        title: '标准种类',
                        align: "center",
                        minWidth: 180
                    }, {
                        field: 'standardlevel',
                        title: '标准级别',
                        align: "center",
                        minWidth: 200
                    }, 
                    // {
                    //     field: 'standardcountry',
                    //     title: '归属国',
                    //     align: "center",
                    //     minWidth: 120
                    // }, 
                    {
                        field: 'implementdate',
                        title: '实施日期',
                        align: "center",
                        minWidth: 130
                    }, 
                    // {
                    //     field: 'auditdate',
                    //     title: '批准日期',
                    //     align: "center",
                    //     minWidth: 150
                    // },
                     {
                        field: 'content',
                        title: '正文内容',
                        align: "center",
                        minWidth: 150
                    }]
                ]
            });
        }
    })
})()