layui.use(['table', "layer", "laydate", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate,
        util = layui.util;

    //时间
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
                window.location.href = "./dialog/supplierDialog.html";
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

                handleAjax('OrdProcessing/getProcessingProduct', {
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

    document.querySelector('#selectcondition').addEventListener('click',function(){
        getBasEnterprise();
    })
    getBasEnterprise();
    function getBasEnterprise(){
        var enterprisename=document.querySelector('#enterprisename').value;
        var license=document.querySelector('#license').value;
        var currentPage=1;

        //获取列表
        table.render({
            elem: '#testee',
            url: base + "basic/getBasEnterprise",
            method: "GET",
            where: {enterprisename:enterprisename,license:license,enterpriseclass:'2',currentPage:currentPage},
            headers: {
                Authorization: "Bearer" + " " + sessions
            },
            toolbar: '#toolbarinter',
            done: function(res, curr, count) {
                console.log(res)
                    //如果是异步请求数据方式，res即为你接口返回的信息。
                    //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                    // console.log(res);
                    // //得到当前页码
                    // console.log(curr);
                    // //得到数据总量
                    // console.log(count);
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
                    title: '编号',
                    type: 'numbers',
                    fixed: 'left'
                }, {
                    field: 'createname',
                    title: '创建人名称',
                    align: "center"
                }, {
                    field: 'enterprisename',
                    title: '企业名称',
                    align: "center",
                    // sort: true,
                    // width: 100,
                    // templet: function(d) {
                    //     return d.num + "(" + d.unit + ")"
                    // }
                }, {
                    field: 'enterpriseclass',
                    title: '生产重量',
                    align: "center",
                }, {
                    field: 'license',
                    title: '营业执照号',
                    align: "center",
                }, {
                    field: 'picturepath',
                    title: '营业执照图片地址',
                    align: "center",
                }, {
                    field: 'enterprisecode',
                    title: '企业编号',
                    align: "center",
                }, {
                    field: 'state',
                    title: '国家省市区国家',
                    align: "center",
                }, {
                    field: 'province',
                    title: '省',
                    align: "center",
                }, {
                    field: 'city',
                    title: '市',
                    align: "center",
                }, {
                    field: 'district',
                    title: '区',
                    align: "center",
                }, {
                    field: 'address',
                    title: '详细地址',
                    align: "center",
                }, {
                    field: 'corporation',
                    title: '法定负责人',
                    align: "center",
                }, {
                    field: 'linkman',
                    title: '联系人',
                    align: "center",
                }, {
                    field: 'phone',
                    title: '联系人电话',
                    align: "center",
                }, {
                    field: 'auditstaus',
                    title: '审核状态',
                    align: "center",
                }, {
                    field: 'createenterprisename',
                    title: '创建人的企业',
                    align: "center",
                }, {
                    field: 'auditdate',
                    title: '审批日期',
                    align: "center",
                }, {
                    field: 'scope',
                    title: '经营范围',
                    align: "center",
                }, {
                    field: 'enterprisetype',
                    title: '企业类型名称',
                    align: "center",
                }, {
                    field: 'remark',
                    title: '备注',
                    align: "right",
                }]
            ]
        });
    }

    
})