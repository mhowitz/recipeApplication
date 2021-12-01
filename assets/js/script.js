
var getRecipes = function(foodId) {
    var recipeUrl = "https://api.edamam.com/api/recipes/v2?"+ foodId+ "&app_id=470a241a4057e8b1f7fe899f21000837";
    fetch(recipeUrl).then(function(response){
        if(response.ok) {
            response.json.then(function() {
                console.log(data);
            }
            )} else {
                console.log("data not found")
            }
    })
};

console.log(getRecipes("chicken"));

