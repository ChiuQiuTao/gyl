layui.use(['table', "layer", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        util = layui.util,
        datas = {};


    //监听表格里面按钮
    table.on('tool(testdome)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if (layEvent === 'detail') { //查看
            layer.msg("查看");
        }
    });



    //获取列表
    var tableIns = table.render({
        elem: '#testdomess',
        url: base + "OrdProcessing/getInventoryListVo",
        method: "GET",
        where: {},
        headers: {
            Authorization: "Bearer" + " " + sessions
        },
        toolbar: '#toolbarinter',
        request: {
            pageName: 'currentPage',
            limitName: 'pageSize'
        },
        parseData: function(res) { //res 即为原始返回的数据
            console.log(res)
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
        cols: [
            [{
                title: '编号',
                type: 'numbers',
                fixed: 'left'
            }, {
                field: 'productname',
                title: '产品名称',
                minWidth: 130,
                align: "center"
            }, {
                field: 'stocknum',
                title: '库存数量',
                sort: true,
                align: "center",
                minWidth: 120,
            }, {
                field: 'innum',
                title: '末次生产数量',
                align: " center",
                sort: true,
                minWidth: 120,
                // templet: function(d) {
                //     return d.innum + "(" + d.unit + ")"
                // }
            }, {
                field: 'indate',
                title: '末次生产日期',
                align: "center",
                sort: true,
                minWidth: 120,
                templet: function(d) {
                    var numv = null;
                    if (d.indate == "" || d.indate == null) {
                        numv = " ";
                    } else {
                        numv = d.indate = layui.util.toDateString(d.indate, 'yyyy-MM-dd');
                    }
                    return numv
                },
            }, {
                field: 'outnum',
                title: '末次销售数量',
                align: "center",
                sort: true,
                minWidth: 120,
                // templet: function(d) {
                //     return d.outnum + "(" + d.unit + ")"
                // }
            }, {
                field: 'outdate',
                title: '末次销售时间',
                minWidth: 120,
                align: "center",
                sort: true,
                templet: function(d) {
                    var numv = null;
                    if (d.outdate == "" || d.outdate == null) {
                        numv = " ";
                    } else {
                        numv = d.outdate = layui.util.toDateString(d.outdate, 'yyyy-MM-dd');
                    }
                    return numv
                },
            }, {
                field: 'id',
                width: 137,
                title: '更多',
                minWidth: 20,
                align: "center",
                fixed: 'right',
                toolbar: '#More',
            }]
        ]
    });



    //重置
    $(".resets").click(function() {
        $(".manes").val("");
        tableIns.reload({
            where: {
                productclass: 1
            },
            page: {
                curr: 1, //重新从第 1 页开始
                layout: ['prev', 'page', 'next', 'skip', 'count']
            },
        })
    })


    //查询
    $(".querys").click(function() {

        if ($(".manes").val() == "") {
            layer.msg('请输入查询条件！', { time: 1000, offset: 't', });
            return;
        }
        datas.productname = $(".manes").val();

        tableIns.reload({
            where: datas,
            page: {
                curr: 1, //重新从第 1 页开始
                layout: ['prev', 'page', 'next', 'skip', 'count']
            }
        })
    })
})