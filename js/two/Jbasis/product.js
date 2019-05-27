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
                    window.location.href = "./dialog/productDialog.html";
                    break;
                    case 'update':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else if(data.length > 1){
                      layer.msg('只能同时编辑一个');
                    } else {
                        window.location.href = "./dialog/productDialog.html?id="+data[0].id;
                    }
                    break;
                case 'delete':
                    if(data.length === 0){
                      layer.msg('请选择一行');
                    } else {
                        console.log(data);
                        for(var i=0;i<data.length;i++){
                            delProductById(data[i].id);
                        }
                        // layer.msg('删除成功');
                        setTimeout(function(){
                            getBasProduct();
    
                        },1500)
                    }
                    break;
            };
        });
        document.querySelector('#getBasProduct').addEventListener('click',function(){
            getBasProduct();
        })
       
        getBasProduct();
        function delProductById(id) {
            handleAjax('basic/delProductById',
                {
                    id:id
                }, "post").done(function(resp) {
                layer.msg('删除成功');
                return
            }).fail(function(err) {
            })
        }
        function getBasProduct(){
            var productname = document.querySelector('#productname').value;
            // var storagelevel = document.querySelector('#storagelevel').value;

            //获取列表
            table.render({
                elem: '#testee',
                url: base + "basic/getBasProduct",
                method: "GET",
                where: {productclass:2,productname:productname},
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
                        type: 'numbers',
                        fixed: 'left'
                    }, {
                        field: 'createname',
                        title: '创建人名称',
                        align: "center",
                        minWidth: 100
                    }, {
                        field: 'producttype',
                        title: '产品分类',
                        align: "center",
                        minWidth: 100
                            // sort: true,
                            // width: 100,
                           
                    }, 
                    // {
                    //     field: 'productcode',
                    //     title: '产品编号',
                    //     align: "center",
                    //     minWidth: 100
                    // }, 
                    {
                        field: 'barcode',
                        title: '产品条码',
                        align: "center",
                        minWidth: 120
                    }, {
                        field: 'productname',
                        title: '名称',
                        align: "center",
                        minWidth: 180
                    }, {
                        field: 'specifications',
                        title: '规格',
                        align: "center",
                        minWidth: 200
                    }, {
                        field: 'unit',
                        title: '单位',
                        align: "center",
                        minWidth: 120
                    }, {
                        field: 'weight',
                        title: '重量',
                        align: "center",
                        minWidth: 130
                    }, {
                        field: 'lifedate',
                        title: '保质期',
                        align: "center",
                        minWidth: 150
                    }, {
                        field: 'lifedateunit',
                        title: '保质期单位',
                        align: "center",
                        minWidth: 150
                    }, 
                    // {
                    //     field: 'brand',
                    //     title: '品牌',
                    //     align: "center",
                    //     minWidth: 150
                    // }, {
                    //     field: 'enterprisecode',
                    //     title: '生产企业编码',
                    //     align: "center",
                    //     minWidth: 150
                    // }, {
                    //     field: 'isadditivetiny',
                    //     title: '是否是添加剂',
                    //     align: "center",
                    //     minWidth: 150
                    // }, 
                    {
                        field: 'productclass',
                        title: '产品系统类别',
                        align: "center",
                        minWidth: 150,
                        templet: function(d) {
                            var num = null;
                            console.log(d.productclass)
                            if (d.productclass == "1") {
                                num = "原辅料"
                                return num
                            }
    
                            if (d.productclass == "2" ) {
                                num = "产品"
                                return num
                            }
                            if (d.productclass == "3" ) {
                                num = "投入品"
                                return num
                            }
                            if (d.productclass == "4" ) {
                                num = "农产品"
                                return num
                            }
                            if (d.productclass == "5" ) {
                                num = "畜禽"
                                return num
                            }
                        }
                    }, 
                    // {
                    //     field: 'productstatus',
                    //     title: '状态',
                    //     align: "center",0
                    //     minWidth: 150
                    // }, 
                    {
                        field: 'standardcode',
                        title: '执行标准编号(新)',
                        align: "center",
                        minWidth: 150
                    }, {
                        field: 'standardname',
                        title: '执行标准名称(新)',
                        align: "center",
                        minWidth: 150
                    }, {
                        field: 'purchaseprice',
                        title: '进货价(新)',
                        align: "center",
                        minWidth: 150
                    }]
                ]
            });
        }
    })
})()