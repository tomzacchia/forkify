import axios from 'axios';
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderSpinner, removeSpinner } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import List from './models/List';

/* Global sate of the app 
  - search object
  - current recipe object
  - shopping list object
  - liked recipes
*/

const state = {};
window.state = state;

/* 
  SEARCH CONTROLLER
*/
const searchHandler = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. new search object and add it to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput();
    searchView.clearResultsContainer();
    renderSpinner(elements.searchResultsContainer);

    try {
      // 4. search results for recipes
      await state.search.getResults();

      // 5. render results on UI
      removeSpinner();    
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Error loading recipes');
      removeSpinner();  
    }

  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchHandler();
});

elements.paginationContainer.addEventListener('click', e => {
  const BTN = e.target.closest('.btn-inline');
  if (BTN) {
    const goToPage = parseInt(BTN.dataset.goto, 10);
    searchView.clearResultsContainer();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/* 
  RECIPE CONTROLLER
*/
const recipeController = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipeContainer();
    renderSpinner(elements.recipeContainer);

    // Create new recipe object
    state.recipe = new Recipe(id);
    window.recipe = state.recipe;

    try {
      // Get Recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and cooking time
      state.recipe.cookingTime();
      state.recipe.calculateServings();

      // Render recipe
      removeSpinner();
      recipeView.renderRecipe(state.recipe);

    } catch (error) {
      console.log(error);
      alert('Error loading recipe');
    }

  }
}

['hashchange','load'].forEach(event => window.addEventListener(event, recipeController));


/*
  LIST CONTROLLER
*/
const controlList = () => {
  // Create a new list if there are none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list.items object
  state.recipe.ingredients.forEach( el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
}

// Handle delete and update list item events
elements.shoppingListContainer.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state and UI
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const newCount = parseFloat(e.target.value);
    if (newCount >= 0) state.list.updateCount(id, newCount);
  };


})

// Handling recipe serving button clicks
elements.recipeContainer.addEventListener('click', event => {
  // .btn-decrease * ==> or any chhild element
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (event.target.matches('.recipe__btn-add, .recipe__btn-add *')) {
    controlList();
  }
});

window.list = new List();
