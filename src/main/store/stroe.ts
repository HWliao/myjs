import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { BaseState, createRootReducer, RootStateKeys } from './reducers';
import { Map } from 'immutable';
import { createEpicMiddleware } from 'redux-observable';
import { createRootEpic } from './epics';
import { BaseAction } from './actions';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const initState = Map<RootStateKeys, any>({});

const rootReducer = createRootReducer();

const epicMiddleware = createEpicMiddleware(createRootEpic());
const middlewares: Middleware[] = [
  epicMiddleware
];
if (module.hot) {
  module.hot.accept('./epics', () => {
    epicMiddleware.replaceEpic(createRootEpic());
  });
}

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/**
 * 当前store对象
 */
let _store: Store<any>;
/**
 * 通过rootreducer initstate 初始化整个state树
 * 作为state变化流的初始值
 * @type {BehaviorSubject<BaseState>}
 * @private
 */
let _store$ = new BehaviorSubject<BaseState>(rootReducer(initState, {type: '@@store$_init'}));

/**
 *
 * @returns {Store<any>}
 */
export function storeConfigure() {
  // 创建一个新的store
  _store = createStore(rootReducer, initState, composeEnhancers(...enhancers));
  // 监听store变化
  _store.subscribe(() => _store$.next(_store.getState()));
  // 立马刷新一次
  _store$.next(_store.getState());

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      _store.replaceReducer(createRootReducer());
    });
  }
  return _store;
}

/**
 * 发布action
 * @param {A} action
 * @returns {A}
 */
export function dispatch<A extends BaseAction = BaseAction>(action: A): A {
  if (_store) {
    return _store.dispatch(action);
  }
  return action;
}

/**
 * 获取整个state树
 * @returns {S}
 */
export function getState<S extends BaseState = BaseState>(): S {
  return _store ? _store.getState() : null;
}

/**
 * 监听state变化
 * @param {(state: S) => R} selector
 * @returns {Observable<R>}
 */
export function subscribe<S extends BaseState, R>(selector: (state: S) => R): Observable<R> {
  return _store$.map(selector).distinctUntilChanged();
}
