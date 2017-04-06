import Item from './Item';

const STORAGE_KEY = 'todos-vuejs-2.0';
const localStorage = window.localStorage;
let uid = 0;

class Storage {

  constructor() {
    throw new Error('it can not be instance.');
  }

  static get uid() {
    return uid;
  }

  static fetch() {
    const todos = localStorage.getItem(STORAGE_KEY) || [];
    const items = [];
    todos.forEach((todo, index) => items.push(new Item(index, todo.title, todo.complete)));
    uid = items.length;
    return items;
  }

  static save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}

export default Storage;
