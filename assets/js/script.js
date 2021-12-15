
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
    if(recipeInput) {
        //$('#modal_box').instance.destroy();
        getRecipes(recipeInput);
    } else {

        //if the user entered in text, getRecipes() will run with whatever text was inserted into #recipeInput
        $('#modal_box').modal({
            dismissable: true,
            onOpenEnd: function(modal, trigger){console.log('modal open')},
            onCloseEnd: function(){console.log("modal closed")}
        });
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
    

    //append recipe label elements to dom
    $("#toMakeList").append(labelCard);
    labelCard.append(labelContent);
    labelContent.append(labelTitle, favoritesButton);



    needToMakeListEl.push(labelCard);
    localStorage.setItem("needToMakeList", needToMakeListEl);


    //click event listener to call favorites
    favoritesButton.click(addFavorites);

};

var favoritesListEl = [];

//add recipe label to the "favorites" list
var addFavorites = function() {
    var favoriteButtonRemove = $("#favoriteButton").remove();
    // var favoritesCard = $(needToMakeListEl)
    var favoritesCard = $("#labelCard").detach();
    $("#favoritesList").append(favoritesCard);
    favoritesListEl.push(favoritesCard);
    localStorage.setItem("favoritesList", favoritesListEl);
    console.log(favoritesListEl);
};


//grocery list successfully in local storage and is loaded on secondary HTML
//Need to remove duplicates if possible and remove items like 'water'???
//Also, when navigating back from home page to secondary- removes items from local storage?

