import { Store } from 'redux';
import { BaseState } from './reducers';

/**
 * 基础自定义组件
 */
export class BaseStoreComponent {
  protected store: Store<BaseState>;

  setStore = (store: Store<BaseState>) => this.store = store;

  getStore = () => this.store;
}
