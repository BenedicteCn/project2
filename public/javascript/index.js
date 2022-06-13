// ON THE LEFt:
// Get all recipe names: display
// Add event listener at every recipe
// Store the id of a recipe in a dataset

// Create a template like the lab characters
// request for each ingredient to display
// Promise.all
const baseUrl = 'http://localhost:5005';
const recipeTemplate = document.getElementById('template-recipe');
const ingredientTemplate = document.getElementById('template-ingredient');
const ingredientContainer = qs('.ingredient-container');
const recipeContainer = qs('.recipe-container');

function createTemplateAndAppendRecipe(recipe) {
  const clone = recipeTemplate.content.cloneNode(true);
  qs('.recipe-id', clone).textContent = recipe._id;
  console.log('recipe', recipe);
  qs('.recipe-name', clone).textContent = recipe.name;
  qs('.recipe-image', clone).textContent = recipe.image;
  qs('.recipe-instruction', clone).textContent = recipe.instruction;
  qs('.recipe-preparation-time', clone).textContent = recipe.preparation_time;
  qs('.recipe-baking-time', clone).textContent = recipe.baking_time;
  qs('.recipe-category', clone).textContent = recipe.category;
  qs('.recipe-quantity', clone).textContent = recipe.quantity_of_ingredients;
  //qs('.ingredient-name', clone).textContent = recipe.ingredient;

  recipeContainer.append(clone);
}

async function createTemplateAndAppendIngredient(ingredient) {
  const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${ingredient}`;
  const { data } = await axios.get(apiUrl);
  console.log(data.product.product_name);
  const clone = ingredientTemplate.content.cloneNode(true);
  qs('.ingredient-id', clone).textContent = ingredient._id;
  // console.log("hello");
  qs('.ingredient-name', clone).textContent = data.product.product_name;
  qs('.ingredient-image', clone).textContent =
    data.product.selected_images.front.display.fr;
  qs('.ingredient-nutriscore', clone).textContent =
    data.product.nutriscore_grade;
  qs('.ingredient-ecoscore', clone).textContent = data.product.ecoscore_grade;

  ingredientContainer.append(clone);
}

document
  .getElementById('fetch-one')
  .addEventListener('click', async function (e) {
    // try {
    e.preventDefault();
    const name = qs('input[name=recipe-name]').value;
    console.log('name', name);
    const { data } = await axios.get(`http://localhost:5005/recipe/${name}`);
    recipeContainer.innerHTML = null;
    createTemplateAndAppendRecipe(data[0]);
    data[0].ingredients.forEach((ingredient) => {
      createTemplateAndAppendIngredient(ingredient);
    });
  });

document
  .getElementById('strawberry')
  .addEventListener('click', async function (e) {
    // try {
    e.preventDefault();
    const name = qs('input[name=recipe-name]').value;
    console.log('name', name);
    const { data } = await axios.get(`http://localhost:5005/recipe/${name}`);
    recipeContainer.innerHTML = null;
    createTemplateAndAppendRecipe(data[0]);
    data[0].ingredients.forEach((ingredient) => {
      createTemplateAndAppendIngredient(ingredient);
    });
  });

document.getElementById('crepe').addEventListener('click', async function (e) {
  // try {
  e.preventDefault();
  const name = qs('input[name=recipe-name]').value;
  console.log('name', name);
  const { data } = await axios.get(`http://localhost:5005/recipe/${name}`);
  recipeContainer.innerHTML = null;
  createTemplateAndAppendRecipe(data[0]);
  data[0].ingredients.forEach((ingredient) => {
    createTemplateAndAppendIngredient(ingredient);
  });
});

function qs(selector, element = document) {
  return element.querySelector(selector);
}
function qsa(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}
