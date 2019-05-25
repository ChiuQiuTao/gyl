layui.define(['table', 'form','serviceTools','layer'], function (exports) {
    (function(win, doc) {
        var table = layui.table,
            form = layui.form,
            tools = layui.serviceTools,
            $ = layui.jquery,
            layer = layui.layer;
        var defaultServicesConfig = {
            serachUrl:null,
            getUrl:null,
            delUrl:null,
            updUrl:null,
            saveUrl:null,
            tableId:null,
            cols:[[]],
            toolbar:null,
            deleteField:null,
            parameter:null,
            dataType:null,
        };
        function Services(option) {
            var self = this;
            self.container = doc.querySelector(self.container) || doc.querySelectorAll(self.container);
            Object.assign(defaultServicesConfig, option);
            init();
        }
        var tableService = table.render({});
        //初始化数据
        function init() {
            tableService = table.render({
                elem: "#"+defaultServicesConfig.tableId,
                url: defaultServicesConfig.baseURL+defaultServicesConfig.serachUrl,
                method: 'GET',
                headers: {
                    Authorization: "Bearer" + " " + sessions
                },
                response: {
                    statusName: "code",
                    statusCode: 200,
                    msgName: "msg",
                    countName: "count",
                    dataName: "data"
                },
                parseData: function(res) {
                    console.log(res)
                    return {
                        "code": res.code,
                        "msg": res.msg,
                        "count": res.data.totalElements,
                        "data": res.data.content
                }},
                where:defaultServicesConfig.parameter,
                toolbar:defaultServicesConfig.toolbar,
                page: true,
                cols: defaultServicesConfig.cols,
                done:function () {
                    bindEvent();//加载事件
                }
            });
        }
        //添加绑定事件
        function bindEvent(){
            localStorage.removeItem("type");
            localStorage.setItem("type",defaultServicesConfig.dataType);

            $("[lay-event='add']").unbind("click").on("click" ,function () {
                 window.location.href = defaultServicesConfig.saveUrl;
            })
            $("[lay-event='update']").unbind("click").on("click" ,function () {
                var data = table.checkStatus(defaultServicesConfig.tableId);
                data.data.length === 1 ?(function () {
                    localStorage.removeItem([data.data[0].id])
                    localStorage.setItem([data.data[0].id],JSON.stringify(data.data[0]));
                    window.location.href = defaultServicesConfig.saveUrl+"?id="+data.data[0].id;
                })():alerts("请选择一条数据");
            })
            $("[lay-event='delete']").unbind("click").on("click" ,function () {
                var data = table.checkStatus(defaultServicesConfig.tableId);
                data.data.length === 1 ?(function () {
                    tools.EditOrSaveOrDelete({
                        parame:{[defaultServicesConfig.deleteField]:data.data[0].id},
                        url: defaultServicesConfig.baseURL+defaultServicesConfig.delUrl,
                    })
                    setTimeout(function(){
                        window.location.reload();
                    },1500)
                })():alerts("请选择一条数据");
            })
            $("[lay-event='reset']").unbind("click").on("click" ,function () {
                $("input[type='text']").val("");
                defaultServicesConfig.parameter.keyword = "";
                tableService.reload({where:defaultServicesConfig.parameter,page:{curr: 1}})
            })
            $("[lay-event='search']").unbind("click").on("click" ,function () {
                var val = "";
                $("input[search-type]").each(function(){
                    val += $(this).val()+"|";
                });
                defaultServicesConfig.parameter.keyword = val.substring(0,val.length - 1);
                tableService.reload({where:defaultServicesConfig.parameter,page:{curr: 1}})
            })
            $("[lay-event='get']").unbind("click").on("click" ,function () {
                var data = table.checkStatus(defaultServicesConfig.tableId);
                data.data.length === 1 ?(function () {
                    alert(11)
                })():alerts("请选择一条数据");
            })
        }
        Services.prototype = {
            save : function () {
            }
        }
        win.Services = Services;
    })(window, document)
    exports('Services', Services);
})