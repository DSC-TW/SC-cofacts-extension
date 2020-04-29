/*
chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("output").innerHTML = selection[0];
});
*/
/*
setInterval(function() {
    //如果沒有點開就有下面塞到這
},100);
*/

/*此頁面不行用console.log ， 真奇怪*/

window.onload = function(){  //剛開啟時，立刻執行
  var bouncingLoader = document.getElementById("bouncingLoader");
  var dataColumn = document.getElementById("dataColumn");
  dataColumn.style.opacity = 1;  //資料欄透明度改為 1，原本 0
  bouncingLoader.style.opacity = 0;  //Loading動畫透明度改為 0，原本 1
}


chrome.storage.local.get('title',(response)=>{    // get title ， 傳遞給 ID SearchInfo
    document.getElementById("SearchInfo").innerHTML =response.title
});

chrome.storage.local.get('msgstatus',(response)=>{
  status = response.msgstatus  //接收是否要清除畫面資料的初值
  //document.getElementById("testcol").innerHTML = "response.msgstatus = " + status;  變數測試code，之後可刪除
  htmlChange(status) //傳遞到判斷函式中
});



function htmlChange(status){
  if (status == 1){  //1清除資料
    //document.getElementById("testcol").innerHTML = "pupup.js get status = " + status;  //變數測試code，之後可刪除
    chrome.storage.local.get('msgNoSelect',(response)=>{  //空白內容
        for(i = 0;i<10;i++){
            document.getElementById("TorF"+i).innerHTML = response.msgNoSelect[i][1]  //傳到 Html
            document.getElementById("article"+i).innerHTML = response.msgNoSelect[i][0]  //文章內容
            document.getElementById("time"+i).innerHTML = response.msgNoSelect[i][2]  //傳到 Html
        }
        //document.getElementById("SearchInfo").innerHTML = "您未選取關鍵字或是句子..."
        document.getElementById("SearchInfo").innerHTML = "You Don't Choose Any Words Or Sentence ......"
    });
    status = 0 ;
  }else {  //顯現資料
    //document.getElementById("testcol").innerHTML = "pupup.js get status = " + status;  變數測試code，之後可刪除
    chrome.storage.local.get('msg',(response)=>{
        for(i = 0;i<10;i++){
            //var words = "此篇報導可信度為 : " + response.msg[i][1]  //謠言或事實 (Chinese)
            var words = "Article's Authenticity : " + response.msg[i][1]
            document.getElementById("TorF"+i).innerHTML = words  //傳到 Html

            document.getElementById("article"+i).innerHTML = response.msg[i][0]  //文章內容

            var time = response.msg[i][2]  //原本格式 2020-04-24T22:13:16.454Z
            var tempArray = time.split("T",2)
            var tempArray2 = tempArray[1].split(".",2)
            //time = "文章撰寫日期 : "+tempArray[0]+"  "+tempArray2[0]
            time = "Article Created Time : "+tempArray[0]+"  "+tempArray2[0]
            document.getElementById("time"+i).innerHTML = time  //傳到 Html
        }
    });
  }
}
