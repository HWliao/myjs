import { createStore, combineReducers } from 'redux';

import { createDebug } from './utils/log';

const log = createDebug('im:store');

export class Store {
  constructor() {
    log('store construct...');
    const reducers = combineReducers({
      test: t => t || {},
    });
    this.store = createStore(reducers);
  }
}
