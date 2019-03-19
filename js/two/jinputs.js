(function(){
    tabItems = document.querySelectorAll('.select-tab>.item');
    for(var i=0;i<tabItems.length;i++){
        (function(i){
            tabItems[i].addEventListener('click',function(){
                var tabItemThis = document.querySelector('.select-tab>.item-this');
                tabItemThis.classList.remove('item-this');
                tabItems[i].classList.add('item-this');
            })
        })(i)
        
    }
})()