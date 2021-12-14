
var getRecipes = function(foodItem) {
    var recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodItem}&app_id=fbfe1471&app_key=470a241a4057e8b1f7fe899f21000837`;
    fetch(recipeUrl).then(function(response){
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                generateRecipeSearch(data);
            }
            )} else {
                var unsuccessfulRequest = $('<h3>').addClass("center");
                unsuccessfulRequest.text("Error: No Recipees Found!");
                $("#searchResults").append(unsuccessfulRequest);
            }
    })
    .catch(function(error) {
        var networkError = $('<h3>').addClass("center");
        networkError.text("Unable to connect to server. Try refreshing, or revisiting the page soon.");
        $("#searchResults").append(networkError);
    })
};
//testing:
//getRecipes("chicken");


$("#searchBtn").click(function(event) {
    event.preventDefault();
    //Assign a variable to the text input in DOM
    var recipeInput = $("#recipeInput").val();
    console.log(recipeInput);
    //checking if button is clicked
    console.log("button clicked");
    //sets page to blank each time the search button is clicked;
    $("#searchResults").text("");
    //error handling if set to empty string an err. will be logged- should eventually turn this into a modal or append text to screen
    if(recipeInput === ' ' || recipeInput === '') {
       $('.modal').modal();
    } else {
        //if the user entered in text, getRecipes() will run with whatever text was inserted into #recipeInput
        getRecipes(recipeInput);
    }

});

var generateRecipeSearch= function(recipeInput) {
    
  

    //sets text input to empty string so user does not have to delete every time
    $("#recipeInput").val("");

    //assigning new variable bc Edamam displays an array of 20 recipes into a hits value
    var recipes = recipeInput.hits;

    //If there are no recipes found when search, this message is appended to screen
    if(recipes.length===0) {
        var recipeError = $("<h3>").addClass("center");
        recipeError.text("No Results Found");
        var inputInstructions = $('<p>').addClass("center");
        inputInstructions.text("Try entering an ingredient or cuisine type. For example, you can search 'chicken', 'dinner', 'vegan', or 'gluten free'.")
        $("#searchResults").append(recipeError, inputInstructions);
        return;
    }

    //create for loop to loop through every recipe that Edamam gives to us to append to DOM
    for(var i = 0; i < recipes.length; i++) {

        //create div that contains each card so that they are in columns! (materialize used this in their documentation)
        var recipeDiv = $("<div>").addClass("col s12 m6 l3");
        //created a card for each recipe with materialize class: card
        var recipeCard = $("<div id = 'recipeCard'>").addClass("card small");

        //ADDING IMAGE TO CARDS
        var recipeImgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");
        var imgUrlPath = recipes[i].recipe.images;
        var imgUrl = imgUrlPath.SMALL.url;
        var recipeImg = $("<img  clas = 'activator' src= " +imgUrl + " alt='recipe image'>");

        //materialize css: uses different divs for stacking the content in cards
        var cardContent = $("<div id='cardStacked'>").addClass("card-content");

        //create title for each card for recipe name
        var recipeTitle= $(`<span><i class="material-icons right">more_vert</i>${recipes[i].recipe.label}</span>`).addClass("card-title center activator grey-text text-darken-4")//.text(recipes[i].recipe.label);
        //created a div for link to recipe
        var cardAction = $("<div>").addClass("card-reveal hoverable center");



        //this allows user to click on card to visit the recipe's website
        var recipeUrl = recipes[i].recipe.url;
        var recipeLink = $("<a href=" +recipeUrl+" > Click to Visit Website </a>")
        

        var cardSpan = $(`<span><i class="material-icons right">close</i>${recipes[i].recipe.label}</span>`).addClass("card-title grey-text text-darken-4")//.text(recipes[i].recipe.label);
       
        
        //adding recipe to each card 
        var ingredientLines = recipes[i].recipe.ingredientLines;
        var ingredientList = $("<ul id = 'recipeIngredients'>");
    

        //loop through array of ingredients to add to card
        $(ingredientList, ingredientLines).each(function(i) {
            for(var i = 0; i <ingredientLines.length;  i++) {
                $(ingredientList).append(`<li> ${ingredientLines[i]}</li>`);
            };
        });

        var groceryButton = $(`<a id="addGrocery"><i class="material-icons left">add_circle_outline</i>Groceries</a>`).addClass("waves-effect waves-light btn");
        groceryButton.click(recipes[i], generateGroceryList);

        //button to save recipes to the "need to make" list
        var toMakeButton = $('<a id="makeButton"><i class="medium material-icons left">local_dining</i>Need To Make</a>').addClass("waves-effect waves-teal btn-flat");
        toMakeButton.click(recipes[i], addRecipeToList);

        //appending to dom
        $("#searchResults").append(recipeDiv);
        recipeDiv.append(recipeCard);
        
        recipeCard.append(recipeImgDiv, cardContent, cardAction);
        cardContent.append(recipeTitle);
        cardAction.append(cardSpan, ingredientList, recipeLink, groceryButton, toMakeButton);
        // ingredientList.append(ingredientLines);
        recipeImgDiv.append(recipeImg);
    }

};

var groceryList = [];


var generateGroceryList = function(recipe) {
    var ingredients = recipe.data.recipe.ingredients;
    var groceryList = JSON.parse(localStorage.getItem("groceryList")) || [];
    $(ingredients).each(function(i) {
        //set all ingredients to lowercase so that when checking if duplicates they will not include values like 'salt' and 'Salt'
        var ingredient = ingredients[i].food.toLowerCase();
        if(groceryList.includes(ingredient)|| ingredient==="water") {
         //Does not push any item that already exists in groceryList array to local storage --> also does not put water in grocery list because common
        } else{
            //created new variable for ingreient with items that do not already exist in array of GroceryList
            var newIngredient = ingredient;
            groceryList.push(newIngredient);
            localStorage.setItem("groceryList", JSON.stringify(groceryList));
        }

        
    })
    // console.log(groceryList);
}



var needToMakeListEl = [];

//add a recipe to the "Need to Make List"
var addRecipeToList = function(recipe) {
    //get recipe lable from search data
    var recipeLabel = recipe.data.recipe.label;

    //create card for label and favorites button
    var labelCard = $('<div id="labelCard">').addClass("card horizontal");
    //create content for card
    var labelContent = $("<div>").addClass("card-content");
    var labelTitle = $("<span>").addClass("card-title").text(recipeLabel);
    var favoritesButton = $('<a id="favoriteButton" class="btn-floating btn-medium waves-effect waves-light teal"><i class="material-icons">favorite</i></a>');
    var trashButton = $('<a id="trashButton" class= "btn-floating btn-medium waves-effect waves-light teal"><i class="material-icons">delete_forever</i></a>');

    //append recipe label elements to dom
    $("#toMakeList").append(labelCard);
    labelCard.append(labelContent);
    labelContent.append(labelTitle, favoritesButton, trashButton);


    //add recipe label to array and append to localStorage
    needToMakeListEl.push(recipeLabel);
    localStorage.setItem("needToMakeList", JSON.stringify(needToMakeListEl));
    console.log(needToMakeListEl);
    
   
    //click event listener to call favorites
    $(favoritesButton).click(addFavorites);

    //click event to call remove recipe
    $(trashButton).click(removeRecipe);
};


var updatedToMakeList = [];

var removeRecipe = function() {
    //find recipe name
    var recipeName = $(this).siblings(".card-title").text();

    //remove recipe card
    var removeCard = $(this).closest("#labelCard").remove();

    //compare removed recipe name with items in array
    for (var i= 0; i < needToMakeListEl.length; i++) {
        if (needToMakeListEl[i] !== recipeName) {
            updatedToMakeList.push(needToMakeListEl[i]);
            }
        }
    //reassign need to make array to updated array
    needToMakeListEl = updatedToMakeList;
    //append new list to local storage
    localStorage.setItem("needToMakeList", JSON.stringify(updatedToMakeList));
};


var favoritesListEl = [];

//add recipe label to the "favorites" list
var addFavorites = function() {
    //find recipe name
    var recipeName = $(this).siblings(".card-title").text(); 

    //remove recipe card
    var removeCard = $(this).closest("#labelCard").remove();

    //compare removed recipe name with items in array
    for (var i= 0; i < needToMakeListEl.length; i++) {
        if (needToMakeListEl[i] !== recipeName) {
            updatedToMakeList.push(needToMakeListEl[i]);
            }
        }
    //reassign need to make array to updated array
    needToMakeListEl = updatedToMakeList;
    //append new list to local storage
    localStorage.setItem("needToMakeList", JSON.stringify(updatedToMakeList));


    //create new card for "favorites list"
    var favoriteCard = $('<div id="favoriteCard">').addClass("card horizontal");
    //create content for card
    var labelContent = $("<div>").addClass("card-content");
    var labelTitle = $("<span>").addClass("card-title").text(recipeName);
    

    //append elements to dom
    $("#favoritesList").append(favoriteCard);
    $(favoriteCard).append(labelContent);
    $(labelContent).append(labelTitle);
    
    //add recipe label to array and append to localStorage
    favoritesListEl.push(recipeName);
    localStorage.setItem("favoritesList", JSON.stringify(favoritesListEl));
    console.log(favoritesListEl);

    


};

//load recipes when page is refreshed
var loadToMakeList = function () {
    var toMakeRecipes = localStorage.getItem("needToMakeList");
    if (toMakeRecipes === null) {
        return false;
    }
    toMakeRecipes = JSON.parse(toMakeRecipes);
    //loop through array
    for (var i = 0; i < toMakeRecipes.length; i++) {
    
    //create card for label and favorites button
    var labelCard = $('<div id="labelCard">').addClass("card horizontal");
    //create content for card
    var labelContent = $("<div>").addClass("card-content");
    var labelTitle = $("<span>").addClass("card-title").text(toMakeRecipes[i]);
    var favoritesButton = $('<a id="favoriteButton" class="btn-floating btn-medium waves-effect waves-light teal"><i class="material-icons">favorite</i></a>');
    var trashButton = $('<a id="trashButton" class= "btn-floating btn-medium waves-effect waves-light teal"><i class="material-icons">delete_forever</i></a>');

    //append recipe label elements to dom
    $("#toMakeList").append(labelCard);
    labelCard.append(labelContent);
    labelContent.append(labelTitle, favoritesButton, trashButton);

    //click event listener to call favorites
    $(favoritesButton).click(addFavorites);

    //click event to call remove recipe
    $(trashButton).click(removeRecipe);

    }
};

//load favorites list when page is refreshed
var loadFavoritesList = function () {
    var favoriteRecipes = localStorage.getItem("favoritesList");
    if (favoriteRecipes === null) {
        return false;
    }
    favoriteRecipes = JSON.parse(favoriteRecipes);
    //loop through array
    for (var i = 0; i < favoriteRecipes.length; i++) {
    //create card for "favorites list"
    var favoriteCard = $('<div id="favoriteCard">').addClass("card horizontal");
    //create content for card
    var labelContent = $("<div>").addClass("card-content");
    var labelTitle = $("<span>").addClass("card-title").text(favoriteRecipes[i]);
    

    //append elements to dom
    $("#favoritesList").append(favoriteCard);
    $(favoriteCard).append(labelContent);
    $(labelContent).append(labelTitle);
    }
};


loadToMakeList();
loadFavoritesList();
//grocery list successfully in local storage and is loaded on secondary HTML
//Need to remove duplicates if possible and remove items like 'water'???
//Also, when navigating back from home page to secondary- removes items from local storage?

