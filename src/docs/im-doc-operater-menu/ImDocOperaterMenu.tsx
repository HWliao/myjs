import * as React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { StyleRulesCallback, WithStyles } from 'material-ui';
import MenuItem from 'material-ui/Menu/MenuItem';
import withStyles from 'material-ui/styles/withStyles';
import Menu from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';

type StyleType = 'root' | 'menu' | string;

type Props = WithStyles<StyleType>;

type State = {
  open: boolean;
  message: string | false;
};

const styles: StyleRulesCallback<StyleType> = theme => ({
  root: {
    position: 'absolute',
    zIndex: theme.zIndex.tooltip + 1,
    bottom: theme.spacing.unit * 2,
    left: 240 + theme.spacing.unit * 2
  },
  menu: {
    zIndex: theme.zIndex.tooltip + 2
  }
});

class ImDocOperaterMenu extends React.Component<Props, State> {

  anchorEl: HTMLElement | undefined | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      message: false
    };
  }

  toggleMenu = () => {
    this.setState(prev => Object.assign({}, prev, {open: !prev.open}));
  };

  closeMenu = () => {
    this.setState((prev) => Object.assign({}, prev, {open: false}));
  };

  closeSnackbar = () => {
    this.setState((prev) => Object.assign({}, prev, {message: false}));
  };

  doClickItem = (key: string) => {
    this.setState((prev) => Object.assign({}, prev, {message: key}));
    // todo
  };

  render() {
    return (
      <div
        className={this.props.classes.root}
        ref={(divDom) => {
          this.anchorEl = divDom;
        }}
      >
        <Button
          variant="fab"
          mini={true}
          color="secondary"
          aria-label="menu"
          aria-owns="menu"
          aria-haspopup="true"
          onClick={this.toggleMenu}
        >
          <Icon>menu</Icon>
        </Button>
        <Menu
          id="menu"
          anchorEl={this.anchorEl ? this.anchorEl : undefined}
          open={this.state.open}
          onClose={this.closeMenu}
          className={this.props.classes.menu}
        >
          <MenuItem onClick={this.doClickItem.bind(this, 'createIm')}>createIm</MenuItem>
          <MenuItem onClick={this.doClickItem.bind(this, 'init')}>init</MenuItem>
          <MenuItem onClick={this.doClickItem.bind(this, 'destroy')}>destroy</MenuItem>
        </Menu>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={Boolean(this.state.message)}
          onClose={this.closeSnackbar}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={5000}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)<{}>(ImDocOperaterMenu);
