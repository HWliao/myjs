import { RouteComponentProps } from 'react-router';
import { WithStyles } from 'material-ui';
import * as React from 'react';

export type StyleType = 'root' | 'drawerPaper' | 'content';

export type Props = RouteComponentProps<{}> & WithStyles<StyleType>;

export interface ItemModel {
  icon: string;
  text: string;
  to: string;
  component?: React.ComponentType<any>;
}

export interface MenuModel {
  header: string;
  items: Array<ItemModel>;
}
