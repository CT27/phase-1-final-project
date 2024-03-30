

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
        cocktailImg.classList.add("cocktail-image"); // Add a class to the image for sizes in css

        const cocktailNameP = document.createElement ("p")
        cocktailNameP.textContent = individualCocktail.strDrink
        cocktailNameP.classList.add("name-size"); // Add a class to the image for sizes in css

        const cocktailGlassP = document.createElement ("p")
        cocktailGlassP.textContent =individualCocktail.strGlass

        const cocktailIngredientsP = document.createElement ("p")
        let ingredientsList = "";  //this creates a list
       
       //loop through ingredients
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
    const cocktailMeasuresP = document.createElement ("p")
    let measureList = "";  

    //loop through measures
    for (let i = 1; i <= 15; i++) { 
        const measure = individualCocktail["strMeasure" + i]; 
        if (measure) {
            measureList += measure + ", ''"; 
        } else {
          
            break;
        }

        measureList = measureList.slice(0, -2);

        cocktailMeasuresP.textContent = "Measure: " + measureList; 

       
    }
    const cocktailInstructionsP = document.createElement("p")
    cocktailInstructionsP.textContent = individualCocktail.strInstructions
    
    // Create star rating
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    const ratingValue = 4; // Set the rating value here
    for (let i = 1; i <= 5; i++) {
        const starSpan = document.createElement("span");
        starSpan.textContent = i <= ratingValue ? "★" : "☆"; // Use ★ for filled star and ☆ for empty star
        starSpan.setAttribute("data-rating", i); // Set data-rating attribute to the value of the star
        starSpan.classList.add("star")
        ratingDiv.appendChild(starSpan);

        // Add event listener to each star
        starSpan.addEventListener("click", function() {
            const clickedRating = parseInt(this.getAttribute("data-rating"));
            console.log("User clicked star rating: " + clickedRating);
            


            
        });
    }
      
       cocktailDiv.append(cocktailImg,cocktailNameP,cocktailGlassP,cocktailIngredientsP,cocktailMeasuresP,cocktailInstructionsP,ratingDiv)
       cocktailContainerDiv.appendChild(cocktailDiv);

    });
   });
});
