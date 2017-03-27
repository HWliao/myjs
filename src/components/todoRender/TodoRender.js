/**
 * 基于runtime vue构建组件
 * Created by HWliao on 2017/3/26.
 */
import '../../assets/styles/todo.css';
import '../../assets/styles/todoRender.css';

// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
const STORAGE_KEY = 'todos-vuejs-2.0';
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo, index) => {
      const td = todo;
      td.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

// visibility filters
const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter(todo => !todo.completed);
  },
  completed(todos) {
    return todos.filter(todo => todo.completed);
  },
};
// generate footer p a
function a2p2footer(h, href, innerHTML) {
  return h('a', {
    attrs: {
      href,
    },
    domProps: {
      innerHTML,
    },
  });
}
// generate footer p
function p2footer(h, childs) {
  return h('p', childs);
}
// generate footer element
function footer(h) {
  return h('footer', {
    class: {
      info: true,
    },
  }, [
    p2footer.call(this, h, ['Double-click to edit a todo']),
    p2footer.call(this, h, ['Written by ', a2p2footer(h, 'http://evanyou.me', 'Evan You')]),
    p2footer.call(this, h, ['Written by ', a2p2footer(h, 'http://todomvc.com', 'TodoMVC')]),
  ]);
}
// section header input
function i2h2section(h) {
  const vm = this;
  const data = {
    class: {
      'new-todo': true,
    },
    attrs: {
      autofocus: true,
      autocomplete: 'off',
      placeholder: 'What needs to be done?',
    },
    domProps: {
      value: vm.newTodo,
    },
    on: {
      input(e) {
        vm.newTodo = e.target.value;
      },
      keyup(e) {
        if (e.keyCode === 13) {
          vm.addTodo();
        }
      },
    },
  };
  return h('input', data);
}
// section header
function h2section(h) {
  const data = {};
  data.class = {
    header: true,
  };
  const childs = [];
  childs.push(h('h1', 'todos'));
  childs.push(i2h2section.call(this, h));
  return h('header', data, childs);
}
// section section input
function i2s2section(h) {
  const data = {
    class: {
      'toggle-all': true,
    },
    attrs: {
      type: 'checkbox',
    },
    domProps: {
      value: 'all',
    },
  };
  return h('input', data);
}
// section section ul li div input
function i2div2li2ul2s2section(h, todo) {
  const td = todo;
  const data = {
    class: {
      toggle: true,
    },
    attrs: {
      type: 'checkbox',
    },
    domProps: {
      value: td.completed,
    },
    on: {
      input(e) {
        td.completed = e.target.value;
      },
    },
  };
  return h('input', data);
}
// section section ul li div label
function label2div2li2ul2s2section(h, todo) {
  const td = todo;
  const vm = this;
  const data = {
    domProps: {
      innnerHTML: td.title,
    },
    on: {
      dbclick() {
        vm.editTodo(td);
      },
    },
  };
  return h('label', data);
}
// section section ul li div button
function buttom2div2li2ul2s2sectin(h, todo) {
  const td = todo;
  const vm = this;
  const data = {
    class: {
      destroy: true,
    },
    on: {
      click() {
        vm.removeTodo(td);
      },
    },
  };
  return h('button', data);
}
// section section ul li div
function div2li2ul2s2section(h, todo) {
  const td = todo;
  const data = {
    class: {
      view: true,
    },
  };
  const childs = [];
  childs.push(i2div2li2ul2s2section.call(this, h, td));
  childs.push(label2div2li2ul2s2section.call(this, h, td));
  childs.push(buttom2div2li2ul2s2sectin.call(this, h, td));
  return h('div', data, childs);
}
// section section ul li input
function i2li2ul2s2section(h, todo) {
  const td = todo;
  const vm = this;
  const data = {
    class: {
      edit: true,
    },
    attrs: {
      type: 'text',
    },
    domProps: {
      value: td.title,
    },
    directives: [
      {
        name: 'todo-focus',
        value: td === vm.editedTodo,
      },
    ],
    on: {
      input(e) {
        td.title = e.target.value;
      },
      blur() {
        vm.doneEdit(td);
      },
      keyup(e) {
        if (e.keyCode === 13) {
          // enter
          vm.doneEdit(td);
        } else if (e.keyCode === 27) {
          // esc
          vm.cancelEdit(td);
        }
      },
    },
  };
  return h('input', data);
}
// section section ul li
function li2ul2s2section(h, todo) {
  const td = todo;
  const vm = this;
  const data = {
    class: {
      todo: true,
      completed: td.completed,
      editing: td === vm.editedTodo,
    },
    key: td.id,
  };
  const childs = [];
  childs.push(div2li2ul2s2section.call(this, h, td));
  childs.push(i2li2ul2s2section.call(this, h, td));
  return h('li', data, childs);
}
// section section ul
function ul2s2section(h) {
  const data = {
    class: {
      'todo-list': true,
    },
  };
  const childs = [];
  this.todos.forEach(item => childs.push(li2ul2s2section.call(this, h, item)));
  return h('ul', data, childs);
}
// section section
function s2section(h) {
  const data = {
    class: {
      main: true,
    },
  };
  const childs = [];
  childs.push(i2s2section.call(this, h));
  childs.push(ul2s2section.call(this, h));
  return h('section', data, childs);
}
// section footer
function f2section(h) {
  return h('footer', {
    class: {
      footer: true,
    },
  }, ['footer']);
}
// generate section
function section(h) {
  const childs = [];
  const data = {};
  // 子节点
  childs.push(h2section.call(this, h));
  if (this.todos.length) {
    childs.push(s2section.call(this, h));
    childs.push(f2section.call(this, h));
  }
  // 属性
  data.class = {
    todoapp: true,
  };
  return h('section', data, childs);
}
const app = {
  name: 'todo',
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editeTodo: null,
      visibility: 'all',
    };
  },
  created() {
    this.todos.push({
      id: todoStorage.uid += 1,
      title: 'test',
      completed: false,
    });
  },
  render(h) {
    return h('div', {
      directives: [{
        name: 'my-lhw',
      }],
    }, [
      section.call(this, h),
      footer.call(this, h),
    ]);
  },
  methods: {
    addTodo() {
      const theTodo = this.newTodo && this.newTodo.trim();
      if (!theTodo) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid += 1,
        title: theTodo,
        completed: false,
      });
      this.newTodo = '';
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
    editTodo(todo) {
      const td = todo;
      this.beforeEditCache = td.title;
      this.editedTodo = td;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      const td = todo;
      this.editedTodo = null;
      td.title = todo.title.trim();
      if (!td.title) {
        this.removeTodo(td);
      }
    },
    cancelEdit(todo) {
      const td = todo;
      this.editedTodo = null;
      td.title = this.beforeEditCache;
    },
    removeCompleted() {
      this.todos = filters.active(this.todos);
    },
  },
  directives: {
    myLhw() {
      console.log(1);
    },
    todoFocus(el, value) {
      if (value) {
        el.focus();
      }
    },
  },
};
export default app;
