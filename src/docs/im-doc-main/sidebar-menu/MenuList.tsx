import * as React from 'react';
import List from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import { RouteComponentProps, withRouter } from 'react-router';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles';
import withStyles from 'material-ui/styles/withStyles';
import Icon from 'material-ui/Icon';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import { Link } from 'react-router-dom';
import { MenuModel } from '../type';

interface State {
  currTo?: string;
}

type StyleType = 'listItemRoot' | 'themeColor' | string;

export interface MenuListProps extends MenuModel, RouteComponentProps<{}> {
}

type Props = MenuListProps & WithStyles<StyleType>;

const styles: StyleRulesCallback<StyleType> = theme => ({
  themeColor: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  listItemRoot: {
    borderRightWidth: 5,
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.primary.main
  }
});
const getLink = getLinkFn();
getLink('');

class MenuList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currTo: undefined
    };
  }

  doMouseHover = (isEnter: boolean, to: string) => {
    this.setState((prev) => {
      const state: State = {};
      if (isEnter) {
        state.currTo = to;
      } else if (prev.currTo === to) {
        state.currTo = undefined;
      }
      return state;
    });
  };

  render() {
    const {classes, header, items, location} = this.props;
    const {currTo: hoverTo} = this.state;
    return (
      <List>
        <ListSubheader disableSticky={true}>{header}</ListSubheader>
        {items.map((item) => {
          return (
            <ListItem
              key={item.to}
              button={true}
              component={getLink(item.to)}
              classes={{root: pathToClass(classes.listItemRoot, item.to, location.pathname)}}
              onMouseEnter={this.doMouseHover.bind(this, true, item.to)}
              onMouseLeave={this.doMouseHover.bind(this, false, item.to)}
            >
              <ListItemIcon
                classes={{
                  root: pathToClass(classes.themeColor, item.to, hoverTo)
                  || pathToClass(classes.themeColor, item.to, location.pathname)
                }}
              >
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText
                inset={true}
                primary={item.text}
                classes={{
                  primary: pathToClass(classes.themeColor, item.to, hoverTo)
                  || pathToClass(classes.themeColor, item.to, location.pathname)
                }}
              />
            </ListItem>
          );
        })}
        <Divider/>
      </List>
    );
  }
}

function pathToClass(theClassName: string, pathName: string, thePathName?: string): string | undefined {
  return pathName && pathName === thePathName ? theClassName : undefined;
}

function getLinkFn(): Function {
  const linkCache = {};
  return (to: string) => {
    if (!linkCache[to]) {
      linkCache[to] = (props: {}) => <Link to={to} {...props}/>;
    }
    return linkCache[to];
  };
}

export default withRouter(withStyles(styles)<MenuListProps>(MenuList));
