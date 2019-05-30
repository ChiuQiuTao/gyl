var base = "http://47.98.167.96:9191/";
var baseaip = "http://47.98.167.96:9527/api/";
// var baseaip = "http://192.168.1.111:9527/api/";//JIANG

// var baseaip = "http://192.168.1.107:9527/api/";//CUI

var jq = jQuery.noConflict();
var sessions = sessionStorage.getItem("keyssname");

function ajax(url, param, type, contentType) {
    if (sessions == "" && url != "login") {
        window.location.href = "../../src/login.html";
    }

    if (contentType == "utf-8") {
        return jq.ajax({
            url: base + url,
            data: param || {},
            type: type || "POST",
            async: true,
            contentType: "application/json;charset=utf-8",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
            }
        });
    } else {
        return jq.ajax({
            url: base + url,
            data: param || {},
            type: type || "POST",
            async: true,
            beforeSend: function(xhr) {
                // console.log(sessions)
                xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
            }
        });
    }
}

function handleAjax(url, param, type, contentType) {
    return ajax(url, param, type, contentType).then(
        function(resp) {
            // 成功回调
            if (typeof resp == "string") {
                resp = JSON.parse(resp);
            }
            if (resp.status == 200) {
                sessionStorage.setItem("keyssname", resp.jwtToken);
                sessions = sessionStorage.getItem("keyssname");
                return resp;
            }

            if (resp.code == 10000) {
                return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
            } else {
                return jq.Deferred().reject(resp); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
            }
        },
        function(err) {
            // 失败回调
            layer.load();
            //此处演示关闭
            setTimeout(function() {
                layer.closeAll("loading");
            }, 2000);
        }
    );
}

//没有状态码
function noAjax(url, param, type) {
    return ajax(url, param, type).then(
        function(resp) {
            // 成功回调
            if (typeof resp == "string") {
                resp = JSON.parse(resp);
            }
            if (resp) {
                return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
            } else {
                return jq.Deferred().reject(resp); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
            }
        },
        function(err) {
            // 失败回调
            layer.load();
            //此处演示关闭
            setTimeout(function() {
                layer.closeAll("loading");
            }, 2000);
            console.log(err); // 打印状态码
        }
    );
}

/*提示*/
function alerts(texts) {
    layer.msg(texts, {
        time: 1000
    });
    return;
}

//不一样的表头
function Theoldcuiway(url, param, type, contentType) {
    return ajaxs(url, param, type, contentType).then(
        function(resp) {
            // 成功回调
            if (typeof resp == "string") {
                resp = JSON.parse(resp);
            }
            if (resp) {
                return resp; // 直接返回要处理的数据，作为默认参数传入之后done()方法的回调
            } else {
                return jq.Deferred().reject(resp); // 返回一个失败状态的deferred对象，把错误代码作为默认参数传入之后fail()方法的回调
            }
        },
        function(err) {
            // 失败回调
            layer.load();
            //此处演示关闭
            setTimeout(function() {
                layer.closeAll("loading");
            }, 2000);
            console.log(err); // 打印状态码
        }
    );
}

function ajaxs(url, param, type, contentType) {
    if (sessions == "" && url != "login") {
        window.location.href = "../../src/login.html";
    }

    if (contentType == "utf-8") {
        return jq.ajax({
            url: baseaip + url,
            data: param || {},
            type: type || "POST",
            async: true,
            contentType: "application/json;charset=utf-8",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
            }
        });
    } else {
        return jq.ajax({
            url: baseaip + url,
            data: param || {},
            type: type || "POST",
            async: true,
            beforeSend: function(xhr) {
                // console.log(sessions)
                xhr.setRequestHeader("Authorization", "Bearer" + " " + sessions);
            }
        });
    }
}