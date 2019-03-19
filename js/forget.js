(function(){
    var jump1 = document.querySelector('#jump1');
    var jump2 = document.querySelector('#jump2');
    var jump3 = document.querySelector('#jump3');
    document.querySelector('#jump-1').addEventListener('click',function(){
        console.log(1);
        jump1.style.display='block';
        jump2.style.display='none';
        jump3.style.display='none';

    })
    document.querySelector('#jump-2').addEventListener('click',function(){
        jump1.style.display='none';
        jump2.style.display='block';
        jump3.style.display='none';

    })
    document.querySelector('#jump-2s').addEventListener('click',function(){
        jump1.style.display='none';
        jump2.style.display='block';
        jump3.style.display='none';

    })
    document.querySelector('#jump-3').addEventListener('click',function(){
        jump1.style.display='none';
        jump2.style.display='none';
        jump3.style.display='block';

    })
})()