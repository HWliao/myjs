import { RouteProps } from 'react-router';
import { WithStyles } from 'material-ui/styles';

export type StyleType = 'root' | 'header' | 'headerSection' | 'headerHeadline'
  | 'headerStart' | 'headerHeadlineTitle' | 'headerHeadlineSubtitle' | 'section'
  | 'headerStartButton';

export type Props = RouteProps & WithStyles<StyleType>;
