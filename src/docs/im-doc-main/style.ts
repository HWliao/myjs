import { StyleRulesCallback } from 'material-ui';
import { StyleType } from './type';
import withStyles from 'material-ui/styles/withStyles';

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    flex: '1',
    display: 'flex',
    overflow: 'hidden'
  },
  drawerPaper: {
    position: 'static',
    width: 240,
    overflow: 'auto',
    height: '100%',
    border: 'none'
  },
  content: {
    flex: '1',
    overflow: 'auto',
    padding: 20
  }
});

export default withStyles(styles);
