import * as React from 'react';
import { StyleRulesCallback, WithStyles, withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';

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
        <List>
          <ListSubheader disableSticky={true}>入门</ListSubheader>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>trending_up</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="快速入门"/>
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="配置"/>
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListSubheader disableSticky={true}>入门</ListSubheader>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>trending_up</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="快速入门"/>
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="配置"/>
          </ListItem>
          <Divider/>
          <ListSubheader disableSticky={true}>入门</ListSubheader>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>trending_up</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="快速入门"/>
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="配置"/>
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListSubheader disableSticky={true}>入门</ListSubheader>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>trending_up</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="快速入门"/>
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText inset={true} primary="配置"/>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)<{}>(ImDocSidebarMenu);
