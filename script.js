document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/drinks")
    .then((res) => res.json())
    .then((drinks) => {
      drinks.forEach((item) => {
        const cocktailContainerDiv = document.querySelector(".cocktails");
        const cocktailDiv = document.createElement("div");

        const cocktailImg = document.createElement("img");
        cocktailImg.src = item.strDrinkThumb;
        cocktailImg.classList.add("cocktail-image");

        const cocktailNameP = document.createElement("p");
        cocktailNameP.textContent = item.strDrink;
        cocktailNameP.classList.add("name-size");

        const cocktailGlassP = document.createElement("p");
        cocktailGlassP.textContent = item.strGlass;

        const cocktailIngredientsP = document.createElement("p");
        let ingredientsList = "";

        for (let i = 1; i <= 15; i++) {
          const ingredient = item["strIngredient" + i];
          if (ingredient) {
            ingredientsList += ingredient + ", ";
          } else {
            break;
          }
        }

        ingredientsList = ingredientsList.slice(0, -2);
        cocktailIngredientsP.textContent = "Ingredients: " + ingredientsList;

        const cocktailMeasuresP = document.createElement("p");

        let measureList = "";
        for (let i = 1; i <= 15; i++) {
          const measure = item["strMeasure" + i];
          if (measure) {
            measureList += measure + ", ";
          } else {
            break;
          }
        }
        measureList = measureList.slice(0, -2);
        cocktailMeasuresP.textContent = "Measure: " + measureList;

        const cocktailInstructionsP = document.createElement("p");
        cocktailInstructionsP.textContent = item.strInstructions;

        // Append child elements inside the loop
        cocktailDiv.append(
          cocktailImg,
          cocktailNameP,
          cocktailGlassP,
          cocktailIngredientsP,
          cocktailMeasuresP,
          cocktailInstructionsP
        );

        cocktailContainerDiv.appendChild(cocktailDiv); // Append cocktailDiv to container div
      });
    });
});

document
  .getElementById("create-cocktail-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // collect form data
    const formData = {
      cocktailName: document.getElementById("cocktail-name").value,
      cocktailGlass: document.getElementById("cocktail-glass").value,
      cocktailIngredients: document.getElementById("cocktail-ingredients")
        .value,
      cocktailMeasures: document.getElementById("cocktail-measures").value,
      cocktailInstructions: document.getElementById("cocktail-instructions")
        .value,
      cocktailImage: document.getElementById("cocktail-image").value,
      strDrink: document.getElementById("cocktail-name").value,
      strGlass: document.getElementById("cocktail-glass").value,
      strIngredients: document
        .getElementById("cocktail-ingredients")
        .value.split(",")
        .map((item) => item.trim()),
      strMeasures: document
        .getElementById("cocktail-measures")
        .value.split(",")
        .map((item) => item.trim()),
      strInstructions: document.getElementById("cocktail-instructions").value,
      strDrinkThumb: document.getElementById("cocktail-image").value,
    };

    // send POST request
    fetch("http://localhost:3000/drinks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
