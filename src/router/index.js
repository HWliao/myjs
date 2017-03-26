import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello';
import Todo from '../components/Todo';
import TodRender from '../components/todoRender/TodoRender';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    }, {
      path: '/todo',
      name: 'todo',
      component: Todo,
    }, {
      path: '/todo-render',
      name: 'todoRender',
      component: TodRender,
    },
  ],
});
