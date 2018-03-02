import { RouteProps } from 'react-router';
import { WithStyles } from 'material-ui';

export type StyleType = 'root' | 'drawerPaper' | 'content';

export type Props = RouteProps & WithStyles<StyleType>;
