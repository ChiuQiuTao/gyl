(function(){
    var navItem = document.querySelectorAll('.switch-nav>.item');
    for(var i=0;i<navItem.length;i++){
        (function(i){
            navItem[i].addEventListener('click',function(){
                var id = i+1;
                id = 'switch'+id
                var navItemThis=document.querySelector('.switch-nav>.item-this');
                var switchItemThis=document.querySelector('.switch-content-this');
                navItemThis.classList.remove('item-this');
                switchItemThis.classList.remove('switch-content-this');
                navItem[i].classList.add('item-this');
                document.querySelector('#'+id).classList.add('switch-content-this');
            })
        })(i)
    }
    
})()