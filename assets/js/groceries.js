
//created separate js page to load local storage from script.js and add it to secondary html
var groceryList = [];

if(localStorage.getItem("groceryList")) {
    var groceryList= JSON.parse(localStorage.getItem("groceryList")) || [];
    for(var i = 0; i < groceryList.length; i++) {
        $("#ingredients").append(`<li class="groceryItems">${groceryList[i]}</li>`)
    }
}

$("#clearGrocery").click(function() {
    $(".groceryItems").remove();
    localStorage.removeItem("groceryList");
})
