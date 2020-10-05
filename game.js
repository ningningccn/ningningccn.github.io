"use strict";
var setwindow = function(){
    var w =$('.cell').width();
    $('.cell').height(w).css({
        'font-size': w + 'px',
        'line-height': w * 0.92 + 'px' 
    })
};
$(window)
    .resize(setwindow)
    .keydown(function(e){
        e.preventDefault(); //阻止原本會發生的事，例如按空白鍵會往下滑的事件
        initgame();
    });
setwindow();

var step = 0;
var gameOver = false;
var choose =[];
var symbols = ["&times;","&#9675"];

var showArrow =function(p){
    if(p % 2 == 0){
        $('.player1 > .arrow').removeClass('inv');
        $('.player2 > .arrow').addClass('inv');
    }else{
        $('.player1 > .arrow').addClass('inv');
        $('.player2 > .arrow').removeClass('inv');
    }
}

var initgame = function(){
    if(gameOver==true){
        $('.cell').empty().removeClass('win');;
        gameOver = false;
        choose = [];
        step = 0;
        showArrow(step);
    }
};

var checkcombo = function(a) {
    console.log("check");
    var a0=choose[a[0]],
        a1=choose[a[1]],
        a2=choose[a[2]];

    console.log(a0,a1,a2,a);
    var w =(a0 == a1 && a1 == a2);
    if(w){
        $('.cell[data-i="'+ a[0] +'"]').addClass('win');
        $('.cell[data-i="'+ a[1] +'"]').addClass('win');
        $('.cell[data-i="'+ a[2] +'"]').addClass('win');
    }
    return w ;
}

var winningCombos ={
    combo0 : [0 , 1 , 2],
    combo1 : [3 , 4 , 5],
    combo2 : [6 , 7 , 8],

    combo3 : [0 , 4 , 8],
    combo4 : [2 , 4 , 6],

    combo5 : [0 , 3 , 6],
    combo6 : [1 , 4 , 7],
    combo7 : [2 , 5 , 8]

};

var potentialCombos ={
    0:['combo0','combo3','combo5'],
    1:['combo0','combo6'],
    2:['combo0','combo4','combo7'],
    3:['combo1','combo5'],
    4:['combo1','combo3','combo4','combo6'],
    5:['combo1','combo7'],
    6:['combo2','combo4','combo5'],
    7:['combo2','combo6'],
    8:['combo2','combo3','combo7']
}

$('.cell').click(function(){
    console.log(winningCombos[potentialCombos[1][1]]);
    if(gameOver==false){
        var $this = $(this);
        var i = $(this).data('i');//拿按到的位置
        if(choose[i] == null){
            // console.log('第一個if');
            var s = symbols[step++ %2];
            // console.log(s);
            choose[i]=s;
            $this.html(s);
            for(var j=0 ;j<potentialCombos[i].length ; j++ ){
                var ww = winningCombos[potentialCombos[i][j]];
                console.log(i,j);
                console.log(ww);
                if(checkcombo(ww)){
                    gameOver =true;
                    return ;
                }
            }
            if(step == 9 ){
                gameOver=true;
                return ;
            }
            showArrow(step);
        }
    }

})


// $('.cell').click(function(){
//     if(!gameOver){
//         var $this = $(this);
//         var i = $this.data(i);
//         console.log(i);
//         if(choose[i]==null){
//             var s = symbols[step++ % 2 ];
//             choose[i] = s;

//             $this.html(s);

//             for(var j =0 ,len = potentialCombos[i].length;j<len ;j ++){
//                 var ww = winningCombos[potentialCombos[i][j]];
//                 if( checkcombo(ww)){
//                     gameOver =true;
//                     return ;
//                 }
//             }
//             if(step === 9){
//                 gameOver =true ;
//                 return ;
//             }
//             showArrow(step);
//         }else{
//             console.log("gg");
//         }
        
//     }
// });







// console.log('Hello');
// var cell =document.querySelector('#data0');
// cell.onclick =function(){
//     this.innerHTML = "Mouseenter without jquery";
// };
// // cell.onmouseenter = function(){
// //     this.innerHTML = "Mouseenter without jquery";
// // };
