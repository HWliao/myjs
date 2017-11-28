import { createStore } from 'redux';

import { createDebug } from './utils/log';

const log = createDebug('im:store');

export class Store {
  constructor() {
    log('store construct...');
    this.store = createStore(() => {
    });
  }
}
