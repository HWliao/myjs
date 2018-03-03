import * as React from 'react';
import { StyleRulesCallback, WithStyles, withStyles } from 'material-ui/styles';

type StyleType = 'root';

type Props = WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    padding: 20,
    flex: '1',
    display: 'flex'
  }
});

class ImDocContent extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        content
      </div>
    );
  }
}

export default withStyles(styles)<{}>(ImDocContent);
