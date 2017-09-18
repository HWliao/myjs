/**
 * 路由
 * Created by HWliao on 2017/9/17.
 */
(function () {
  'use strict';

  // 定义路由
  // 每个路由应该映射一个组件。 其中"component" 可以是
  // 通过 Vue.extend() 创建的组件构造器，
  // 或者，只是一个组件配置对象。
  // 我们晚点再讨论嵌套路由。
  var routes = [
    {path: '/', redirect: '/gz/seal'},
    {path: '/gz', redirect: '/gz/seal'},
    {path: '/gz/seal', component: GzSealComponent, name: 'seal'},
    {path: '/gz/file', component: GzFileComponent, name: 'file'}
  ];

  // 3. 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  var router = window.router = new VueRouter({
    routes: routes
  });
})();
