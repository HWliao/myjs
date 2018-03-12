import { ImModel } from './model/im.model';
import { mount, unmount } from '../container/im-root';
import { ConfigModel, defaultConfig } from './model/config.model';
import { selectLayoutShow, selectLayoutUp } from '../container/im-layout/selectors';
import { dispatch, getState, ImStore, storeConfigure } from '../store/stroe';
import {
  imLayoutDownAction,
  imLayoutHideAction,
  imLayoutShowAction,
  imLayoutUpAction
} from '../container/im-layout/actions';
import { selectImApiInited } from './selectors';

class Im implements ImModel {

  private $root: HTMLElement;

  private imStore: ImStore;

  constructor(el?: HTMLElement) {
    if (el) {
      this.$root = el;
    } else {
      this.$root = document.createElement('div');
      this.$root.style.position = 'absolute';
      this.$root.style.left = '-1px';
      this.$root.style.width = '0px';
      this.$root.style.height = '0px';
      document.body.appendChild(this.$root);
    }

    this.imStore = storeConfigure();
  }

  init = () => {
    return mount(this.$root, this.imStore.store);
  };

  destroy = () => {
    return Promise.resolve(unmount(this.$root));
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

  setConfig = (config: ConfigModel) => {
    // TODO
  };

  getConfig = () => {
    return defaultConfig;
  };
}

export function getImInstance(config?: ConfigModel, el?: HTMLElement) {
  const im = new Im(el);
  if (config) {
    im.setConfig(config);
  }
  return im;
}
