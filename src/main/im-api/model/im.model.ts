import { ConfigModel } from './config.model';
import { BaseState } from '../../store/reducers';
import { Store } from 'redux';

export interface ImModel {
  /**
   * 初始化
   * @returns {Promise<any>}
   */
  init: (el?: HTMLElement) => Promise<any>;

  /**
   * 销毁
   * @returns {Promise<any>}
   */
  destroy: () => Promise<any>;

  /**
   * 显示/隐藏
   * @param {boolean} show
   */
  toggleShow: (show?: boolean) => void;

  /**
   * 展开/收起
   * @param {boolean} up
   */
  toggleUp: (up?: boolean) => void;
  /**
   * 登入
   */
  login: (accid: string, token: string) => void;
  /**
   * 登出
   */
  logout: () => void;

  /**
   * 是否已经初始化
   * @returns {boolean}
   */
  isInited: () => boolean;

  /**
   * 是否已经显示
   * @returns {boolean}
   */
  isShow: () => boolean;

  /**
   * 是否已经展开
   * @returns {boolean}
   */
  isUp: () => boolean;

  /**
   * 设置配置对象
   * @param {ConfigModel} config
   */
  setConfig: (config: ConfigModel) => void;

  /**
   * 获取配置对象
   * @returns {ConfigModel}
   */
  getConfig: () => ConfigModel;
  /**
   * 设置store
   * @param {Store<BaseState>} store
   */
  setStore: (store: Store<BaseState>) => void;
  /**
   * 获取store
   * @return {Store<BaseState>}
   */
  getStore: () => Store<BaseState>;
}
