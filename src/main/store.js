import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createDebug } from './utils/log';

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
      test: t => t || {},
    });
    this.store = createStore(reducers, applyMiddleware(...middlewares));
    setTimeout(() => {
      this.store.dispatch({ type: 1 });
    }, 1000);
  }
}
