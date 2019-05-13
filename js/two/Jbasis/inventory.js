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
                    window.location.href = "./dialog/inventoryDialog.html";
                    break;
                case 'update':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else if(data.length > 1){
                      layer.msg('只能同时编辑一个');
                    } else {
                        window.location.href = "./dialog/inventoryDialog.html?id="+data[0].id;
                    }
                    break;
                case 'delete':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else {
                        console.log(data);
                        var arrayId = [];
                        for(var i=0;i<data.length;i++){
                            arrayId.push(data[i].id);
                            
                        }
                        arrayId = JSON.stringify(arrayId);
                       
                        delBasStorage(arrayId);

                        // layer.msg('删除成功');
                        setTimeout(function(){
                            getBasStorage();
    
                        },1500)
                    }
                    break;
            };
        });
        
        $("#getBasStorage").click(function() {
            getBasStorage();

        })
        /*重置*/
        $(".agains").click(function() {
            window.location.reload();
        })
        getBasStorage();
        function delBasStorage(arrayId){
            handleAjax('basic/delBasStorage',
            arrayId
            , "post",'utf-8').done(function(resp) {
                console.log(resp);
                
                layer.msg('删除成功');
                
                return
            }).fail(function(err) {
                console.log(err)

            })
        }
        function getBasStorage(){
            var storagename = document.querySelector('#storagename').value;
            var storagelevel = document.querySelector('#storagelevel').value;
           
            //获取列表
            table.render({
                elem: '#testee',
                url: base + "basic/getBasStorageVo",
                method: "GET",
                where: {storagename:storagename,storagelevel:storagelevel},
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                toolbar: '#toolbarinter',
                done: function(res, curr, count) {
                    // console.log(res)

                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        // console.log(res);
                        // //得到当前页码
                        // console.log(curr);
                        // //得到数据总量
                        // console.log(count);
                },
                // request: {
                //     // pageName: 'currentPage' //页码的参数名称，默认：page
                //     //     ,
                //     // limitName: 'pageSize' //每页数据量的参数名，默认：limit
                // },
                parseData: function(res) { //res 即为原始返回的数据
                    console.log(res);
                    // var dataList = [];
                    // for (var i=0;i<res.list.length;i++){
                    //     if(res.list[i].childNodes.length!=0 &&res.list[i].childNodes){
                    //         for (var j=0;j<res.list[i].childNodes.length;j++){
                    //             res.list[i].childNodes[j].parentName=res.list[i].storagename
                    //             dataList.push(res.list[i].childNodes[j]);
                    //         }
                    //     }
                    //     else{
                    //         res.list[i].parentName=res.list[i].storagename;
                    //         res.list[i].storagename='暂无';
                    //         dataList.push(res.list[i]);
                    //     }
                    // }
             
                   
                    return {
                        "code": res.code, //解析接口状态
                        "msg": res.message, //解析提示文本
                        "totalNum": res.list.length, //解析数据长度
                        "lists":res.list //解析数据列表
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
                // page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                //     layout: ['prev', 'page', 'next', 'skip', 'count'] //自定义分页布局
                //         //,curr: 5 //设定初始在第 5 页
                //         ,
                //     groups: 5 //只显示 1 个连续页码
                //         ,
                //     first: false //不显示首页
                //         ,
                //     last: false //不显示尾页
                //         ,
                //     prev: '上一页',
                //     next: "下一页",
                //     theme: "#c81623",
                // },
                // height: 'full-20',//满高
                cols: [
                    [{
                        type: 'checkbox', 
                        fixed: 'left'
                    },{
                        title: '编号',
                        type: 'numbers',
                    },
                    
                    {
                        field: 'storagename',
                        title: '仓库名称',
                        align: "center",
                        minWidth: 120
                    }, 
                    {
                        field: 'storagelevel',
                        title: '仓库等级',
                        align: "center",
                        minWidth: 120,
                        templet: function(d) {
                            if(d.parentid==null){
                                return '一级仓库'
                            }else{
                                return '二级仓库'
                            }
                        }
                    }, 
                    
                    {
                        field: 'chargeperson',
                        title: '仓库负责人',
                        align: "center",
                        minWidth: 130
                    }
                ]
                ]
            });
        }
    })
})()