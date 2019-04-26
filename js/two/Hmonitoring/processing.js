layui.use(['table', "layer", "laydate", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate,
        util = layui.util,
        datas = {}

    //时间
    laydate.render({
        elem: '#date1',
        done: function(value) {
            console.log(value)
            datas.orderdateq = value + " " + "00:00:00";
        }

    });
    laydate.render({
        elem: '#date2',
        done: function(value) {
            console.log(value)
            datas.orderdateh = value + " " + "00:00:00";
        }
    });


    //生产加工单号
    $(".Orders").blur(function() {
        var reg = /^[1-9]\d*$/;
        if (!reg.test($(".Orders").val())) {
            alerts("请正确输入单号!");
            $(".Orders").val("");
            return
        }
        datas.ordercode = $(this).val();
    })

    //商品名称
    $(".Orders").blur(function() {
        datas.names = $(this).val();
    })



    //监听头部监听 ||新增
    table.on('toolbar(testdome)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据

        switch (obj.event) {
            case 'add':
                window.location.href = "./newpage/pronew.html";
                break;
        };
    });


    //监听表格里面按钮
    table.on('tool(testdome)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        if (layEvent === 'detail') { //查看
            details(data.id);
        }
    });

    //查看列的基础信息
    function details(ee) {
        layer.open({
            type: 1,
            title: "查看",
            shadeClose: true, //是否点击遮罩关闭
            anim: 5, //弹出动画
            scrollbar: false, //窗口外滚动条是否出现
            skin: 'layui-layer-rim', //加上边框
            area: ['760px', '440px'], //宽高
            content: '<div class="ssss"></div>',
            success: function(layero, index) {

                noAjax('OrdProcessing/getProcessingProduct', {
                    Id: ee
                }, "GET").done(function(resp) {
                    console.log(resp)
                    var obj = resp;
                    var timess = resp.orderdate;
                    timess = timess.split("T");
                    obj.timess = timess[0];
                    var html = template("contentquery", obj);
                    $(".ssss").html(html);

                }).fail(function(err) {
                    console.log(err)

                });
            }
        });
    }



    //获取列表
    var tableIns = table.render({
        elem: '#testee',
        url: base + "OrdProcessing/getProcessingListVo",
        method: "GET",
        where: {},
        headers: {
            Authorization: "Bearer" + " " + sessions
        },
        toolbar: '#toolbarinter',
        done: function(res, curr, count) {},
        request: {
            pageName: 'currentPage' //页码的参数名称，默认：page
                ,
            limitName: 'pageSize' //每页数据量的参数名，默认：limit
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
            first: "首页" //不显示首页
                ,
            last: "尾页" //不显示尾页
                ,
            prev: '上一页',
            next: "下一页",
            theme: "#c81623",
        },
        // height: 'full-20',//满高
        cols: [
            [{
                title: '编号',
                type: 'numbers',
                fixed: 'left'
            }, {
                field: 'orderCode',
                title: '生产加工单号',
                minWidth: 160,
                align: "center"
            }, {
                field: 'productName',
                title: '产品名称',
                minWidth: 100,
                align: "center"
            }, {
                field: 'batch',
                title: '生产批次',
                width: 110,
                align: " center",
                sort: true
            }, {
                field: 'orderDate',
                title: '生产日期',
                width: 120,
                align: "center",
                sort: true,
                templet: "<div>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd')}}</div>"
            }, {
                field: 'num',
                title: '生产数量',
                align: "center",
                sort: true,
                width: 100,
                templet: function(d) {
                    return d.num + "(" + d.unit + ")"
                }
            }, {
                field: 'weight',
                title: '生产重量',
                align: "center",
                width: 100
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
    $(".heavys").click(function() {
        $("#date1").val("");
        $("#date2").val("");
        $(".Orders").val("");
        $(".names").val("");
        datas = {};

        tableIns.reload({
            where: {},
            page: {
                curr: 1, //重新从第 1 页开始
                layout: ['prev', 'page', 'next', 'skip', 'count']
            },
        })

    })


    //查询
    $(".checks").click(function() {

        if ($("#date1").val() == "" && $("#date2").val() == "" && $(".Orders").val() == "" && $(".names").val() == "") {

            layer.msg('请输入查询条件！', { time: 1000, offset: 't', });
            return;
        }

        tableIns.reload({
            where: datas,
            page: {
                curr: 1, //重新从第 1 页开始
                layout: ['prev', 'page', 'next', 'skip', 'count']
            },

        })
    })
})