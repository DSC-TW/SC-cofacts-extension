chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});
function genericOnClick(info, tab) {
    //根據你點選右鍵的狀況不同，可以得到一些跟內容有關的資訊
    //例如 頁面網址，選取的文字，圖片來源，連結的位址
    console.log(
        "ID是：" + info.menuItemId + "\n" +
        "現在的網址是：" + info.pageUrl + "\n" +
        "選取的文字是：" + (info.selectionText ? info.selectionText : "") + "\n" +
        "現在hover元素的圖片來源：" + (info.srcUrl ? info.srcUrl : "") + "\n" +
        "現在hover的連結：" + (info.linkUrl ? info.linkUrl : "") + "\n" +
        "現在hover的frame是：" + (info.frameUrl ? info.frameUrl : "") + "\n"
    );

    // 把下面網址換掉

    fetch('https://us-central1-sc-cofacts.cloudfunctions.net/get_replies',
    {method: 'POST',body: JSON.stringify({"title":info.selectionText})}).then(r => r.text()).then(result => {
     //Result now contains the response text, do what you want...
        console.log(result)
         //回傳結果用這存
        chrome.storage.sync.set({msg:result });
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

function createMenus() {
    var parent = chrome.contextMenus.create({
        "title": "查詢\" %s \"的相關資訊",
        "type": "normal", //有這句查詢才能正常運作
        "contexts": ['all'],
        "onclick": genericOnClick
    });

    /*
    var normal = chrome.contextMenus.create({
        "title": "通常項目",
        "type": "normal",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": genericOnClick
    });

    var checkbox = chrome.contextMenus.create({
        "title": "checkbox",
        "type": "checkbox",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": checkableClick
    });

    //被separator分隔的radio項目會自動形成一個只能單選的group
    var line1 = chrome.contextMenus.create({
        "title": "Child 2",
        "type": "separator",
        "contexts": ['all'],
        "parentId": parent
    });

    var radio1A = chrome.contextMenus.create({
        "title": "group-1 的A選項(單選)",
        "type": "radio",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": checkableClick
    });
    var radio1B = chrome.contextMenus.create({
        "title": "group-1 的B選項(單選)",
        "type": "radio",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": checkableClick
    });
    //被separator分隔的radio項目會自動形成一個只能單選的group
    var line2 = chrome.contextMenus.create({
        "title": "Child 2",
        "type": "separator",
        "contexts": ['all'],
        "parentId": parent
    });

    var radio2A = chrome.contextMenus.create({
        "title": "group-2 的A選項(單選)",
        "type": "radio",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": checkableClick
    });
    var radio2B = chrome.contextMenus.create({
        "title": "group-2 的B選項(單選)",
        "type": "radio",
        "contexts": ['all'],
        "parentId": parent,
        "onclick": checkableClick
    });*/

    // 使用chrome.contextMenus.create的方法回傳值是項目的id
    console.log(parent);
    /*console.log(normal);
    console.log(checkbox);
    console.log(line1);
    console.log(line2);
    console.log(radio1A);
    console.log(radio1B);
    console.log(radio2A);
    console.log(radio2B);*/
}

createMenus();
