import * as React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { StyleRulesCallback, WithStyles } from 'material-ui';
import MenuItem from 'material-ui/Menu/MenuItem';
import withStyles from 'material-ui/styles/withStyles';
import Menu from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import JJSIM from '../../main/main';
import { ImModel } from '../../main/container/im-api/model/im.model';

type StyleType = 'root' | 'menu' | 'snackbar' | string;

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
  },
  snackbar: {
    zIndex: theme.zIndex.tooltip + 3
  }
});

class ImDocOperaterMenu extends React.Component<Props, State> {

  anchorEl: HTMLElement | undefined | null;

  im: ImModel;

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

  tip = (err: any) => {
    console.error(err);
    if (typeof err === 'string') {
      this.setState((prev) => Object.assign({}, prev, {message: err}));
    } else {
      this.setState((prev) => Object.assign({}, prev, {message: '出错了'}));
    }
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
          <MenuItem onClick={this.createIm}>createIm</MenuItem>
          <MenuItem onClick={this.init}>init</MenuItem>
          <MenuItem onClick={this.destroy}>destroy</MenuItem>
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
          className={(this.props.classes.snackbar)}
        />
      </div>
    );
  }

  createIm = () => {
    JJSIM.createIm()
      .then((im: ImModel) => this.im = im)
      .catch((err: any) => this.tip(err));
  };

  init = () => {
    try {
      this.im.init();
    } catch (e) {
      this.tip(e);
    }
  };

  destroy = () => {
    try {
      this.im.destroy();
    } catch (e) {
      this.tip(e);
    }
  };
}

export default withStyles(styles)<{}>(ImDocOperaterMenu);
