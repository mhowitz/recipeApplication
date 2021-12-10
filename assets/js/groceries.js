
//created separate js page to load local storage from script.js and add it to secondary html
var groceryList = [];

if(localStorage.getItem("groceryList")) {
    groceryList= JSON.parse(localStorage.getItem("groceryList"));
    for(var i = 0; i < groceryList.length; i++) {
        $("#ingredients").append(`<li>${groceryList[i]}</li>`)
    }
}
