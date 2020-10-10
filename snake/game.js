"use strict";
var mon = $('.mon'),
    msg = $('.msg');

var gameRunning=false;
var MonWidthInPixels = 40;
var gameinterval,
    timeStep,
    frameStep,
    nowTime;
var BAD_MOVE=1 ,
    ACE_MOVE=2 ,
    GOOD_MOVE=3;
var notusePixels;//
var nowcoin;//

//新增1600格
for (var i = 0; i < MonWidthInPixels; i++) {
    for (var j = 0; j < MonWidthInPixels; j++) {
        var tmp = $('<div class = "pixels" data-x="' + j + '" data-y="' + i + '"></div>');
        mon.append(tmp);
    }
}
//顯示msg
var showmsg = function(msga, msgb) {
    msg.find('.msg-a').text(msga);
    msg.find('.msg-b').text(msgb);

};
//下一個食物位置
var useNextRandomCoin =function(){
    if (notusePixels.length == 0 ){
        return false;
    }
    var idx = Math.floor(Math.random() * notusePixels.length);
    nowcoin =notusePixels.splice(idx ,1)[0].split("|");
    $('div.pixels[data-x="' + nowcoin[0] + '"][data-y="' + nowcoin[1] + '"]').addClass('taken');
    return true;
}
var releasePixel = function (x,y){
    $('div.pixels[data-x="'+x+'"][data-y="'+y+'"]').removeClass('taken');
    notusePixels.push(x+'|'+y);
}
//找尋location
var findLocationPixel= function(x,y){
    var idx = notusePixels.indexOf(x+"|"+y);
    if( idx!= -1){
        notusePixels.splice(idx ,1 );
        $('div.pixels[data-x="' + x + '"][data-y="' + y + '"]').addClass('taken');
        return true ;
    }else {
        return false;
    }
}

var snakeSpeed= function(){
    if(l>500){
        frameStep =50 ;
    }else if(l>=400){
        frameStep = 100;
    }else if (l>300){
        frameStep = 150;
    }else if (l>200){
        frameStep = 200;
    }
};



var snake ={
     direction :'l',
     snakebody:[],
     move: function(){
        var head = this.snakebody[this.snakebody.length -1];
        console.log(this.direction,this.snakebody.length,head);
        var nextHead= [];
        if(this.direction == 'l'){
            
            nextHead.push(head[0]-1);
            console.log(nextHead);
        }else if (this.direction == 'r'){
            nextHead.push(head[0]+1);
        }else{
            nextHead.push[head[0]];
        }
        if(this.direction == 'u'){
            nextHead.push(head[1]-1);
        }else if(this .direction =='d'){
            nextHead.push(head[1]+1);
        }else{
            nextHead.push[head[1]];
        }
        console.log(nextHead);
        if(nextHead[0] == nowcoin[0] && nextHead[1] == nowcoin[1]){
            console.log('HELLO');
            this.snakebody.push(nextHead);
            snakeSpeed(this.snakebody.length);
            if(useNextRandomCoin()){
                return GOOD_MOVE;
            }else {
                return ACE_MOVE;
            }
        }else if (findLocationPixel(nextHead[0],nextHead[1])){
            console.log('HELLO');
            var tail = this.snakebody.splice(0,1)[0];
            this.snakebody.push(nextHead);
            
            releasePixel(tail[0],tail[1]);
            return GOOD_MOVE;
        }else {
            return BAD_MOVE;
        }
     },
     
};

var restartGame = function(){
    frameStep=250;
    timeStep=50;
    nowTime=0;

    notusePixels = [];
    for(var i =0;i <MonWidthInPixels ;i++){
        for (var j = 0;j < MonWidthInPixels ;j++){
            notusePixels.push(i+'|'+j);
        }
    }
    snake.direction ="l";
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
        if(nowTime>=frameStep){
            var m = snake.move();
            if( m ==BAD_MOVE){
                clearInterval(gameinterval);//動畫
                gameRunning =false ;
                showmsg("Game Over","按空白鍵");

            }else if (m == ACE_MOVE){
                clearInterval(gameinterval);//動畫
                gameRunning =false ;
                showmsg("You won","按空白鍵");
            }
            nowTime %= frameStep;
        }
    }, timeStep)
    showmsg(" ",' ');
}



$(window).keydown(function(e){
    var k = e.which;
    //up
    if (k == 38){
        if(direction!= DIR_DOWN){
            snake.direction =DIR_UP;
        }
    }
    //down
    if (k == 40){
        if(direction!= DIR_UP){
            snake.direction =DIR_DOWN;
        }
    }
    //left
    if (k == 37){
        if(direction!= DIR_RIGHT){
            snake.direction =DIR_LEFT;
        }
    }
    //right
    if (k == 39){
        if(direction!= DIR_LEFT){
            snake.direction =DIR_RIGHT;
        }
    }
    //space
    if (k == 32){
        if(!gameRunning)
        {
            restartGame();
            gametimer();
            gameRunning=true ;
        }
    }
    // if (k == 38){

    // }
    // if (k == 38){

    // }

    
    //38 40 37 39 68=d 74=j
})

// console.log(notusePixels.length);
// $("#a").click(function(){
//     $('.test').addClass('test123');
// });
// $("#b").click(function(){
//     $(".test").removeClass('test123');
// })
