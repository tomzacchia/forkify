export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  searchResultsContainer: document.querySelector('.results'),
  searchResultsList: document.querySelector('.results__list'),
  paginationContainer: document.querySelector('.results__pages'),
  recipeContainer: document.querySelector('.recipe'),
  shoppingListContainer: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likedItemsContainer: document.querySelector('.likes__list')
};

export const elementStrings = {
  loader: 'loader'
};

export const renderSpinner = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeSpinner = () => {
  const spinner = document.querySelector(`.${elementStrings.loader}`);
  if (spinner) spinner.parentElement.removeChild(spinner);
};