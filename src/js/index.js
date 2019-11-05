import axios from 'axios';
import Search from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

/* Global sate of the app 
  - search object
  - current recipe object
  - shopping list object
  - liked recipes
*/

const state = {};

const searchHandler = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. new search object and add it to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput();
    searchView.clearResultsContainer();

    // 4. search results for recipes
    await state.search.getResults();

    // 5. render results on UI

    const recipes = state.search.result;
    searchView.renderResults(recipes);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchHandler();
})

