import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import { Props } from './type';
import styled from './style';
import ImDocSidebarMenu from './sidebar-menu/SiderbarMenu';
import Routes from './route';

class ImDocMain extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          PaperProps={{
            elevation: 10
          }}
          variant="permanent"
          classes={{paper: classes.drawerPaper}}
        >
          <ImDocSidebarMenu/>
        </Drawer>
        <main className={classes.content}>
          <Routes/>
        </main>
      </div>
    );
  }
}

export default styled<{}>(ImDocMain);
