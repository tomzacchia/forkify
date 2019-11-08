import axios from 'axios';
import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderSpinner, removeSpinner } from './views/base';
import * as searchView from './views/searchView';

/* Global sate of the app 
  - search object
  - current recipe object
  - shopping list object
  - liked recipes
*/

const state = {};

// Search controller
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

// TESTING
// window.addEventListener('load', e => {
//   e.preventDefault();
//   searchHandler();
// });

elements.paginationContainer.addEventListener('click', e => {
  const BTN = e.target.closest('.btn-inline');
  if (BTN) {
    const goToPage = parseInt(BTN.dataset.goto, 10);
    searchView.clearResultsContainer();
    searchView.renderResults(state.search.result, goToPage);
  }
})


// Recipe Controller
const recipeController = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes

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
      console.log(state.recipe);
    } catch (error) {
      alert('Error loading recipe');
    }

  }

}

// window.addEventListener('hashchange', recipeController);
// window.addEventListener('load', recipeController);

['hashchange','load'].forEach(event => window.addEventListener(event, recipeController));