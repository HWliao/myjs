import { ItemModel, MenuModel } from '../../type';
import asyncComponent from '../../../components/asyncComponent';

export const component: ItemModel = {
  text: '组件',
  to: '/doc/component',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Component'))
};

export const status: ItemModel = {
  text: '状态',
  to: '/doc/status',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Status'))
};

export const ui: ItemModel = {
  text: 'UI',
  to: '/doc/ui',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Ui'))
};

export const application: ItemModel = {
  text: '应用',
  to: '/doc/application',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Application'))
};

export const business: ItemModel = {
  text: '业务功能',
  to: '/doc/business',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Business'))
};

export const methodData: MenuModel = {
  header: '方法',
  items: [
    component,
    status,
    ui,
    application,
    business
  ]
};
