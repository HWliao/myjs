import * as React from 'react';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { StyleRulesCallback, WithStyles } from 'material-ui';
import MenuItem from 'material-ui/Menu/MenuItem';
import withStyles from 'material-ui/styles/withStyles';
import Menu from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import JJSIM from '../../main/main';
import { ImModel } from '../../main/im-api/model/im.model';

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

  error = (err: any) => {
    console.error(err);
    if (typeof err === 'string') {
      this.tip(err);
    } else {
      this.tip('出错了');
    }
  };

  tip = (message: string) => {
    this.setState((prev) => Object.assign({}, prev, {message}));
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
          <MenuItem onClick={this.createIm}>createImAndInit</MenuItem>
          <MenuItem onClick={this.login}>login</MenuItem>
          <MenuItem onClick={this.init}>init</MenuItem>
          <MenuItem onClick={this.destroy}>destroy</MenuItem>
          <MenuItem onClick={this.toggleShow}>toggleShow</MenuItem>
          <MenuItem onClick={this.toggleUp}>toggleUp</MenuItem>
          <MenuItem onClick={this.isInited}>isInited</MenuItem>
          <MenuItem onClick={this.isShow}>isShow</MenuItem>
          <MenuItem onClick={this.isUp}>isUp</MenuItem>
          <MenuItem onClick={this.getConfig}>getConfig</MenuItem>
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
    JJSIM.createImAndInit({})
      .then((im: ImModel) => this.im = im)
      .catch((err: any) => this.tip(err));
  };
  login = () => {
    this.im.login('123106', '123456');
  };
  init = () => {
    this.im.init().catch(this.tip);
  };

  destroy = () => {
    this.im.destroy().catch(this.tip);
  };

  toggleShow = () => {
    this.wrapExc(() => this.im.toggleShow());
  };

  toggleUp = () => {
    this.wrapExc(() => this.im.toggleUp());
  };

  isInited = () => {
    this.tip(String(this.im.isInited()));
  };

  isShow = () => {
    this.tip(String(this.im.isShow()));
  };

  isUp = () => {
    this.tip(String(this.im.isUp()));
  };

  getConfig = () => {
    console.log(this.im.getConfig());
    this.tip('请看控制台');
  };

  wrapExc(cb: Function) {
    try {
      return cb();
    } catch (e) {
      this.tip(e);
    }
  }
}

export default withStyles(styles)<{}>(ImDocOperaterMenu);
