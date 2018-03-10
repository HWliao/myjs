import { ImModel } from './model/im.model';
import { mount, unmount } from '../im-root';
import { ConfigModel } from './model/config.model';
import { selectLayoutShow, selectLayoutUp } from '../im-layout/selectors';
import { dispatch, getState } from '../../store/stroe';
import { imLayoutDownAction, imLayoutHideAction, imLayoutShowAction, imLayoutUpAction } from '../im-layout/actions';
import { imApiDestroyAction, imApiInitAction } from './actions';
import { selectImApiInited } from './selectors';

class Im implements ImModel {

  private $root: HTMLElement;

  constructor() {
    this.$root = document.createElement('div');
    this.$root.style.position = 'absolute';
    this.$root.style.left = '-1px';
    this.$root.style.width = '0px';
    this.$root.style.height = '0px';
    document.body.appendChild(this.$root);
  }

  init = () => {
    return mount(this.$root).then(() => {
      dispatch(imApiInitAction());
      return this;
    });
  };

  destroy = () => {
    return Promise.resolve(unmount(this.$root)).then((r) => {
      dispatch(imApiDestroyAction());
      return r;
    });
  };

  toggleShow = (show?: boolean) => {
    const currShow = selectLayoutShow(getState());
    show = show === undefined ? !currShow : show;
    show ? dispatch(imLayoutShowAction()) : dispatch(imLayoutHideAction());
  };

  toggleUp = (up?: boolean) => {
    const currUp = selectLayoutUp(getState());
    up = up === undefined ? !currUp : up;
    up ? dispatch(imLayoutUpAction()) : dispatch(imLayoutDownAction());
  };

  isInited = () => {
    return selectImApiInited(getState());
  };

  isShow = () => {
    return selectLayoutShow(getState());
  };

  isUp = () => {
    return selectLayoutUp(getState());
  };
}

let _im: ImModel;

export function getImInstance(config: ConfigModel) {
  if (!_im) {
    _im = new Im();
  }
  return _im;
}
