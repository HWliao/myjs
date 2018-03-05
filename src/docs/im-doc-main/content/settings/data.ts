import { ItemModel, MenuModel } from '../../type';
import Settings from './Settings';

export const settings: ItemModel = {
    to: '/doc/settings',
    icon: 'settings',
    text: '详细配置',
    component: Settings
  }
;

export const settingsData: MenuModel = {
  header: '配置',
  items: [
    settings
  ]
};
