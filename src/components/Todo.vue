<style>
  @import url(../assets/styles/todo.css);

  [v-cloak] {
    display: none;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
<template>
  <div v-cloak>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               autofocus autocomplete="off"
               placeholder="What needs to be done?"
               v-model="newTodo"
               @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="todo-list">
          <transition-group name="bounce" mode="out-in">
            <li v-for="todo in filteredTodos"
                class="todo"
                :key="todo.id"
                :class="{ completed: todo.completed, editing: todo == editedTodo }">
              <div class="view">
                <input class="toggle" type="checkbox" v-model="todo.completed">
                <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                <button class="destroy" @click="removeTodo(todo)"></button>
              </div>
              <input class="edit" type="text"
                     v-model="todo.title"
                     v-todo-focus="todo == editedTodo"
                     @blur="doneEdit(todo)"
                     @keyup.enter="doneEdit(todo)"
                     @keyup.esc="cancelEdit(todo)">
            </li>
          </transition-group>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
          <li><a href="javascript:;;" :class="{ selected: visibility == 'all' }" @click="visibility = 'all'">All</a>
          </li>
          <li><a href="javascript:;;" :class="{ selected: visibility == 'active' }" @click="visibility = 'active'">Active</a>
          </li>
          <li><a href="javascript:;;" :class="{ selected: visibility == 'completed' }"
                 @click="visibility = 'completed'">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://evanyou.me">Evan You</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
</template>
<script>
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

  // app Vue instance
  const app = {
    // app initial state
    data() {
      return {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility: 'all',
      };
    },

    // watch todos change for localStorage persistence
    watch: {
      todos: {
        handler(todos) {
          todoStorage.save(todos);
        },
        deep: true,
      },
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
      filteredTodos() {
        return filters[this.visibility](this.todos);
      },
      remaining() {
        return filters.active(this.todos).length;
      },
      allDone: {
        get() {
          return this.remaining === 0;
        },
        set(value) {
          this.todos.forEach((todo) => {
            const td = todo;
            td.completed = value;
          });
        },
      },
    },

    filters: {
      pluralize(n) {
        return n === 1 ? 'item' : 'items';
      },
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      addTodo() {
        const value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push({
          id: todoStorage.uid += 1,
          title: value,
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

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
    },
  };
  export default app;

  //  // handle routing
  //  function onHashChange () {
  //    var visibility = window.location.hash.replace(/#\/?/, '')
  //    if (filters[visibility]) {
  //      app.visibility = visibility
  //    } else {
  //      window.location.hash = ''
  //      app.visibility = 'all'
  //    }
  //  }
  //
  //  window.addEventListener('hashchange', onHashChange)
  //  onHashChange()
  //
  //  // mount
  //  app.$mount('.todoapp')
</script>
