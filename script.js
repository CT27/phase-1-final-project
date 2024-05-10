// Event listener 1 -> "filter-input"
document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("filter-input");

  // Function to filter cocktails based on input
  const filterCocktails = (input) => {
    const cocktails = document.querySelectorAll(".cocktail");
    const filterValue = input.toLowerCase();

    cocktails.forEach((cocktail) => {
      const ingredients = cocktail
        .querySelector(".cocktail-ingredients")
        .textContent.toLowerCase();
      if (ingredients.includes(filterValue)) {
        cocktail.style.display = "block";
      } else {
        cocktail.style.display = "none";
      }
    });
  };

  filterInput.addEventListener("input", function () {
    filterCocktails(this.value.trim());
  });

  /// Fetch cocktails from server

  fetch("http://localhost:3000/drinks")
    .then((res) => res.json())
    .then((drinks) => {
      const cocktailContainerDiv = document.querySelector(".cocktails");
      drinks.forEach((item) => {
        const cocktailDiv = document.createElement("div");
        cocktailDiv.classList.add("cocktail"); // Add class to identify cocktail
        cocktailDiv.dataset.cocktailId = item.id; // Add cocktailId as a data attribute

        const cocktailImg = document.createElement("img");
        cocktailImg.src = item.strDrinkThumb;
        cocktailImg.classList.add("cocktail-image");

        const cocktailNameP = document.createElement("p");
        cocktailNameP.textContent = item.strDrink;
        cocktailNameP.classList.add("name-size");

        const cocktailGlassP = document.createElement("p");
        cocktailGlassP.textContent = item.strGlass;

        const cocktailIngredientsP = document.createElement("p");
        // Join all ingredients into a string separated by ", "
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
          const ingredient = item["strIngredient" + i];
          if (ingredient) {
            ingredients.push(ingredient);
          } else {
            break;
          }
        }

        cocktailIngredientsP.textContent =
          "Ingredients: " + ingredients.join(", ");
        cocktailIngredientsP.classList.add("cocktail-ingredients"); // Add class for filtering

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

        /// EVENT LISTENER 2 -> "CLICK"
        // Like and Dislike buttons
        const likeButton = document.createElement("button");
        likeButton.textContent = "👍";
        const dislikeButton = document.createElement("button");
        dislikeButton.textContent = "👎";

        // Like and Dislike counts
        let likes = 0;
        let dislikes = 0;
        const likeCount = document.createElement("span");
        const dislikeCount = document.createElement("span");
        likeCount.textContent = likes;
        dislikeCount.textContent = dislikes;

        // Event listeners for Like and Dislike buttons
        likeButton.addEventListener("click", function () {
          const cocktailId = cocktailDiv.dataset.cocktailId; // Retrieve cocktailId
          likes++;
          likeCount.textContent = likes; // Update the like count in the DOM
          // Send request to update backend
          updateLikes(cocktailId, likes); // Call updateLikes with cocktailId
        });

        dislikeButton.addEventListener("click", function () {
          const cocktailId = cocktailDiv.dataset.cocktailId; // Retrieve cocktailId
          dislikes++;
          dislikeCount.textContent = dislikes;

          // Send request to update backend
          updateDislikes(cocktailId, dislikes); // Call updateDislikes with cocktailId
        });

        function updateLikes(cocktailId, likes) {
          // Fetch the existing cocktail data
          fetch(`http://localhost:3000/drinks/${cocktailId}`)
            .then((response) => response.json())
            .then((cocktail) => {
              // Update the likes count
              cocktail.likes = likes;

              // Send a PUT request to update the entire cocktail object
              fetch(`http://localhost:3000/drinks/${cocktailId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cocktail), // Send the entire updated cocktail object
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Likes updated:", data);
                })
                .catch((error) => {
                  console.error("Error updating likes:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching cocktail data:", error);
            });
        }

        function updateDislikes(cocktailId, dislikes) {
          // Fetch the existing cocktail data
          fetch(`http://localhost:3000/drinks/${cocktailId}`)
            .then((response) => response.json())
            .then((cocktail) => {
              // Update the dislikes count
              cocktail.dislikes = dislikes;

              // Send a PUT request to update the entire cocktail object
              fetch(`http://localhost:3000/drinks/${cocktailId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(cocktail), // Send the entire updated cocktail object
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Dislikes updated:", data);
                })
                .catch((error) => {
                  console.error("Error updating dislikes:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching cocktail data:", error);
            });
        }

        // APPEND CHILD ELEMENTS TO COCKTAIL DIV //
        cocktailDiv.append(
          cocktailImg,
          cocktailNameP,
          cocktailGlassP,
          cocktailIngredientsP,
          cocktailMeasuresP,
          cocktailInstructionsP,
          likeButton,
          likeCount,
          dislikeButton,
          dislikeCount
        );

        cocktailContainerDiv.appendChild(cocktailDiv); // Append cocktailDiv to container div
      });
    });
});

// EVENT LISTENER 3 ->"SUBMIT"//
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
