import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { RouteComponentProps } from 'react-router';

type StyleType = 'root';
type Props = RouteComponentProps<{}> & WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    color: theme.palette.secondary.main,
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ImDocNotFound extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Typography variant="display3" className={classes.root}>404</Typography>
    );
  }
}

export default withStyles(styles)<{}>(ImDocNotFound);
