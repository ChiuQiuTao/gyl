var base = "http://192.168.163.100:9191/";
var jq = jQuery.noConflict();
var sessions = getCookie('token');

function ajax(url, param, type) {

    if (sessions == "" && url != "login") {
        window.location.href = "../../src/login.html";
        return;
    }
    // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
    return jq.ajax({
        url: base + url,
        data: param || {},
        type: type || 'POST',
        async: true,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
        },
    });
}

function handleAjax(url, param, type) {
    return ajax(url, param, type).then(function(resp) {
        // 成功回调
        if (typeof resp == 'string') {
            resp = JSON.parse(resp)
        }
        if (resp.status == 200) {

            setCookie('token', resp.jwtToken);
            return resp;
        }
        //傻叉没有写状态的接口 （生产加工|查看）
        if (resp.ordProcessingproducts) {
            return resp;
        }

        if (resp.code == 10000) {
            return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
        } else {

            return jq.Deferred().reject(resp); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
        }
    }, function(err) {
        // 失败回调    
        layer.load();
        //此处演示关闭
        setTimeout(function() {
            layer.closeAll('loading');
        }, 2000);
        console.log(err); // 打印状态码
    });
}



//没有状态码
function noAjax(url, param, type) {
    return ajax(url, param, type).then(function(resp) {
        // 成功回调
        if (typeof resp == 'string') {
            resp = JSON.parse(resp)
        }

        if (resp) {
            return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
        } else {

            return jq.Deferred().reject(resp); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
        }
    }, function(err) {
        // 失败回调    
        layer.load();
        //此处演示关闭
        setTimeout(function() {
            layer.closeAll('loading');
        }, 2000);
        console.log(err); // 打印状态码
    });
}


/*提示*/
function alerts(texts) {
    layer.msg(texts, {
        time: 1000,
    })
    return;
}

/*写cookie*/
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/*读cookie*/
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}