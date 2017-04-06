import '../../assets/styles/todo.css';
import '../../assets/styles/todoRender.css';
import Storage from './Storage';
import footer from './Footer';

const App = {
  name: 'todoRender',
  data() {
    return {
      todos: Storage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all',
    };
  },
  render(h) {
    const childs = [];
    childs.push(h(footer));
    return h('div', childs);
  },
};

export default App;
