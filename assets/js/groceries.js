var groceryList = localStorage.getItem("groceryList");
//console.log(groceryList);
var groceries= groceryList.split(",");
console.log(groceries);
// console.log(groceryList);

for(var i = 0; i < groceries.length; i++) {
    $("#ingredients").append(`<li>${groceries[i]}</li>`)
}