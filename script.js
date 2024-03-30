

// event listener 1 fired when initial html document has been completely loaded, call back function executes the fetch request.
document.addEventListener ("DOMContentLoaded", function() {
    fetch("http://localhost:3000/drinks")
   .then ((res) => res.json())
   .then ((drinks) => {
    drinks.forEach(individualCocktail => {
        const cocktailContainerDiv = document.querySelector(".cocktails")
        const cocktailDiv = document.createElement ("div");
        
        const cocktailImg = document.createElement ("img")
        cocktailImg.src = individualCocktail.strDrinkThumb

        const cocktailNameP = document.createElement ("p")
        cocktailNameP.textContent = individualCocktail.strDrink

        const cocktailGlassP = document.createElement ("p")
        cocktailGlassP.textContent =individualCocktail.strGlass

        const cocktailIngredientsP = document.createElement ("p")
        let ingredientsList = "";  //this creates a list
       
       //ingredients 1 through 15 are properties in data
       for (let i = 1; i <= 15; i++) { //we use a for loop
        const ingredient = individualCocktail["strIngredient" + i]; //retrieve the ingredient value from the current property using bracket notation
        if (ingredient) {
            ingredientsList += ingredient + ", ''"; //If the ingredient exists (i.e., it's not null or undefined), we append it to the ingredientsList.
        } else {
             // If there are no more ingredients, break out of the loop
            break;
        }

        ingredientsList = ingredientsList.slice(0, -2); //After the loop, we remove the last comma and space from the ingredientsList.

        cocktailIngredientsP.textContent = "Ingredients: " + ingredientsList; //set the text content of cocktailIngredientsP to "Ingredients: " followed by the ingredientsList.

    }
      
       cocktailDiv.append(cocktailImg,cocktailNameP,cocktailGlassP,cocktailIngredientsP)
       cocktailContainerDiv.appendChild(cocktailDiv);

    });
   });
});
