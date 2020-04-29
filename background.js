chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});

function genericOnClick(info, tab) {
    //根據你點選右鍵的狀況不同，可以得到一些跟內容有關的資訊
    //例如 頁面網址，選取的文字，圖片來源，連結的位址

    var status = 0;  //設定是否要清除畫面資料的初值(0不用 1要)
    chrome.storage.local.set({msgstatus:status});
    (info.selectionText ? console.log("文字選取 == true") : cleardata() )

    console.log(
        "ID是：" + info.menuItemId + "\n" +
        "現在的網址是：" + info.pageUrl + "\n" +
        "選取的文字是：" + (info.selectionText ? info.selectionText : "") + "\n" +
        "現在hover元素的圖片來源：" + (info.srcUrl ? info.srcUrl : "") + "\n" +
        "現在hover的連結：" + (info.linkUrl ? info.linkUrl : "") + "\n" +
        "現在hover的frame是：" + (info.frameUrl ? info.frameUrl : "") + "\n"
    );
    chrome.storage.local.set({title: (info.selectionText ? info.selectionText : "") }); // 將搜尋關鍵字如標題般呈現 (存到title變數中)





    fetch('https://us-central1-sc-cofacts.cloudfunctions.net/replies',
    {method: 'POST',
        body: JSON.stringify({"title":"hello"}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(r => r.text()).then(result => {
     //Result now contains the response text, do what you want...

        StringSplite(result);  //分割json

    })
}

function checkableClick(info, tab) {
    //checkbox 以及 radio 這兩種類型的項目，除了上面的程式碼提到的資訊外，還會用布林值來告訴你使用者點選前，及點選後的狀態。
    console.log(
        "ID是：" + info.menuItemId + "\n" +
        "現在的網址是：" + info.pageUrl + "\n" +
        "選取的文字是：" + (info.selectionText ? info.selectionText : "") + "\n" +
        "現在hover元素的圖片來源：" + (info.srcUrl ? info.srcUrl : "") + "\n" +
        "現在hover的連結：" + (info.linkUrl ? info.linkUrl : "") + "\n" +
        "現在hover的frame是：" + (info.frameUrl ? info.frameUrl : "") + "\n" +
        "現在的狀態是：" + info.checked + "\n" +
        "之前的狀態是：" + info.wasChecked
    );
}

function createMenus() {   //右鍵 Menu
    var parent = chrome.contextMenus.create({
        "title": "search\" %s \"'s information",
        "type": "normal", //有這句查詢才能正常運作
        "contexts": ['all'],
        "onclick": genericOnClick
    });
    console.log(parent);
}

createMenus();


/* ------ 新增魔改 ---------*/

/* 暫時用不到了
function htmlspecialchars(str)   //單引號替換成雙引號 (Json格式)
   {
       //str = str.replace(/&/g, '&amp;');
       //str = str.replace(/</g, '&lt;');
       //str = str.replace(/>/g, '&gt;');
       //str = str.replace(/"/g, '\'');
       str = str.replace(/'/g, '\"');
       return str;
   } */


function StringSplite(resultfix){  //字串分割
  console.log(resultfix)
  var member = JSON.parse(resultfix);  //json 分割，存到member
  var array = [];
  /*console.log("member.content.length = " + member.content.length);  //測試有多少元素
  member.content[i].text; //元素內容
  member.content[i].text_type; //元素真假
  member.content[i].createdTime; //元素時間 */

 /* 資料存到Array */
  for (i=0 ; i<member.result.length ;i++){
    array[i] = [];
    array[i][0] = member.result[i].text;
    if(member.result[i].text_type == "NOT_RUMOR"){
      //array[i][1] = "事實";
      array[i][1] = "TRUTH";
    }else if (member.result[i].text_type == "OPINIONATED") {
      //array[i][1] = "有待商榷";
      array[i][1] = "OPINIONATED";
    }else if (member.result[i].text_type == "RUMOR") {
      //array[i][1] = "謠言";
      array[i][1] = "RUMOR";
    }
    array[i][2] = member.result[i].createdTime;
  }

  chrome.storage.local.set({msg:array});
}

function cleardata(){
  //console.log("文字選取 == false")
  var array = [];
  for (i=0 ; i<10 ;i++){
    array[i] = [];
    array[i][0] = " "
    array[i][1] = " "
    array[i][2] = " "
  }
  //console.log("array"+array)
  chrome.storage.local.set({msgNoSelect:array});
  var status = 1;  //設定是否要清除畫面資料 (1要)
  chrome.storage.local.set({msgstatus:status});  //傳遞到popup.js
}
