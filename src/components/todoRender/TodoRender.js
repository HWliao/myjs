import '../../assets/styles/todo.css';
import '../../assets/styles/todoRender.css';
import Storage from './Storage';

console.log(Storage);
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
};

export default App;
