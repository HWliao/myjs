import { ItemModel, MenuModel } from '../../type';
import asyncComponent from '../../../components/asyncComponent';

export const settings: ItemModel = {
    to: '/doc/settings',
    icon: 'settings',
    text: '详细配置',
    component: asyncComponent(() => import('./Settings'))
  }
;

export const settingsData: MenuModel = {
  header: '配置',
  items: [
    settings
  ]
};
