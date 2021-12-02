
var getRecipes = function(foodItem) {
    var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodItem}&app_id=fbfe1471&app_key=470a241a4057e8b1f7fe899f21000837`;
    fetch(recipeUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            }
            )} else {
                console.log("data not found")
            }
    })
};

getRecipes("chicken", "egg");





//when searching an ingredient, approx 20 recipes are displayed in a array called 'hits'
//Ingredients to link to Kroger: ??
    //ingredients located in data[i].hits[0].recipe.ingredients[i].food

//image of recipe located in data[i].hits[0].recipe.image

//Recipe Ingredients list including measurements located:
    //data[i].hits[0].recipe.ingredientLines

//Name of Recipe Located:
    //data[i].hits[0].recipe.label

//Includes Nutrient data in 'totalNutrients' array or  'digest' array

//calories in data[i].hits[0].recipe.calories

//cuisine type in data[i].hits[0].recipe.cuisineType[0] array

