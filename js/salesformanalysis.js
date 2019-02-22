(function(){
    var itemList = document.querySelectorAll('.nav-item');
    for(var i=0;i<itemList.length;i++){
        (function(i){
            itemList[i].addEventListener('click',function(){
                var itemThis = document.querySelector('.nav-item-this');
                itemThis.classList.remove('nav-item-this');
                itemList[i].classList.add('nav-item-this');
            })
        })(i)
    }


    var typeItemList = document.querySelectorAll('.type-item');
    for(var i=0;i<itemList.length;i++){
        (function(i){
            typeItemList[i].addEventListener('click',function(){
                var itemThis = document.querySelector('.type-item-this');
                itemThis.classList.remove('type-item-this');
                typeItemList[i].classList.add('type-item-this');
            })
        })(i)
    }
})()