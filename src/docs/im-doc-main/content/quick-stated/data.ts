import { ItemModel, MenuModel } from '../../type';
import QuickStarted from './QuickStarted';

export const QUICK_STARTED_TO = '/doc/quick_started';

export const quickStarted: ItemModel = {
  icon: 'trending_up',
  to: QUICK_STARTED_TO,
  text: '快速开始',
  component: QuickStarted
};

export const quickStartedData: MenuModel = {
  header: '入门',
  items: [
    quickStarted
  ]
};
