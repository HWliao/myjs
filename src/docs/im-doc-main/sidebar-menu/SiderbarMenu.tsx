import * as React from 'react';
import { StyleRulesCallback, WithStyles, withStyles } from 'material-ui/styles';
import MenuList from './MenuList';
import { quickStartedData } from '../content/quick-stated/data';

type StyleType = 'root';

type Props = WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    flex: '1'
  }
});

class ImDocSidebarMenu extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <MenuList header={quickStartedData.header} items={quickStartedData.items}/>
      </div>
    );
  }
}

export default withStyles(styles)<{}>(ImDocSidebarMenu);
