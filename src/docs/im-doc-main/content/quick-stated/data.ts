import { MenuModel } from '../../type';
import { QUICK_STARTED_TO } from './QuickStarted';

export const quickStartedData: MenuModel = {
  header: '入门',
  items: [
    {
      icon: 'trending_up',
      to: QUICK_STARTED_TO,
      text: '快速开始'
    }
  ]
};
