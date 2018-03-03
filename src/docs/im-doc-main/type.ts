import { RouteComponentProps } from 'react-router';
import { WithStyles } from 'material-ui';

export type StyleType = 'root' | 'drawerPaper' | 'content';

export type Props = RouteComponentProps<{}> & WithStyles<StyleType>;

export interface ItemModel {
  icon: string;
  text: string;
  to: string;
}

export interface MenuModel {
  header: string;
  items: Array<ItemModel>;
}
