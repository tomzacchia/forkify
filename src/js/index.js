import axios from 'axios';
import Search from './models/Search';

/* Global sate of the app 
  - search object
  - current recipe object
  - shopping list object
  - liked recipes
*/

const state = {};

const searchHandler = async () => {
  // 1. Get query from view
  const query = 'pizza';

  if (query) {
    // 2. new search object and add it to state
    state.search = new Search(query);

    // 3. prepare UI for results

    // 4. search results for recipes
    await state.search.getResults();

    // 5. render results on UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  searchHandler();
})

