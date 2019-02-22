(function(){
    var tabItem = document.querySelectorAll('.tab-item');
    for(var i=0;i<tabItem.length;i++){
        (function(i){
            tabItem[i].addEventListener('click',function(){
                var tabItemThis = document.querySelector('.tab-item-this');
                tabItemThis.classList.remove('tab-item-this');
                tabItem[i].classList.add('tab-item-this');
            })
        })(i)
    }
})()