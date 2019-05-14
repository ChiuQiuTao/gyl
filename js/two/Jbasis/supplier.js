layui.use(['form','element','table', "layer", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        element = layui.element,
        util = layui.util,
        form=layer.form;

    //监听头部监听 ||新增 ||删除
    table.on('toolbar(testdome)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        if(obj.event === 'showImg'){
            console.log('12313')
        }
        switch (obj.event) {
            // case 'showImg':
            //     console.log('12313')
            //     break;
            case 'add':
                window.location.href = "./dialog/supplierDialog.html";
                break;
            case 'update':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else if(data.length > 1){
                  layer.msg('只能同时编辑一个');
                } else {
                    window.location.href = "./dialog/supplierDialog.html?id="+data[0].id;
                }
                break;
            case 'delete':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else {
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        delBasEnterpriseById(data[i].id);
                    }
                    // layer.msg('删除成功');
                    setTimeout(function(){
                        getBasEnterprise();

                    },1500)
                }
                break;
        };
    });


    //监听头部监听 ||新增
    table.on('toolbar(personalfilter)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
            
        switch (obj.event) {
            case 'add':
                window.location.href = "./dialog/supplierDialogP.html";
                break;
            case 'update':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else if(data.length > 1){
                  layer.msg('只能同时编辑一个');
                } else {
                    window.location.href = "./dialog/supplierDialogP.html?id="+data[0].id;
                }
                break;
            case 'delete':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else {
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        delBasPersonById(data[i].id);
                    }
                    // layer.msg('删除成功');
                    setTimeout(function(){
                        getBasPerson();

                    },1500)
                }
                break;
        };
    });


    //监听表格里面按钮
    table.on('tool(testdome)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(obj.event === 'showImg'){
            console.log(data);
            var photosdata = {
            "title": "营业执照", //相册标题
            "id": 123, //相册id
            "start": 0, //初始显示的图片序号，默认0
            "data": [   //相册包含的图片，数组格式
                {
                // "alt": "图片名",
                "pid": 666, //图片id
                "src": data.picturepath, //原图地址
                "thumb": data.picturepath //缩略图地址
                }
            ]
            }
            layer.photos({
                photos: photosdata //格式见API文档手册页
                ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
                });
            }
    });

    
    //查询
    document.querySelector('#selectcondition').addEventListener('click', function() {
        getBasEnterprise();
    })
    document.querySelector('#selectperson').addEventListener('click', function() {
        getBasPerson();
    })
    function delBasPersonById(delid){
        handleAjax('basic/delBasPersonById',
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
    function delBasEnterpriseById(delid){
        handleAjax('basic/delBasEnterpriseById',
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

    // 企业供应商
    getBasEnterprise();

    function getBasEnterprise() {
        var enterprisename = document.querySelector('#enterprisename').value;
        var license = document.querySelector('#license').value;

        //获取列表
        table.render({
            elem: '#testee',
            url: base + "basic/getBasEnterprise",
            method: "GET",
            where: { enterprisename: enterprisename, license: license, enterpriseclass: '2'},
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
                    type: 'checkbox', 
                    fixed: 'left'
                },{
                    title: '编号',
                    type: 'numbers',
                    // fixed: 'left'
                }, {
                    field: 'createname',
                    title: '创建人名称',
                    align: "center",
                    minWidth: 100
                }, {
                    field: 'enterprisename',
                    title: '企业名称',
                    align: "center",
                    minWidth: 100
                        // sort: true,
                        // width: 100,
                        // templet: function(d) {
                        //     return d.num + "(" + d.unit + ")"
                        // }
                }, {
                    field: 'enterpriseclass',
                    title: '生产重量',
                    align: "center",
                    minWidth: 100
                }, {
                    field: 'license',
                    title: '营业执照号',
                    align: "center",
                    minWidth: 120
                }, {
                    field: 'picturepath',
                    title: '营业执照图片地址',
                    align: "center",
                    minWidth: 180,
                    event: 'showImg', 
                    templet: function(d) {
                        return '<img src="'+d.picturepath+'" alt="" class="licenseimg">'
                    }
                }, 
                // {
                //     field: 'enterprisecode',
                //     title: '企业编号',
                //     align: "center",
                //     minWidth: 100
                // }, 
                {
                    field: 'corporation',
                    title: '法定负责人',
                    align: "center",
                    minWidth: 120
                }, {
                    field: 'linkman',
                    title: '联系人',
                    align: "center",
                    minWidth: 130
                }, {
                    field: 'phone',
                    title: '联系人电话',
                    align: "center",
                    minWidth: 150
                }, {
                    field: 'auditstaus',
                    title: '审核状态',
                    align: "center",
                    minWidth: 100,
                    templet: function(d) {
                        var num = null;
                        console.log(d.auditstaus)
                        if (d.auditstaus == "0") {
                            num = "待审批"
                            return num
                        }

                        if (d.auditstaus == "1" || d.auditstaus == "审批通过") {
                            num = "审批通过"
                            return num
                        }
                        if (d.auditstaus == "2" || d.auditstaus == "审批不通过") {
                            num = "审批不通过"
                            return num
                        }
                    }
                }
               
            ]

            ]
        });
    }



    // 个人供应商/客户
    getBasPerson();

    function getBasPerson() {

        var personname = document.querySelector('#personname').value;
        var personcard = document.querySelector('#personcard').value;
        var persontype = document.querySelector('#persontype').value;

        var currentPage = 1;

        //获取列表
        table.render({
            elem: '#personaltable',
            url: base + "basic/getBasPerson",
            method: "GET",
            where: { personname: personname, personcard: personcard, persontype: persontype},
            headers: {
                Authorization: "Bearer" + " " + sessions
            },
            toolbar: '#toolbarinterP',
            done: function(res, curr, count) {
                console.log(res)
                // showImg();
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
                    // fixed: 'left'
                }
                // , {
                //     field: 'createname',
                //     title: '创建人名称',
                //     align: "center",
                //     minWidth: 100
                // }
                // , {
                //     field: 'createondatetime',
                //     title: '创建时间',
                //     align: "center",
                //     minWidth: 100
                       
                // }
                , {
                    field: 'phone',
                    title: '联系电话',
                    align: "center",
                    minWidth: 150
                }, {
                    field: 'persontype',
                    title: '类型供应商、客户',
                    align: "center",
                    minWidth: 120
                }, {
                    field: 'personname',
                    title: '姓名',
                    align: "center",
                    minWidth: 180
                }, {
                    field: 'personcard',
                    title: '身份证',
                    align: "center",
                    minWidth: 100
                }, 
                // {
                //     field: 'createenterprise',
                //     title: '创建企业名称',
                //     align: "center",
                //     minWidth: 120
                // }, 
                {
                    field: 'address',
                    title: '联系地址',
                    align: "center",
                    minWidth: 130
                }, {
                    field: 'phone',
                    title: '联系人电话',
                    align: "center",
                    minWidth: 150
                }, {
                    field: 'auditstaus',
                    title: '审核状态',
                    align: "center",
                    minWidth: 100,
                    templet: function(d) {
                        var num = null;
                        console.log(d.auditstaus)
                        if (d.auditstaus == "0") {
                            num = "待审批"
                            return num
                        }

                        if (d.auditstaus == "1" || d.auditstaus == "审批通过") {
                            num = "审批通过"
                            return num
                        }
                        if (d.auditstaus == "2" || d.auditstaus == "审批不通过") {
                            num = "审批不通过"
                            return num
                        }
                    }
                }
                // ,{
                //     field: 'auditdate',
                //     title: '审批时间',
                //     align: "center",
                // }, {
                //     field: 'reason',
                //     title: '修改原因',
                //     align: "center",
                //     minWidth: 120
                // }, {
                //     field: 'auditreason',
                //     title: '审核原由',
                //     align: "center",
                //     minWidth: 140
                // }
            ]
            ]
            
        });
    }


    /*重置*/
    $(".agains").click(function() {
        window.location.reload();
    })
    document.querySelector('.againsperson').addEventListener('click',function(){
        document.querySelector('#personname').value='';
        document.querySelector('#personcard').value='';
        document.querySelector('#persontype').value=1;

        document.querySelector('#personinline').innerHTML='<select name="persontype" lay-verify="" id="persontype"><option value="1" class="persontypeitem" selected="selected">供应商</option><option value="2" class="persontypeitem">客户</option></select>'
        getBasPerson();

        layui.form.render('select');
    })
    
    // 展示图片
    // function showImg(){
    //     var imgs = document.querySelectorAll('.licenseimg');
    //     for(var i=0;i<imgs.length;i++){
    //         (function(i){
    //             imgs[i].addEventListener('click',function(){
    //                 var photosdata = {
    //                     "title": "营业执照", //相册标题
    //                     "id": 123, //相册id
    //                     "start": 0, //初始显示的图片序号，默认0
    //                     "data": [   //相册包含的图片，数组格式
    //                         {
    //                         // "alt": "图片名",
    //                         "pid": 666, //图片id
    //                         "src": imgs[i].src, //原图地址
    //                         "thumb": imgs[i].src //缩略图地址
    //                         }
    //                     ]
    //                 }
    //                 layer.photos({
    //                     photos: photosdata //格式见API文档手册页
    //                     ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
    //                   });
    //             })
    //             // console.log(imgs[i].src);
    //         })(i)
    //     }
    // }
})