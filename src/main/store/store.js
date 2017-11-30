import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import { Map } from 'immutable';

import { createDebug } from '../utils/log';
import { isLayoutShow } from '../components/layout/layoutReducer';
import { isSidebarUp } from '../components/sidebar/sidebarReducer';
import { isLogin } from './reducer';
import { IS_LAYOUT_SHOW, IS_SIDEBAR_UP, IS_LOGIN } from '../model/state';

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
      [IS_LAYOUT_SHOW]: isLayoutShow,
      [IS_SIDEBAR_UP]: isSidebarUp,
      [IS_LOGIN]: isLogin,
    });

    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      // 有redux开发工具,加载开发工具
      this.store = createStore(
        rootReducer,
        initialState,
        compose(
          applyMiddleware(...middlewares),
          window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
      );
    } else {
      this.store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
    }
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

  get(...args) {
    return this.store.getState().get(...args);
  }
}
