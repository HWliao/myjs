import { createDebug } from './utils/log';
import { USER_ACCOUNT } from './model/state';

const log = createDebug('im:sdk');

export class Sdk {
  constructor(options, store) {
    log('sdk construct... options:%o', options);
    this.options = options;
    this.store = store;
  }

  connect() {
    this.store.get(USER_ACCOUNT);
    return Promise.resolve();
  }
}
