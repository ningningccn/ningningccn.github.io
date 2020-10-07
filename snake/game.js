"use strict";
var mon = $('.mon'),
    msg = $('.msg');

var MonWidthInPixels = 40;
var gameinterval;
var timeStep;
var notusePixels;
var nowcoin;

var useNextRandomCoin =function(){
    if (notusePixels.length == 0 ){
        return false;
    }
    var idx = Math.floor(Math.random() * notusePixels.length);
    nowcoin =notusePixels.splice(idx ,1)[0].split("|");
    $('div.pixel[data ="' + nowcoin[0] + '"] [data = " '+ nowcoin[1] + '"]').addClass('taken');
    return true;
}
var findLocationPixel= function(x,y){
    var idx = notusePixels.indexOf(x+"|"+y);
    if( idx!= -1){
        notusePixels.splice(idx ,1 );
        $('div.pixel[data ="' + x + '"] [data = " '+ y + '"]').addClass('taken');
        return true ;
    }else {
        return false;
    }
}

var snake ={
     snakebody:[]
}
var restartGame = function(){
    notusePixels = [];
    for(var i =0;i <MonWidthInPixels ;i++){
        for (var j = 0;j < MonWidthInPixels ;j++){
            notusePixels.push(i+'|'+j);
        }
    }

    snake.snakebody=[];
    for(var i=29,end= 29 -16 ; i>end ;i-- ){
        findLocationPixel(i,25);
        snake.snakebody.push([i,25]);
    }
    useNextRandomCoin();
}
var gametimer = function() {
    gameinterval = setInterval(function() {
        nowTime += timeStep;

    }, timeStep)
}

var showmsg = function(msga, msgb) {
    msg.find('.msg-a').text(msga);
    msg.find('.msg-b').text(msgb);

};

for (var i = 0; i < MonWidthInPixels; i++) {
    for (var j = 0; j < MonWidthInPixels; j++) {
        var tmp = $('<div class = "pixels" data-x="' + j + '" data-y="' + i + '"></div>');
        mon.append(tmp);
    }
}

restartGame();
console.log(notusePixels.length);
