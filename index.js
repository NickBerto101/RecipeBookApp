const API_KEY = "9877979a213d4cf18c967647477be931";
const recipeListEl = document.getElementById('recipe-list')

function displayRecipes(recipes){
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement('li');
        const recipeImageEl = document.createElement('img');
        const recipeTitleEl = document.createElement('h2');
        const recipeIngEl = document.createElement('p');
        const recipeLinkEl = document.createElement('a');

        recipeIngEl.innerHTML = `
            <strong>Ingredients:</strong> ${recipe.extendedIngredients.
                                          map((ing) => ing.original).join(', ')}`;
        recipeTitleEl.innerText = recipe.title;
        recipeItemEl.classList.add('recipe-item');
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe";
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe"

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngEl);
        recipeListEl.appendChild(recipeItemEl);
        recipeItemEl.appendChild(recipeLinkEl);
    });
}

async function getRecipes(){
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`)

    const data = await response.json()

    return data.recipes
}

async function init(){
    const recipes = await getRecipes();
    // console.log(recipes)

    displayRecipes(recipes)
}

init();