// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
  Row,
  Col,
  Menu,
  Icon,
  MenuItem,
  Tooltip,
  Submenu,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Button,
  Select,
  Option,
  Input,
  Card,
  Table,
  TableColumn,
  Pagination,
} from 'element-ui';
import 'normalize.css';
import './theme/index.css';
import './style.less';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Card);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
