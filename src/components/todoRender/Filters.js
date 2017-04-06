class Filters {

  static all(todos) {
    return todos;
  }

  static active(todos) {
    return todos.filter(todo => !todo.completed);
  }

  static completed(todos) {
    return todos.filter(todo => todo.completed);
  }

}

export default Filters;
