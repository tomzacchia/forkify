import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = ''
};

export const clearResultsContainer = () => {
  elements.searchResultsList.innerHTML = '';
  elements.paginationContainer.innerHTML = '';
}

const spliceRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce( (acc, curr) => {
      if (acc + curr.length <= limit) {
        newTitle.push(curr);
      }
      return acc + curr.length;
    }, 0 );

    return `${newTitle.join(' ')} ...`;
  }

  return title;
}

const renderRecipe = recipe => {
  const htmlElement = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${spliceRecipeTitle(recipe.title)}">
          </figure>
          <div class="results__data">
              <h4 class="results__name"> ${spliceRecipeTitle(recipe.title)} </h4>
              <p class="results__author"> ${recipe.publisher} </p>
          </div>
      </a>
    </li>
  `;

  elements.searchResultsList.insertAdjacentHTML('beforeend', htmlElement);
}

// type: 'prev' or 'next'
const createPaginationButton = (currentPage, type) => `
  <button class="btn-inline results__btn--${type}" data-goTo="${type === 'prev' ? currentPage - 1 : currentPage + 1}">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? currentPage - 1 : currentPage + 1}</span>
  </button>
`;

const renderPaginationButtons = (pageNumber = 1, resultsPerPage = 10 , totalRecipes) => {
  const PAGES = Math.ceil(totalRecipes / resultsPerPage);
  let button;

  if (pageNumber === 1 && PAGES > 1) {
    // button to go to next page
    button = createPaginationButton(pageNumber, 'next');
  } else if (pageNumber < PAGES) {
    // both buttons
    button = createPaginationButton(pageNumber, 'next') + createPaginationButton(pageNumber, 'prev');
  } else if (pageNumber === PAGES && PAGES > 1) {
    // button to go to prev page
    button = createPaginationButton(pageNumber, 'prev');
  }

  elements.paginationContainer.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, pageNumber = 1, resultsPerPage = 10 ) => {
  // render results of current page
  const START = (pageNumber - 1) * resultsPerPage;
  const END  = (pageNumber * resultsPerPage);

  recipes.slice(START, END).forEach(renderRecipe);

  // render pagination buttons
  renderPaginationButtons(pageNumber, resultsPerPage, recipes.length);

};