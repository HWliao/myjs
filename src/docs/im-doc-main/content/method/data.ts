import { ItemModel, MenuModel } from '../../type';
import asyncComponent from '../../../components/asyncComponent';

export const component: ItemModel = {
  text: '组件',
  to: '/doc/component',
  icon: 'label_outlet',
  component: asyncComponent(() => import('./Component'))
};

export const methodData: MenuModel = {
  header: '方法',
  items: [
    component
  ]
};
