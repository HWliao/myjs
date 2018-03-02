import * as React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

export type StyleType = 'root' | 'loading';

export type WithStylesProps = WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = () => ({
  root: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  loading: {
    fontSize: 50
  }
});

/**
 * 加载组件
 */
class Loading extends React.Component<WithStylesProps, {}> {
  constructor(props: WithStylesProps) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <CircularProgress color="secondary" size={50}/>
      </div>
    );
  }
}

export default withStyles(styles)<{}>(Loading);
