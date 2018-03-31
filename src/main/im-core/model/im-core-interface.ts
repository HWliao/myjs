import { Store } from 'redux';
import { BaseState } from '../../store/reducers';

export interface ImCoreInterface {
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
  /**
   * 初始化
   */
  init: () => void;
  destroy: () => void;
}
