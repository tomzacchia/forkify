export default class List {
  constructor() {
    this.items = {};
  }

  addItem(count, unit, ingredient) {
    const UNIQUE_ID = '_' + Math.random().toString(36).substr(2, 9);;
    const item = {
      count,
      unit,
      ingredient,
      id: UNIQUE_ID
    }

    this.items[UNIQUE_ID] = item;

    return item;
  };

  deleteItem(id) {
    delete this.items[id];
  };

  updateCount(id, newCount) {
    this.items[id].count = newCount;
  };
}