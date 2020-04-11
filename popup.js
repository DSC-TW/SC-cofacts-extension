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
chrome.storage.sync.get('msg',(response)=>{
    document.getElementById("output").innerHTML =response.msg
});


