
//Fetch Recipes from Edamam using ingredients

var getRecipes = function(foodItem) {
    var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodItem}&app_id=fbfe1471&app_key=470a241a4057e8b1f7fe899f21000837`;
    fetch(recipeUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                recipeData = data.hits;
                console.log(recipeData);
                console.log(recipeData[0].recipe.label)
                console.log(recipeData[0].recipe.ingredientLines);

            }
            )} else {
                console.log("data not found")
            }
    })
};

getRecipes("chicken", "egg");

//client_id (Kroger) : recipesearchapp-8c839beb3d4b9472a15caa209e06ecb34253613186576661838    &client_id=recipesearchapp-8c839beb3d4b9472a15caa209e06ecb34253613186576661838
//client_secret (Kroger): 9q6cx5dUado52MQ4McyzkQ2ptPCG-PsbUDWUI6lw  &client_secret=9q6cx5dUado52MQ4McyzkQ2ptPCG-PsbUDWUI6lw

//HAVING TROUBLE WITH KROGER API- NEED SOME SORT OF AUTHORIZATION I CANNOT FIGURE OUT HOW TO DO


// var getIngredients = function(ingredient) {
//     var ingredientsUrl = `https://api.kroger.com/v1/products?filter.term=${ingredient}`
//     fetch(ingredientsUrl).then(function(response){
//         if(response.ok) {
//             response.json().then(function(data) {
//                 console.log(data);
//             })
//         } else {
//             console.log("grocery data not found");
//         }
//     })
// }

// getIngredients("bread");


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

