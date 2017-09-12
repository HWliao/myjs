(function () {
  'use strict';
  // 加载Vue Materail 组件
  Vue.use(VueMaterial);

  // 注册主题
  Vue.material.registerTheme({
    default: {
      primary: 'blue',
      accent: 'pink'
    },
    blue: {
      primary: 'blue',
      accent: 'pink'
    },
    indigo: {
      primary: 'indigo',
      accent: 'pink'
    },
    brown: {
      primary: 'brown',
      accent: 'green'
    },
    purple: {
      primary: 'purple',
      accent: 'blue'
    },
    orange: {
      primary: 'orange',
      accent: 'purple'
    },
    green: {
      primary: 'green',
      accent: 'pink'
    },
    'light-blue': {
      primary: 'light-blue',
      accent: 'yellow'
    },
    teal: {
      primary: 'teal',
      accent: 'orange'
    },
    'blue-grey': {
      primary: 'blue-grey',
      accent: 'blue'
    },
    cyan: {
      primary: 'cyan',
      accent: 'pink'
    },
    red: {
      primary: 'red',
      accent: 'pink'
    },
    white: {
      primary: 'white',
      accent: 'blue'
    },
    grey: {
      primary: {
        color: 'grey',
        hue: 300
      },
      accent: 'indigo'
    }
  });

  // 路由
  Vue.use(VueRouter);
  // 1. 定义（路由）组件。
  // 可以从其他文件 import 进来
  const Foo = {template: '<div>foo</div>'}
  const Bar = {template: '<div>bar</div>'}

  // 2. 定义路由
  // 每个路由应该映射一个组件。 其中"component" 可以是
  // 通过 Vue.extend() 创建的组件构造器，
  // 或者，只是一个组件配置对象。
  // 我们晚点再讨论嵌套路由。
  const routes = [
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar}
  ];

  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  const router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
  });

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
  var app = new Vue({
    data: function () {
      return {
        message: 'Hello Vue!',
        theme: 'orange',
        change: function () {
          console.log(1111);
        },
        click: function () {
          console.log(2222);
        }
      }
    },
    router: router
  }).$mount('#app');
})();
