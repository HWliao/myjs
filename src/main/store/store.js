import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import { Map } from 'immutable';

import { createDebug } from '../utils/log';
import { isLayoutShow } from '../components/layout/layoutReducer';

const log = createDebug('im:store');

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  middlewares.push(require('redux-logger').logger);
}

export class Store {
  constructor() {
    log('store construct...');
    const initialState = Map({});
    const rootReducer = combineReducers({
      isLayoutShow,
    });
    this.store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
  }

  dispatch(...args) {
    return this.store.dispatch(...args);
  }

  getState() {
    return this.store.getState();
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }

  replaceReducer(...args) {
    return this.store.replaceReducer(...args);
  }
}
