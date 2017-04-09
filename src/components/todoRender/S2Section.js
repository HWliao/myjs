import Item from './Item';
import li from './Li';

function input(h) {
  const vm = this;
  const data = {
    class: {
      'toggle-all': true,
    },
    attrs: {
      type: 'checkbox',
    },
    on: {
      change(e) {
        vm.$emit(e);
//        console.log(e.target.checked);
      },
    },
  };
  return h('input', data);
}

function ul(h) {
  const vm = this;
  const data = {
    class: {
      'todo-list': true,
    },
  };
  const childs = [];
  vm.todos.map(todo => childs.push(h(li, {
    props: {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      todo,
    },
  })));
  return h('ul', data, childs);
}

const section = {
  name: 's2section',
  props: {
    todos: {
      type: Array,
      default() {
        const a = [];
        a.push(new Item(1, 'lwh1', false));
        a.push(new Item(2, 'lhw2', true));
        return a;
      },
    },
  },
  render(h) {
    const data = {
      class: {
        main: true,
      },
    };
    const childs = [];
    childs.push(input.call(this, h));
    childs.push(ul.call(this, h));
    return h('section', data, childs);
  },
};

export default section;
