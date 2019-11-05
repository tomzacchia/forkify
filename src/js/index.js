import axios from 'axios';
import Search from './models/Search';
import { elements, renderSpinner, removeSpinner } from './views/base';
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
    renderSpinner(elements.searchResultsContainer);

    // 4. search results for recipes
    await state.search.getResults();

    // 5. render results on UI
    removeSpinner();    
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchHandler();
})

