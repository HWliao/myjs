import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { BaseState, createRootReducer, RootStateKeys } from './reducers';
import { Map } from 'immutable';
import { createEpicMiddleware } from 'redux-observable';
import { createRootEpic } from './epics';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/**
 * 配置一个store
 * @returns {ImStore}
 */
export function storeConfigure(): ImStore {
  // 生成初始值
  const initState = Map<RootStateKeys, any>({});
  // 创建一个根reducer
  const rootReducer = createRootReducer();
  // 创一个epic中间件
  const epicMiddleware = createEpicMiddleware(createRootEpic());
  // 中间集合
  const middlewares: Middleware[] = [
    epicMiddleware
  ];
  // 增强集合
  const enhancers = [applyMiddleware(...middlewares)];
  // 根据环境确定是否使用redux-devtool
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  // 创建一个用于监听state变化的多播
  const store$ = new BehaviorSubject<BaseState>(rootReducer(initState, {type: '@@store$_init'}));
  // 创建一个新的store
  const store = createStore(rootReducer, initState, composeEnhancers(...enhancers));
  // 监听store变化
  store.subscribe(() => store$.next(store.getState()));
  // 立马刷新一次
  store$.next(store.getState());

  if (process.env.NODE_ENV !== 'production') {
    // 开发环境下的热加载先关
    if (module.hot) {
      module.hot.accept('./epics', () => {
        epicMiddleware.replaceEpic(createRootEpic());
      });
    }
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createRootReducer());
      });
    }
  }
  return {
    store,
    store$,
    subscribe: (selector) => store$.map(selector).distinctUntilChanged()
  };
}

/**
 * 封装stroe接口
 */
export interface ImStore {
  store: Store<any>;
  store$: BehaviorSubject<BaseState>;
  subscribe: Subscribe<BaseState, any>;
}

/**
 * 订阅函数
 */
export interface Subscribe<S extends BaseState, R> {
  (selector: (state: S) => R): Observable<R>;
}
