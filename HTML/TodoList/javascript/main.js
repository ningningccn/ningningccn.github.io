var addData = document.querySelector(".add");
var list =document.querySelector('.list');
var dataBase = [];

addData.onclick=function(){
    var text = document.querySelector('.text_do').value;
    if(text.trim() == ""){
        alert("請輸入文字");
    }
    var todo ={
        context :text,
        done :false 
    }
    dataBase.push(todo);
    upDateList(dataBase);
    document.querySelector('.text_do').value='';
    console.log(dataBase);
}



upDateList =function(dataBase){
    str ='';
    for(let i= 0 ; i<dataBase.length;i++){
        str += '<li>'+ dataBase[i].context +'</li>';
        console.log(str);
    }
    list.innerHTML = str ;
}


