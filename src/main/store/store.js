import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createDebug } from '../utils/log';
import { layout } from './testReducer';

const log = createDebug('im:store');

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  middlewares.push(require('redux-logger').logger);
}

export class Store {
  constructor() {
    log('store construct...');
    const reducers = combineReducers({
      layout,
    });
    this.store = createStore(reducers, applyMiddleware(...middlewares));
  }

  dispatch(...args) {
    return this.store.dispatch(...args);
  }

  getState(...args) {
    return this.store.getState(...args);
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }

  replaceReducer(...args) {
    return this.store.replaceReducer(...args);
  }
}
