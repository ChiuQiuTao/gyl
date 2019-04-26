var base = "http://47.98.167.96:9191/";
var jq = jQuery.noConflict();
var sessions = sessionStorage.getItem("keyssname");

function ajax(url, param, type,contentType) {

    if (sessions == "" && url != "login") {
        window.location.href = "../../src/login.html";
        return;
    }

    if(contentType=='utf-8'){
        return jq.ajax({
            url: base + url,
            data: param || {},
            type: type || 'POST',
            async: true,
            contentType:'application/json;charset=utf-8',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
            },
        });
    }else{
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
        

    // 利用了jquery延迟对象回调的方式对ajax封装，使用done()，fail()，always()等方法进行链式回调操作
   



}

function handleAjax(url, param, type,contentType) {
    return ajax(url, param, type ,contentType).then(function(resp) {
        // 成功回调
        if (typeof resp == 'string') {
            resp = JSON.parse(resp)
        }
        if (resp.status == 200) {

            // setCookie('token', resp.jwtToken);
            sessionStorage.setItem("keyssname", resp.jwtToken);
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

        if (err.code = "000") {
            window.location.href = "../../src/login.html";
        }
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