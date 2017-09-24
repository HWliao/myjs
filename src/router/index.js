import Vue from 'vue';
import Router from 'vue-router';
import GzSealComponent from '../components/gzSeal/GzSealComponent';
import GzFileComponent from '../components/gzFile/GzFileComponent';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/gz/seal' },
    { path: '/gz', redirect: '/gz/seal' },
    { path: '/gz/seal', component: GzSealComponent, name: 'seal' },
    { path: '/gz/file', component: GzFileComponent, name: 'file' },
  ],
});
