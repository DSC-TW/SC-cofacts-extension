/*
chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("output").innerHTML = selection[0];
});
*/
chrome.storage.sync.get('msg',(response)=>{
    document.getElementById("output").innerHTML =response.msg
});


