import { ItemModel, MenuModel } from '../../type';

import asyncComponent from '../../../components/asyncComponent';

export const QUICK_STARTED_TO = '/doc/quick_started';

export const quickStarted: ItemModel = {
  icon: 'trending_up',
  to: QUICK_STARTED_TO,
  text: '快速开始',
  component: asyncComponent(() => import('./QuickStarted'))
};

export const quickStartedData: MenuModel = {
  header: '入门',
  items: [
    quickStarted
  ]
};
