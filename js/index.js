(function(){
    var person = document.querySelector('#more');
    var logininfo = document.querySelector('.logininfo');
    person.addEventListener('mouseover',function(){
        logininfo.style.display = 'flex'
    })
    person.addEventListener('mouseout',function(){
        logininfo.style.display = 'none'
    })
})()