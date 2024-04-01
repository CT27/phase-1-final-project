// Event listener fired when initial HTML document has been completely loaded, callback function executes the fetch request.
document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/drinks")
    .then((res) => res.json())
    .then((drinks) => {
        drinks.forEach(individualCocktail => {
            const cocktailContainerDiv = document.querySelector(".cocktails");
            const cocktailDiv = document.createElement("div");
            
            const cocktailImg = document.createElement("img");
            cocktailImg.src = individualCocktail.strDrinkThumb;
            cocktailImg.classList.add("cocktail-image"); // Add a class to the image for sizes in CSS

            const cocktailNameP = document.createElement("p");
            cocktailNameP.textContent = individualCocktail.strDrink;
            cocktailNameP.classList.add("name-size"); // Add a class to the image for sizes in CSS

            const cocktailGlassP = document.createElement("p");
            cocktailGlassP.textContent = individualCocktail.strGlass;

            const cocktailIngredientsP = document.createElement("p");
            let ingredientsList = "";  // This creates a list
           
            // Ingredients 1 through 15 are properties in data
            for (let i = 1; i <= 15; i++) { // We use a for loop
                const ingredient = individualCocktail["strIngredient" + i]; // Retrieve the ingredient value from the current property using bracket notation
                if (ingredient) {
                    ingredientsList += ingredient + ", "; // If the ingredient exists (i.e., it's not null or undefined), we append it to the ingredientsList.
                } else {
                     // If there are no more ingredients, break out of the loop
                    break;
                }
            }
        
            ingredientsList = ingredientsList.slice(0, -2); // After the loop, we remove the last comma and space from the ingredientsList.
            cocktailIngredientsP.textContent = "Ingredients: " + ingredientsList; // Set the text content of cocktailIngredientsP to "Ingredients: " followed by the ingredientsList.

             // Measures 1 through 15 are properties in data
            const cocktailMeasuresP = document.createElement("p");
            let measureList = "";  

            // For loop to iterate over measures
            for (let i = 1; i <= 15; i++) { 
                const measure = individualCocktail["strMeasure" + i]; 
                if (measure) {
                    measureList += measure + ", "; 
                } else {
                    break;
                }
            }
            measureList = measureList.slice(0, -2);
            cocktailMeasuresP.textContent = "Measure: " + measureList; 

            const cocktailInstructionsP = document.createElement("p");
            cocktailInstructionsP.textContent = individualCocktail.strInstructions;

         /// STAR RATING
            // Creating star rating section
            const starRatingContainer = document.createElement("div");
            starRatingContainer.classList.add("star-rating");

            for (let i = 1; i <= 5; i++) {
                const star = document.createElement("span");
                star.classList.add("star");
                star.innerHTML = "&#9733;";
                star.dataset.value = i;
                starRatingContainer.appendChild(star);
            }

            // Add click event listener for star rating
            starRatingContainer.addEventListener("click", function(event) {
                const selectedRating = event.target.dataset.value;
                console.log("Selected Rating:", selectedRating);
                // Update stars visually
    const stars = starRatingContainer.querySelectorAll('.star');
    stars.forEach(star => {
        if (star.dataset.value <= selectedRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
                

            });
            cocktailDiv.append(cocktailImg, cocktailNameP, cocktailGlassP, cocktailIngredientsP, cocktailMeasuresP, cocktailInstructionsP,starRatingContainer);
            cocktailContainerDiv.appendChild(cocktailDiv);
        });
    });
});

    document.getElementById('create-cocktail-form').addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting normally


    /// INPUT FORM
    // collect form data
    const formData = {
        strDrink: document.getElementById('cocktail-name').value,
        strGlass: document.getElementById('cocktail-glass').value,
        strInstructions: document.getElementById('cocktail-instructions').value,
        strDrinkThumb: document.getElementById('cocktail-image').value
    };
    // Splitting ingredients and measures
    const ingredients = document.getElementById('cocktail-ingredients').value.split(',').map(item => item.trim());
    const measures = document.getElementById('cocktail-measures').value.split(',').map(item => item.trim());

    // Adding ingredients to formData
    ingredients.forEach((ingredient, index) => {
        const ingredientKey = `strIngredient${index + 1}`;
        formData[ingredientKey] = ingredient;
    });

    // Adding measures to formData
    measures.forEach((measure, index) => {
        const measureKey = `strMeasure${index + 1}`;
        formData[measureKey] = measure;
    });

    // send POST request
    fetch('http://localhost:3000/drinks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally, you can redirect to another page or show a success message here.
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
    });
});

