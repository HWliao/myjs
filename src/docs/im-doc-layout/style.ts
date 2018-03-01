import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import { StyleTypes } from './type';

const styles: StyleRulesCallback<StyleTypes> = theme => ({
  root: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'auto',
    flex: '1 1 auto'
  },
  toolbar: theme.mixins.toolbar,
  labelText: {
    color: theme.palette.primary.contrastText
  }
});

export const styled = withStyles(styles);
