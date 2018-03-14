import { ImModel } from './model/im.model';
import { mount, unmount } from '../container/im-root';
import { ConfigModel } from './model/config.model';
import { selectLayoutShow, selectLayoutUp } from '../container/im-layout/selectors';
import { ImStore, storeConfigure } from '../store/stroe';
import {
  imLayoutDownAction,
  imLayoutHideAction,
  imLayoutShowAction,
  imLayoutUpAction
} from '../container/im-layout/actions';
import { selectImApiConfig } from './selectors';
import { Store } from 'redux';
import { BaseState } from '../store/reducers';
import { logger } from '../utils/logger';
import { imApiSetConfigAction } from './actions';
import { selectImRootInited } from '../container/selectors';

/**
 * Im 实现类
 */
class Im implements ImModel {
  /**
   * 根元素
   */
  private _$root: HTMLElement;

  /**
   * 对于redux store基本封装
   * 提供一个可以监听state变化的Subject
   */
  private _imStore: ImStore;
  /**
   * redux store
   */
  private _store: Store<BaseState>;

  /**
   * 仅仅对store和挂载点进行初始化
   * 为根组件初始化做准备
   */
  constructor(el?: HTMLElement) {
    if (el) {
      this._$root = el;
    } else {
      this._$root = document.createElement('div');
      this._$root.style.position = 'absolute';
      this._$root.style.left = '-1px';
      this._$root.style.width = '0px';
      this._$root.style.height = '0px';
      document.body.appendChild(this._$root);
    }

    this._imStore = storeConfigure();
    this._store = this._imStore.store;
  }

  init = () => {
    return mount(this._$root, this._imStore.store);
  };

  destroy = () => {
    return Promise.resolve(unmount(this._$root));
  };

  toggleShow = (show?: boolean) => {
    const currShow = selectLayoutShow(this._store.getState());
    show = show === undefined ? !currShow : show;
    this._store.dispatch(show ? imLayoutShowAction() : imLayoutHideAction());
  };

  toggleUp = (up?: boolean) => {
    const currUp = selectLayoutUp(this._store.getState());
    up = up === undefined ? !currUp : up;
    this._store.dispatch(up ? imLayoutUpAction() : imLayoutDownAction());
  };

  isInited = () => {
    return selectImRootInited(this._store.getState());
  };

  isShow = () => {
    return selectLayoutShow(this._store.getState());
  };

  isUp = () => {
    return selectLayoutUp(this._store.getState());
  };

  setConfig = (config: ConfigModel) => {
    const isInited = selectImRootInited(this._store.getState());
    if (isInited) {
      logger.warn('根组件初始化后再次进行配置将无效');
      return;
    }
    this._store.dispatch(imApiSetConfigAction(config));
  };

  getConfig = () => {
    return selectImApiConfig(this._store.getState()).toJS();
  };
}

export function getImInstance(config?: ConfigModel, el?: HTMLElement) {
  const im = new Im(el);
  if (config) {
    im.setConfig(config);
  }
  return im;
}
