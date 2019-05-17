layui.use(["table", "layer", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        util = layui.util,
        datas = {};

    //监听表格里面按钮
    table.on("tool(testdome)", function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if (layEvent === "detail") {
            //查看
            inventory(data.id);
        }
    });

    function inventory(tt) {
        layer.open({
            type: 1,
            title: "查看",
            shadeClose: true, //是否点击遮罩关闭
            anim: 5, //弹出动画
            scrollbar: false, //窗口外滚动条是否出现
            skin: "layui-layer-rim", //加上边框
            area: ["900px", "440px"], //宽高
            content: '<div class="ssss"></div>',
            success: function(layero, index) {
                noAjax(
                        "ordPurchase/getPurchaseInventoryOne", {
                            id: tt
                        },
                        "GET"
                    )
                    .done(function(resp) {
                        console.log(resp);

                        $.each(resp.list, function(index, item) {
                            if (item.endinputdate == null || item.endinputdate == "") {
                                item.endinputdate = "";
                            } else {
                                item.endinputdate = times(item.endinputdate);
                            }

                            if (item.endoutputdate == null || item.endoutputdate == "") {
                                item.endoutputdate = "";
                            } else {
                                item.endoutputdate = times(item.endoutputdate);
                            }

                            if (item.factorydate == null || item.factorydate == "") {
                                item.factorydate = "";
                            } else {
                                item.factorydate = times(item.factorydate);
                            }

                            if (item.endinputnum == null || item.endinputnum == "") {
                                item.endinputnum = "";
                            } else {
                                item.endinputnum = Number(item.endinputnum).toFixed(2);
                            }

                            if (item.endoutputnum == null || item.endoutputnum == "") {
                                item.endoutputnum = "";
                            } else {
                                item.endoutputnum = Number(item.endoutputnum).toFixed(2);
                            }

                            if (item.weight == null || item.weight == "") {
                                item.weight = "";
                            } else {
                                item.weight = Number(item.weight).toFixed(2);
                            }

                            if (item.lifedateunit == null || item.lifedateunit == "") {
                                item.stats = "";
                                item.effective = "";
                            } else if (item.lifedateunit == "天") {
                                /*当前时间*/
                                var newDay = new Date().getTime();
                                var oldday = new Date(item.factorydate).getTime();
                                var da = item.lifedate * 24 * 60 * 60 * 1000 + oldday;
                                var nid = newDay - oldday;
                                da = new Date(da);
                                nid = new Date(nid);
                                var year = da.getFullYear();
                                var month = da.getMonth() + 1;
                                var date = da.getDate();

                                if (item.lifedate - nid.getDate() >= 0) {
                                    item.stats =
                                        "有效期还有" + (item.lifedate - nid.getDate()) + "天";
                                } else {
                                    item.stats =
                                        "已超过效期" + (nid.getDate() - item.lifedate) + "天";
                                }

                                item.effective = [year, month, date].join("-");
                                return;
                            } else if (item.lifedateunit == "月") {
                                var nus = item.factorydate.split("-");
                                var sss = Number(nus[1]) + Number(item.lifedate);
                                var nian = parseInt(sss / 12);
                                var yue = sss % 12;
                                nus[0] = Number(nus[0]) + nian;
                                nus[1] = yue;
                                var ste = nus.join("-");
                                item.effective = ste;
                                var newyue = new Date().getTime();
                                var oldyue = new Date(ste).getTime();
                                if (oldyue - newyue > 0) {
                                    var nday = oldyue - newyue;
                                    item.stats =
                                        "有效期还有" + parseInt(nday / 86400 / 1000) + "天";
                                } else {
                                    var ndays = -(oldyue - newyue);
                                    item.stats =
                                        "已超过效期" + parseInt(ndays / 86400 / 1000) + "天";
                                }
                            } else if (item.lifedateunit == "年") {
                                var nuse = item.factorydate.split("-");
                                nuse[0] = Number(nuse[0]) + Number(item.lifedate);
                                var stes = nuse.join("-");
                                item.effective = stes;
                                var newnian = new Date().getTime();
                                var oldnian = new Date(stes).getTime();
                                var dae = oldnian - newnian;
                                if (dae > 0) {
                                    item.stats =
                                        "有效期还有" + parseInt(dae / 86400 / 1000) + "天";
                                } else {
                                    dae = -dae;
                                    item.stats =
                                        "已超过效期" + parseInt(dae / 86400 / 1000) + "天";
                                }
                            }
                        });
                        var html = template("contentquery", resp);
                        $(".ssss").html(html);
                    })
                    .fail(function(err) {
                        console.log(err);
                    });
            }
        });
    }

    function times(t) {
        return (t = t.split("T")[0]);
    }

    //获取列表
    var tableIns = table.render({
        elem: "#testdomess",
        url: base + "OrdProcessing/getInventoryListVo",
        method: "GET",
        where: {},
        headers: {
            Authorization: "Bearer" + " " + sessions
        },
        toolbar: "#toolbarinter",
        request: {
            pageName: "currentPage",
            limitName: "pageSize"
        },
        parseData: function(res) {
            //res 即为原始返回的数据
            console.log(res);
            return {
                code: res.code, //解析接口状态
                msg: res.message, //解析提示文本
                totalNum: res.pageBean.totalNum, //解析数据长度
                lists: res.pageBean.lists //解析数据列表
            };
        },
        response: {
            statusName: "code", //数据状态的字段名称，默认：code
            statusCode: 10000, //成功的状态码，默认：0
            msgName: "message", //状态信息的字段名称，默认：msg
            countName: "totalNum", //数据总数的字段名称，默认：count
            dataName: "lists" //数据列表的字段名称，默认：data
        },
        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        page: {
            //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ["prev", "page", "next", "skip", "count"], //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            groups: 5, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false, //不显示尾页
            prev: "上一页",
            next: "下一页",
            theme: "#c81623"
        },
        cols: [
            [{
                    title: "编号",
                    type: "numbers",
                    fixed: "left"
                },
                {
                    field: "productname",
                    title: "产品名称",
                    minWidth: 130,
                    align: "center"
                },
                {
                    field: "stocknum",
                    title: "库存数量",
                    sort: true,
                    align: "center",
                    minWidth: 120
                },
                {
                    field: "endinputnum",
                    title: "末次生产数量",
                    align: " center",
                    sort: true,
                    minWidth: 120
                },
                {
                    field: "endinputdate",
                    title: "末次生产日期",
                    align: "center",
                    sort: true,
                    minWidth: 120,
                    templet: function(d) {
                        var numv = null;
                        if (d.endinputdate == "" || d.endinputdate == null) {
                            numv = " ";
                        } else {
                            numv = d.endinputdate = layui.util.toDateString(
                                d.endinputdate,
                                "yyyy-MM-dd"
                            );
                        }
                        return numv;
                    }
                },
                {
                    field: "endoutputnum",
                    title: "末次销售数量",
                    align: "center",
                    sort: true,
                    minWidth: 120
                },
                {
                    field: "endoutputdate",
                    title: "末次销售时间",
                    minWidth: 120,
                    align: "center",
                    sort: true,
                    templet: function(d) {
                        var numv = null;
                        if (d.endoutputdate == "" || d.endoutputdate == null) {
                            numv = " ";
                        } else {
                            numv = d.endoutputdate = layui.util.toDateString(
                                d.endoutputdate,
                                "yyyy-MM-dd"
                            );
                        }
                        return numv;
                    }
                },
                {
                    field: "id",
                    width: 137,
                    title: "更多",
                    minWidth: 20,
                    align: "center",
                    fixed: "right",
                    toolbar: "#More"
                }
            ]
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
                layout: ["prev", "page", "next", "skip", "count"]
            }
        });
    });

    //查询
    $(".querys").click(function() {
        if ($(".manes").val() == "") {
            layer.msg("请输入查询条件！", { time: 1000, offset: "t" });
            return;
        }
        datas.productname = $(".manes").val();

        tableIns.reload({
            where: datas,
            page: {
                curr: 1, //重新从第 1 页开始
                layout: ["prev", "page", "next", "skip", "count"]
            }
        });
    });
});