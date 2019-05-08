var enterpriseid='';
getUser();
function getUser() {
    handleAjax('user/getUser', {}, "GET").done(function(resp) {
        console.log(resp);
        enterpriseid = resp.enterpriseid;
        return
    }).fail(function(err) {
        console.log(err);
        enterpriseid = err.enterpriseid;
        return
    });
}