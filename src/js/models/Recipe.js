import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  };

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error);
    }
  }

  cookingTime() {
    // Assume 15mins per 3 ingredients
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.cookingTime = periods * 15;
  }

  calculateServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const UNITS_MAP = {
      'tablespoons': 'tbsp',
      'tablespoon': 'tbsp',
      'ounces': 'oz',
      'ounce': 'oz',
      'teaspoons': 'tsp',
      'teaspoon': 'tsp',
      'cups': 'cup',
      'pounds': 'pound'
    };
  
    const newIngredients = this.ingredients.map( el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();

      for (var key in UNITS_MAP) {
        ingredient = ingredient.replace(key, UNITS_MAP[key]);
      }

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3) Parse ingredients into count, unit and ingredient
      const units = Object.values(UNITS_MAP);
      const ingredientArray = ingredient.split(' ');
      const unitIndex = ingredientArray.findIndex( el => units.includes(el) );

      let ingredientObj = {};
      if (unitIndex > -1) {
        // there is a unit
        // 4 1/2 cups => ['4', '1/2']
        const countArray = ingredientArray.slice(0, unitIndex);
        let count;

        if (countArray.length === 1) {
          count = eval(countArray[0].replace('-', '+'));
        } else {
          count = eval(ingredientArray.slice(0, unitIndex).join('+'));
        }

        ingredientObj = {
          count: parseFloat(count.toFixed(2)),
          unit: ingredientArray[unitIndex],
          ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
        }
      } else if (parseInt(ingredientArray[0], 10)) {
        // no unit but a number is present
        ingredientObj = {
          count: parseInt(ingredientArray[0], 10),
          unit: '',
          ingredient: ingredientArray.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // there is no unit and no number in 1st position
        ingredientObj = {
          count: 1,
          unit: '',
          ingredient: ingredient
        }
      }

      return ingredientObj;
    })

    this.ingredients = newIngredients;
  }

}