import { StyleRulesCallback } from 'material-ui/styles';
import { StyleType } from './type';
import withStyles from 'material-ui/styles/withStyles';

const styles: StyleRulesCallback<StyleType> = (theme) => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  headerSection: {
    textAlign: 'center',
    paddingTop: 60
  },
  headerHeadline: {},
  headerStart: {
    margin: '60px 0'
  },
  headerHeadlineTitle: {
    fontSize: 56,
    fontWeight: 300
  },
  headerHeadlineSubtitle: {
    fontSize: 18,
    fontWeight: 300
  },
  headerStartButton: {
    color: theme.palette.primary.main,
    background: '#ffffff',
    fontWeight: 'bold'
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
  }
});

export default withStyles(styles);
