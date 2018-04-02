import { ImModel } from './model/im.model';
import { mount, unmount } from '../container/im-root';
import { ConfigModel } from './model/config.model';
import { selectLayoutShow, selectLayoutUp } from '../container/im-layout/selectors';
import {
  imLayoutDownAction,
  imLayoutHideAction,
  imLayoutShowAction,
  imLayoutUpAction
} from '../container/im-layout/actions';
import { selectImApiConfig } from './selectors';
import { logger } from '../utils/logger';
import { imApiLoginAction, imApiSetConfigAction, imApitLogoutAction } from './actions';
import { selectImRootInited } from '../container/selectors';
import { BaseStoreComponent } from '../store/base-store-component';

/**
 * Im 实现类
 */
class Im extends BaseStoreComponent implements ImModel {
  /**
   * 根元素
   */
  private _$root: HTMLElement;

  /**
   * 仅仅对store和挂载点进行初始化
   * 为根组件初始化做准备
   */
  constructor() {
    super();
  }

  init = (el?: HTMLElement) => {
    if (el) {
      this._$root = el;
    } else if (!this._$root) {
      this._$root = document.createElement('div');
      this._$root.style.position = 'absolute';
      this._$root.style.left = '-1px';
      this._$root.style.width = '0px';
      this._$root.style.height = '0px';
      document.body.appendChild(this._$root);
    }
    return mount(this._$root, this.store);
  };

  destroy = () => {
    return Promise.resolve(unmount(this._$root));
  };

  toggleShow = (show?: boolean) => {
    const currShow = selectLayoutShow(this.store.getState());
    show = show === undefined ? !currShow : show;
    this.store.dispatch(show ? imLayoutShowAction() : imLayoutHideAction());
  };

  toggleUp = (up?: boolean) => {
    const currUp = selectLayoutUp(this.store.getState());
    up = up === undefined ? !currUp : up;
    this.store.dispatch(up ? imLayoutUpAction() : imLayoutDownAction());
  };
  login = (accid: string, token: string) => {
    this.store.dispatch(imApiLoginAction({accid, token}));
  };
  logout = () => {
    this.store.dispatch(imApitLogoutAction());
  };
  isInited = () => {
    return selectImRootInited(this.store.getState());
  };

  isShow = () => {
    return selectLayoutShow(this.store.getState());
  };

  isUp = () => {
    return selectLayoutUp(this.store.getState());
  };

  setConfig = (config: ConfigModel) => {
    const isInited = selectImRootInited(this.store.getState());
    if (isInited) {
      logger.warn('根组件初始化后再次进行配置将无效');
      return;
    }
    this.store.dispatch(imApiSetConfigAction(config));
  };

  getConfig = () => {
    return selectImApiConfig(this.store.getState()).toJS();
  };
}

/**
 * 船建一个im实例
 * @returns {Im}
 */
export function getImInstance() {
  return new Im();
}
