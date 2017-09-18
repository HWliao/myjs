(function () {
  'use strict';
  // 添加自定义组件
  Vue.component('mSelect', MSelect);
  // 路由
  Vue.use(VueRouter);

  // vue 实例
  var app = window.app = new Vue({
    data: function () {
      return {
        dark: false,
        drawer: true,
        items: [
          {icon: 'home', text: '首页'},
        ],
        items2: [
          {id: 1, name: 'seal', icon: 'mail', href: '/gz/seal', text: '印章信息'},
          {id: 2, name: 'file', icon: 'folder', href: '/gz/file', text: '文件资料'}
        ]
      };
    },
    router: window.router
  }).$mount('#app');
})();
